let books = JSON.parse(localStorage.getItem('books')) || [];

function displayBooks() {

  function removeBook(title) {
    books = books.filter((book) => book.title !== title);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
  }
  
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';
  books.forEach((book) => {
    const div = document.createElement('div');

    const title = document.createElement('span');
    title.textContent = book.title;
    div.appendChild(title);
    div.appendChild(document.createElement('br'));

    const author = document.createElement('span');
    author.textContent = book.author;
    div.appendChild(author);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('hr'));

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    div.appendChild(removeBtn);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));

    removeBtn.addEventListener('click', () => { removeBook(book.title); });

    bookList.appendChild(div);
  });
}

function addBook(title, author) {
  const book = {
    title,
    author,
    remove() {
      books = books.filter(function (item) { return item !== this; });
      localStorage.setItem('books', JSON.stringify(books));
      displayBooks();
    },
  };

  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
  displayBooks();
}

document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  addBook(titleInput.value, authorInput.value);
  titleInput.value = '';
  authorInput.value = '';
});

displayBooks();
