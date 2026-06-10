function generatePrompt(){
  const type=document.getElementById('type').value;
  const brand=document.getElementById('brand').value || 'SBX Media';
  const style=document.getElementById('style').value;
  const details=document.getElementById('details').value || 'clean premium design, high quality, attractive layout';
  const prompt=`Create a ${style} ${type} for ${brand}. Design should look professional, modern, high-quality and brand-focused. Details: ${details}. Use strong composition, premium lighting, clean typography, social-media ready visual.`;
  document.getElementById('promptText').innerText=prompt;
  document.getElementById('previewBox').innerHTML=`<div><strong>${type}</strong><br><small>${style}</small></div>`;
}
function copyPrompt(){
  const text=document.getElementById('promptText').innerText;
  navigator.clipboard.writeText(text);
  alert('Prompt copied!');
}
