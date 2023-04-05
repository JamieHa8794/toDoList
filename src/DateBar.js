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
        const today = new Date()
        const month = months[today.getMonth()];
        const day = today.getDate();
        const year = today.getFullYear();
        // console.log(month, day, year)
        const fullDate = month + ' ' + day + ', ' + year;
        // const today = new Date()

        const prevDate = new Date(Number(today))
        prevDate.setDate(today.getDate() - 1)


        const weekArr = [];
   

        for(let i = 0; i < today.getDay(); i++){
            const newNextDate = new Date(Number(today))
            newNextDate.setDate(today.getDate() - (today.getDay()-i))
            
            weekArr.push(newNextDate)
        }


        for(let i = 0; i < (7-today.getDay()); i++){
            const newNextDate = new Date(Number(today))
            newNextDate.setDate(today.getDate() + (i))
            
            weekArr.push(newNextDate)
        }


        const weekDays = ['Sun','Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']

        return(
            <div className='main-box'>
                <h1>
                    Date Bar
                </h1>
                <h3>
                    {month}
                </h3>
                <div className='week-bar'>
                    {weekArr.map(day =>{
                        return(
                            <div className='week-bar-container'>
                                <div className='week-bar-weekDay'>
                                    {weekDays[day.getDay()]}
                                </div>
                                <div className='week-bar-date'>
                                    {day.getDate()}
                                </div>
                            </div>
                        )
                        
                    })}
                </div>
            </div>
        )
    }
}

export default DateBar;