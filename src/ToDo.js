import React, {Component} from 'react';
import { connect } from 'react-redux';

import {addListItem, removeListItem, completedListItem} from './store'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

class ToDo extends Component{
    constructor(){
        super();
        this.state = {
            list: [],
            newItem: '',
        }
        this.onClick = this.onClick.bind(this)
        this.addNewItem = this.addNewItem.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }
    onClick(listItem){
        const {completedListItem} = this.props

        if(listItem.completed){
            completedListItem(listItem, false)
        }
        else{
            completedListItem(listItem, true)
        }

    }
    addNewItem(event){
        this.setState({newItem: event.target.value})
    }
    deleteItem(listItem){
        const {removeListItem} = this.props;
        removeListItem(listItem);

    }
    onSubmit(event){
        event.preventDefault()
        const {newItem} = this.state;
        const {pageDate} = this.props.state
        const {addListItem} = this.props


        if(newItem.trim() === ''){
            window.alert('Please enter an item')
        }
        else{
            addListItem(newItem, pageDate.toDateString())
            this.setState({
                newItem: '',
            })
        }

    }
    render(){
        const {crossedOut, newItem} = this.state;
        const {lists, pageDate} = this.props.state
        const {onClick, addNewItem, onSubmit, deleteItem} = this

        let pageList

        if(lists.length  > 0){
            pageList = lists.filter(listItem => listItem.date === pageDate.toDateString())
        }

        if(lists.length === 0 || pageList.length === 0){
            return(
                <div className='main-box'>
                <Paper 
                elevation={5} 
                sx={{
                    minWidth: 6/10,
                    minHeight: 1,
                    maxWidth: 1,
                  }}
                >
                    <div className='toDo-Container'>
                        <h1>
                            To Do:
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
                    minWidth: 6/10,
                    minHeight: 1,
                    maxWidth: 1,
                  }}
                >
                    <div className='toDo-Container'>
                        <h1>
                            To Do:
                        </h1>
                        <ul>
                            {pageList.map((listItem, idx) =>{
                                return(
                                    <div className='listItem'>
                                    <li key={idx} className={listItem.completed ? 'crossedOut' : 'notCrosssedOut'} onClick={()=>onClick(listItem)}>
                                        {listItem.item}
                                    </li>
                                    <button onClick={()=>deleteItem(listItem)}>x</button>
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
       removeListItem: (listItem) =>{
            dispatch(removeListItem(listItem))
        },
        completedListItem: (listItem, completed) =>{
            dispatch(completedListItem(listItem, completed))
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ToDo)

