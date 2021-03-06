import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class SearchBooks extends Component {
	
	state = { query: '' }
  
	// methods for filering results
	updateQuery = (query) => {
		this.setState({ query: query.trim() });
	}
  
	clearQuery = () => {
    	this.setState({ query: '' });
  	}

	render(){
    
    	let searchResults;
    	searchResults = this.props.searchResults;
    	
        // if there is a search query, filter the results to that query
    	if(this.state.query){
			this.props.searchBooks(this.state.query, 20)
    	}else{
    		  searchResults = [];
    	}
    
    	return(
      		<div className="search-books">
            	<div className="search-books-bar">
              		<Link to="/" className="close-search">Close</Link>
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
				{searchResults.map((book) => (
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