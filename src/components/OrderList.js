import React from 'react';


import './../css/login.css'
import './../css/bookDetail.css'
import OneOrder from "../components/OneOrder";



class OrderList extends React.Component{


    render(){
        const bigBlock=[];

        this.props.orderItems.forEach(function(key) {
               // alert(key);
                bigBlock.push(<OneOrder itemId={key}/>)

            });

        return(
                   <div>{bigBlock}</div>
        );
    }

}

export default OrderList;