import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RenderBook  from './RenderBook'

class BookShelf extends Component {
 	render() {
 		const {title, showBooks} = this.props
 		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{showBooks.map((book) => (
						<li key={book.id} className='book'>
							<div className="book">
								<div className="book-top">
									<div className="book-cover">
										<img src={book.imageLinks !== undefined ? book.imageLinks.thumbnail:''} alt={book.title + ' cover'} />
									</div>
									<div className="book-shelf-changer">
										<RenderBook
						                    shelves={this.props.shelfNames}
						                    book={book}
						                    updateBooks={this.props.updateBooks}/>
									</div>
								</div>
								<div className="book-title">{book.title}</div>
								{book.authors.map((author) => (
									<div key={author} className="book-authors">{author}</div>
								))}
							</div>
						</li>
					))}
					</ol>
				</div>
			</div>
		)
  	}
}

BookShelf.propTypes = {
	title: PropTypes.string.isRequired,
	showBooks: PropTypes.array
}

export default BookShelf