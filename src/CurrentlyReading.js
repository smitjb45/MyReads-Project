import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class CurrentlyReading extends Component {
  
  render(){
    
    let currentlyReading;
    console.log(this.props.books)
    const match = new RegExp(escapeRegExp("currentlyReading"), 'i');
    currentlyReading = this.props.books.filter((book) => match.test(book.shelf));
  
    return(
       <div className="bookshelf">
       		<h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
            	<ol className="books-grid">
                	{currentlyReading.map((book) => (
                    	<div key={book.id} >
							<li>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" 
      								 style={{ width: 128,
      										  height: 193, 
      										  backgroundImage: `url(${book.imageLinks.thumbnail})` 
											}}></div>
                                <div className="book-shelf-changer">
                                	<select  onClick={(event) => this.props.updateShelf(book, event.target.value)}>
                                    	<option value="none" disabled>Move to...</option>
                                    	<option value="currentlyReading">Currently Reading</option>
                                    	<option value="wantToRead">Want to Read</option>
                                    	<option value="read">Read</option>
                                    	<option value="none">None</option>
                                  	</select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors}</div>
								<div className="book-title">{book.shelf}</div>
                            </div>
                          </li>
						</div>
				))}
                        </ol>
                      </div>
                    </div>
      )
  }
}

export default CurrentlyReading