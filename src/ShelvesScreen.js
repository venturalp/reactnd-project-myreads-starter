import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faTrashAlt);

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
        this.props.onSetLoading(true);
        BooksAPI.getAll().then((books)=>{            
            this.setState({
                currentReading: books.filter(book=>book.shelf==="currentlyReading"),
                wantToRead: books.filter(book=> book.shelf === "wantToRead"),
                read: books.filter(book=> book.shelf === "read")
            }, () => {
                this.props.onSetLoading(false);
            })
        }).catch(()=>{
            this.props.onSetLoading(false);
        })
    }
    
    updateBook = (book, shelf) => { 
        this.props.onSetLoading(true);
        BooksAPI.update(book, shelf).then(()=>{
            this.getAllBooks();
        }).catch(()=>{
            this.props.onSetLoading(false);
        });
    }

    onDragOverTrash = (e) => {
        e.preventDefault();
    }

    onTrashBook = (e) => {
        //Retrieve the book's data from the Drag'n'drop method called earlier
        let book = JSON.parse(e.dataTransfer.getData("DraggedBook"));
        //remove the book from the shelf
        this.updateBook(book, 'None');
    }

    render(){
        return(
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                <FontAwesomeIcon icon="trash-alt" className="fa-2x icons" onDrop={(e)=>this.onTrashBook(e)}  onDragOver={(e)=>this.onDragOverTrash(e)} />
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf type="currentlyReading" title="Currently Reading" books={this.state.currentReading} onUpdateBook={this.updateBook}/>
                        <Shelf type="wantToRead" title="Want to Read" books={this.state.wantToRead} onUpdateBook={this.updateBook}/>
                        <Shelf type="read" title="Read" books={this.state.read} onUpdateBook={this.updateBook}/>
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