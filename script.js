const content = document.querySelector('div.content');
const addBook = document.querySelector('button.add');
const formContainer = document.querySelector('form.form-container');
const submit = document.querySelector('button.submit');
const fields = document.querySelectorAll('input.field');
const errors = document.querySelectorAll('p.error')
const cancel = document.querySelector('button.cancel');
const ul = document.querySelector('ul');

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
        this.toggleRead = this.toggleRead.bind(this);
    }
}

Book.prototype.toggleRead = function() { 
    if (this.read == true) { this.read = false; }
    else { this.read = true; }
}

let library = [];

//populate book list
appendBooks(library);

addBook.addEventListener('click', function(e) {
    formContainer.removeAttribute('hidden');
})

submit.addEventListener('click', function(e) {
    //checks form for errors
    let errorCount = 0
    for (x = 0; x < fields.length; x++) {
        if (fields[x]["value"] == '' || fields[x]["value"] == null) {
            //error
            let error = errors[x];
            error.removeAttribute('hidden');
            errorCount++;
        }
    }
    if (errorCount == 0) {
        //converts read value to bool
        let readValue
        if (formContainer.read.value == 'true') {
            readValue = true
        }
        else {readValue = false}

        //creates book
        let book = new Book(formContainer.title.value, formContainer.author.value, formContainer.pages.value, readValue)
        library.push(book);
        appendBooks(library);
        resetForm();
    }
})

cancel.addEventListener('click', function(e) {
    resetForm();
})

function resetForm() {
    formContainer.setAttribute('hidden', 'true')
    formContainer.reset();
}

function appendBooks(library) {
    //removes old items
    let child = ul.lastElementChild;  
    while (child) { 
        ul.removeChild(child); 
        child = ul.lastElementChild; 
    }

    //adds all library books
    for (x=0; x<library.length; x++) {
        let li = document.createElement('li');
        li.setAttribute('id', library[x]['title']);
        li.textContent = bookFormat(library[x]);
        deleteButton(li, library[x], x)
        readButton(li, library[x])
        ul.appendChild(li);
    }
}

//format books for display
function bookFormat(book) {
    if (book['read'] == false) {
        return book['title'] + " by " + book['author']
         + ", " + book['pages'] + " pages, not read yet";
    }
    else {
        return book['title'] + " by " + book['author'] 
        + ", " + book['pages'] + " pages, read";
    }
}

//add delete button for book
function deleteButton(li, book, index) {
    let button = document.createElement('button');
        button.setAttribute('id', 'delete-' + book.title);
        button.textContent = 'Delete'
        button.addEventListener('click', (e) => {
            //delete book
            library.splice(index, 1);
            document.querySelector('ul').removeChild(document.getElementById(book['title']));
        })
        li.appendChild(button);
}

//add read button for book
function readButton(li, book) {
    let button = document.createElement('button');
    button.setAttribute('id', 'read-' + book.title);
    button.textContent = 'Read/Unread'
    button.addEventListener('click', (e) => {
        book.toggleRead();
        appendBooks(library);
    })
    li.appendChild(button);
}