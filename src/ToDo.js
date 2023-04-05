import React, {Component} from 'react';
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

    }
    async componentDidMount(){
        const data = (await axios.get('/api/list')).data;
        this.setState({list: data})
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
        this.setState({newItem: event.target.value})
    }
    async onSubmit(event){
        event.preventDefault()
        const {newItem} = this.state;
        const newlyAddedItem = (await axios.post('/api/list', {newItem})).data

        const data = (await axios.get('/api/list')).data;
        this.setState({
            list: data,
            newItem: '',
        })
    }
    render(){
        const {list, crossedOut, newItem} = this.state;
        const {onClick, addNewItem, onSubmit} = this
        return(
            <div className='main-box'>
                <Paper 
                elevation={3} 
                // sx={{
                //     minWidth: 300,
                //     minHeight: 300,

                //   }}
                >
                    <div className='toDo-Container'>
                        <h1>
                            Shopping List:
                        </h1>
                        <ul>
                            {list.map((listItem, idx) =>{
                                return(
                                    <li key={idx} className={crossedOut[listItem.item] ? 'crossedOut' : 'notCrosssedOut'} onClick={()=>onClick(listItem.item)}>
                                        {listItem.item}
                                    </li>
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

export default ToDo;