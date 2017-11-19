import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                  
                  
                */

class SearchBooks extends Component {
state = { query: '' }
  
  updateQuery = (query) => {
    this.setState({ query: query.trim() });
  }
  
  clearQuery = () => {
    this.setState({ query: '' });
  }


  render(){
    let allBooks = this.props.books;
    let showingBooks;
    if(this.state.query){
        const match = new RegExp(escapeRegExp(this.state.query), 'i');
        
        showingBooks = this.props.books.filter((book) => match.test(book.title));
    }else{
      showingBooks = this.props.books;
    }
    
    showingBooks.sort(sortBy('name'));
    
 
   // console.log(JSON.stringify(this.state.books, null, 2))
    
    return(
      <div className="search-books">
            <div className="search-books-bar">
              	<a className="close-search" onClick={() => {this.props.onCloseSearchPage()}} >Close</a>
              	<div className="search-books-input-wrapper">
                <input type="text" 
					   placeholder="Search by title or author"
                	   value={this.state.query}
                	   onChange={(event) => this.updateQuery(event.target.value)}
                 />
              </div>
            </div>
            <div className="search-books-results">
            <ol className="books-grid">
			{showingBooks.map((book) => (
            	<div key={book.id} >
				<li>
                	<div className="book">
                    <div className="book-top">
                    <div className="book-cover" 
						 style={{ 
                                 width: 128, 
                                 height: 193, 
                                 backgroundImage: `url(${book.imageLinks.thumbnail})` 
								}}>
					</div>
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

export default SearchBooks