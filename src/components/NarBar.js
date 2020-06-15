import React, {Component} from "react";

import 'antd/dist/antd.css';
import alert from "antd";
import {Link} from 'react-router-dom'
import {logout} from '../services/userService'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class Nar1 extends Component{

    render() {
        let log;
        if(sessionStorage.getItem("isLog")!=null)
        {
            log=  <li><a href="#" onClick={logout}>Log out</a></li>
        }
        else
        {
            log=  <li>
                <a href="#/login">Log in</a>
            </li>
        }

        return (
            <div>

                <nav className="navbar navbar-default navbar-inverse navbar-fixed-top" role="navigation">
                    <div className="navbar-header">
                        {/*<button type="button" className="navbar-toggle" data-toggle="collapse"*/}
                        {/*        data-target="#bs-example-navbar-collapse-1">*/}
                        {/*    <span className="sr-only">Toggle navigation</span>*/}
                        {/*    <span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>*/}
                        <span>  </span>
                        <a className="navbar-brand" href="#">AKang's BOOKSTORE</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">

                            <li ><a href="#">HOME</a></li>
                            <li><a href="#/store">STORE</a></li>
                            {JSON.parse(sessionStorage.getItem("user"))!= null ? JSON.parse(sessionStorage.getItem("user")).userType!=1 ?null:<li><a href="#/bookManage">BOOK-MANAGE</a></li>:null}
                            {JSON.parse(sessionStorage.getItem("user"))!= null ? JSON.parse(sessionStorage.getItem("user")).userType!=1 ?null:<li><a href="#/userManage">USER-MANAGE</a></li>:null}
                            {JSON.parse(sessionStorage.getItem("user"))!= null ? JSON.parse(sessionStorage.getItem("user")).userType!=1 ?null:<li><a href="#/statistics">STATISTICS</a></li>:null}
                        </ul>

                        <p className="navbar-text navbar-right"></p>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <Avatar  size="small"  icon={<UserOutlined />} /><span>  </span>
                                    {JSON.parse(sessionStorage.getItem("user")) != null ? JSON.parse(sessionStorage.getItem("user")).name: "MY"}
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a href="#/cart">Shopping Cart</a>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <a href="#/order">Order</a>
                                    </li>
                                    <li className="divider"></li>
                                    {log}
                                </ul>
                            </li>
                        </ul>

                    </div>

                </nav>





            </div>

        );
    }


}


export default Nar1;

