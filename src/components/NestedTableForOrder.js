import React, {Component} from "react";
import {Table, Badge, Menu, Dropdown, Popconfirm, Button} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {getAllOrders, getOneOrder} from "../services/orderService";

import "../css/table.css"




class NestedTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],

            subTabData:[],
        };

    }
    componentDidMount() {
        const callback =  (data) => {
            this.setState({ dataSource:data});

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
                render:(record)=><img  style={{maxWidth:150, height:'auto'}} src={record}  />,

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


    render(){

    const columns = [
        { title: 'Order Id', dataIndex: 'key', key: 'key' },
        { title: 'User Name', dataIndex: 'user', key: 'user' },
        { title: 'User Id', dataIndex: 'userId', key: 'userId' },
        { title: 'Date', dataIndex: 'date', key: 'date' },

    ];

    return (
        <Table
            className="components-table-demo-nested"
            columns={columns}
            expandable={{expandedRowRender:this.expandedRowRender,
                onExpand:this.onExpand}}
            dataSource={this.state.dataSource}
        />
    );
}


}

export default NestedTable;