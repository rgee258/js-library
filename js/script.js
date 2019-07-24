let myLibrary = [];

// Book Constructor
function Book(id, title, author, pages, read) {
  this.id = id,
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
}

// Add info to Book prototype
Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

// Change the read status of the book
Book.prototype.update = function() {
  if (this.read === "Read") {
    this.read = "Unread";
  }
  else {
    this.read = "Read";
  }
  render();
}

function addBook() {
  // Add the ID of the new book, which is the length of the array
  // before it's added (n - 1 before the book is added as length n)
  let bookId = myLibrary.length;
  let bookTitle = document.querySelector("#title").value;
  let bookAuthor = document.querySelector("#author").value;
  let bookPages = document.querySelector("#pages").value;
  let bookRead = document.querySelector('input[name="read"]:checked').value;
  const newBook = new Book(bookId, bookTitle, bookAuthor, bookPages, bookRead);
  myLibrary.push(newBook);
  setLibrary();
  hideForm();
  render();
}

function removeBook(id) {
  for (i = id; i < myLibrary.length; i++) {
    myLibrary[i].id = myLibrary[i].id - 1;
  }
  // Slice the array before and after the book we're removing
  // then concat them back
  beforeBook = myLibrary.slice(0, id);
  afterBook = myLibrary.slice(id + 1);
  myLibrary = beforeBook.concat(afterBook);
  setLibrary();
  render();
}

function render() {
  let library = document.querySelector(".library");
  // Clear the library div on new renders
  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }

  myLibrary.forEach(function(book) {
    // Create book container
    let bookNode = document.createElement("div");
    bookNode.classList.add("book");
    // Create book contents
    let bookContent = document.createElement("div");
    bookContent.classList.add("book-content");
    // Create book title and add it
    let bookTitle = document.createElement("h3");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = book.title;
    bookContent.appendChild(bookTitle);
    // Create book author and add it
    let bookAuthor = document.createElement("p");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = book.author;
    bookContent.appendChild(bookAuthor);
    // Create book page count and add it
    let bookPages = document.createElement("p");
    bookPages.classList.add("book-pages");
    bookPages.textContent = `${book.pages} Pages`;
    bookContent.appendChild(bookPages);
    // Create book read status and add it
    let bookRead = document.createElement("p");
    bookRead.classList.add("book-read");
    bookRead.textContent = book.read;
    bookContent.appendChild(bookRead);
    // Set up area for buttons
    let bookButtons = document.createElement("div");
    bookButtons.classList.add("book-btns");
    //bookContent.appendChild(bookButtons);
    // Add button that removes this book from the library using its id
    let bookRemove = document.createElement("div");
    bookRemove.classList.add("remove");
    bookRemove.textContent = "Remove";
    bookRemove.addEventListener("click", function() {
      removeBook(book.id);
    });
    bookButtons.appendChild(bookRemove);
    // Add button that changes the book's read status
    let bookUpdate = document.createElement("div");
    bookUpdate.classList.add("update-status");
    bookUpdate.textContent = "Update";
    bookUpdate.addEventListener("click", function() {
      book.update();
    });
    bookButtons.appendChild(bookUpdate);
    // Add buttons to each book
    bookContent.appendChild(bookButtons);
    // Add contents to book container
    bookNode.appendChild(bookContent);
    // Display the book in our library
    library.appendChild(bookNode);
  });
}

// Handling form display toggles

function showForm() {
  document.querySelector("#new-book-form").classList.remove("hide");
  document.querySelector("#new-book-form").classList.add("show");
}

function hideForm() {
  document.querySelector("#new-book-form").classList.remove("show");
  document.querySelector("#new-book-form").classList.add("hide");
}

// Local Storage
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

/*
function setLibrary() {
  if (storageAvailable('localStorage')) {
    console.log("Library set");
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  }
}

function getLibrary() {
  if (storageAvailable('localStorage')) {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  }
  else {
    myLibrary = [];
  }
}
*/

// Run when DOM loads

document.addEventListener("DOMContentLoaded", function(event) {
  //getLibrary();
  render();
});
