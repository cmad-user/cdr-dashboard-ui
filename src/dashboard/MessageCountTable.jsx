import React from "react";
import Table from "./Table.jsx";
import store from "../stores/store.js";

class MessageCountTable extends React.Component {

    constructor(props) {
        super(props);
        store.subscribe(() => {
            this.forceUpdate();
        });
    }

    getMessageCount() {
        var notificationCount = 0, errorCount = 0, warningCount = 0;
        var messagecount = store.getState().messagecount;

        messagecount.map(function (row) {
            if (row.messageType === 'Notification') {
                notificationCount = row.count;
            } else if (row.messageType === 'Error') {
                errorCount = row.count;
            } else if (row.messageType === 'Warning') {
                warningCount = row.count;
            }
        })

        const data = [
            {
                "messageType": "Notification",
                "count": notificationCount
            },
            {
                "messageType": "Warning",
                "count": warningCount
            }, {
                "messageType": "Error",
                "count": errorCount
            }
        ]

        return data;
    }

    render() {

        const columns = [{
            Header: 'Message Type',
            accessor: 'messageType' // String-based value accessors!
        }, {
            Header: 'Count',
            accessor: 'count',
        }]
        const data = this.getMessageCount();
        return (
            <div><Table columns={columns} data={data}></Table></div>
        );
    }
}

export default MessageCountTable;