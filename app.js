const table = document.querySelector('table');
const tbody = document.querySelector('.books-table');
const btnNewBook = document.querySelector('#btn-new-book');

const modalForm = document.querySelector('.modal');
const btnSubmitForm = document.querySelector('.btn-submit-form');
const checkboxRead = document.querySelector('#checkbox-read');
let myLibrary = [];
let myBook = {};

function Book(title, author, pages, read) {
    this.id = `book-${++Book.id}`; 
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.id = 0;

function addBookToLibrary() {    
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#checkbox-read').value;

    myBook = new Book(title, author, pages, read);   
    myLibrary.push(myBook);   
    return myBook;     
}

function createBookHTML(book) {
    return `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td><button id=read-${book.id}>${book.read}</button></td>
            <td><button id=${book.id}>x</button></td>
        </tr>  
    `   
}

function render() {
    const html = myLibrary.map(createBookHTML).join('');
    // console.log(html);
    tbody.innerHTML = html;
    // console.log(myLibrary)
    for (let i = 0; i < myLibrary.length; i++) {
        const btnDelete = document.getElementById(`${myLibrary[i].id}`);
        const btnRead = document.getElementById(`read-${myLibrary[i].id}`);
      
        btnDelete.addEventListener('click', () => {
            deleteBook(myLibrary[i]);
        });
        
        btnRead.addEventListener('click', () => {
            if (myLibrary[i].read === 'read') {
                myLibrary[i].read = 'not read';
                btnRead.textContent = 'not read';                
                render();
                console.log(myLibrary[i].read)
            } else {
                myLibrary[i].read = 'read';
                btnRead.textContent = 'read';               
                render();
                console.log(myLibrary[i].read)
            }           
        });        
    }
}

function deleteBook(book) {
    myLibrary = myLibrary.filter(e => e.id !== book.id)
    render();
}

btnNewBook.addEventListener('click', () => {   
    // modalForm.style.display = 'block';
    modalForm.showModal();
})

checkboxRead.addEventListener('click', () =>{
    if (checkboxRead.checked) {
        myLibrary.read = 'read';
        checkboxRead.value = 'read';        
    } else {
        myLibrary.read = 'not read';
        checkboxRead.value = 'not read';
    }
})

btnSubmitForm.addEventListener('click', () => {   
    // modalForm.style.display = 'none';    
    modalForm.close();
})

modalForm.addEventListener('submit', function(event) {
    event.preventDefault();    
    addBookToLibrary();
    render();    
})
