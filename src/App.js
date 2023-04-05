import React, {Component} from "react";
import { HashRouter as Router, Route } from 'react-router-dom';


import Nav from './Nav';
import Home from './Home';
import ToDo from "./ToDo";
import DateBar from "./DateBar";


class App extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <Router>
                    {/* <Route component={Nav}/> */}
                    {/* <Route component={Home}/> */}
                    <Route component={DateBar}/>
                    <Route component={ToDo}/>

            </Router>
        )
    }
}

export default App;