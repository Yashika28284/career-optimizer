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
            <header className="header-bar">
                <div className="header-icon">
                    <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>
                        clinical_notes
                    </span>
                </div>
                <div>
                    <h1 className="header-title">ATS Analyzer</h1>
                    <p className="header-subtitle">NLP · Gemini AI · ATS Score</p>
                </div>
            </header>

            <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem 2rem" }}>
                {/* Hero */}
                <div className="hero">
                    <h2 className="hero-title">ATS Analyzer</h2>
                    <p className="hero-sub">
                        Optimize your resume for AI-driven hiring. Our sophisticated algorithms
                        analyze your alignment with high-value job descriptions instantly.
                    </p>
                </div>

                <UploadForm setResult={setResult} setLoading={setLoading} loading={loading} />

                {loading && (
                    <div className="fade-in" style={{ textAlign: "center", padding: "3rem", color: "var(--muted)" }}>
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "2rem", color: "var(--accent)", animation: "spin 1s linear infinite", display: "inline-block" }}
                        >
                            progress_activity
                        </span>
                        <p style={{ marginTop: "0.75rem", fontFamily: "var(--font-display)" }}>
                            Analyzing with Gemini AI...
                        </p>
                    </div>
                )}

                {result && !loading && (
                    <div className="fade-in" style={{ display: "grid", gap: "1.5rem", marginTop: "2.5rem" }}>
                        <ResultCard result={result} />
                        <SkillGapChart result={result} />
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="footer">Powered by Advanced AI Intelligence</footer>
        </div>
    );
}