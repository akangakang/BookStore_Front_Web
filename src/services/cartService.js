import {getRequest, postRequest,deleteRequest} from "../utils/ajax";

export const addToCart= (bookid) => {
    const url ="http://localhost:8080/addToCart?userId="+JSON.parse(sessionStorage.getItem("user")).userId+"&bookId="+bookid;

    const callback = (data) => {

    };
    postRequest(url, {}, callback);
};
export const addToCartByButtom= (itemid,callback) => {
    const url ="http://localhost:8080/addToCart?userId="+JSON.parse(sessionStorage.getItem("user")).userId+"&itemId="+itemid;


    postRequest(url, {}, callback);
};
export const getCartItems = ( callback) => {
    // const url = `${config.apiUrl}/getBooks`;
    const url = "http://localhost:8080/getCartItems?userId="+JSON.parse(sessionStorage.getItem("user")).userId;
    getRequest(url, callback);
};

export const  removeByItemId=(itemid,callback)=>{
    const url ="http://localhost:8080/removeCartItem?userId="+JSON.parse(sessionStorage.getItem("user")).userId+"&itemId="+itemid;

    deleteRequest(url,callback);

};