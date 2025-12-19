const upload = document.getElementById("upload");

upload.addEventListener("change", e => {
  const file = e.target.files[0];
  if (file) openBook(file);
});
document.getElementById("toggleTheme").onclick = () => {
  document.body.classList.toggle("dark");
};
