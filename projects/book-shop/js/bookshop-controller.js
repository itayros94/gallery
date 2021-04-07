'use strict';
var gRate = 1

function init() {
    _creatBooks()
    renderBooks()
}

function renderBooks() {
    var books = getBooksForDisplay();
    var strHtml = ''
    var elBooksTable = document.querySelector('.books-table')
    strHtml = books.map(function(book) {
        return `<tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}$</td>
        <td><button class="read-btn" onclick="onReadBook('${book.id}')">Read
        </button>
        <button class="update-btn" onclick="onUpdateBook('${book.id}')">Update
        </button>
        <button class="delete-btn" onclick="onRemoveBook('${book.id}')">Delete
        </button>
        <button onclick=onPlusClick('${book.id}')>+</button>
        <span>${book.rate}</span>
        <button onclick="onMinusClick('${book.id}')">-</button>
        </td>
     </tr>`

    })
    elBooksTable.innerHTML = '<tr><th>ID</th><th>Title</th><th>Price</th><th>Actions</th></tr>' + strHtml.join('')
}


function onReadBook(bookId) {
    var bookModal = document.querySelector('.modal')
    bookModal.style.visibility = 'visible';
    renderBookModal(bookId)
}

function onUpdateBook(boodId) {
    var bookModal = document.querySelector('.modal')
    var elLorem = document.querySelector('.lorem')

    bookModal.style.visibility = 'hidden';
    elLorem.style.visibility = 'hidden';
    var newPrice = +prompt('New price please?')
    updateBook(boodId, newPrice)
    renderBooks()
}

function onRemoveBook(boodId) {
    var bookModal = document.querySelector('.modal')
    var elLorem = document.querySelector('.lorem')
    bookModal.style.visibility = 'hidden';
    elLorem.style.visibility = 'hidden';
    removeBook(boodId)
    renderBooks()
}

function onAddBook() {
    var bookName = prompt('book name please?')
    var bookPrice = prompt('book price please? $')
    addBook(bookName, bookPrice)
    renderBooks()
}

function onPlusClick(bookId) {
    var book = getBookById(bookId);
    if (book.rate < 10) {
        book.rate++
    }
    renderBooks()
}

function onMinusClick(bookId) {
    var book = getBookById(bookId);
    if (book.rate > 0) {
        book.rate--
    }
    renderBooks()
}

function onSetSort(sortedBy) {
    setSort(sortedBy);
    console.log('Sorting', sortedBy);
    renderBooks();
}