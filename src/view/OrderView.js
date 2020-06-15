import React, {Component} from 'react';
import {Layout, Carousel, Row, Col, Form, Input, Checkbox, Button} from 'antd'

import { getMyOrderAllInfo, getOrderKey, getOrders} from "../services/orderService";

import Nar1 from "../components/NarBar";

import './../css/login.css'
import './../css/bookDetail.css'

import OrderList from "../components/OrderList";

import {Empty} from 'antd';
import {DatePicker} from 'antd';
import TimeSelect from "../components/TimeSelect";
import {Tabs} from 'antd';

import compareDate from "../components/CompareDate";
import UserSelfTable from "../components/UserSelfStatistic";
const {Search} = Input;
const {RangePicker} = DatePicker;
const {TabPane} = Tabs;

class MyEmpty extends Component {
    render() {
        return (
            <div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <Empty/>
            </div>
        );
    }

}

class OrderView1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            block: [],
            orderItem: [],
            showOrderItem: [],
            search: 0

        }
    }

    componentDidMount() {

        const callback = (data) => {
            this.setState({
                orderItem: data,
                showOrderItem: data,
            });
            console.log(data);
        };
        getMyOrderAllInfo(callback);

    }

    onTimeSearch = (dataString) => {
        let start = dataString[0];
        let end = dataString[1];


        let arr = [];
        this.state.orderItem.forEach(function (item) {
            let timestamp4 = new Date(item.date);
            let newTime = timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);


            let time = (newTime.split(" "))[0];

            if ((compareDate(start, time) <= 0) && (compareDate(end, time) >= 0)) {
                arr.push(item);
            }

        });

        // alert(arr.length);
        this.setState({
            showOrderItem: arr,
        })

    };

    onTimeCancel = () => {
        this.setState({
            showOrderItem: this.state.orderItem
        })
    };

    onSearch = (value) => {

        if (this.state.search == 0) {
            let arr = [];

            this.state.orderItem.forEach(
                function (item) {
                    let orderItems = item.myOrder;
                    let flag = 0;
                    orderItems.forEach(
                        function (mybook) {
                            if (mybook.book.indexOf(value) >= 0
                                // ||
                                // mybook.isbn.indexOf(value)>=0||
                                // mybook.author.indexOf(value)>0
                            ) {
                                flag = 1;
                            }
                        }
                    );

                    if (flag > 0) {
                        arr.push(item);
                    }


                    // alert(JSON.stringify(item));

                }
            );

            this.setState({
                showOrderItem: arr,
                search: 1
            })
        } else if (this.state.search == 1) {
            this.setState({
                showOrderItem: this.state.orderItem,
                search: 0
            })
        }


    };


    render() {

        return (
            <div className="background">

                <Nar1/>
                <br/><br/><br/>
                <Row>
                    <Col span={1}>

                    </Col>
                    <Col span={22}>

                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="我的订单" key="1">
                                <div className="container ">
                                    {this.state.orderItem.length > 0 ?
                                        <Row>
                                            <Col span={10}>

                                                <TimeSelect onCancel={this.onTimeCancel} onSearch={this.onTimeSearch}/>
                                            </Col>
                                            <Col span={6}>


                                                <Search
                                                    placeholder="检索包含输入书籍的订单"
                                                    enterButton={(this.state.search == 0 ? "搜索" : "取消")}
                                                    allowClear
                                                    onSearch={this.onSearch}
                                                />
                                            </Col>
                                        </Row> : null}

                                    <br/>
                                    {/*<OneOrder itemId={1}/>*/}
                                    {this.state.showOrderItem.length > 0 ? <OrderList orderItems={this.state.showOrderItem}/> :
                                        <MyEmpty/>}
                                </div>
                            </TabPane>
                            <TabPane tab="消费统计" key="2">
                                {this.state.orderItem.length > 0 ?
                                    <UserSelfTable />: null}

                                <br/>
                                {/*<OneOrder itemId={1}/>*/}
                                {this.state.showOrderItem.length > 0 ? <OrderList orderItems={this.state.showOrderItem}/> :
                                    <MyEmpty/>}

                            </TabPane>


                        </Tabs>

                    </Col>
                    <Col span={1}>
                    </Col>
                </Row>


                    <br/> <br/> <br/> <br/> <br/> <br/>
                    <br/> <br/> <br/> <br/> <br/> <br/>
                    <br/> <br/><br/>
                    <div style={{textAlign: 'center'}}>AKang Design ©2020 Created by AKang</div>
                    <br/>

            </div>

    );
    }
    }

    export default OrderView1;
