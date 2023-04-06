import React, {Component} from 'react';
import { connect } from 'react-redux';

import axios from "axios";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

class ToDo extends Component{
    constructor(){
        super();
        this.state = {
            list: [],
            crossedOut: {},
            newItem: '',
        }
        this.onClick = this.onClick.bind(this)
        this.addNewItem = this.addNewItem.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }
    async componentDidMount(){
        const today = new Date()
        const data = (await axios.get('/api/lists')).data;
        this.setState({
            list: data,
            date: today
        })
    }
    onClick(item){
        const {crossedOut} = this.state

        if(crossedOut[item]){
            crossedOut[item] = false;
        }
        else{
            crossedOut[item] = true;
        }

        this.setState({crossedOut})
    }
    addNewItem(event){
        this.setState({newItem: event.target.value.trim()})
    }
    async deleteItem(itemID){
        await (axios.delete(`/api/lists/${itemID}`));

        const data = (await axios.get('/api/lists')).data;
        this.setState({
            list: data,
        })
    }
    async onSubmit(event){
        event.preventDefault()
        const {list, newItem, selectedDate} = this.state;

        if(newItem === ''){
            window.alert('Please enter an item')
        }
        else{
            const updatedData = (await axios.post('/api/lists', {newItem, selectedDate})).data
    
            list.push(updatedData)
    
            this.setState({
                list: list,
                newItem: '',
            })
        }

    }
    render(){
        const {list, crossedOut, newItem} = this.state;
        const {onClick, addNewItem, onSubmit, deleteItem} = this

        if(list.length === 0){
            return(
                <div className='main-box'>
                <Paper 
                elevation={5} 
                sx={{
                    minWidth: 7/10,
                    minHeight: 1,
                    maxWidth: 1,
                  }}
                >
                    <div className='toDo-Container'>
                        <h1>
                            Shopping List:
                        </h1>
                        <div className='emptyList-message'>
                            Theres nothing on your list... add something to get started!
                        </div>
                        <form>
                            <input name='newItem' value={newItem} onChange={addNewItem}></input>
                            <button onClick={onSubmit}>Add Item</button>
                        </form>
                    </div>
                </Paper>
            </div>
            )
        }


        return(
            <div className='main-box'>
                <Paper 
                elevation={3} 
                sx={{
                    minWidth: 7/10,
                    minHeight: 1,
                    maxWidth: 1,
                  }}
                >
                    <div className='toDo-Container'>
                        <h1>
                            Shopping List:
                        </h1>
                        <ul>
                            {list.map((listItem, idx) =>{
                                return(
                                    <div className='listItem'>
                                    <li key={idx} className={crossedOut[listItem.item] ? 'crossedOut' : 'notCrosssedOut'} onClick={()=>onClick(listItem.item)}>
                                        {listItem.item}
                                    </li>
                                    <button onClick={()=>deleteItem(listItem.id)}>x</button>
                                    </div>
                                )
                            })}
                        </ul>
                        <form>
                            <input name='newItem' value={newItem} onChange={addNewItem}></input>
                            <button onClick={onSubmit}>Add Item</button>
                        </form>
                    </div>
                </Paper>
            </div>
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

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ToDo)

