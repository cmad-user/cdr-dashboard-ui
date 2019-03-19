import React from "react";
import IntervalSelector from "./IntervalSelector.jsx";
import CdrCountTable from "./CdrCountTable.jsx";
import CdrInfiniteScroll from "./CdrInfiniteScroll.jsx";
import fetchCdrCount from "../rest/ajax.js"; 

class CdrApp extends React.Component {
    constructor(props) {
        super(props);
        this.defaultInterval = 10000;
        fetchCdrCount();
        this.state = {
            refreshinterval: this.defaultInterval
        };
        this.updateInterval = (newInterval) => {
            // Clearing previous interval
            clearInterval(this.interval);
            if(newInterval > 0) this.interval = setInterval(() => fetchCdrCount(), newInterval);
            this.setState({
                refreshinterval: newInterval
            })
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => fetchCdrCount(), this.state.refreshinterval);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <IntervalSelector updateInterval={this.updateInterval} defaultInterval={this.defaultInterval}></IntervalSelector>
                <br/>
                <CdrCountTable></CdrCountTable>
                <br/>
                <br/>
                <CdrInfiniteScroll refreshinterval={this.state.refreshinterval} ></CdrInfiniteScroll>
            </div>
        );
    }
}

export default CdrApp;