import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchScreen from './SearchScreen'
import ShelvesScreen from './ShelvesScreen'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {}

  render() {
    return (
      <div className="app">
        <Route path="/search" render={()=>(
          <SearchScreen />
        )}>
        </Route>
        <Route path="/" exact render={() => (
          <ShelvesScreen />
          )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
