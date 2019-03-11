import React, { Component } from 'react';
import {
    Skeleton, Switch, Card, Icon, Avatar,
  } from 'antd';
  import { Badge } from "antd";

  const { Meta } = Card;

class CountCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Badge
            style={{ width: 70, height: 50,marginTop: 10, marginLeft: 20, backgroundColor: this.props.bgcolor}}
            count={<Icon style={{ fontSize: 40, margin:5 }} type={this.props.icon}  />}
          >
            <Card title={this.props.count} style={{ width: 400, height: 100,marginTop: 16, marginLeft: 20, textAlign: "right"}}>
            </Card>
          </Badge>
        )
    }

}

export default CountCard;