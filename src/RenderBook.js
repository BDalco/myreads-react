import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RenderBook extends Component {
	state = {
		shelf: ''
	}

  componentDidMount() {
	this.setState({
		shelf: this.props.shelf
	})}

	render () {
		const { book, updateBooks } = this.props;
		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks !== undefined ? book.imageLinks.thumbnail:''})`}}></div>
						<div className="book-shelf-changer">
							<select id={book.id} value={book.shelf} onChange={updateBooks}>
								<option value="none" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{book.title}</div>
					{book.authors.map((author) => (
						<div key={author} className="book-authors">{author}</div>
					))}
				</div>
			</li>
		)
	}
}
RenderBook.propTypes = {
	book: PropTypes.shape({
		id: PropTypes.string,
		imageLinks: PropTypes.object.isRequired,
		title: PropTypes.string.isRequired,
		author: PropTypes.array,
		shelf: PropTypes.string.isRequired,
	}),
	updateBooks: PropTypes.func.isRequired,
}

export default RenderBook