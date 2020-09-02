import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import FrontPage from './Components/Pages/FrontPage'

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={FrontPage} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
