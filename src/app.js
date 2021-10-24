import React from 'react'
import NavBar from './components/navBar'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import Signup from "./components/signup"
import Chat from './components/userchat'
function App() {
    return (
        <BrowserRouter>
        <NavBar />
        <Switch>
            <Route exact path="/" strict component={Home} />
            <Route exact path="/login" strict component={Login} />
            <Route exact path="/signup" strict component={Signup} />
            <Route exact path="/chat" strict component={Chat} />
        </Switch>
        </BrowserRouter>
    )
}

export default App
