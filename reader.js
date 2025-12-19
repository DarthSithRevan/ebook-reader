let rendition;
let bookKey;

function openBook(file) {
  // Create a browser-safe URL
  const url = URL.createObjectURL(file);

  bookKey = `epub-progress-${file.name}`;

  const book = ePub(url);

  rendition = book.renderTo("reader", {
    width: "100%",
    height: "100%",
    spread: "none"
  });

  const savedCfi = localStorage.getItem(bookKey);
  rendition.display(savedCfi || undefined);

  rendition.on("relocated", loc => {
    localStorage.setItem(bookKey, loc.start.cfi);
  });
}
