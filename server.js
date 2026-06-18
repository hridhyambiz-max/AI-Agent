import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));

app.post("/api/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" });
    }

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024"
    });

    res.json({
      image: `data:image/png;base64,${result.data[0].b64_json}`
    });

  } catch (error) {
    console.error("IMAGE ERROR:", error);
    res.status(500).json({
      error: error.message || "Image generation failed"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
