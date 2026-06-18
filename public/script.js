async function generateImage() {
  const prompt = document.getElementById("prompt").value;

  const response = await fetch("/api/generate-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt,
      style: "premium",
      size: "1024x1024"
    })
  });

  const data = await response.json();
  document.getElementById("result").src = data.image;
}
