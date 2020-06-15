
import {postRequest,getRequest} from "../utils/ajax";
import {message} from 'antd';
import React from "react";



export const login = (data) => {
    const url =  "http://localhost:8080/login";
    const callback = (data) => {
        if(data.status >= 0) {
            sessionStorage.setItem('user', JSON.stringify(data.data));
            sessionStorage.setItem('isLog',1);
            localStorage.setItem('user', JSON.stringify(data.data));
            console.log(localStorage.getItem("user"));
           // history.push("/");


            message.success(data.msg);

           // message.success(JSON.parse(localStorage.getItem("user")).userId);

            window.location.href="/";
            // +JSON.parse(localStorage.getItem("user")).userId;

        }
        else{
            message.error(data.msg);
        }
    };
    postRequest(url,data,callback);
};

export const logout = () => {
    const url = `http://localhost:8080/logout`;
    message.config({
        top: 50,
        duration: 2,
        maxCount: 3,
        rtl: true,
    });
    const callback = (data) => {
        if(data.status >= 0) {
           //sessionStorage.setItem('isLog',null);
            sessionStorage.removeItem("isLog");
            sessionStorage.removeItem("user");
            // localStorage.removeItem("user");
            //history.push("/login");
            message.success(data.msg);
            window.location.href="/";
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest(url, {}, callback);
};

export const checkSession = (callback) => {
    const url = `http://localhost:8080/checkSession`;
    postRequest(url, {}, callback);
};
export const checkAdmin = (callback) => {
    const url = `http://localhost:8080/checkAdmin`;
    postRequest(url, {}, callback);
};

export const register=(data,callback)=>{
    const url = `http://localhost:8080/register`;
    postRequest(url, data, callback);
};

export const getAllUser=(callback)=>{
    const url=`http://localhost:8080/getAllUser`;
    getRequest(url,callback);
};

export const getAllUserForStatistic=(callback)=>{
    const url=`http://localhost:8080/getAllUserForStatistic`;
    getRequest(url,callback);
};


export const editUser = ( data,callback) => {
    // const url = `${config.apiUrl}/getBooks`;
    const url = `http://localhost:8080/editUser`;
    postRequest(url, data,callback);
};
