import React, { Component } from 'react';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

/**Component that contains the chart*/
export default class StatsChart extends Component{
    render() {
        function formatXAxis(tickItem) {
            return moment(tickItem).format('MMM Do YY')
        }
        return (
            <div className="row justify-content-around center-items chart-content">
                <LineChart width={900} height={500} data={this.props.data}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis  dataKey="x" tickFormatter={formatXAxis}/>
                    <YAxis orientation="left" domain={["dataMin", "dataMax"]}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{r: 8}}/>
                </LineChart>
            </div>
        );
    }
}