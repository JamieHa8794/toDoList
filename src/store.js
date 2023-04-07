import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk'

import axios from "axios";

const todaysdate = new Date();


//action constatnts
const LOADED = 'LOADED'
const LOAD_LISTS = 'LOAD_LISTS'
const SET_DATE = 'SET_DATE'
const ADD_LIST_ITEM = 'ADD_LIST_ITEM'
const REMOVE_LIST_ITEM = 'REMOVE_LIST_ITEM'
const COMPLETED_LIST_ITEM = 'COMPLETED_LIST_ITEM'

//reducers

const loadReducers = (state = true, action)=>{
    if(action.type === LOADED){
        state = false
    }
    return state;
}

const listsReducers = (state = [], action) =>{
    if(action.type === LOAD_LISTS){
        state = action.lists
    }
    if(action.type === ADD_LIST_ITEM){
        state = [...state, action.listItem]
    }
    if(action.type === REMOVE_LIST_ITEM){
        state = state.filter(listItem => listItem.id !== action.listItem.id);
    }
    if(action.type === COMPLETED_LIST_ITEM){
        state = state.map(listItem => listItem.id !== action.listItem.id ? listItem : action.listItem)
    }
    return state;
}

const pageReducers = (state = todaysdate, action) =>{
    if(action.type === SET_DATE){
        state = action.date
    }
    return state;
}



const reducer = combineReducers({
    loading: loadReducers,
    lists: listsReducers,
    pageDate: pageReducers,

})


const store = createStore(reducer, applyMiddleware(thunk))


//action creators
const _loading = () =>{
    return {
        type: LOADED
    }
}

const _loadLists = (lists) =>{
    return{
        type: LOAD_LISTS,
        lists
    }
}

const _setDate = (date) =>{
    return {
        type: SET_DATE,
        date
    }
}

const _addListItem = (listItem) =>{
    return {
        type: ADD_LIST_ITEM,
        listItem
    }
}

const _removeListItem = (listItem) =>{
    return {
        type: REMOVE_LIST_ITEM,
        listItem
    }
}

const _completedListItem = (listItem) =>{
    return {
        type: COMPLETED_LIST_ITEM,
        listItem
    }
}


//thunks
const loading = () =>{
    return (dispatch) =>{
        dispatch(_loading())
    }
}

const loadLists = () =>{
    return async (dispatch)=>{
        const lists = (await axios.get('/api/lists')).data
        dispatch(_loadLists(lists))
    }
}

const addDay = (date, history) =>{
    return (dispatch) =>{
        const copy = new Date(Number(date))
        copy.setDate(date.getDate() + 1)
        dispatch(_setDate(copy))
    }
}

const subtractDay = (date, history) =>{
    return (dispatch) =>{
        const copy = new Date(Number(date))
        copy.setDate(date.getDate() - 1)
        dispatch(_setDate(copy))
    }
}

const resetDay = (history) =>{
    return (dispatch) =>{
        const today = new Date();
        dispatch(_setDate(today))
    }
}


const addListItem = (newItem, pageDate) =>{
    return async (dispatch) =>{
        const listItem = (await axios.post('/api/lists', {newItem, pageDate})).data;
        dispatch(_addListItem(listItem));
    }
}

const removeListItem = (listItem) =>{
    return async (dispatch) =>{
        await (axios.delete(`/api/lists/${listItem.id}`));
        dispatch(_removeListItem(listItem))
    }
}

//change between completed and not completed
const completedListItem = (listItem, completed) =>{
    return async (dispatch) =>{
        const _listItem =  (await (axios.put(`/api/lists/${listItem.id}`, {completed}))).data;
        console.log(_listItem)
        dispatch(_completedListItem(_listItem))
    }
}

export default store;
export {loading, loadLists, addDay, subtractDay, resetDay, addListItem, removeListItem, completedListItem}