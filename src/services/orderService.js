import {getRequest, postRequest,deleteRequest} from "../utils/ajax";
import {message} from "antd";

export const placeOrder = (select)=>{
    message.config({
        top: 50,
        duration: 2,
        maxCount: 3,
        rtl: true,
    });
    alert(select);
    const callback = (data) => {
        //alert("data"+data.status);
        message.success(data.status);
        window.location.href="#/order";
    };
    const url =  "http://localhost:8080/placeOrder?userId="+JSON.parse(sessionStorage.getItem("user")).userId;
    postRequest(url,select,callback);
};

export const getOrderKey =(callback)=>{

    const  url =  "http://localhost:8080/getOrderKey?userId="+JSON.parse(sessionStorage.getItem("user")).userId;
    return getRequest(url,callback);
};

export const getOneOrder=(itemId,callback)=>{
    const  url =  "http://localhost:8080/getOneOrder?itemId="+itemId;
    return getRequest(url,callback);
};

export const getAllOrders=(callback)=>{
    const  url =  "http://localhost:8080/getAllOrders";
    return getRequest(url,callback);
};

export const getOrderTime=(itemId,callback)=>{
    const  url =  "http://localhost:8080/getOrderTime?orderId="+itemId;
    return getRequest(url,callback);
};

export const getOrderAllInfo =(callback)=>{

    const  url =  "http://localhost:8080/getOrderAllInfo?userId="+JSON.parse(sessionStorage.getItem("user")).userId;
    return getRequest(url,callback);
};
