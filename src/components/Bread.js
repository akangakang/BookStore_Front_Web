import React, {Component} from "react";
import {Breadcrumb} from "antd";
import 'antd/dist/antd.css';
import {getTypes} from "../services/bookService";
class Bread extends Component{
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
    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) {
                anchorElement.scrollIntoView({block: 'start', behavior: 'smooth'});
            }
        }
    };

    render() {

        const bigBlock = [];

        this.state.bookType.forEach((b) => {

                // alert(b.typeid);
                let id=b.typeid;
                //alert(id);

                    bigBlock.push(
                        <Breadcrumb.Item  onClick={() => this.scrollToAnchor(id)}><span className="myh31">{b.name}</span></Breadcrumb.Item>
                    );


                }


        );
        return (
            <div className="myh1 siyuanheiti">

                <Breadcrumb separator=" | ">
                    {/*<Breadcrumb.Item  onClick={() => this.scrollToAnchor('1')}><span className="myh31">青春文学</span></Breadcrumb.Item>*/}
                    {/*<Breadcrumb.Item  onClick={() => this.scrollToAnchor('2')}><span className="myh31">历史文学</span></Breadcrumb.Item>*/}
                    {/*<Breadcrumb.Item  onClick={() => this.scrollToAnchor('3')}><span className="myh31">科普读物</span></Breadcrumb.Item>*/}
                    {bigBlock}
                </Breadcrumb>
            </div>
        );
    }

}
export default Bread;