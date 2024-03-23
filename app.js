const myBooks = document.querySelector('.books-container');
const btnNewBook = document.querySelector('#btn-new-book');
const modalForm = document.querySelector('.modal');
const btnSubmitForm = document.querySelector('.btn-submit-form');
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
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').value; 

    myBook = new Book(title, author, pages, read);
    myLibrary.push(myBook);
    console.log(myBook);
    console.log(myLibrary); 
    return myBook;     
}

function createBookElement(el, info, className) {
    if (el === 'input') {
        const read = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');        
        read.setAttribute('class', className);       
        input.type = 'checkbox';       
        label.textContent = info;
        console.log(label);
        read.appendChild(label);
        read.appendChild(input);
        read.addEventListener('click', (e) => {
            if (e.target.checked) {
                input.setAttribute('class', 'read-checked');
                myBook.read = true;                
            } else {
                input.setAttribute('class', 'read-unchecked');
                myBook.read = false;             
            }            
        })        
        return read;         
        } else {
            const bookElement = document.createElement(el);
            bookElement.textContent = info;
            console.log(info)
            bookElement.setAttribute('class', className);
            return bookElement;
        }    
}

function createBookUnit(book, index) {
    const bookUnit = document.createElement('div');  

    bookUnit.setAttribute('id', index);
    bookUnit.setAttribute('class', 'book book-div');
    bookUnit.appendChild(createBookElement('div', 'Title:' + '\r\n' + `${book.title}`, 'book book-title'));
    bookUnit.appendChild(createBookElement('div', 'Author:' + '\r\n' + `${book.author}`, 'book book-author'));
    bookUnit.appendChild(createBookElement('div', 'Pages:' + '\r\n' + `${book.pages}`, 'book book-pages'));
    bookUnit.appendChild(createBookElement('input', `Read: ${book.read}`, 'book read'));
    bookUnit.appendChild(createBookElement('button', 'X', 'btn-delete'));

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
    modalForm.style.display = 'block';
})

btnSubmitForm.addEventListener('click', function() {   
    modalForm.style.display = 'none';
})

modalForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addBookToLibrary();
    updateLibrary();  
    console.log(myBook.title);      
})
