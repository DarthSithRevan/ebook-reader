const upload = document.getElementById("upload");
const booksEl = document.getElementById("books");

upload.onchange = async () => {
  const file = upload.files[0];
  const user = (await supabase.auth.getUser()).data.user;

  const path = `${user.id}/${file.name}`;

  await supabase.storage.from("ebooks").upload(path, file);

  await supabase.from("books").insert({
    user_id: user.id,
    title: file.name,
    file_path: path
  });

  loadBooks();
};

async function loadBooks() {
  const { data: books } = await supabase.from("books").select();

  booksEl.innerHTML = "";
  for (const b of books) {
    const li = document.createElement("li");
    li.textContent = b.title;
    li.onclick = async () => {
      const { data } = await supabase.storage
        .from("ebooks")
        .createSignedUrl(b.file_path, 3600);

      openBook(data.signedUrl, b.id);
    };
    booksEl.appendChild(li);
  }
}

loadBooks();
