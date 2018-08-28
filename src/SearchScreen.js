import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchScreen extends Component{

    state = {
        query: '',
        results: []
    }

    componentDidMount(){
    }

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        }, () => {            
            this.doSearch();
        })
    }

    doSearch = () => {
        if (this.state.query)
            BooksAPI.search(this.state.query).then((res)=>{            
                this.setState({
                    results: res.error ? [] : res
                })
            });
        else
            this.setState({
                results: []
            })
    }

    updateBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then(()=>{
            this.setState((prevState)=>({
                results: prevState.results.map(result=> {
                    if (result.id === book.id)
                        result.shelf = shelf
                    return result;
                })
            }))
        });
    }

    render(){
        return (
            <div className="search-books">
                <div className="search-books-bar">                    
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.results && this.state.results.map((book, i)=>(
                            <li key={i}>
                                <Book info={book} changedShelf={this.updateBook} />
                            </li>
                        ))}                    
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchScreen;