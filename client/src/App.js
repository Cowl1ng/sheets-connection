import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Importing pages
import FrontPage from './Components/Pages/FrontPage'

// Importing conntext
import ResponseState from './context/ResponseState'

const App = () => {
  return (
    <div>
      <ResponseState>
        <Router>
          <Switch>
            <Route exact path='/' component={FrontPage} />
          </Switch>
        </Router>
      </ResponseState>
    </div>
  )
}

export default App
