import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class BookDisplay extends Component {
	render() {
		const {currentlyReadingBooks, wantToReadBooks, readBooks, updateBooks} = this.props;

		return (
			<div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf 
                            title='Currently Reading' 
                            showBooks={currentlyReadingBooks} 
                            updateBooks={updateBooks} 
                        />
                        <BookShelf 
                            title='Want to Read' 
                            showBooks={wantToReadBooks} 
                            updateBooks={updateBooks} 
                        />
                        <BookShelf 
                            title='Read' 
                            showBooks={readBooks} 
                            updateBooks={updateBooks} 
                        />
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
		)
	}
}

BookDisplay.propTypes = {
	currentlyReadingBooks: PropTypes.array.isRequired,
	wantToReadBooks: PropTypes.array.isRequired,
	readBooks: PropTypes.array.isRequired,
	updateBooks: PropTypes.func.isRequired
}

export default BookDisplay


