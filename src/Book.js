import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component{    

    static propTypes  = {
        info: PropTypes.object.isRequired,
        changedShelf: PropTypes.func.isRequired
    }

    onStartDrag = (e, book) => {           
        e.dataTransfer.setData("DraggedBook", JSON.stringify(book));
    }

    render(){

        const {title, imageLinks, shelf, authors } = this.props.info;
        const {changedShelf} = this.props;
        const strAuthors = authors && authors.join(", ");
        
        return(
            <div className="book" onDragStart={(e)=> this.onStartDrag(e, this.props.info)} draggable="true">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + (imageLinks ? imageLinks.smallThumbnail : '') + '")' }}></div>
                    <div className="book-shelf-changer">
                    <select value={shelf?shelf:'none'} onChange={(event)=>changedShelf(this.props.info, event.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">
                    {strAuthors}
                </div>
            </div>
        )
    }
}

export default Book;