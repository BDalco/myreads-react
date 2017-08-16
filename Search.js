import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookListing from './BookListing'

class SearchBooks extends Component {
    state = {
        matchingBooks:[]
    }

    clearResults = () => (
        this.setState({ matchingBooks: [] })
    )

    searchBook = (query) => (
        BooksAPI.search(query).then(
            matchingBooks => {
                if (matchingBooks && (!matchingBooks.error)) {
                    for (const book of matchingBooks) {
                        const b = this.props.bookOnShelf(book)
                        book.shelf = b ? b.shelf : 'none'
                    }
                    this.setState({ matchingBooks })
                }
            }
        )
    )

    render(){
        const { matchingBooks } = this.state
        const { addBook } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className="close-search"
                        onClick={this.clearResults}>
                    >
                    Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                        type="text"
                        placeholder="Search by title or author"
                        onChange={event => this.searchBook(event.target.value)}
                        autoFocus
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <BookListing
                        books={matchingBooks}
                        addBook={addBook}
                    />
                </div>
            </div>
        )

    }
}

SearchBooks.proptypes = {
    bookOnShelf: PropTypes.func.isRequired,
    addBook: PropTypes.func.isRequired
}

export default SearchBooks