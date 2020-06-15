import React, {Component} from "react";
import {bookSale, getBooksForStatistic} from "../services/statisticsService";
import compareDate from "./CompareDate";
import {Col, Row, Table} from "antd";
import TimeSelect from "./TimeSelect";
import MyPieSlice from "./SliderChart";

class BookTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            rawData:[],
            allBookInfo:[],
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
        const callbackForAllBookInfo =  (data) => {

            this.setState({
                allBookInfo:data,
            });
            bookSale(callbackForAllOrderItem);
        };
        const callbackForAllOrderItem=(data)=>{

            this.setState({allOrderItem:data});

            //计算出从一开始到现在的销量排名
            let newData=this.state.allBookInfo;
            this.state.allOrderItem.forEach((orderItem)=>{
                let bookId=orderItem.bookId;
                let number=orderItem.number;
                let index=this.state.allBookInfo.findIndex((item)=>{
                    return item.bookId===bookId});

                if(index>=0)
                {
                    newData[index].number+=number;
                }

            });


            newData.sort(this.compare('number'));
            this.setState({allBookInfo:newData});
            this.setState({rawData:newData});

            this.setState({
                sortedData:this.state.allBookInfo.slice(0,10)
            });

        };

        getBooksForStatistic( callbackForAllBookInfo);




    }

    onTimeSearch=(dataString)=>{

        let start=dataString[0];
        let end=dataString[1];


        //先把所有书数据清0
        let newData1=this.state.allBookInfo;
        newData1.forEach((item)=>{
            item.number=0;
        });

        this.state.allOrderItem.forEach(function(item) {
            let timestamp4 = new Date(item.time);
            let newTime=timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);

            let time=(newTime.split(" "))[0];

            if((compareDate(start, time)<=0) && (compareDate(end,time)>=0)){
                let bookId=item.bookId;
                let number=item.number;
                let index=newData1.findIndex((items)=>{
                    return items.bookId===bookId});

                if(index>=0)
                {
                    newData1[index].number+=number;
                }
            }

        });



        this.setState({
            allBookInfo:newData1,
        });
        this.state.allBookInfo.sort(this.compare('number'));
        this.setState({
            sortedData:this.state.allBookInfo.slice(0,10)
        });

    };
    onTimeCancel=()=>{
        // this.setState({
        //     allBookInfo:this.state.rawData,
        //     sortedData:this.state.rawData.slice(0,10)
        // });
        // console.log("cancel");
        // console.log(this.state.rawData)
        const callbackForAllBookInfo =  (data) => {

            this.setState({
                allBookInfo:data,
            });
            bookSale(callbackForAllOrderItem);
        };
        const callbackForAllOrderItem=(data)=>{

            this.setState({allOrderItem:data});

            //计算出从一开始到现在的销量排名
            let newData=this.state.allBookInfo;
            this.state.allOrderItem.forEach((orderItem)=>{
                let bookId=orderItem.bookId;
                let number=orderItem.number;
                let index=this.state.allBookInfo.findIndex((item)=>{
                    return item.bookId===bookId});

                if(index>=0)
                {
                    newData[index].number+=number;
                }

            });


            newData.sort(this.compare('number'));
            this.setState({allBookInfo:newData});
            this.setState({rawData:newData});

            this.setState({
                sortedData:this.state.allBookInfo.slice(0,10)
            });

        };

        getBooksForStatistic( callbackForAllBookInfo);


    };
    render(){

        const columns = [

            // {
            //     title: 'COVER',
            //     dataIndex: 'cover',
            //     align: 'center',
            //
            //     render:(text,record)=>
            //     <img alt={record.book} style={{maxWidth:60, height:'auto'}} src={record.cover}  />
            //     ,
            //
            // },
            {
                title: 'BOOK',
                dataIndex: 'book',
                key:'book',
                align: 'center',
                // ...this.getColumnSearchProps('book'),
            },
            {
                title: 'AUTHOR',
                dataIndex: 'author',
                key:'author',
                align: 'center',

                // ...this.getColumnSearchProps('author'),
            },

            {
                title: 'STOCK',
                dataIndex: 'stock',
                key:'stock',
                align: 'center',
                // ...this.getColumnSearchProps('stock'),
            },
            {
                title: 'PRICE',
                dataIndex: 'price',
                key:'price',
                align: 'center',

            },
            {
                title: 'TYPE',
                dataIndex: 'type',
                key:'type',
                align: 'center',
                // ...this.getColumnSearchProps('type'),
            },
            {
                title: '销量',
                dataIndex: 'number',
                width: '7%',
                align: 'center',
                key:'number',
                sorter: {
                    compare: (a, b) => a.number- b.number,

                },
                // sorter: true,
                // ...this.getColumnSearchProps('number'),


            },



        ];



        let data=[];
        this.state.sortedData.forEach((item)=>{
            data.push({
                name:item.book,
                value:item.number
            })
        });
        // console.log(data);
        return(
            <Row>
                <Col span={13}>
                    <TimeSelect onCancel={this.onTimeCancel} onSearch={this.onTimeSearch}/>
                    <br/>  <br/>

                    <Table columns={columns} dataSource={this.state.allBookInfo} />
                </Col>
                <Col span={11}>
                    <br/><br/><br/><br/><br/><br/>
                    <MyPieSlice sortData={data}/>
                </Col>
            </Row>

        );
    }
}

export default BookTable
