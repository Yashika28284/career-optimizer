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
            const res = await axios.post("https://career-optimizer.onrender.com/api/resume/analyze", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResult(res.data);
        } catch (err) {
            setError(err.response?.data?.error || "Server error. Make sure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-grid">
            {/* Resume Drop Zone */}
            <div
                className={`glass-card drop-zone${dragging ? " dragging" : ""}`}
                style={{
                    padding: "1.75rem",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 190,
                    textAlign: "center",
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
                <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "2.5rem", color: "var(--accent)", marginBottom: "0.75rem" }}
                >
                    description
                </span>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem" }}>
                    {file ? file.name : "Drop your Resume PDF"}
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.4rem", fontFamily: "var(--font-mono)" }}>
                    {file ? `${(file.size / 1024).toFixed(1)} KB` : "or click to browse"}
                </p>
            </div>

            {/* Job Description */}
            <div className="glass-card" style={{ padding: "1.75rem" }}>
                <label
                    style={{
                        fontSize: "0.72rem",
                        color: "var(--muted)",
                        display: "block",
                        marginBottom: "0.6rem",
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                    }}
                >
                    Job Description
                </label>
                <textarea
                    value={jd}
                    onChange={(e) => setJd(e.target.value)}
                    placeholder="Paste the full job description here..."
                    style={{
                        width: "100%",
                        height: 130,
                        background: "rgba(0,0,0,0.25)",
                        border: "1px solid var(--border)",
                        borderRadius: 10,
                        color: "var(--text)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8rem",
                        padding: "0.75rem",
                        resize: "none",
                        lineHeight: 1.6,
                    }}
                />
            </div>

            {/* Submit */}
            <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.85rem", marginTop: "0.5rem" }}>
                {error && (
                    <p style={{ color: "var(--red)", fontSize: "0.8rem", background: "rgba(239,68,68,0.1)", padding: "0.5rem 1rem", borderRadius: 8, fontFamily: "var(--font-mono)" }}>
                        {error}
                    </p>
                )}
                <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                    <span className="material-symbols-outlined" style={{ fontSize: "1.1rem" }}>bolt</span>
                    {loading ? "Analyzing..." : "Analyze Now"}
                </button>
            </div>
        </div>
    );
}