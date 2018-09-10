import React from 'react'
import ReactDOM, { render } from 'react-dom'
import App from './App'
import ShelvesScreen from './ShelvesScreen'
import SearchScreen from './SearchScreen'

describe('Testing App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })
})