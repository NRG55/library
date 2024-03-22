const myBooks = document.querySelector('.books-container');
const btnNewBook = document.querySelector('#btn-new-book');
const formNewBook = document.querySelector('#form-new-book');
const myLibrary = [];
let myBook = {};

function Book(title, author, pages, read) { 
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
}

function addBookToLibrary() {    
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let numberOfPages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').value; 

    myBook = new Book(title, author, numberOfPages, read);
    myLibrary.push(myBook);
    console.log(myBook);
    console.log(myLibrary); 
    return myBook;     
}

function createBookElement(el, info, className) {
    if (el === 'input') {
        const read = document.createElement('input');       
        read.type = 'checkbox';
        read.addEventListener('click', (e) => {
            if (e.target.checked) {
                read.setAttribute('class', 'read-checked');
                myBook.read = true;               
                // libraryArrayChecker();
            } else {
                read.setAttribute('class', 'read-unchecked');
                myBook.read = false;
                // libraryArrayChecker();
            }            
        })  
        return read;         
        } else {
            const bookElement = document.createElement(el);
            bookElement.textContent = info;
            bookElement.setAttribute('class', className);
            return bookElement;
        }    
}

function createBookUnit(book, index) {
    const bookUnit = document.createElement('div');  

    bookUnit.setAttribute('id', index);
    bookUnit.setAttribute('class', 'book book-div');
    bookUnit.appendChild(createBookElement('div', `Title: ${book.title}`, 'book-title'));
    bookUnit.appendChild(createBookElement('div', `Author: ${book.author}`, 'book-author'));
    bookUnit.appendChild(createBookElement('div', `Pages: ${book.pages}`, 'book-pages'));
    bookUnit.appendChild(createBookElement('input', `Read: ${book.read}`, 'read'));
    bookUnit.appendChild(createBookElement('button','X', 'btn-delete'));

    const btnDelete = bookUnit.querySelector('.btn-delete');
    btnDelete.addEventListener('click', () => {
        myLibrary.splice(index, 1);
        updateLibrary();
    }); 

    myBooks.insertAdjacentElement('afterbegin', bookUnit);
}    

function updateLibrary() {
    myBooks.textContent = '';
    myLibrary.map((book, index) => {
        createBookUnit(book, index)
    })
}

btnNewBook.addEventListener('click', function() {
    let formNewBook = document.querySelector('#form-new-book');
    formNewBook.style.display = 'block';
})


formNewBook.addEventListener('submit', function(event) {
    event.preventDefault();
    addBookToLibrary();
    updateLibrary();
  
    console.log(myBook.title);      
})
