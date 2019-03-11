import React from "react";
import { Select } from 'antd';
const Option = Select.Option;

class IntervalSelector extends React.Component {
    constructor(props) {
        super(props);
        this.updateInterval = (value) => {
            this.props.updateInterval(value);
        }
    }
    
    render() {
        const intervals = {
            5000: "5 Secs",
            10000: "10 Secs",
            20000: "20 Secs",
            30000: "30 Secs",
            40000: "40 Secs",
            50000: "50 Secs",
            60000: "60 Secs"
        }

        const options = Object.keys(intervals).map(key =>
            <Option key={key} value={key}>{intervals[key]}</Option>
        )

        return (
            <div style={{ lineHeight: '64px', float: 'right' }}>
                Polling Interval &nbsp;
                <Select onChange={this.updateInterval} style={{ width: 120 }} defaultValue={this.props.defaultInterval}>
                       <Option value='-1'>Select Interval</Option>
                    {options}
                </Select>
            </div>
        );
    }
}

export default IntervalSelector;
