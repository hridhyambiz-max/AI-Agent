import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));

app.post("/api/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" });
    }

    const cleanPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=1024&height=1024&nologo=true&enhance=true&seed=${Date.now()}`;

    res.json({
      image: imageUrl
    });

  } catch (error) {
    console.error("IMAGE ERROR:", error);
    res.status(500).json({
      error: "Image generation failed"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
