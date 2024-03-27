const table = document.querySelector('table');
const tbody = document.querySelector('.books-table');
const btnNewBook = document.querySelector('.button-add-book');
const modalForm = document.querySelector('.modal');
const btnSubmitForm = document.querySelector('.btn-submit-form');
const checkboxRead = document.querySelector('#checkbox-read');
let myLibrary = [];
Book.id = 0;

const book1 = {
        id: `book-${++Book.id}`,
        title: 'Don Quixote',
        author: 'Miguel de Cervantes',
        pages: 1072,
        read: 'read'
    } 

const book2 = {
        id: `book-${++Book.id}`,
        title: "Alice's Adventures in Wonderland",
        author: 'Lewis Carroll',
        pages: 352,
        read: 'not read'
    }

const book3 = {
        id: `book-${++Book.id}`,
        title: "The Adventures of Tom Sawyer",
        author: 'Mark Twain',
        pages: 168,
        read: 'read'
    }

const book4 = {
        id: `book-${++Book.id}`,
        title: "GuLLiver's Travels",
        author: 'Jonathan Swift',
        pages: 336,
        read: 'not read'
    }

function Book(title, author, pages, read) {
    this.id = `book-${++Book.id}`; 
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {    
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#checkbox-read').value;

    const myBook = new Book(title, author, pages, read); 
   
    if (myBook.title !== '') {
        myLibrary.push(myBook);
    } else {
        myLibrary.push(book1, book2, book3, book4);       
     }    
    return;     
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
                   class='button-status ${book.read === "read" ? "read" : "not-read"}'>
                   ${book.read}
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
            myLibrary[i].read = myLibrary[i].read === 'read' ? 'not read' : 'read';
            render();           
        });        
    }
}

function deleteBook(book) {
    myLibrary = myLibrary.filter(e => e.id !== book.id)
    render();
}

function resetForm() {
    const form = document.getElementById('modal');
    checkboxRead.value = 'not read';
    form.reset();  
}

function inputValidation() {
    const value = document.forms['form']['form-input'].value;
    const errorText = document.getElementById('error');

    if (value == '' || value == null) {       
        
        errorText.innerHTML = "Please enter your title";
        errorText.classList.add('error');
        document.getElementById('title').focus();         
        return false;
    } else {
        errorText.innerHTML = "ADD BOOK";
        errorText.classList.remove('error');       
        return;
    }
}

btnNewBook.addEventListener('click', () => {    
    modalForm.showModal();
})

checkboxRead.addEventListener('click', () =>{
    if (checkboxRead.checked) {
        myLibrary.read = 'read';
        checkboxRead.value = 'read'; 
        console.log( checkboxRead.value)       
    } else {
        myLibrary.read = 'not read';
        checkboxRead.value = 'not read';
        console.log( checkboxRead.value) 
    }
})

modalForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    if (inputValidation() === false) {
        return;
    } else {   
    addBookToLibrary();
    render();
    resetForm();    
    modalForm.close();
    }      
})

addBookToLibrary();
render();