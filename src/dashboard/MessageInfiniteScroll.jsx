import React from "react";
import { Table } from 'antd';
import "../asset/css/custom.css";
import { Input } from 'antd';
import 'antd/dist/antd.css';
import { fetchMessages } from "../util/APIUtils.js";
import { DatePicker } from 'antd';
const Search = Input.Search;



class MessageInfiniteScroll extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            requestSent: false,
            page: 0,
            lastPage: false,
            sort: 'id,desc',
            sortKey: 'id',
            sortOrder: 'descend',
            loading: false
        };
    }

    componentDidMount() {
        this.loadLatestMessages();
        this.interval = setInterval(() => this.loadLatestMessages(), this.props.refreshinterval);
        this.refs.iScrollTable.addEventListener("scroll", () => {
            if (
                this.refs.iScrollTable.scrollTop + this.refs.iScrollTable.clientHeight >=
                this.refs.iScrollTable.scrollHeight
            ) {
                this.loadMoreMessages();
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.refreshinterval !== this.props.refreshinterval) {
            clearInterval(this.interval);
            if (this.props.refreshinterval > 0) {
                this.interval = setInterval(() => this.loadLatestMessages(), this.props.refreshinterval);
            }
        }
    }

    loadLatestMessages(size = 100, sort = "id,desc") {

        if (this.state.requestSent) {
            return;
        }
        // Resting state
        this.setState({
            messages: [],
            requestSent: true,
            loading: true,
            page: 0,
            lastPage: false,
            sort: sort
        });

        var filterId = this.refs.id.input.input.value;
        var filterType = this.refs.type.input.input.value;
        var filterSource = this.refs.source.input.input.value;
        var filterDesc = this.refs.description.input.input.value;
      //var filterDateAdded = this.refs.dateAdded.input.input.value;
        
        var searchParam = "id="+filterId+"&type="+filterType+"&source="+filterSource+"&description="+filterDesc;
        var pageParam = "&page=0"+"&size=" + size
        var sortParam = "&sort="+sort;

        //adding dateAdded as default sort
        if(sort !== 'dateAdded,desc' || sort !== 'dateAdded,asc'){
            sortParam += "&sort=dateAdded,desc";
        }

        var reqURL = "/messages?"+searchParam + pageParam + sortParam;
        // var reqURL = "/data/messages.json";
        console.log("loadLatestMessages=>" + reqURL);
        fetchMessages(reqURL)
            .then(response => {
                this.setState({ messages: response.content })
                this.setState({ requestSent: false, page: this.state.page + 1, lastPage: response.last, loading: false })
            }).catch(err => {
                this.setState({ requestSent: false, loading: false })
                console.error(err)
            })
    }


    loadMoreMessages(page = 0, size = 100, sort = "id,desc") {

        if (this.state.requestSent) {
            return;
        }
        this.setState({ requestSent: true });
        var filterId = this.refs.id.input.input.value;
        var filterType = this.refs.type.input.input.value;
        var filterSource = this.refs.source.input.input.value;
        var filterDesc = this.refs.description.input.input.value;
      //  var filterDateAdded = this.refs.dateAdded.input.input.value;

        var searchParam = "id="+filterId+"&type="+filterType+"&source="+filterSource+"&description="+filterDesc;
        var pageParam = "&page="+this.state.page+"&size=" + size 
        var sortParam = "&sort="+this.state.sort;

        //adding dateAdded as default sort
        if(this.state.sort !== 'dateAdded,desc' || this.state.sort !== 'dateAdded,asc'){
            sortParam += "&sort=dateAdded,desc";
        }

        var reqURL = "/messages?"+searchParam + pageParam +  sortParam;
       // var reqURL = "/messages?page=" + this.state.page + "&size=" + size + "&sort=" + sort;
        console.log("loadMoreMessages=>" + reqURL);
        fetchMessages(reqURL)
            .then(response => {
                var messages = this.state.messages.concat(response.content);
                this.setState({ messages: messages })
                this.setState({ requestSent: false, page: this.state.page + 1, lastPage: response.last, loading: false, })
            }).catch(err => {
                console.error(err)
                this.setState({ requestSent: false, loading: false })
            })
    }


    handleSearchRequest(value){
      this.loadLatestMessages();
    }

    handleTableChange = (pagination, filters, sorter) => {
        if(sorter.field && sorter.order){
            this.setState({sortKey: sorter.field, sortOrder: sorter.order});
            var sortOrder = sorter.order === "ascend" ? "asc" : "desc";
            var sort = sorter.field+ ","+ sortOrder;
            this.loadLatestMessages(100, sort);
        }else{
            this.setState({sortKey: 'id', sortOrder: 'descend'});
            this.loadLatestMessages();
        }
      }

    render() {


        const columns = [
            {
              title: 'Id', width: 100, dataIndex: 'id', key: 'id', sorter: true, 
              sortOrder: this.state.sortKey === 'id' && this.state.sortOrder
            },
            {
              title: 'Message Type', width: 170, dataIndex: 'type', key: 'type',  sorter: true,
              sortOrder: this.state.sortKey === 'type' && this.state.sortOrder
            },
            {
              title: 'Source', width: 200, dataIndex: 'source', key: 'source',  sorter: true,
              sortOrder: this.state.sortKey === 'source' && this.state.sortOrder
            },
            {
              title: 'Description', dataIndex: 'description', key: 'description',  sorter: true,
              sortOrder: this.state.sortKey === 'description' && this.state.sortOrder
            },
            {
              title: 'Date Added', width: 220, dataIndex: 'dateAdded', key: 'dateAdded',  sorter: true,
              sortOrder: this.state.sortKey === 'dateAdded' && this.state.sortOrder
            }
          ];        


        return (
            <div className="wrap">
                <Table className="head" columns={columns} locale={{ emptyText: '' }}  loading={this.state.loading} onChange={this.handleTableChange}/>
                <table>
                    <tbody>
                        <tr>
                            <td width="100px" ><Search placeholder="Id" ref="id"  onSearch={value => this.handleSearchRequest(value)} /></td>
                            <td width="170px" ><Search placeholder="Message Type"  ref="type"  onSearch={value => this.handleSearchRequest(value)} /></td>
                            <td width="200px"><Search placeholder="Source" ref="source"  onSearch={value => this.handleSearchRequest(value)}  /></td>
                            <td><Search placeholder="Description"  ref="description"  onSearch={value => this.handleSearchRequest(value)} /></td>
                            <td width="220px"><DatePicker placeholder="Date Added"  ref="dateAdded"  onChange={e => this.handleSearchRequest()} /></td>
                        </tr>
                    </tbody>
                </table>
                <div ref="iScrollTable" className="inner_table">
                    <table>
                        <tbody>
                            {this.state.messages.map(message =>
                                <tr key={message.id}>
                                    <td width="100px">{message.id}</td>
                                    <td width="170px">{message.type}</td>
                                    <td width="200px">{message.source}</td>
                                    <td>{message.description}</td>
                                    <td width="220px">{message.dateAdded}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {this.state.requestSent ? <p className="loading"> loading More Messages...</p> : ""}
            </div>
        );
    }
}

export default MessageInfiniteScroll;