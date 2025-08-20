import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/ai", async (req, res) => {
  const { userInput } = req.body;

  try {
    // 1. Groq AI Completion (LLaMA 3)
    const groqRes = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: "You are a helpful business assistant." },
          { role: "user", content: userInput }
        ],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = groqRes.data.choices[0].message.content;

    // 2. ElevenLabs TTS
    const ttsRes = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL/stream",
      {
        text: reply,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.3, similarity_boost: 0.7 }
      },
      {
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer"
      }
    );

    const audioBase64 = Buffer.from(ttsRes.data, "binary").toString("base64");

    res.json({ reply, audio: audioBase64 });
  } catch (error) {
    console.error("AI or TTS error:", error.message);
    res.status(500).json({ error: "Failed to get AI response or voice." });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
