import React, {Component} from 'react'


class DateBar extends Component{
    constructor(){
        super();
        this.state = {
            date: ''
        }
        
    }
    render(){
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const convertDay = (1000 * 3600 * 24)
        const date = new Date()
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


        console.log('prevDate', prevDate)
        console.log('today', today)
        console.log('nextDate', nextDate)


        return(
            <div className='main-box'>
                <h1>
                    Date Bar
                </h1>
            </div>
        )
    }
}

export default DateBar;