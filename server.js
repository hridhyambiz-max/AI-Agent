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
    const { prompt, size, style } = req.body;

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `${prompt} | Style: ${style}`,
      size: size || "1024x1024"
    });

    const imageBase64 = result.data[0].b64_json;

    res.json({
      image: `data:image/png;base64,${imageBase64}`
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Image generation failed"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
