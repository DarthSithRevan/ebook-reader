let rendition;
let currentBookId;

async function openBook(url, bookId) {
  currentBookId = bookId;

  const book = ePub(url);
  rendition = book.renderTo("reader", {
    width: "100%",
    height: "100%",
    theme: "dark"
  });

  const { data } = await supabase
    .from("reading_progress")
    .select("cfi")
    .eq("book_id", bookId)
    .single();

  rendition.display(data?.cfi || undefined);

  rendition.on("relocated", loc => {
    saveProgress(loc.start.cfi);
  });
}

async function saveProgress(cfi) {
  await supabase.from("reading_progress").upsert({
    book_id: currentBookId,
    user_id: (await supabase.auth.getUser()).data.user.id,
    cfi
  });
}
