
import {postRequest,getRequest,deleteRequest} from "../utils/ajax";



export const getBooks = ( callback) => {
    // const url = `${config.apiUrl}/getBooks`;
    const url = `http://localhost:8080/getBooks`;
    getRequest(url, callback);
};
export const getBook = (id, callback) => {

    const url = "http://localhost:8080/getBookDetail?id="+id;
    getRequest(url, callback);

};
export const getTypes =(callback)=>{
    const url = "http://localhost:8080/getTypes";
    getRequest(url, callback);
};

export const getBooksByType =(id,callback)=>{
   // alert(id);
    const url = "http://localhost:8080/getBooksByType?id="+id;
    getRequest(url, callback);
};

export const getBooksAllInfo = ( callback) => {
    // const url = `${config.apiUrl}/getBooks`;
    const url = `http://localhost:8080/getBooksAllInfo`;
    getRequest(url, callback);
};

export const editBook = ( data,callback) => {
    // const url = `${config.apiUrl}/getBooks`;
    const url = `http://localhost:8080/editBook`;
    postRequest(url, data,callback);
};
export const deleteBook = ( key,callback) => {
    // const url = `${config.apiUrl}/getBooks`;
    const url = "http://localhost:8080/deleteBook?id="+key;
    deleteRequest(url, callback);
};
export const editType = ( data,callback) => {
    // const url = `${config.apiUrl}/getBooks`;
    const url = `http://localhost:8080/editType`;
    postRequest(url, data,callback);
};
export const deleteType = ( key,callback) => {
    // const url = `${config.apiUrl}/getBooks`;
    const url = "http://localhost:8080/deleteType?id="+key;
    deleteRequest(url, callback);
};

export const addType=(data,callback)=>{
    const url = "http://localhost:8080/addType";
    postRequest(url, data,callback);
};


export const addBook=(data,callback)=>{
    const url = "http://localhost:8080/addBook";
    postRequest(url, data,callback);
};

export const editImg=(key,img,callback)=>{
    const url= "http://localhost:8080/editImg";
    let map={};
    map['key']=key;
    map['img']=img;

    postRequest(url,map,callback);

};


