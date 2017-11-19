import React from 'react'
import './App.css'
import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: []
  }

	componentDidMount() {
    	BooksAPI.getAll().then((books) => {
    	this.setState({ books });
     });
  }

  searchBooks = (query, maxResults) => {
     BooksAPI.search(query, maxResults).then((searchResults) => {

       if(searchResults.error){
       	 // there's an error do nothing
       }else{
			this.setState({ searchResults });
       }
       
     });
  }

	//this method updated the backend with the book self and updates the state again
  	updateShelf = (book, bookShelf) => {
    	BooksAPI.update(book, bookShelf).then((books) => {
        	BooksAPI.getAll().then((books) => {
              this.setState({ books });
    		 });
    	 });
	}

  	render() {
    	return (
      		<div className="app">
	  			<Route path='/search' render={() => (
       				<SearchBooks 
      					searchBooks={this.searchBooks} 
       					searchResults={this.state.searchResults}
       					updateShelf={this.updateShelf} 
       				/>
       	  	)}/>
      
			<div className="list-books">
				<div className="list-books-content">
              		<Route exact path="/" render={ () => (
						<div>
                        
                           	<div className="list-books-title">
            	  				<h1>MyReads</h1>
            				</div>
                        
                        	<div>                        
                        	  	<CurrentlyReading books={this.state.books} updateShelf={this.updateShelf}/>
                        	    <WantToRead books={this.state.books} updateShelf={this.updateShelf} />
                        	    <Read books={this.state.books} updateShelf={this.updateShelf} />
							</div>
						
						</div>
                   )}/>
            </div>
            
			<div className="open-search">
              	<Link to='search'>Add a book</Link>
            </div>

          </div>
        }
      </div>
    )
  }
}

export default BooksApp
