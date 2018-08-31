import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchScreen from './SearchScreen'
import ShelvesScreen from './ShelvesScreen'
import Loading from './Loading'
import './App.css'

class BooksApp extends Component {
  state = {
    loading: false
  }

  setLoading = (flag, marginTop) => {
    this.setState({
      loading: flag,
      marginTop
    });
  }

  render() {
    return (
      <div className="app">
        {/* if any of the screens are on loading/request then it shows the loading component */}
        {this.state.loading && <Loading marginTop={this.state.marginTop} />}
        <Route path="/search" render={()=>(
          <SearchScreen onSetLoading={this.setLoading} />
        )}>
        </Route>
        <Route path="/" exact render={() => (
          <ShelvesScreen onSetLoading={this.setLoading}/>
          )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
