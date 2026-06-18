async function generateImage() {
  const prompt = document.getElementById("prompt").value.trim();
  const btn = document.getElementById("generateBtn");
  const status = document.getElementById("status");
  const img = document.getElementById("result");
  const downloadBtn = document.getElementById("downloadBtn");

  if (!prompt) {
    status.textContent = "Pehle prompt likho.";
    return;
  }

  btn.disabled = true;
  status.textContent = "Generating premium image...";
  img.style.display = "none";
  downloadBtn.style.display = "none";

  try {
    const response = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Image generate nahi hui.");
    }

    img.src = data.image;
    img.onload = () => {
      img.style.display = "block";
      downloadBtn.href = data.image;
      downloadBtn.style.display = "block";
      status.textContent = "Image ready ✅";
    };
  } catch (error) {
    status.textContent = error.message;
  } finally {
    btn.disabled = false;
  }
}
