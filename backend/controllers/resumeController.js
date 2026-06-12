import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
console.log("API Key Loaded:", !!process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function cosineSimilarity(text1, text2) {
  const tokenize = (text) =>
    text.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
  const words1 = tokenize(text1);
  const words2 = tokenize(text2);
  const vocab = [...new Set([...words1, ...words2])];
  const vec = (words) => vocab.map((w) => words.filter((x) => x === w).length);
  const v1 = vec(words1);
  const v2 = vec(words2);
  const dot = v1.reduce((sum, val, i) => sum + val * v2[i], 0);
  const mag1 = Math.sqrt(v1.reduce((s, v) => s + v * v, 0));
  const mag2 = Math.sqrt(v2.reduce((s, v) => s + v * v, 0));
  return mag1 && mag2 ? ((dot / (mag1 * mag2)) * 100).toFixed(1) : "0.0";
}

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No PDF uploaded" });
    if (!req.body.jobDescription) return res.status(400).json({ error: "Job description required" });

    const filePath = path.resolve(req.file.path);
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;
    fs.unlinkSync(filePath);

    const jobDescription = req.body.jobDescription;


    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `You are an ATS expert. Analyze this resume against the job description and return ONLY a JSON object with keys: missingSkills, presentSkills, keywordsToAdd, suggestions, summary. Resume: ${resumeText.slice(0, 2000)} Job: ${jobDescription.slice(0, 1000)}`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    let geminiData;
    let atsScore = 0;

    try {
      const cleaned = rawText.replace(/```json|```/g, "").trim();
      geminiData = JSON.parse(cleaned);
      const present = geminiData.presentSkills?.length || 0;
      const missing = geminiData.missingSkills?.length || 0;

      atsScore =
        present + missing > 0
          ? Math.round((present / (present + missing)) * 100)
          : 0;
    } catch {
      geminiData = { missingSkills: [], presentSkills: [], keywordsToAdd: [], suggestions: ["Could not parse AI response"], summary: rawText.slice(0, 300) };
      atsScore = 0;
    }
    console.log("ATS Score:", atsScore);
    console.log("Present Skills:", geminiData.presentSkills?.length);
    console.log("Missing Skills:", geminiData.missingSkills?.length);

    return res.json({ atsScore: parseFloat(atsScore), ...geminiData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
