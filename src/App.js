import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import BookDisplay from './BookDisplay'
import Search from './Search'

class BooksApp extends React.Component {
    state = {
        books: []
    }

    getBooks = () => {
        BooksAPI.getAll().then(
            books => this.setState({ books })
        )
    }

    componentDidMount() {
        this.getBooks()
    }

    updateBooks = (book) => {
        BooksAPI.update({id: book.target.id}, book.target.value).then((book) => {
             this.getBooks()
        });
    }

    getCurrentlyReadingBooks = () => {
        return this.state.books.filter((book) => {
            return book.shelf === 'currentlyReading';
        });
    }

    getWantToReadBooks = () => {
        return this.state.books.filter((book) => {
            return book.shelf === 'wantToRead';
        });
    }

    getReadBooks = () => {
        return this.state.books.filter((book) => {
            return book.shelf === 'read';
        });
    }

    addBook = (book,shelf) => {
        BooksAPI.update(book,shelf).then(()=>
          this.getBooks()  
        )
    }

    bookOnShelf = (book) => {
        for (const b of this.state.books) {
            if (b.id === book.id)
                return b
            }
    }

render() {
    return (
        <div className="app">
            <Route exact path='/' render={()=>(
                <BookDisplay
                    currentlyReadingBooks={this.getCurrentlyReadingBooks()}
                    wantToReadBooks={this.getWantToReadBooks()}
                    readBooks={this.getReadBooks()}
                    updateBooks={this.updateBooks}
                />
            )}
            />
            <Route path='/search' render={()=>(
                <Search
                    bookOnShelf={this.bookOnShelf}
                    addBook={this.addBook}
                /> 
          )}/>
        </div>
    )}
}

export default BooksApp
