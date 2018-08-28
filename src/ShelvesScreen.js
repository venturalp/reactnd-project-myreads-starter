import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'

class ShelfScreen extends Component{

    state = {
        currentReading: [],
        wantToRead: [],
        read: []
    }

    componentDidMount = () => {
        this.getAllBooks();
    }

    getAllBooks = () => {
        BooksAPI.getAll().then((books)=>{            
            this.setState({
                currentReading: books.filter(book=>book.shelf==="currentlyReading"),
                wantToRead: books.filter(book=> book.shelf === "wantToRead"),
                read: books.filter(book=> book.shelf === "read")
            })            
        })
    }
    
    updateBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then(()=>{
            this.getAllBooks();
        });
    }

    render(){
        return(
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf title="Currently Reading" books={this.state.currentReading} onUpdateBook={this.updateBook}/>
                        <Shelf title="Want to Read" books={this.state.wantToRead} onUpdateBook={this.updateBook}/>
                        <Shelf title="Read" books={this.state.read} onUpdateBook={this.updateBook}/>
                    </div>
                </div>
                <div className="open-search">              
                <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ShelfScreen;