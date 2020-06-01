import React, {Component} from 'react';
import {Layout, Carousel, Row, Col, Form, Input, Checkbox, Button} from 'antd'

import {withRouter} from "react-router-dom";
import {Detail} from "../components/Detail"

import {getOrderKey, getOrders} from "../services/orderService";

import Nar1 from "../components/NarBar";

import './../css/login.css'
import './../css/bookDetail.css'
import OneOrder from "../components/OneOrder";
import OrderList from "../components/OrderList";

import { Empty } from 'antd';
class MyEmpty extends Component{
    render(){
        return(
            <div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <Empty/>


            </div>
        );
    }

}

class OrderView extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            block:[],
            orderItem:[],
        }
    }
    componentDidMount(){

        const callback=(data)=>{
                 this.setState({orderItem:data});
              // alert(this.state.orderItem);
                // alert(this.state.orderItem.length);

            //     this.state.orderItems.forEach(function(key){
            //     alert(key);
            //     bigBlock.push(<OneOrder itemId={key}/>)
            //
            // },this);
            //    this.setOrderData();

                // this.setState({block: data});
                //
                // alert(this.state.block);
                //  console.log(this.state.block);
        };
        getOrderKey(callback);


        //getOrders(callback);
    }


    render(){

        return(
            <div className="background">
                <div className="container ">
                    <Nar1/>
                    <br/><br/><br/>
                    {/*<OneOrder itemId={1}/>*/}
                    {this.state.orderItem.length>0? <OrderList orderItems={this.state.orderItem}/>:<MyEmpty/> }

                    <br/> <br/> <br/> <br/> <br/> <br/>
                    <br/> <br/> <br/> <br/> <br/> <br/>
                    <br/> <br/><br/>
                    <div style={{ textAlign: 'center' }}>AKang Design ©2020 Created by AKang</div>
                    <br/>
                </div>
            </div>

        );
    }
}
export default  OrderView;