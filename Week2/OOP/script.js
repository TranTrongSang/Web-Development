class Book {
    constructor(title, author, isbn, availableCopies) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.availableCopies = availableCopies;
    }

    borrowBook() {
        if (this.availableCopies > 0) {
            this.availableCopies -= 1; 
        } else {
            throw new Error(`No copies of "${this.title}" available.`);
        }
    }

    returnBook() {
        this.availableCopies += 1; 
    }
}

class User {
    constructor(name, userType) {
        if (this.constructor === User) {
            throw new Error("Cannot instantiate abstract class User");
        }
        this.name = name;
        this.userType = userType;
        this.borrowedBooks = [];
    }

    borrow(book) {
        throw new Error("Abstract method 'borrow' must be implemented");
    }

    return(book) {
        const index = this.borrowedBooks.indexOf(book);
        if (index > -1) {
            this.borrowedBooks.splice(index, 1);
            book.returnBook(); 
        } else {
            throw new Error(`"${this.name}" has not borrowed "${book.title}".`);
        }
    }
}

class Student extends User {
    constructor(name) {
        super(name, "Student");
    }

    borrow(book) {
        if (this.borrowedBooks.length >= 3) {
            throw new Error("Student cannot borrow more than 3 books at a time.");
        }
        book.borrowBook(); 
        this.borrowedBooks.push(book);
    }
}

class Teacher extends User {
    constructor(name) {
        super(name, "Teacher");
    }

    borrow(book) {
        if (this.borrowedBooks.length >= 5) {
            throw new Error("Teacher cannot borrow more than 5 books at a time.");
        }
        book.borrowBook(); 
        this.borrowedBooks.push(book);
    }
}

class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }

    addBook(book) {
        const existingBook = this.books.find(b => b.isbn === book.isbn);
        if (existingBook) {
            this.updateMessage(`The book "${book.title}" already exists in the library.`);
            return; 
        }
        
        this.books.push(book);
        this.updateBookList();
        this.updateBooksSelect();
        this.updateMessage(`Added "${book.title}" to the library.`);
    }

    addUser(user) {
        this.users.push(user);
        this.updateUserList();
    }

    borrowBook(user, book) {
        user.borrow(book); 
        this.updateMessage(`${user.name} borrowed "${book.title}".`);
    }

    returnBook(user, book) {
        user.return(book);
        this.updateMessage(`${user.name} returned "${book.title}".`);
    }

    listAvailableBooks() {
        return this.books.filter(book => book.availableCopies > 0);
    }

    updateBookList() {
        const bookList = document.getElementById('book-list');
        bookList.innerHTML = '';
        this.books.forEach(book => {
            const li = document.createElement('li');
            li.textContent = `${book.title} by ${book.author} (ISBN: ${book.isbn}) - Available Copies: ${book.availableCopies}`;
            bookList.appendChild(li);
        });
    }

    updateUserList() {
        const userSelect = document.getElementById('users-select');
        userSelect.innerHTML = '';
        this.users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.name;
            option.textContent = `${user.name} (${user.userType})`;
            userSelect.appendChild(option);
        });
    }

    updateBooksSelect() {
        const booksSelect = document.getElementById('books-select');
        booksSelect.innerHTML = ''; 

        
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '-Choose book-';
        booksSelect.appendChild(defaultOption);

        this.books.forEach(book => {
            const option = document.createElement('option');
            option.value = book.title;
            option.textContent = `${book.title} (Available: ${book.availableCopies})`; 
            booksSelect.appendChild(option);
        });
    }

    updateMessage(message) {
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = message;
    }
}


const library = new Library();


document.getElementById('add-book').addEventListener('click', () => {
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const isbn = document.getElementById('book-isbn').value;
    const availableCopies = parseInt(document.getElementById('book-copies').value);

    const newBook = new Book(title, author, isbn, availableCopies);
    library.addBook(newBook);

    document.getElementById('book-title').value = '';
    document.getElementById('book-author').value = '';
    document.getElementById('book-isbn').value = '';
    document.getElementById('book-copies').value = '';
});

document.getElementById('add-user').addEventListener('click', () => {
    const name = document.getElementById('user-name').value;
    const userType = document.getElementById('user-type').value;

    let newUser;
    if (userType === 'Student') {
        newUser = new Student(name);
    } else {
        newUser = new Teacher(name);
    }
    library.addUser(newUser);
    document.getElementById('user-name').value = '';
});

document.getElementById('borrow-book').addEventListener('click', () => {
    const userName = document.getElementById('users-select').value;
    const bookTitle = document.getElementById('books-select').value;

    const user = library.users.find(u => u.name === userName);
    const book = library.books.find(b => b.title === bookTitle);

    if (bookTitle === '') {
        library.updateMessage('Please choose a book to borrow.');
        return;
    }

    try {
        library.borrowBook(user, book);
        library.updateBooksSelect(); // Update lists of books
    } catch (error) {
        library.updateMessage(error.message);
    }
});

document.getElementById('return-book').addEventListener('click', () => {
    const userName = document.getElementById('users-select').value;
    const bookTitle = document.getElementById('books-select').value;

    const user = library.users.find(u => u.name === userName);
    const book = library.books.find(b => b.title === bookTitle);

   
    if (bookTitle === '') {
        library.updateMessage('Please choose a book to return.');
        return;
    }

    try {
        library.returnBook(user, book);
        library.updateBooksSelect(); 
    } catch (error) {
        library.updateMessage(error.message);
    }
});

// Populate book select for borrowing/returning
const booksSelect = document.getElementById('books-select');
library.updateBooksSelect();

