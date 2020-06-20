import React, {Component} from "react";
import BookCarousel from "../components/BookCarousel";
import Nar1 from "../components/NarBar";
import Bread from "../components/Bread";

import './../css/login.css';
import {Link} from "react-router-dom";
import {Card, Avatar, Button} from 'antd';

import {getBooksByType, getTypes} from "../services/bookService";
import MyPieSlice from "../components/SliderChart";

const { Meta } = Card;

class BookClassIntroBlock extends Component {
    render() {
        return (
            <div>
                <br/> <br/> <br/> <br/>
                <h1>
                    {this.props.bookClassName}
                </h1>
                <br/>
                <p>
                    <div className="siyuanheiti">{this.props.bookClassIntroduction}</div>
                </p>

            </div>

        );
    }

}

class BookBlock extends Component {
    render() {
        return (
            <div>

                <Card
                    hoverable
                    style={{ width: 300 }}
                    cover={<img alt="example" src={this.props.pic} />}
                >
                    <Meta title={this.props.bookName+" "+this.props.author} description={this.props.introduction} />
                </Card>
                <br/>
                {/*<Button   type="primary">View Details</Button>*/}
                <Link to={{
                    pathname: '/getBookDetails',
                    search: '?id=' +this.props.id}}
                      target="_blank"
                >
                    {/*<Button type="primary" >View More</Button>*/}
                </Link>
            </div>


        );
    }
}

class BookLeft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book1:[],
            book2:[],
            image1:"",
            image2:"",
        };

    }
    componentDidMount(){
        //alert(this.props.id);
        //key不能用？？？？？？
        const callback=(data)=>{
            //alert(data[0]);
            this.setState({book1:data[0]});
            this.setState({book2:data[1]});
            this.setState({image1:data[0].extraCover.image});
            this.setState({image2:data[1].extraCover.image});
            //alert(this.state.book1.name);
        };
        getBooksByType(this.props.id,callback);

    }

    render() {
        return (

            <div className="row clearfix">

                <div id={this.props.anchorname}></div>
                <br/><br/>
                <div className="col-md-4 column">
                    <BookClassIntroBlock
                        bookClassName={this.props.classname}
                        bookClassIntroduction={this.props.classintro}
                    />
                </div>

                <div className="col-md-4 column">
                    <BookBlock
                        id={this.state.book1.bookId}
                        bookName={this.state.book1.name}
                        author={this.state.book1.author}
                        introduction={this.state.book1.description}
                        pic={this.state.image1}
                    />
                </div>

                <div className="col-md-4 column">
                    <BookBlock
                        id={this.state.book2.bookId}
                        bookName={this.state.book2.name}
                        author={this.state.book2.author}
                        introduction={this.state.book2.description}
                        pic={this.state.image2}
                    />
                </div>
                <br/><br/>
            </div>
        );

    }

}

class BookRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book1:[],
            book2:[],
            image1:"",
            image2:"",
        };

    }
    componentDidMount(){
        //alert(this.props.id);
        //key不能用？？？？？？
        const callback=(data)=>{
          // alert(JSON.stringify(data[0].extraCover.image));
            this.setState({book1:data[0]});
            this.setState({book2:data[1]});
            this.setState({image1:data[0].extraCover.image});
            this.setState({image2:data[1].extraCover.image});
            //alert(this.state.book1.name);
        };
        getBooksByType(this.props.id,callback);

    }

    render() {
        return (
            <div className="row clearfix ">
                <div id={this.props.anchorname}></div>

                <br/><br/>

                <div className="col-md-4 column">
                    <BookBlock
                        id={this.state.book1.bookId}
                        bookName={this.state.book1.name}
                        author={this.state.book1.author}
                        introduction={this.state.book1.description}
                        pic={this.state.image1}
                    />
                </div>

                <div className="col-md-4 column">
                    <BookBlock
                        id={this.state.book2.bookId}
                        bookName={this.state.book2.name}
                        author={this.state.book2.author}
                        introduction={this.state.book2.description}
                        pic={this.state.image2}
                    />
                </div>

                <div className="col-md-4 column">

                    <BookClassIntroBlock
                        bookClassName={this.props.classname}
                        bookClassIntroduction={this.props.classintro}
                    />
                </div>

                <br/><br/>
            </div>
        );

    }

}

class HomeView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookType:[],
        };

    }
    componentDidMount(){

        const callback=(data)=>{

            this.setState({bookType:data});
           // alert(this.state.bookType);

        };
        getTypes(callback);

    }


    render() {

        var left = false;
        const bigBlock = [];

        this.state.bookType.forEach((b) => {

           // alert(b.typeid);
            let id=b.typeid;
            //alert(id);
                if (left) {
                    bigBlock.push(
                        < BookLeft
                            id={id}
                            anchorname={id}
                            classname={b.name}
                            classintro={b.description}
                           />
                    );
                    left = false;

                } else {
                    bigBlock.push(
                        < BookRight
                            id={id}
                            anchorname={id}
                            classname={b.name}
                            classintro={b.description}
                            />
                    );
                    left = true;

                }

            }
        );
        return (
            <div className="background">
                <div className="container ">
                    <div className="col-md-12 column">


                        <Nar1/>
                        <br/><br/><br/>
                        <Bread/>
                        <br/>
                        <BookCarousel/>

                        <br/>
                        <div> {bigBlock}</div>

                        <div style={{ textAlign: 'center' }}>AKang Design ©2020 Created by AKang</div>
                        <br/> <br/>


                    </div>

                </div>
            </div>
        );
    }

}

export default  HomeView;
