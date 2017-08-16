import React from 'react'
import PropTypes from 'prop-types'
import RenderBook  from './RenderBook'

function BookShelf({title, books, updateBooks}) {
 	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{title}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{books.map((book) => (
					<RenderBook key={book.id} book={book} updateBooks={updateBooks} />
				))}
				</ol>
			</div>
		</div>
  	)
}

BookShelf.propTypes = {
	title: PropTypes.string.isRequired,
	books: PropTypes.array
}

export default BookShelf