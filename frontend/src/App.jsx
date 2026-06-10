import { useState } from "react";
import UploadForm from "./components/UploadForm";
import ResultCard from "./components/ResultCard";
import SkillGapChart from "./components/SkillGapChart";

export default function App() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
            {/* Header */}
            <header style={{
                borderBottom: "1px solid var(--border)",
                padding: "1.5rem 2rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                background: "var(--surface)"
            }}>
                <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18
                }}>⚡</div>
                <div>
                    <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                        Career Optimizer
                    </h1>
                    <p style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: 2 }}>
                        NLP · Gemini AI · ATS Score
                    </p>
                </div>
            </header>

            <main style={{ maxWidth: 1100, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
                <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
                    <h2 style={{
                        fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)",
                        fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1,
                        background: "linear-gradient(135deg, #fff 30%, var(--accent2))",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                    }}>
                        Beat the ATS.<br />Land the job.
                    </h2>
                    <p style={{ marginTop: "1rem", color: "var(--muted)", fontSize: "0.95rem" }}>
                        Upload your resume + paste a job description → get AI-powered gap analysis
                    </p>
                </div>

                <UploadForm setResult={setResult} setLoading={setLoading} loading={loading} />

                {loading && (
                    <div style={{ textAlign: "center", padding: "3rem", color: "var(--muted)" }}>
                        <div style={{ fontSize: "2rem", marginBottom: "1rem", animation: "spin 1s linear infinite" }}>⚙️</div>
                        <p style={{ fontFamily: "var(--font-display)" }}>Analyzing with Gemini AI...</p>
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    </div>
                )}

                {result && !loading && (
                    <div style={{ display: "grid", gap: "1.5rem", marginTop: "2rem" }}>
                        <ResultCard result={result} />
                        <SkillGapChart result={result} />
                    </div>
                )}
            </main>
        </div>
    );
}