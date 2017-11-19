import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false
  }

	componentDidMount() {
    	BooksAPI.getAll().then((books) => {
    	this.setState({ books });
     });
  }

  closeSearchPage = (state) => {
      this.setState((state) => ({
         showSearchPage: false
      }));
  }

  updateShelf = (book, bookShelf) => {
    console.log("itworked");
    	BooksAPI.update(book, bookShelf).then((books) => {
    	console.log(books);
              	BooksAPI.getAll().then((books) => {
    	this.setState({ books });
     });
          //this.setState({ books });
     });
  }


  render() {

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks books={this.state.books} onCloseSearchPage={this.closeSearchPage} updateShelf={this.updateShelf} />
       
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReading books={this.state.books} updateShelf={this.updateShelf}/>
 				<WantToRead books={this.state.books} updateShelf={this.updateShelf} />
 				<Read books={this.state.books} updateShelf={this.updateShelf} />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
