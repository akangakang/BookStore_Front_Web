import {getRequest} from "../utils/ajax";

export const getBooksForStatistic=(callback)=>{
    const url = "http://localhost:8080/getBooksForStatistic";
    getRequest(url,callback);
};
// 获取某人的所有已经下单OrderItem
export const myBookSale=(callback)=>{
    const  url =  "http://localhost:8080/myBookSale?userId="+JSON.parse(sessionStorage.getItem("user")).userId;
    return getRequest(url,callback);
};

// 获取所有人的所有已经下单OrderItem
export const bookSale=(callback)=>{
    const url = "http://localhost:8080/bookSale";
    getRequest(url,callback);
};
