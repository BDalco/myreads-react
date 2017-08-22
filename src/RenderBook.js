import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RenderBook extends Component {

	render () {

		const shelfNames = ['currentlyReading', 'wantToRead', 'read', 'none']
		const {book, updateBooks} = this.props
		return (
	        <select
	          defaultValue={book.shelf}
	          onChange={(event) => updateBooks(event.target.value, book)}>
	          <option value='none' disabled>Move to...</option>
	          {shelfNames.map((name) => (
	            <option key={name} value={name}>{(name)}</option>
	          ))}
	        </select>
		)
	}
}

RenderBook.propTypes = {
	updateBooks: PropTypes.func.isRequired,
	shelfNames: PropTypes.array
}

export default RenderBook