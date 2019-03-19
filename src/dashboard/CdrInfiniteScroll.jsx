import React from "react";
import { Table } from 'antd';
import "../asset/css/custom.css";
import { Input } from 'antd';
import 'antd/dist/antd.css';
import { fetchCdrs } from "../util/APIUtils.js";
import { DatePicker } from 'antd';
const Search = Input.Search;



class CdrInfiniteScroll extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cdrs: [],
            requestSent: false,
            page: 0,
            lastPage: false,
            sort: 'cdrId,desc',
            sortKey: 'cdrId',
            sortOrder: 'descend',
            loading: false
        };
    }

    componentDidMount() {
        this.loadLatestCdrs();
        this.interval = setInterval(() => this.loadLatestCdrs(), this.props.refreshinterval);
        this.refs.iScrollTable.addEventListener("scroll", () => {
            if (
                this.refs.iScrollTable.scrollTop + this.refs.iScrollTable.clientHeight >=
                this.refs.iScrollTable.scrollHeight
            ) {
                this.loadMoreCdrs();
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
                this.interval = setInterval(() => this.loadLatestCdrs(), this.props.refreshinterval);
            }
        }
    }

    loadLatestCdrs(size = 100, sort = "cdrId,desc") {

        if (this.state.requestSent) {
            return;
        }
        // Resting state
        this.setState({
            cdrs: [],
            requestSent: true,
            loading: true,
            page: 0,
            lastPage: false,
            sort: sort
        });

        // var filterId = this.refs.id.input.input.value;
        // var filterType = this.refs.type.input.input.value;
        // var filterSource = this.refs.source.input.input.value;
        // var filterDesc = this.refs.description.input.input.value;
      //var filterDateAdded = this.refs.dateAdded.input.input.value;
        
      //  var searchParam = "id="+filterId+"&type="+filterType+"&source="+filterSource+"&description="+filterDesc;
        var pageParam = "&page=0"+"&size=" + size
        var sortParam = "&sort="+sort;

        //adding dateAdded as default sort
        if(sort !== 'dateAdded,desc' || sort !== 'dateAdded,asc'){
            sortParam += "&sort=dateAdded,desc";
        }

        var reqURL = "/cdrs?" + pageParam + sortParam;
     //   var reqURL = "/cdrs?"+searchParam + pageParam + sortParam;
        // var reqURL = "/data/cdrs.json";
        console.log("loadLatestCdrs=>" + reqURL);
        fetchCdrs(reqURL)
            .then(response => {
                this.setState({ cdrs: response.content })
                this.setState({ requestSent: false, page: this.state.page + 1, lastPage: response.last, loading: false })
            }).catch(err => {
                this.setState({ requestSent: false, loading: false })
                console.error(err)
            })
    }


    loadMoreCdrs(page = 0, size = 100, sort = "cdrId,desc") {

        if (this.state.requestSent) {
            return;
        }
        this.setState({ requestSent: true });
        // var filterId = this.refs.id.input.input.value;
        // var filterType = this.refs.type.input.input.value;
        // var filterSource = this.refs.source.input.input.value;
        // var filterDesc = this.refs.description.input.input.value;
      //  var filterDateAdded = this.refs.dateAdded.input.input.value;

     //   var searchParam = "id="+filterId+"&type="+filterType+"&source="+filterSource+"&description="+filterDesc;
        var pageParam = "&page="+this.state.page+"&size=" + size 
        var sortParam = "&sort="+this.state.sort;

        //adding dateAdded as default sort
        if(this.state.sort !== 'dateAdded,desc' || this.state.sort !== 'dateAdded,asc'){
            sortParam += "&sort=dateAdded,desc";
        }

      //  var reqURL = "/cdrs?"+searchParam + pageParam +  sortParam;
      var reqURL = "/cdrs?" + pageParam +  sortParam;
       // var reqURL = "/cdrs?page=" + this.state.page + "&size=" + size + "&sort=" + sort;
        console.log("loadMoreCdrs=>" + reqURL);
        fetchCdrs(reqURL)
            .then(response => {
                var cdrs = this.state.cdrs.concat(response.content);
                this.setState({ cdrs: cdrs })
                this.setState({ requestSent: false, page: this.state.page + 1, lastPage: response.last, loading: false, })
            }).catch(err => {
                console.error(err)
                this.setState({ requestSent: false, loading: false })
            })
    }


    handleSearchRequest(value){
      this.loadLatestCdrs();
    }

    handleTableChange = (pagination, filters, sorter) => {
        if(sorter.field && sorter.order){
            this.setState({sortKey: sorter.field, sortOrder: sorter.order});
            var sortOrder = sorter.order === "ascend" ? "asc" : "desc";
            var sort = sorter.field+ ","+ sortOrder;
            this.loadLatestCdrs(100, sort);
        }else{
            this.setState({sortKey: 'cdrId', sortOrder: 'descend'});
            this.loadLatestCdrs();
        }
      }

    render() {


        const columns = [
            {
              title: 'Id', width: 100, dataIndex: 'cdrId', key: 'cdrId', sorter: true, 
              sortOrder: this.state.sortKey === 'cdrId' && this.state.sortOrder
            },
            {
                title: 'Sim Id', width: 100, dataIndex: 'simId', key: 'simId', sorter: true, 
                sortOrder: this.state.sortKey === 'simId' && this.state.sortOrder
            },
            {
            title: 'Operator Id', width: 150, dataIndex: 'operatorId', key: 'operatorId', sorter: true, 
            sortOrder: this.state.sortKey === 'operatorId' && this.state.sortOrder
            },
            {
            title: 'Acct Id', width: 150, dataIndex: 'acctId', key: 'acctId', sorter: true, 
            sortOrder: this.state.sortKey === 'acctId' && this.state.sortOrder
            },
            {
            title: 'ByteUpLink', width: 150, dataIndex: 'byteUpLink', key: 'byteUpLink', sorter: true, 
            sortOrder: this.state.sortKey === 'byteUpLink' && this.state.sortOrder
            },
            {
            title: 'ByteDownLink', width: 170, dataIndex: 'byteDownLink', key: 'byteDownLink', sorter: true, 
            sortOrder: this.state.sortKey === 'byteDownLink' && this.state.sortOrder
            },
            {
              title: 'Data Type', width: 150, dataIndex: 'dataType', key: 'dataType',  sorter: true,
              sortOrder: this.state.sortKey === 'dataType' && this.state.sortOrder
            },
            {
              title: 'RecordOpenTime', width: 180, dataIndex: 'recordOpenTime', key: 'recordOpenTime',  sorter: true,
              sortOrder: this.state.sortKey === 'recordOpenTime' && this.state.sortOrder
            },
            {
              title: 'RecordCloseTime', width: 180, dataIndex: 'recordCloseTime', key: 'recordCloseTime',  sorter: true,
              sortOrder: this.state.sortKey === 'recordCloseTime' && this.state.sortOrder
            },
            {
              title: 'Status', dataIndex: 'status', key: 'status',  sorter: true,
              sortOrder: this.state.sortKey === 'status' && this.state.sortOrder
            }
          ];        


        return (
            <div className="wrap">
                <Table className="head" columns={columns} locale={{ emptyText: '' }}  loading={this.state.loading} onChange={this.handleTableChange}/>
                <table>
                    <tbody>
                        <tr>
                            <td width="100px" ><Search placeholder="Cdr Id" ref="cdrId"  onSearch={value => this.handleSearchRequest(value)} /></td>
                            <td width="100px" ><Search placeholder="Sim Id" ref="simId"  onSearch={value => this.handleSearchRequest(value)} /></td>
                            <td width="150px" ><Search placeholder="Operator Id" ref="operatorId"  onSearch={value => this.handleSearchRequest(value)} /></td>
                            <td width="150px" ><Search placeholder="Acct Id" ref="acctId"  onSearch={value => this.handleSearchRequest(value)} /></td>
                            <td width="150px" ><Search placeholder="ByteUpLink" ref="byteUpLink"  onSearch={value => this.handleSearchRequest(value)} /></td>
                            <td width="170px" ><Search placeholder="ByteDownLink" ref="byteDownLink"  onSearch={value => this.handleSearchRequest(value)} /></td>
                            <td width="150px" ><Search placeholder="Data Type" ref="dataType"  onSearch={value => this.handleSearchRequest(value)} /></td>
                            <td width="180px" ><Search placeholder="RecordOpenTime" ref="recordOpenTime"  onSearch={value => this.handleSearchRequest(value)} /></td>
                            <td width="180px" ><Search placeholder="RecordCloseTime" ref="recordCloseTime"  onSearch={value => this.handleSearchRequest(value)} /></td>
                            <td><Search placeholder="Status" ref="status"  onSearch={value => this.handleSearchRequest(value)} /></td>
                        </tr>
                    </tbody>
                </table>
                <div ref="iScrollTable" className="inner_table">
                    <table>
                        <tbody>
                            {this.state.cdrs.map(cdr =>
                                <tr key={cdr.id}>
                                    <td width="100px">{cdr.cdrId}</td>
                                    <td width="100px">{cdr.simId}</td>
                                    <td width="150px">{cdr.operatorId}</td>
                                    <td width="150px">{cdr.acctId}</td>
                                    <td width="150px">{cdr.byteUpLink}</td>
                                    <td width="170px">{cdr.byteDownLink}</td>
                                    <td width="150px">{cdr.dataType}</td>
                                    <td width="180px">{cdr.recordOpenTime}</td>
                                    <td width="180px">{cdr.recordCloseTime}</td>
                                    <td >{cdr.status}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {this.state.requestSent ? <p className="loading"> loading More Cdrs...</p> : ""}
            </div>
        );
    }
}

export default CdrInfiniteScroll;