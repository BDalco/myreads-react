import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class SearchBooks extends Component {
    state = {
        showBooks:[],
        query: ''
    }

    clearResults = () => (
        this.setState({ showBooks: [] })
    )

    handleQuery = (query) => {
        this.setState({query: query})
        setTimeout(() =>this.searchBook(query), 200)
    }

    searchBook = (query) => {
        let updatedShelfBooks = []

        BooksAPI.search(query).then().then((books) => {
            if(books && Array.isArray(books)) {
                updatedShelfBooks = books.map(book => {
                    book.shelf = this.props.bookOnShelf(book.id)
                    return book
                })

                this.setState({showBooks: updatedShelfBooks})
            }
            else {
                this.setState({showBooks: []})
            }
        }
    )}

    render(){
        const { showBooks } = this.state

        return (
            <div className='search-books'>
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
                            className="search-books"
                            type="text"
                            placeholder="Search Books"
                            value={this.state.query}
                            onChange={(event) => this.handleQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {showBooks && showBooks.length > 0 && (
                        <BookShelf
                            showBooks={showBooks}
                            title='Search Results'
                            updateBooks={this.props.updateBooks}/>
                    )}
                </div>
            </div>
        )

    }
}

SearchBooks.proptypes = {
    updateBooks: PropTypes.func.isRequired,
    showBooks: PropTypes.array
}

export default SearchBooks