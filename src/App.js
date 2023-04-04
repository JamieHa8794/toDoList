import React, {Component} from "react";
import { HashRouter as Router, Route } from 'react-router-dom';


import Nav from './Nav';
import Home from './Home';
import ToDoList from "./toDoList";


class App extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <Router>
                    {/* <Route component={Nav}/> */}
                    <Route component={Home}/>
                    <Route component={ToDoList}/>

            </Router>
        )
    }
}

export default App;