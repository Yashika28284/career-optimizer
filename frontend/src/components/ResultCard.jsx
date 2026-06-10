export default function ResultCard({ result }) {
    const score = result.atsScore;
    const scoreColor = score >= 70 ? "#10b981" : score >= 45 ? "#f59e0b" : "#ef4444";
    const scoreLabel = score >= 70 ? "Strong Match" : score >= 45 ? "Moderate Match" : "Weak Match";

    const card = {
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "1.5rem",
    };

    const Tag = ({ text, color }) => (
        <span style={{
            display: "inline-block", background: `${color}18`,
            color, border: `1px solid ${color}40`,
            borderRadius: 6, padding: "0.3rem 0.7rem",
            fontSize: "0.75rem", fontFamily: "var(--font-mono)",
            margin: "0.25rem"
        }}>{text}</span>
    );

    return (
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "1.5rem" }}>
            {/* ATS Score */}
            <div style={{ ...card, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <div style={{
                    fontSize: "3.5rem", fontFamily: "var(--font-display)",
                    fontWeight: 800, color: scoreColor, lineHeight: 1
                }}>{score}%</div>
                <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: scoreColor, fontWeight: 700 }}>{scoreLabel}</div>
                <div style={{ marginTop: "0.5rem", fontSize: "0.7rem", color: "var(--muted)" }}>ATS Match Score</div>
            </div>

            {/* Details */}
            <div style={{ display: "grid", gap: "1rem" }}>
                {/* Summary */}
                <div style={card}>
                    <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "0.5rem", fontFamily: "var(--font-display)", fontWeight: 700 }}>AI SUMMARY</p>
                    <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--text)" }}>{result.summary}</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {/* Missing Skills */}
                    <div style={card}>
                        <p style={{ fontSize: "0.75rem", color: "#ef4444", marginBottom: "0.75rem", fontFamily: "var(--font-display)", fontWeight: 700 }}>❌ MISSING SKILLS</p>
                        <div>{result.missingSkills?.map((s, i) => <Tag key={i} text={s} color="#ef4444" />)}</div>
                    </div>

                    {/* Present Skills */}
                    <div style={card}>
                        <p style={{ fontSize: "0.75rem", color: "#10b981", marginBottom: "0.75rem", fontFamily: "var(--font-display)", fontWeight: 700 }}>✅ PRESENT SKILLS</p>
                        <div>{result.presentSkills?.map((s, i) => <Tag key={i} text={s} color="#10b981" />)}</div>
                    </div>
                </div>

                {/* Keywords to Add */}
                <div style={card}>
                    <p style={{ fontSize: "0.75rem", color: "#f59e0b", marginBottom: "0.75rem", fontFamily: "var(--font-display)", fontWeight: 700 }}>🔑 KEYWORDS TO ADD</p>
                    <div>{result.keywordsToAdd?.map((k, i) => <Tag key={i} text={k} color="#f59e0b" />)}</div>
                </div>

                {/* Suggestions */}
                <div style={card}>
                    <p style={{ fontSize: "0.75rem", color: "var(--accent2)", marginBottom: "0.75rem", fontFamily: "var(--font-display)", fontWeight: 700 }}>💡 SUGGESTIONS</p>
                    <ul style={{ paddingLeft: "1rem" }}>
                        {result.suggestions?.map((s, i) => (
                            <li key={i} style={{ fontSize: "0.82rem", lineHeight: 1.7, marginBottom: "0.3rem", color: "var(--text)" }}>{s}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}