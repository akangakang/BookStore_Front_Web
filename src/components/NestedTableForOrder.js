import React, {Component} from "react";
import {Table, Badge, Menu, Dropdown, Popconfirm, Button, Row, Col, Input} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {getAllOrders, getOneOrder} from "../services/orderService";

import "../css/table.css"
import TimeSelect from "./TimeSelect";
import compareDate from "./CompareDate";

const { Search } = Input;


class NestedTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            rawData:[],
            subTabData:[],
            search:0
        };

    }
    componentDidMount() {
        const callback =  (data) => {
            this.setState({
                dataSource:data,
                rawData:data,
            });

            console.log(JSON.stringify(data));
        };
        getAllOrders( callback);
    }
    onExpand = (expanded, record) => {
        const { dispatch } = this.props;

        if (expanded === false) {
            // 因为如果不断的添加键值对，会造成数据过于庞大，浪费资源，
            // 因此在每次合并的时候讲相应键值下的数据清空
            console.log("合并！");
            this.setState({
                subTabData: {
                    ...this.state.subTabData,
                    [record.key]: [] ,
                }
            });
        } else {
            console.log("展开！");
            const  callback = (data)=>{

                //alert(JSON.stringify(data));
                this.setState({
                                subTabData: {
                                    ...this.state.subTabData,
                                    [record.key]:data,
                                }
                            });

            };

            getOneOrder(record.key,callback);
        }
    };
    expandedRowRender  =(record)=>{
        //const data = [];
        const columns = [
            // { title: 'OrderItem Id', dataIndex: 'key', key: 'key' },
            {
                title: 'COVER',
                dataIndex: 'cover',
                width: '16%',
                align: 'center',
                render:(record)=><img  style={{maxWidth:90, height:'auto'}} src={record}  />,

                //...this.getColumnSearchProps('cover'),
            },
            { title: 'Book', dataIndex: 'book', key: 'book' },
            { title: 'AUTHOR', dataIndex: 'author'},
            { title: 'ISBN', dataIndex: 'isbn', width: '15%', align: 'center'},
            { title: 'PRICE (￥)', dataIndex: 'price', align: 'center'},
            { title: 'QUANTITY', dataIndex: 'number', align: 'center'},

        ];


        return <Table  columns={columns} dataSource={this.state.subTabData[record.key]} pagination={false} />;



    };

    onTimeSearch=(dataString)=>{
        let start=dataString[0];
        let end=dataString[1];


        let arr=[];
        this.state.rawData.forEach(function(item) {
            let timestamp4 = new Date(item.date);
            let newTime=timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);



            let time=(newTime.split(" "))[0];

            if((compareDate(start, time)<=0) && (compareDate(end,time)>=0)){
                arr.push(item);
            }

        });

        // alert(arr.length);
        this.setState({
            dataSource:arr,
        })

    };

    onTimeCancel=()=>{
        this.setState({
            dataSource:this.state.rawData
        })
    };

    onSearch=(value)=>{

        if(this.state.search==0)
        {
            let arr=[];

            this.state.rawData.forEach(
                function(item) {
                    let orderItems=item.myOrder;
                    let flag=0;
                    orderItems.forEach(
                        function (mybook) {
                            if (mybook.book.indexOf(value) >= 0
                                // ||
                                // mybook.isbn.indexOf(value)>=0||
                                // mybook.author.indexOf(value)>0
                            ) {
                                flag=1;
                            }
                        }
                    );

                    if(flag>0)
                    {
                        arr.push(item);
                    }



                    // alert(JSON.stringify(item));

                }
            );

            this.setState({
                dataSource:arr,
                search:1
            })
        }
        else if(this.state.search==1)
        {
            this.setState({
                dataSource:this.state.rawData,
                search:0
            })
        }


    };


    render(){

    const columns = [
        { title: 'Order Id', dataIndex: 'key', key: 'key' },
        { title: 'User Name', dataIndex: 'user', key: 'user' },
        { title: 'User Id', dataIndex: 'userId', key: 'userId' },
        { title: 'Date', dataIndex: 'date', key: 'date' },

    ];

    return (
        <div>
            <Row>
                <Col span={9}>

                    <TimeSelect onCancel={this.onTimeCancel} onSearch={this.onTimeSearch}/>
                </Col>
                <Col span={6}>


                    <Search
                        placeholder="检索包含输入书籍的订单"
                        enterButton={(this.state.search==0?"搜索":"取消")}
                        allowClear
                        onSearch={this.onSearch}
                    />
                </Col>
            </Row>
            <br/>
            <Table
                className="components-table-demo-nested"
                columns={columns}
                expandable={{expandedRowRender:this.expandedRowRender,
                    onExpand:this.onExpand}}
                dataSource={this.state.dataSource}
            />
        </div>


    );
}


}

export default NestedTable;
