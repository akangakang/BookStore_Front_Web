import TimeSelect from "./TimeSelect";
import MyPieSlice from "./SliderChart";
import React, {Component} from "react";
import {myBookSale, getBooksForStatistic} from "../services/statisticsService";
import {getAllUserForStatistic} from "../services/userService";
import compareDate from "./CompareDate";
import {Col, Row, Table} from "antd";
import NumTag from "./NumTag";
import ConsumeTag from "./ConsumeTag"
class UserSelfTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rawData: [],
            allBookInfo: [],
            allOrderItem: [],
            sortedData: [],

            showData: [],

            bookNum: 0, //记录购书总本书
            allPrice: 0.0,//记录购书总金额
        };
    }

    compare(property) {
        return function (a, b) {
            let value1 = a[property];
            let value2 = b[property];
            return value2 - value1;
        }
    }

    componentDidMount() {
        const callbackForAllBookInfo = (data) => {

            this.setState({
                allBookInfo: data,
            });
            myBookSale(callbackForAllMyOrderItem);
        };
        const callbackForAllMyOrderItem = (data) => {

            this.setState({allOrderItem: data});

            //计算出从一开始到现在的自己购买书籍的情况（每种书购买了多少本）
            let newData = this.state.allBookInfo;
            this.state.allOrderItem.forEach((orderItem) => {
                let bookId = orderItem.bookId;
                let number = orderItem.number;
                let price = orderItem.price;
                let index = this.state.allBookInfo.findIndex((item) => {
                    return item.bookId === bookId
                });

                this.setState({
                    allPrice: this.state.allPrice + price * number,
                    bookNum: this.state.bookNum + number,
                });
                if (index >= 0) {
                    newData[index].number += number;
                }

            });


            this.setState({allBookInfo: newData});
            this.setState({rawData: newData});


            let data1 = [];
            this.state.allBookInfo.forEach((item) => {
                if (item.number > 0) {
                    data1.push(item);
                }
            });

            this.setState({
                showData: data1,
            });
            this.state.showData.sort(compareDate('number'));

            if (this.state.showData.length > 5) {
                this.setState({
                    sortedData: this.state.showData.slice(0, 5)
                });
            } else {
                this.setState({
                    sortedData: this.state.showData
                })
            }

        };

        getBooksForStatistic(callbackForAllBookInfo);


    }

    onTimeSearch = (dataString) => {

        let start = dataString[0];
        let end = dataString[1];


        //先把所有书数据清0
        let newData1 = this.state.allBookInfo;
        let newPrice=0.0;
        let newNum=0;
        newData1.forEach((item) => {
            item.number = 0;
        });

        this.state.allOrderItem.forEach(function (item) {
            let timestamp4 = new Date(item.time);
            let newTime = timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);

            let time = (newTime.split(" "))[0];

            if ((compareDate(start, time) <= 0) && (compareDate(end, time) >= 0)) {
                let bookId =item.bookId;
                let number = item.number;
                let price = item.price;
                let index = newData1.findIndex((item) => {
                    return item.bookId === bookId
                });

              newNum+=number;
              newPrice+=price*number;
              if (index >= 0) {
                    newData1[index].number += number;
                }
            }

        });

        let data1 = [];
        newData1.forEach((item) => {
            if (item.number > 0) {
                data1.push(item);
            }
        });

        this.setState({
            showData: data1,
            bookNum:newNum,
            allPrice:newPrice
        });
        // console.log("data1");
        // console.log(data1);
        this.state.showData.sort(compareDate('number'));

        if (data1.length > 5) {
            // console.log("more than 5");
            // console.log(this.state.showData);
            this.setState({
                sortedData: data1.slice(0, 5)
            });
        } else {
            console.log("less than 5");
            this.setState({
                sortedData: data1
            })

        }

    };
    onTimeCancel = () => {
        // this.setState({
        //     allBookInfo:this.state.rawData,
        //     sortedData:this.state.rawData.slice(0,10)
        // });
        // console.log("cancel");
        // console.log(this.state.rawData)

        const callbackForAllBookInfo = (data) => {

            this.setState({
                allBookInfo: data,
            });
            myBookSale(callbackForAllMyOrderItem);
        };
        const callbackForAllMyOrderItem = (data) => {

            this.setState({allOrderItem: data});

            //计算出从一开始到现在的自己购买书籍的情况（每种书购买了多少本）
            let newData = this.state.allBookInfo;
            this.state.allOrderItem.forEach((orderItem) => {
                let bookId = orderItem.bookId;
                let number = orderItem.number;
                let price = orderItem.price;
                let index = this.state.allBookInfo.findIndex((item) => {
                    return item.bookId === bookId
                });

                this.setState({
                    allPrice: this.state.allPrice + price * number,
                    bookNum: this.state.bookNum + number,
                });
                if (index >= 0) {
                    newData[index].number += number;
                }

            });


            this.setState({allBookInfo: newData});
            this.setState({rawData: newData});


            let data1 = [];
            this.state.allBookInfo.forEach((item) => {
                if (item.number > 0) {
                    data1.push(item);
                }
            });

            this.setState({
                showData: data1,
            });
            this.state.showData.sort(compareDate('number'));

            if (data1.length > 5) {
                // console.log("more than 5");
                // console.log(this.state.showData);
                this.setState({
                    sortedData: data1.slice(0, 5)
                });
            } else {
                console.log("less than 5");
                this.setState({
                    sortedData: data1
                })

            }

        };

        getBooksForStatistic(callbackForAllBookInfo);

    };

    render() {

        const columns = [
            {
                title: '书籍',
                dataIndex: 'book',
                key: 'book',
                align: 'center',
                // ...this.getColumnSearchProps('book'),
            },
            {
                title: '作者',
                dataIndex: 'author',
                key: 'author',
                align: 'center',

                // ...this.getColumnSearchProps('author'),
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
                align: 'center',
                // ...this.getColumnSearchProps('type'),
            },
            {
                title: '购买数量',
                dataIndex: 'number',
                align: 'center',
                key: 'number',
                sorter: {
                    compare: (a, b) => a.number - b.number,

                },
                // sorter: true,
                // ...this.getColumnSearchProps('number'),


            },


        ];


        let data = [];
        this.state.sortedData.forEach((item) => {
            data.push({
                name: item.book,
                value: item.number
            })
        });
        // console.log(data);
        return (
            <Row>
                <Col span={13}>
                    <TimeSelect onCancel={this.onTimeCancel} onSearch={this.onTimeSearch}/>
                    <br/> <br/>

                    <Table columns={columns} dataSource={this.state.showData}/>
                </Col>
                <Col span={11}>
                    <Row>
                        <Col span={6}>

                        </Col>
                        <Col span={8}>
                            <NumTag num={this.state.bookNum}/>
                        </Col>
                        <Col span={8}>
                         <ConsumeTag num={this.state.allPrice}/>
                        </Col>
                    </Row>


                    <br/><br/>
                    <MyPieSlice sortData={data}/>
                </Col>
            </Row>

        );
    }
}

export default UserSelfTable
