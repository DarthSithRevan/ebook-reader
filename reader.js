let rendition;
let bookKey;

function openBook(file) {
  bookKey = `epub-progress-${file.name}`;

  const book = ePub(file);
  rendition = book.renderTo("reader", {
    width: "100%",
    height: "100%"
  });

  const savedCfi = localStorage.getItem(bookKey);
  rendition.display(savedCfi || undefined);

  rendition.on("relocated", loc => {
    localStorage.setItem(bookKey, loc.start.cfi);
  });
}
