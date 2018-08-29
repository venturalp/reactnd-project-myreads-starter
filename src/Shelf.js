import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class Shelf extends Component{
    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array
    } 
    
    onDropBook = (e) => {        
        let book = JSON.parse(e.dataTransfer.getData("DraggedBook"));        
        this.props.onUpdateBook(book, this.props.type);
    }

    onDragOver = (e) => {
        e.preventDefault();
    }

    render(){
        const {title, books} = this.props;

        return(
            <div className="bookshelf" onDrop={(e)=>this.onDropBook(e)} onDragOver={(e)=>this.onDragOver(e)} >
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book, i)=>(
                            <li key={i}>
                                <Book info={book} changedShelf={this.props.onUpdateBook} />
                            </li>
                        ))}                    
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf