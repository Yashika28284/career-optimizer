import { useState, useRef } from "react";
import axios from "axios";

export default function UploadForm({ setResult, setLoading, loading }) {
    const [file, setFile] = useState(null);
    const [jd, setJd] = useState("");
    const [error, setError] = useState("");
    const [dragging, setDragging] = useState(false);
    const fileRef = useRef();

    const handleSubmit = async () => {
        if (!file || !jd.trim()) {
            setError("Please upload a PDF resume and enter a job description.");
            return;
        }
        setError("");
        setLoading(true);
        setResult(null);

        const formData = new FormData();
        formData.append("resume", file);
        formData.append("jobDescription", jd);

        try {
            const res = await axios.post("/api/resume/analyze", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResult(res.data);
        } catch (err) {
            setError(err.response?.data?.error || "Server error. Make sure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const box = {
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "1.5rem",
    };

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {/* PDF Drop Zone */}
            <div
                style={{
                    ...box,
                    border: dragging ? "2px dashed var(--accent)" : "2px dashed var(--border)",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    minHeight: 180, textAlign: "center"
                }}
                onClick={() => fileRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                    e.preventDefault(); setDragging(false);
                    const dropped = e.dataTransfer.files[0];
                    if (dropped?.type === "application/pdf") setFile(dropped);
                }}
            >
                <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])} />
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📄</div>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem" }}>
                    {file ? file.name : "Drop your Resume PDF"}
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.4rem" }}>
                    {file ? `${(file.size / 1024).toFixed(1)} KB` : "or click to browse"}
                </p>
            </div>

            {/* Job Description */}
            <div style={box}>
                <label style={{ fontSize: "0.75rem", color: "var(--muted)", display: "block", marginBottom: "0.5rem", fontFamily: "var(--font-display)", fontWeight: 700 }}>
                    JOB DESCRIPTION
                </label>
                <textarea
                    value={jd}
                    onChange={(e) => setJd(e.target.value)}
                    placeholder="Paste the full job description here..."
                    style={{
                        width: "100%", height: 130, background: "var(--bg)",
                        border: "1px solid var(--border)", borderRadius: 8,
                        color: "var(--text)", fontFamily: "var(--font-mono)",
                        fontSize: "0.8rem", padding: "0.75rem", resize: "none",
                        outline: "none", lineHeight: 1.6
                    }}
                />
            </div>

            {/* Submit */}
            <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
                {error && (
                    <p style={{ color: "var(--red)", fontSize: "0.8rem", background: "#ef444415", padding: "0.5rem 1rem", borderRadius: 6 }}>
                        ⚠️ {error}
                    </p>
                )}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                        background: loading ? "var(--border)" : "linear-gradient(135deg, var(--accent), var(--accent2))",
                        color: "#fff", border: "none", borderRadius: 10,
                        padding: "0.85rem 2.5rem", fontFamily: "var(--font-display)",
                        fontWeight: 700, fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer",
                        transition: "opacity 0.2s", letterSpacing: "0.02em"
                    }}
                >
                    {loading ? "Analyzing..." : "⚡ Analyze Resume"}
                </button>
            </div>
        </div>
    );
}