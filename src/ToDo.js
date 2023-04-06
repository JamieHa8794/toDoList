import React, {Component} from 'react';
import { connect } from 'react-redux';

import {addListItem} from './store'

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

    }
    async onSubmit(event){
        event.preventDefault()
        const {list, newItem} = this.state;
        const {lists, pageDate} = this.props.state
        const {addListItem} = this.props

        if(newItem === ''){
            window.alert('Please enter an item')
        }
        else{
            addListItem(newItem, pageDate)
            this.setState({
                newItem: '',
            })
        }

    }
    render(){
        const {crossedOut, newItem} = this.state;
        const {lists} = this.props.state
        const {onClick, addNewItem, onSubmit, deleteItem} = this

        if(lists.length === 0){
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
                            {lists.map((listItem, idx) =>{
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
        addListItem: (newItem, pageDate) =>{
            dispatch(addListItem(newItem, pageDate))
       },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ToDo)

