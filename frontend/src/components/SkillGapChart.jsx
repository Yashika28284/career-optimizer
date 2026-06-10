import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

export default function SkillGapChart({ result }) {
    const allSkills = [...(result.presentSkills || []), ...(result.missingSkills || [])].slice(0, 8);

    const radarData = allSkills.map((skill) => ({
        skill: skill.length > 12 ? skill.slice(0, 12) + "…" : skill,
        Resume: result.presentSkills?.includes(skill) ? 80 + Math.random() * 20 : 10 + Math.random() * 20,
        Required: 70 + Math.random() * 30,
    }));

    const barData = [
        { name: "Present", count: result.presentSkills?.length || 0, fill: "#10b981" },
        { name: "Missing", count: result.missingSkills?.length || 0, fill: "#ef4444" },
        { name: "Keywords", count: result.keywordsToAdd?.length || 0, fill: "#f59e0b" },
    ];

    const card = {
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "1.5rem",
    };

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div style={card}>
                <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: "1.25rem", fontFamily: "var(--font-display)", fontWeight: 700 }}>
                    SKILL RADAR — RESUME vs REQUIRED
                </p>
                <ResponsiveContainer width="100%" height={280}>
                    <RadarChart data={radarData}>
                        <PolarGrid stroke="#1e1e2e" />
                        <PolarAngleAxis dataKey="skill" tick={{ fill: "#64748b", fontSize: 11, fontFamily: "DM Mono" }} />
                        <Radar name="Your Resume" dataKey="Resume" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.35} />
                        <Radar name="Job Required" dataKey="Required" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} />
                        <Tooltip contentStyle={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: 8, fontFamily: "DM Mono", fontSize: 12 }} />
                        <Legend wrapperStyle={{ fontFamily: "DM Mono", fontSize: 12 }} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            <div style={card}>
                <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: "1.25rem", fontFamily: "var(--font-display)", fontWeight: 700 }}>
                    SKILL GAP BREAKDOWN
                </p>
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={barData} barSize={48}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
                        <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12, fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "#64748b", fontSize: 11, fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: 8, fontFamily: "DM Mono", fontSize: 12 }} />
                        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                            {barData.map((entry, index) => (
                                <rect key={index} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}