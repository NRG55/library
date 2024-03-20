const myLibrary = [];

function Book(title, author, pages, read) { 
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {    
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let numberOfPages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').value;    
    let newBook = new Book(title, author, numberOfPages, read);

    myLibrary.push(newBook);
    console.log(newBook);
    console.log(myLibrary);
    
}

function updateLibrary() {
    const newBookElement = document.createElement('div');
    const library = document.querySelector('.library');

    newBookElement.classList.add('new-book-element');
  
    library.appendChild(newBookElement);
    newBookElement.textContent = 'test';
    

}

// function myLibraryArrayChecker() {
    
   
//     for (let i = 0; i < myLibrary.length; i++) {
//         let bookInfo = document.createElement('div');
//         let book = myLibrary[i];
//         console.log(book);
//         console.log(bookInfo);
//         bookInfo.innerHTML = `${myLibrary[i]}`;
//         console.log(myLibrary[i]);
       
//     }
// }

let btnNewBook = document.querySelector('#btn-new-book');
btnNewBook.addEventListener('click', function() {
    let formNewBook = document.querySelector('#form-new-book');
    formNewBook.style.display = 'block';
})

let formNewBook = document.querySelector('#form-new-book');
formNewBook.addEventListener('submit', function(event) {
    event.preventDefault();
    addBookToLibrary();
    updateLibrary();
    // myLibraryArrayChecker();
})
