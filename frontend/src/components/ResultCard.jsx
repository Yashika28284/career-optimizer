import ScoreGauge from "./ScoreGauge";

export default function ResultCard({ result }) {
    const score = result.atsScore ?? 0;
    const scoreLabel = score >= 70 ? "Strong Match" : score >= 45 ? "Moderate Match" : "Weak Match";

    const cardStyle = {
        padding: "1.5rem",
    };

    const sectionLabel = {
        fontSize: "0.72rem",
        color: "var(--muted)",
        marginBottom: "0.85rem",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
    };

    return (
        <div className="result-grid">
            {/* ATS Score Gauge */}
            <div
                className="glass-card gauge-col"
                style={{
                    ...cardStyle,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    gap: "0.75rem",
                }}
            >
                <ScoreGauge score={score} label={scoreLabel} />
                <div style={{ fontSize: "0.7rem", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
                    ATS MATCH SCORE
                </div>
            </div>

            {/* Details */}
            <div style={{ display: "grid", gap: "1rem" }}>
                {/* Summary */}
                <div className="glass-card" style={cardStyle}>
                    <p style={sectionLabel}>
                        <span className="material-symbols-outlined" style={{ fontSize: "1rem", color: "var(--accent)" }}>neurology</span>
                        AI Summary
                    </p>
                    <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--text)" }}>{result.summary}</p>
                </div>

                <div className="skills-grid">
                    {/* Present Skills */}
                    <div className="glass-card" style={cardStyle}>
                        <p style={{ ...sectionLabel, color: "#34d399" }}>
                            <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>check_circle</span>
                            Present Skills
                        </p>
                        <div>
                            {result.presentSkills?.map((s, i) => (
                                <span key={i} className="tag tag-positive">{s}</span>
                            ))}
                        </div>
                    </div>

                    {/* Missing Skills */}
                    <div className="glass-card" style={cardStyle}>
                        <p style={{ ...sectionLabel, color: "#f87171" }}>
                            <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>cancel</span>
                            Missing Skills
                        </p>
                        <div>
                            {result.missingSkills?.map((s, i) => (
                                <span key={i} className="tag tag-critical">{s}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Keywords to Add */}
                <div className="glass-card" style={cardStyle}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
                        <p style={{ ...sectionLabel, marginBottom: 0, color: "var(--accent)" }}>
                            <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>key</span>
                            Keywords to Add
                        </p>
                        <span className="badge-critical-focus">
                            <span className="material-symbols-outlined" style={{ fontSize: "0.85rem" }}>priority_high</span>
                            Critical Focus
                        </span>
                    </div>
                    <div>
                        {result.keywordsToAdd?.map((k, i) => (
                            <span key={i} className="tag tag-keyword">{k}</span>
                        ))}
                    </div>
                </div>

                {/* AI Recommendations */}
                <div className="glass-card" style={cardStyle}>
                    <p style={sectionLabel}>
                        <span className="material-symbols-outlined" style={{ fontSize: "1rem", color: "var(--accent2)" }}>auto_awesome</span>
                        AI Recommendations
                    </p>
                    <div>
                        {result.suggestions?.map((s, i) => (
                            <div key={i} className="rec-item">
                                <span className="material-symbols-outlined rec-icon">auto_awesome</span>
                                <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "var(--text)" }}>{s}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}