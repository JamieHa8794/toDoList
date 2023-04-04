import React, {Component} from 'react';
import axios from "axios";


class Home extends Component{
    constructor(){
        super();
        this.state = {
            list: [],
            crossedOut: {}
        }
        this.onClick = this.onClick.bind(this)
    }
    async componentDidMount(){
        const data = (await axios.get('/api/list')).data;
        this.setState({list: data})
        
    }
    onClick(item){
        console.log(item)
        const {crossedOut} = this.state

        if(crossedOut[item]){
            crossedOut[item] = false;
        }
        else{
            crossedOut[item] = true;
        }

        this.setState({crossedOut})
    }
    render(){
        const {list, crossedOut} = this.state;
        const {onClick} = this
        // console.log(list)
        return(
            <div className='main-box'>
                <h1>
                    Hello World
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
            </div>
        )
    }
}

export default Home;