import React, { Component } from 'react';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import { Card } from 'antd';
import '../asset/css/custom.css';
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import PieChart from '../dashboard/PieChart';
import CdrInfiniteScroll from './CdrInfiniteScroll';
import { Col, Row } from 'antd';
import store from "../stores/store.js";
import { fetchCdrCount } from "../util/APIUtils.js";
import { fetchAcctUsage } from "../util/APIUtils.js";
import IntervalSelector from '../dashboard/IntervalSelector';
import LineChart from './LineChart';

const { Header, Sider, Content } = Layout;

class Analytics extends React.Component {

    constructor(props) {
        super(props);
        this.defaultInterval = "10000";

        store.subscribe(() => {
            this.forceUpdate();
        });

        fetchCdrCount();
        fetchAcctUsage();
        this.state = {
            refreshinterval: this.defaultInterval,
            collapsed: false,

        };
        this.updateInterval = (newInterval) => {
            // Clearing previous interval
            clearInterval(this.interval);
            if (newInterval > 0) this.interval = setInterval(() => fetchCdrCount(), newInterval);
            if (newInterval > 0) this.interval = setInterval(() => fetchAcctUsage(), newInterval);
            this.setState({
                refreshinterval: newInterval
            })
        }
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => fetchCdrCount(), this.state.refreshinterval);
        this.interval = setInterval(() => fetchAcctUsage(), this.state.refreshinterval);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    handleMenuClick({ key }) {
        if (key === "logout") {
            this.props.onLogout();
        }
    }

    getCdrCount() {
        var cdrcount = store.getState().cdrcount;
        return cdrcount;
    }

    getAcctUsage() {
        var acctusages = store.getState().acctusages;
        return acctusages;
    }


    render() {

        let menuItems;

        if (this.props.currentUser) {
            menuItems = [
                <Menu.Item key="/">
                    <Link to="/dashboard">
                        <Icon type="home" className="" />
                    </Link>
                </Menu.Item>,
                <Menu.Item key="/profile" className="profile-menu">
                    <ProfileDropdownMenu
                        currentUser={this.props.currentUser}
                        handleMenuClick={this.handleMenuClick} />
                </Menu.Item>
            ];
        } else {
            menuItems = [
                <Menu.Item key="/login">
                    <Link to="/login">Login</Link>
                </Menu.Item>,
                <Menu.Item key="/signup">
                    <Link to="/signup">Signup</Link>
                </Menu.Item>
            ];
        }

        var cdrcount = this.getCdrCount();
        var acctusages = this.getAcctUsage();

        console.log(cdrcount)
        console.log(acctusages)

        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" id="logo">
                        <Link to="/">
                            <img src="/favicon.png" alt="logo" />
                            &nbsp; &nbsp;<span>CDR Dashboard</span>
                        </Link>
                    </div>
                    <Menu theme="dark" mode="inline" selectedKeys={[this.props.location.pathname]}>
                        <Menu.Item key="/dashboard">
                            <Link to="/dashboard"><Icon type="dashboard" /><span>Dashboard</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/analytics">
                            <Link to="/analytics"><Icon type="area-chart" /><span>Analytics</span></Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <Menu
                            className="app-menu"
                            mode="horizontal"
                            selectedKeys={[this.props.location.pathname]}
                            style={{ lineHeight: '64px', float: 'right' }} >
                            {menuItems}
                        </Menu>
                        <IntervalSelector updateInterval={this.updateInterval} defaultInterval={this.state.refreshinterval} />
                    </Header>
                    <Content style={{
                        margin: '24px 16px', padding: 24, background: '#fff',
                    }}
                    >
                        <div>
                            <Row>
                                <Col span={8}>
                                    <Card
                                        size="small"
                                        title="CDR Processing Status"
                                        extra={<a href="#">More</a>}
                                        style={{ width: 600, height: 600 }}
                                    >
                                        <PieChart cdrcount={cdrcount} />
                                    </Card>
                                </Col>
                                <Col span={8} offset={6}>
                                    <Card
                                        size="small"
                                        title="Account Data Usages"
                                        extra={<a href="#">More</a>}
                                        style={{ width: 600, height: 600 }}
                                    >
                                        <LineChart acctusages={acctusages} />
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}></Col>
                                <Col span={8} offset={6}></Col>
                            </Row>
                        </div>
                    </Content>
                    {/* <Footer>Footer</Footer> */}
                </Layout>
            </Layout>
        );
    }
}

function ProfileDropdownMenu(props) {
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="user-full-name-info">
                    {props.currentUser.name}
                </div>
                <div className="username-info">
                    @{props.currentUser.username}
                </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="profile" className="dropdown-item">
                <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="logout" className="dropdown-item">
                Logout
        </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>
            <a className="ant-dropdown-link">
                <Icon type="user" className="nav-icon" style={{ marginRight: 0 }} /> <Icon type="down" />
            </a>
        </Dropdown>
    );
}

export default Analytics;