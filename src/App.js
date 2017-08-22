import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import BookDisplay from './BookDisplay'
import Search from './Search'

class BooksApp extends Component {
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

    updateBooks = (shelf, book) => {
        if(book.shelf !== shelf) {
            BooksAPI.update(book, shelf).then(() => {
              book.shelf = shelf
              this.setState(state => ({
                books: state.books.filter(b => b.id !== book.id).concat([ book ])
              })
            )
          })
        }
      }

    bookOnShelf = (id) => {
        let matchedBook = this.state.books.filter(book => book.id === id)
        if(matchedBook.length > 0) {
            return matchedBook[0].shelf
        }
        return 'none'
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

render() {
    return (
        <div className="app">
            <Route exact path='/' render={()=>(
                <BookDisplay
                    books={this.state.books}
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
                    updateBooks={this.updateBooks}
                /> 
          )}/>
        </div>
    )}
}

export default BooksApp
