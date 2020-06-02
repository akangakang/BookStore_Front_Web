import React from 'react';
import {Layout, Carousel, Row, Col, Form, Input, Checkbox, Button} from 'antd'

import {withRouter} from "react-router-dom";
import {Detail} from "../components/Detail"

import {getBook} from "../services/bookService";

import Nar1 from "../components/NarBar";

import './../css/login.css'
import './../css/bookDetail.css'




class BookDetail extends React.Component{

    constructor(props) {
        super(props);

        this.state = {bookInfo:null};

    }

    componentDidMount(){
        let user = localStorage.getItem("user");
        this.setState({user:user});

        const query = this.props.location.search;
        const arr = query.split('&');
        const bookId = arr[0].substr(4);
        // alert("id"+bookId);
        getBook(bookId, (data) => {this.setState({bookInfo: data})})
    }

    render(){
        return(
            <div className="background">
                <div className="container ">
                    <Nar1/>
                    <div className="show">
                        <Detail info={this.state.bookInfo} />
                    </div>


                </div>  <br/> <br/>
                {/*<div style={{ textAlign: 'center' }}>AKang Design ©2020 Created by AKang</div>*/}
            </div>

        );
    }
}
export default  BookDetail;
