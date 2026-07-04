import { useEffect, useRef } from "react";

const VERTEX_SRC = `
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Animated "aurora / plasma" gradient in cyan + violet on near-black,
// tuned to feel like a subtle AI-native ambient background rather than
// a loud, distracting effect.
const FRAGMENT_SRC = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;

vec3 palette(float t) {
    vec3 base   = vec3(0.02, 0.02, 0.03);   // near-black obsidian
    vec3 cyan   = vec3(0.0, 0.94, 1.0);     // #00f0ff
    vec3 violet = vec3(0.66, 0.33, 0.97);   // #a855f7
    vec3 mixed  = mix(cyan, violet, smoothstep(0.2, 0.9, t));
    return mix(base, mixed, smoothstep(0.35, 1.0, t));
}

float flow(vec2 uv, float t) {
    float v = 0.0;
    vec2 p = uv;
    for (int i = 0; i < 4; i++) {
        float fi = float(i);
        p.x += 0.35 / (fi + 1.0) * sin(p.y * (fi + 2.0) + t * 0.35 + fi) ;
        p.y += 0.35 / (fi + 1.0) * cos(p.x * (fi + 2.0) + t * 0.28 + fi);
        v += 1.0 / (fi + 1.5) * sin((p.x + p.y) * (fi + 1.5) + t * 0.4);
    }
    return v;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;

    float t = uTime * 0.06;
    float n = flow(uv * 1.4, t);
    n = n * 0.5 + 0.5;

    // vignette so the glow concentrates and edges stay dark/obsidian
    float vignette = smoothstep(1.1, 0.0, length(uv));
    float intensity = n * vignette;
    intensity = pow(clamp(intensity, 0.0, 1.0), 1.6);

    vec3 color = palette(intensity);

    // subtle grain to avoid a flat, plasticky gradient
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * 0.012;

    gl_FragColor = vec4(color, 1.0);
}
`;

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

export default function ShaderBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (!gl) return; // Fails gracefully — CSS fallback background still shows.

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Program link error:", gl.getProgramInfoLog(program));
            return;
        }
        gl.useProgram(program);

        // Full-screen triangle strip
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
            gl.STATIC_DRAW
        );

        const positionLoc = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

        const resolutionLoc = gl.getUniformLocation(program, "uResolution");
        const timeLoc = gl.getUniformLocation(program, "uTime");

        let rafId;
        let start = performance.now();
        let dpr = Math.min(window.devicePixelRatio || 1, 2);

        const resize = () => {
            const { clientWidth, clientHeight } = canvas;
            canvas.width = Math.floor(clientWidth * dpr);
            canvas.height = Math.floor(clientHeight * dpr);
            gl.viewport(0, 0, canvas.width, canvas.height);
        };

        const render = () => {
            const t = (performance.now() - start) / 1000;
            gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
            gl.uniform1f(timeLoc, t);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            rafId = requestAnimationFrame(render);
        };

        resize();
        render();

        const handleResize = () => resize();
        window.addEventListener("resize", handleResize);

        // Pause the animation loop when the tab isn't visible to save battery/CPU.
        const handleVisibility = () => {
            if (document.hidden) {
                cancelAnimationFrame(rafId);
            } else {
                start = performance.now() - start; // rough continuity, not critical
                render();
            }
        };
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: "fixed",
                inset: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1,
                display: "block",
                background: "#0a0a0a", // fallback if WebGL is unavailable
            }}
        />
    );
}