import React, {Component} from 'react';
import axios from "axios";


class Home extends Component{
    constructor(){
        super();
        this.state = {
            list: []
        }
    }
    async componentDidMount(){
        const data = (await axios.get('/api/list')).data;
        this.setState({list: data})
        
    }
    render(){
        const {list} = this.state;
        // console.log(list)
        return(
            <div className='main-box'>
                <h1>
                    Hello World
                </h1>
                <ul>
                    {list.map((listItem, idx) =>{
                        return(
                            <li key={idx}>
                                {listItem.item}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default Home;