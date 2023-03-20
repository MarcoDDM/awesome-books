let books = JSON.parse(localStorage.getItem('books')) || [];

function displayBooks() {
  let bookList = document.getElementById('book-list');
  bookList.innerHTML = '';
  books.forEach(book => {
    let div = document.createElement('div');

    let title = document.createElement('span');
    title.textContent = book.title;
    div.appendChild(title);
    div.appendChild(document.createElement('br'));

    let author = document.createElement('span');
    author.textContent = book.author;
    div.appendChild(author);
    div.appendChild(document.createElement('br'));

    let removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    div.appendChild(removeBtn);
    div.appendChild(document.createElement('br'));

    removeBtn.addEventListener('click', () => removeBook(book.title));

    bookList.appendChild(div);
  });
}

function addBook(title, author) {
  let book = {
    title: title,
    author: author,
    remove: function() {
      books = books.filter(item => item !== this);
      localStorage.setItem('books', JSON.stringify(books));
      displayBooks();
    }
  };
  
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
  displayBooks();
}

function removeBook(title) {
  books = books.filter(book => book.title !== title);
  localStorage.setItem('books', JSON.stringify(books));
  displayBooks();
}

document.getElementById('book-form').addEventListener('submit', e => {
  e.preventDefault();
  let titleInput = document.getElementById('title');
  let authorInput = document.getElementById('author');
  addBook(titleInput.value, authorInput.value);
  titleInput.value = '';
  authorInput.value = '';
});

displayBooks();
