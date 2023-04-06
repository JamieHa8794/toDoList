import React, {Component} from "react";
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';


import {loading, loadLists} from './store'


import Nav from './Nav';
import Home from './Home';
import ToDo from "./ToDo";
import DateBar from "./DateBar";


class _App  extends Component{
    constructor(){
        super();
    }
    componentDidMount(){
        this.props.load();
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




const mapStateToProps = (state) =>{
    return {
        state
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        load: () =>{
           dispatch(loadLists())
           dispatch(loading())
       },
    }
}

const App = connect(mapStateToProps, mapDispatchToProps)(_App)

export default App