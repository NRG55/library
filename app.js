
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#checkbox-read');
const tbody = document.querySelector('.books-table');
const btnNewBook = document.querySelector('.button-add-book');
const buttonCloseForm = document.getElementById('button-close-form');
const dialogModal = document.querySelector('.modal');
const errorText = document.getElementById('error');
const titleInputValue = document.forms['form']['form-input'];

class Book {
    constructor(title, author, pages, read) {
    this.id = `book-${++Book.id}`; 
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    }
}

Book.id = 0;

let myLibrary = [
    new Book('Don Quixote', 'Miguel de Cervantes', 1072, true),
    new Book("Alice's Adventures in Wonderland", 'Lewis Carroll', 352, false),
    new Book("The Adventures of Tom Sawyer", 'Mark Twain', 168, true),
    new Book("Gulliver's Travels", 'Jonathan Swift', 336, false),
];

function addBookToLibrary() { 
    const myBook = new Book(title.value, author.value, pages.value, read.checked);   
    myLibrary.push(myBook);   
} 

function createBookHTML(book) {
    return `
        <tr>
            <td class="table-header-title">${book.title}</td>
            <td class="table-header-author">${book.author}</td>
            <td class="table-header-pages">${book.pages}</td>
            <td class="table-header-status">
               <button 
                   id="read-${book.id}" 
                   class='button-status ${book.read ? "read" : "not-read"}'>
                   ${book.read ? "read" : "not read" }
               </button>
            </td>
            <td class="table-header-remove">
               <button 
                   id="${book.id}" 
                   class="button-remove">
               </button>
            </td>
        </tr>  
    `   
}

function render() {
    const html = myLibrary.map(createBookHTML).join('');   
    tbody.innerHTML = html;    
  
    for (let i = 0; i < myLibrary.length; i++) {
        const btnDelete = document.getElementById(`${myLibrary[i].id}`);
        const btnRead = document.getElementById(`read-${myLibrary[i].id}`);
        
        btnDelete.addEventListener('click', () => {
            deleteBook(myLibrary[i]);
        });
        
        btnRead.addEventListener('click', () => {
            myLibrary[i].read = !myLibrary[i].read;
            render();           
        });        
    }
}

function deleteBook(book) {
    myLibrary = myLibrary.filter(e => e.id !== book.id)
    render();
}

function resetForm() {
    const form = document.getElementById('form');   
    form.reset();
    errorText.innerHTML = "ADD BOOK";
    errorText.classList.remove('error');          
}

function isInputValid() {    

    if (!titleInputValue.value) {         
        errorText.innerHTML = "Please enter your title";
        errorText.classList.add('error');
        document.getElementById('title').focus();         
        return false;
    }

    errorText.innerHTML = "ADD BOOK";
    errorText.classList.remove('error');       
    return true;    
}

btnNewBook.addEventListener('click', () => {    
    dialogModal.showModal();
})

dialogModal.addEventListener('submit', function(event) {
    event.preventDefault(); 

    if (!isInputValid()) {
        return;
    }

    addBookToLibrary();
    render();
    resetForm();    
    dialogModal.close();          
})

dialogModal.addEventListener('click', (event) => {
    if (event.target === dialogModal) {
        render();
        resetForm();    
        dialogModal.close();
    }
})

buttonCloseForm.addEventListener('click', () => { 
    if (!isInputValid()) {
        return;
    }

    addBookToLibrary();
    render();
    resetForm();      
    resetForm();
    dialogModal.close();     
})



render();
