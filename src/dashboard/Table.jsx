import React from "react";
import store from "../stores/store.js";

class Table extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // Data
        var columns = this.props.columns;
        var rows = this.props.data;

        var tableHeaders = (<thead>
            <tr key='tableheader'>
                {
                    columns.map(function (column) {
                        return <th key={column.Header}>{column.Header}</th>;
                    }
                    )
                }
            </tr>
        </thead>);

        var tableBody = (
            <tbody>
                {
                    rows.map(function (row, index) {
                        return <tr key={index}>
                            {
                                columns.map(function (column) {
                                    return <td key={column.accessor}>{row[column.accessor]}</td>;
                                })
                            }
                        </tr>
                    })

                }
            </tbody>);

        return (<table border="1">
            {tableHeaders}
            {tableBody}
        </table>);
    }
}

export default Table;