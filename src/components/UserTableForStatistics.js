import React, {Component} from "react";
import {bookSale} from "../services/statisticsService";
import {getAllUserForStatistic} from "../services/userService";
import compareDate from "./CompareDate";
import {Button, Col, Row, Table} from "antd";
import TimeSelect from "./TimeSelect";
import MyPieSlice from "./SliderChart";
import {Link} from "react-router-dom";

class UserTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            rawData:[],
            allUserInfo:[],
            allOrderItem:[],
            sortedData:[],

        };
    }
    compare(property){
        return function(a,b){
            let value1 = a[property];
            let value2 = b[property];
            return value2 - value1;
        }
    }

    componentDidMount() {
        const callbackForAllUserInfo =  (data) => {

            // console.log(data);
            this.setState({
                allUserInfo:data,
            });
            bookSale(callbackForAllOrderItem);
        };
        const callbackForAllOrderItem=(data)=>{
            // console.log(data);
            this.setState({allOrderItem:data});

            //计算出从一开始到现在的销量排名
            let newData=this.state.allUserInfo;
            this.state.allOrderItem.forEach((orderItem)=>{
                let userId=orderItem.userId;
                let number=orderItem.number;
                let price=orderItem.price;
                let index=this.state.allUserInfo.findIndex((item)=>{
                    return item.userId===userId});

                if(index>=0)
                {
                    newData[index].price+=number*price;
                    newData[index].number+=number;
                }

            });

            console.log(newData);

            newData.sort(this.compare('price'));
            this.setState({allUserInfo:newData});
            this.setState({rawData:newData});

            this.setState({
                sortedData:this.state.allUserInfo.slice(0,5)
            });

        };

        getAllUserForStatistic( callbackForAllUserInfo);




    }

    onTimeSearch=(dataString)=>{

        let start=dataString[0];
        let end=dataString[1];



        let newData1=this.state.allUserInfo;
        newData1.forEach((item)=>{
            item.price=0;
        });

        this.state.allOrderItem.forEach(function(item) {
            let timestamp4 = new Date(item.time);
            let newTime=timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);

            let time=(newTime.split(" "))[0];

            if((compareDate(start, time)<=0) && (compareDate(end,time)>=0)){
                let userId=item.userId;
                let number=item.number;
                let price=item.price;
                let index=newData1.findIndex((item)=>{
                    return item.userId===userId});

                if(index>=0)
                {
                    newData1[index].price+=number*price;
                    newData1[index].numer+=number;
                }

            }

        });



        this.setState({
            allUserInfo:newData1,
        });
        this.state.allUserInfo.sort(this.compare('price'));
        this.setState({
            sortedData:this.state.allUserInfo.slice(0,5)
        });

    };
    onTimeCancel=()=>{
        // this.setState({
        //     allUserInfo:this.state.rawData,
        //     sortedData:this.state.rawData.slice(0,5)
        // });
        // console.log("cancel");
        // console.log(this.state.rawData)

        const callbackForAllUserInfo =  (data) => {

            console.log(data);
            this.setState({
                allUserInfo:data,
            });
            bookSale(callbackForAllOrderItem);
        };
        const callbackForAllOrderItem=(data)=>{
            console.log(data);
            this.setState({allOrderItem:data});

            //计算出从一开始到现在的销量排名
            let newData=this.state.allUserInfo;
            this.state.allOrderItem.forEach((orderItem)=>{
                let userId=orderItem.userId;
                let number=orderItem.number;
                let price=orderItem.price;
                let index=this.state.allUserInfo.findIndex((item)=>{
                    return item.userId===userId});

                if(index>=0)
                {
                    newData[index].price+=number*price;
                    newData[index].numer+=number;
                }

            });


            newData.sort(this.compare('price'));
            this.setState({allUserInfo:newData});
            this.setState({rawData:newData});

            this.setState({
                sortedData:this.state.allUserInfo.slice(0,5)
            });

        };

        getAllUserForStatistic( callbackForAllUserInfo);




    };

    render(){

        const columns = [

            {
                title: '用户名',
                dataIndex: 'name',
                key:'name',
                align: 'center',
                // ...this.getColumnSearchProps('book'),
            },
            {
                title: '购书数量',
                dataIndex: 'number',
                key:'number',
                align: 'center',
                // ...this.getColumnSearchProps('book'),
                sorter: {
                    compare: (a, b) => a.number- b.number,

                },

            },

            {
                title: '消费额',
                dataIndex: 'price',
                key:'price',
                align: 'center',

            render: (text, record) =>
            parseFloat(record.price).toFixed(2),
                sorter: {
                    compare: (a, b) => a.price- b.price,

                },

            },





        ];



        let data=[];
        this.state.sortedData.forEach((item)=>{
            data.push({
                name:item.name,
                // value:parseFloat(item.price).toFixed(2).toString()
                value:item.price
            })
        });
        // console.log(data);
        return(
            <Row>
                <Col span={13}>
                    <TimeSelect onCancel={this.onTimeCancel} onSearch={this.onTimeSearch}/>
                    <br/>  <br/>

                    <Table columns={columns} dataSource={this.state.allUserInfo} />
                </Col>
                <Col span={11}>
                    <br/><br/><br/>
                    <MyPieSlice sortData={data}/>
                </Col>
            </Row>

        );
    }
}
export default UserTable
