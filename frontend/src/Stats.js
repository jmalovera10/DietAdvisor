import React, { Component } from 'react';
import StatsChart from "./StatsChart";

/** This class contains the user stats component**/
export default class Stats extends Component{
    constructor(props) {
        super(props);

        this.state = {
            userId: props.userId,
            data:[
                /*
                {name: 'Page A', isa: 4000, pv: 2400, amt: 2400},
                {name: 'Page B', isa: 3000, pv: 1398, amt: 2210},
                {name: 'Page C', isa: 2000, pv: 9800, amt: 2290},
                {name: 'Page D', isa: 2780, pv: 3908, amt: 2000},
                {name: 'Page E', isa: 1890, pv: 4800, amt: 2181},
                {name: 'Page F', isa: 1000, pv: 3800, amt: 2500},
                {name: 'Page G', isa: 500, pv: 4300, amt: 2100},*/
                ]
        };
        this.dataCallback = this.dataCallback.bind(this);
        this.dataCallback(this.state.userId);
    }

    /**Get weights from db*/
    dataCallback(userid){
        fetch("/API/myWeight/"+userid)
            .then((res)=>{
                return (res.json());
            })
            .then((user)=>{
                let weights= user[0].weights;
                let i = 0;
                console.log(weights);
                weights.forEach((w) => {
                    let date = new Date(user[0].dates[i]*1000*60*60);
                    let format = ""+date.getDate().toString()+"/"+(date.getMonth()+1).toString()+"/"
                        +date.getFullYear().toString().replace("20","");
                    let wei = { x: format, weight: w};
                    let currState = this.state.data.slice();
                    this.setState({
                        data: currState.concat(wei)
                    });
                    i++;
                });
            })
            .catch((err) => console.log(err) );
    }

    render() {
        return (
            <div className="container-fluid center-items">
                <StatsChart data={this.state.data}/>
            </div>
        );
    }
}