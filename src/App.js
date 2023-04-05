import React, {Component} from "react";
import { HashRouter as Router, Route } from 'react-router-dom';


import Nav from './Nav';
import Home from './Home';
import ToDo from "./ToDo";


class App extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <Router>
                    {/* <Route component={Nav}/> */}
                    {/* <Route component={Home}/> */}
                    <Route component={ToDo}/>

            </Router>
        )
    }
}

export default App;