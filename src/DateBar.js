import React, {Component} from 'react'
import { connect } from 'react-redux';

import {addDay, subtractDay, resetDay} from './store'


import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


class DateBar extends Component{
    constructor(){
        super();
        this.state = {
            date: ''
        }        
        this.addDay = this.addDay.bind(this)
        this.subtractDay = this.subtractDay.bind(this)
        this.resetDay = this.resetDay.bind(this)
    }
    addDay(){
        const {pageDate} = this.props.state
        const {addDay, history} = this.props;
        addDay(pageDate, history);

    }
    subtractDay(){
        const {pageDate} = this.props.state
        const {subtractDay, history} = this.props;
        subtractDay(pageDate, history);
    }
    resetDay(){
        const {resetDay, history} = this.props;
        resetDay(history);
    }
    render(){
        const {lists, pageDate} = this.props.state
        const {addDay, subtractDay, resetDay} = this


        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const convertDay = (1000 * 3600 * 24)
        const date = pageDate
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        // console.log(month, day, year)
        const fullDate = month + ' ' + day + ', ' + year;
        const today = new Date()


        const nextDate = new Date(Number(date))
        nextDate.setDate(date.getDate() + 1)

        const prevDate = new Date(Number(date))
        prevDate.setDate(date.getDate() - 1)

        const weekArr = [];

        for(let i = 0; i < pageDate.getDay(); i++){
            const newNextDate = new Date(Number(pageDate))
            newNextDate.setDate(pageDate.getDate() - (pageDate.getDay()-i))
            
            weekArr.push(newNextDate)
        }


        for(let i = 0; i < (7-pageDate.getDay()); i++){
            const newNextDate = new Date(Number(pageDate))
            newNextDate.setDate(pageDate.getDate() + (i))
            
            weekArr.push(newNextDate)
        }

        const weekDays = ['Sun','Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']

        return(
            <div className='main-box'>
                <h1>
                    {month}
                </h1>
                <div className='week-bar'>
                    {weekArr.map(day =>{
                        return(
                            <div className='week-bar-container'>
                                <div className='week-bar-weekDay'>
                                    {weekDays[day.getDay()]}
                                </div>
                                <div className={`week-bar-date ${day.getDate()===today.getDate() ? 'today' : ''} ${day.getDate()===pageDate.getDate() ? 'pageDate' : ''}`}>
                                    {day.getDate()}
                                </div>
                            </div>
                        )
                        
                    })}
                </div>

                <div className='dateButtons'>
                        <Button
                        disabled={false}
                        size="large"
                        variant="filledTonal"
                        startIcon={<ArrowBackIosIcon />}
                        onClick={subtractDay}
                        sx={{ width: 190 }}
                        >
                        {prevDate.toDateString()}
                        </Button>
                        <Button
                        onClick={resetDay}
                        sx={{
                            color: '#697796'
                        }}
                        >Today</Button>

                        <Button
                        disabled={false}
                        size="large"
                        variant="filledTonal"
                        endIcon={<ArrowForwardIosIcon />}
                        onClick={addDay}
                        sx={{ 
                            width: 190,
                        }}
                        >
                        {nextDate.toDateString()}
                        </Button>
                    </div>


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
       addDay: (date, history) =>{
            dispatch(addDay(date, history))
       },
       subtractDay: (date, history) =>{
            dispatch(subtractDay(date, history))
       },
       resetDay: (history) =>{
            dispatch(resetDay(history))
       }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DateBar)
