import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import {DebounceInput} from 'react-debounce-input'
import PropTypes from 'prop-types'

class SearchScreen extends Component{

    state = {
        query: '',
        results: []
    }

    static propTypes = {
        onSetLoading: PropTypes.func.isRequired
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
        if (this.state.query){
            this.props.onSetLoading(true, 55);
            BooksAPI.search(this.state.query).then((res)=>{
                this.setState({
                    results: res.error ? [] : res
                }, () => {
                    this.compareBooks();
                })
            }).catch(() => {
                this.props.onSetLoading(false);
            });
        }else
            this.setState({
                results: []
            })
    }

    compareBooks = () => {
        this.props.onSetLoading(true, 55);
        BooksAPI.getAll().then((books)=>{
            const filter = books => id => books.filter(b => b.id === id)
            const filterBy = filter(books);

            this.setState(prev => ({
                results: prev.results.map(book => {
                    const bAux = filterBy(book.id);

                    if(bAux.length > 0)
                        book.shelf = bAux[0].shelf;

                    return book;
                })
            }), () => {
                this.props.onSetLoading(false);
            })
        }).catch(()=>{
            this.props.onSetLoading(false);
        })
    }


    updateBook = (book, shelf) => {
        this.props.onSetLoading(true);
        BooksAPI.update(book, shelf).then(()=>{
            this.setState((prevState)=>({
                results: prevState.results.map(result=> {
                    if (result.id === book.id)
                        result.shelf = shelf
                    return result;
                })
            }), () => {
                this.props.onSetLoading(false);
            })
        }).catch(() => {
            this.props.onSetLoading(false);
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
                        <DebounceInput
                            minLength={3}
                            debounceTimeout={450}
                            onChange={ (event) => this.updateQuery(event.target.value) }
                            placeholder="Search by title or author"
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.results && this.state.results.map((book, i)=>(
                            <li key={i}>
                                <Book info={book} shelf={book.shelf} changedShelf={this.updateBook} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchScreen;