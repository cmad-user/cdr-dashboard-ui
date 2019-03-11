import React from "react";
import IntervalSelector from "./IntervalSelector.jsx";
import MessageCountTable from "./MessageCountTable.jsx";
import MessageInfiniteScroll from "./MessageInfiniteScroll.jsx";
import fetchMessageCount from "../rest/ajax.js"; 

class MessageApp extends React.Component {
    constructor(props) {
        super(props);
        this.defaultInterval = 10000;
        fetchMessageCount();
        this.state = {
            refreshinterval: this.defaultInterval
        };
        this.updateInterval = (newInterval) => {
            // Clearing previous interval
            clearInterval(this.interval);
            if(newInterval > 0) this.interval = setInterval(() => fetchMessageCount(), newInterval);
            this.setState({
                refreshinterval: newInterval
            })
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => fetchMessageCount(), this.state.refreshinterval);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <IntervalSelector updateInterval={this.updateInterval} defaultInterval={this.defaultInterval}></IntervalSelector>
                <br/>
                <MessageCountTable></MessageCountTable>
                <br/>
                <br/>
                <MessageInfiniteScroll refreshinterval={this.state.refreshinterval} ></MessageInfiniteScroll>
            </div>
        );
    }
}

export default MessageApp;