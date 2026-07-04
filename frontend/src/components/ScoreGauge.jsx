export default function ScoreGauge({ score = 0, label = "" }) {
    const size = 168;
    const stroke = 12;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.max(0, Math.min(100, score));
    const offset = circumference - (clamped / 100) * circumference;

    const scoreColor =
        clamped >= 70 ? "#00f0ff" : clamped >= 45 ? "#f59e0b" : "#ef4444";

    return (
        <div style={{ position: "relative", width: size, height: size }}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                style={{ transform: "rotate(-90deg)" }}
            >
                <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f0ff" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                </defs>
                {/* Track */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth={stroke}
                />
                {/* Progress */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{
                        filter: "drop-shadow(0 0 8px rgba(0,240,255,0.45))",
                        transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                />
            </svg>
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "2.1rem",
                        lineHeight: 1,
                        color: "#fff",
                    }}
                >
                    {Math.round(clamped)}%
                </div>
                {label && (
                    <div
                        style={{
                            marginTop: "0.35rem",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            color: scoreColor,
                        }}
                    >
                        {label}
                    </div>
                )}
            </div>
        </div>
    );
}