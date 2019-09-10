import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// import  NotMatch from './components/not-match';
import Login from './components/login'
import Home from './components/home'
import routes from "./config/routes";

class App extends Component {
    render() {
        return <Router>
            {/*<Switch>*/}
            {/*确保/login只会进入login，而不会进入login*/}
            {/*<Route path="/" exact component={Home}/>*/}
            {/*<Route path="/login" conmponent={Login}/>*/}
            {/*</Switch>   */}
            {/*简写，遍历*/}
            {
                routes.map((route, index) => {
                    return <Route {...route} key={index}/>
                })
            }
        </Router>
    }
}

export default App;