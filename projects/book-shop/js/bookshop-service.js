var STORAGE_KEY = 'booksDB'
var gBooks;
var gSortBy = 'text'

function getBooksForDisplay() {
    return gBooks.sort(function(book1, book2) {
        console.log(book1)
        if (gSortBy === 'text') return book1.name.localeCompare(book2.name);
        if (gSortBy === 'price') return book1.price - book2.price;
        if (gSortBy === 'rate') return book1.rate - book2.rate
    });
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function _creatBooks() {
    var books = loadFromStorage(STORAGE_KEY);

    if (!books || books.length === 0) {
        books = [
            _creatBook('snake-man', 33, "snake.jpg"),
            _creatBook('snow-man', 64, "snow.jpg"),
            _creatBook('dragon-man', 20, "dragon.jpg")
        ]
    }
    gBooks = books;
    _saveBooksToStorage()
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _creatBook(name, price, imgUrl) {
    var book = {
        id: _makeId(),
        name: name,
        price: price,
        imgUrl: imgUrl,
        rate: 0
    }
    console.log(book)
    return book;
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)

}

function removeBook(bookid) {
    var books = gBooks.filter(function(book) {
        console.log(bookid, book.id)
        return book.id !== bookid
    })
    gBooks = books
    _saveBooksToStorage()
    console.log(books)
}

function addBook(name, price) {
    gBooks.push(_creatBook(name, price, "dragon.jpg"))
}

function updateBook(bookid, price) {
    var books = gBooks.map(function(book) {
        if (book.id === bookid) {
            book.price = price
        }
        return book;
    })
    gBooks = books;
    _saveBooksToStorage()
}

function renderBookModal(bookId) {
    var book = getBookById(bookId)
    console.log(book)
    var elBookModal = document.querySelector('.modal h2')
    var elImgModal = document.querySelector('.img-modal')
    var elLorem = document.querySelector('.lorem')
    elBookModal.innerText = book.name;
    elImgModal.innerHTML = `<img class="img-modal" src="img/${book.imgUrl}"></img>`;
    elLorem.style.visibility = 'visible';
    console.log(book.imgUrl)
}

function getBookById(bookId) {
    var book = gBooks.find(function(curBook) {
        return (curBook.id === bookId)
    })
    console.log(book)
    return book;
}