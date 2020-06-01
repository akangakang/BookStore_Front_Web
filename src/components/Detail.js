import React, {Component} from 'react';
import {Descriptions, Button, Popconfirm} from 'antd';


import { Row, Col } from 'antd';
import './../css/detail.css'
import {
    MinusOutlined,
    PlusOutlined,
    ShoppingCartOutlined,
    TransactionOutlined
} from '@ant-design/icons';
import {addToCart, addToCartByButtom} from "../services/cartService";
export class information extends Component{
    render() {
        const {info} = this.props;
        return(



                <Row>

                    <Col span={1} >

                    </Col>
                    <Col span={4}  offset={1}>
                        <div className="myh3"><span>!!!1</span></div>
                    </Col>
                    <Col span={15}  offset={1}>
                        <div className="myh4">{info.right}</div>
                    </Col>

                </Row>

        );
    }

}
export class Detail extends React.Component{


    handleAddCart=key=>
    {
        addToCart(key);

    };
    render() {

        const {info} = this.props;

        if(info == null){
            return null;
        }

        return (
            <div >
                <div >

                    <div className="title"><span>Detail Information</span></div>
                    <br/>

                    <Row >
                        <Col span={10}  offset={2}>

                            {/*<information right="34"></information>*/}
                            <Row>
                                <Col span={6} ><div className="myh3"><span>书名：</span></div></Col>
                                <Col span={15}  offset={1}><div className="myh4">{info.name}</div></Col>
                            </Row>
                            <Row>
                                <Col span={6} ><div className="myh3"><span>作者：</span></div></Col>
                                <Col span={15}  offset={1}><div className="myh4">{info.author}</div></Col>
                            </Row>
                            <Row>
                                <Col span={6} ><div className="myh3"><span>分类：</span></div></Col>
                                <Col span={15}  offset={1}><div className="myh4">{info.type.name}</div></Col>
                            </Row>
                            <Row>
                                <Col span={6} ><div className="myh3"><span>定价：</span></div></Col>
                                <Col span={15}  offset={1}><div className="myh4">{info.price}</div></Col>
                            </Row>
                            <Row>
                                <Col span={6} ><div className="myh3"><span>状态：</span></div></Col>
                                <Col span={15}  offset={1}><div className="myh4">{info.inventory}</div></Col>
                            </Row>
                            <Row>
                                <Col span={6} ><div className="myh3"><span>简介：</span></div></Col>
                                <Col span={17}  offset={1}><div className="myh4">{info.description}</div></Col>
                            </Row>
                            {/*<Descriptions className="myh3">*/}
                            {/*    <Descriptions.Item className="myh3" label={"title"} span={3}>{info.name}</Descriptions.Item>*/}
                            {/*    <Descriptions.Item label={"作者"} span={3}>{ info.author}  </Descriptions.Item>*/}
                            {/*    <Descriptions.Item label={"分类"} span={3}>  {info.type}    </Descriptions.Item>*/}
                            {/*    <Descriptions.Item label={"定价"} span={3}>{<span className={"price"}>{'¥' + info.price}</span>}</Descriptions.Item>*/}
                            {/*    <Descriptions.Item label={"状态 "} span={3}>{info.inventory !== 0? <span>有货 <span className={"inventory"}>库存{info.inventory}件</span></span> : <span className={"status"}>无货</span>}</Descriptions.Item>*/}
                            {/*    <Descriptions.Item label={"作品简介"} span={3}>{info.description}</Descriptions.Item>*/}
                            {/*</Descriptions>*/}
                    </Col>
                        <Col span={11} offset={1}>
                        <div className="book-image"><img alt="image" src={info.extraCover.image} style={{height:"400px"}}/></div>
                    </Col>



                    </Row>



                </div>
                <div >
                    <br/><br/>
                    <Row>
                        <Col span={20} offset={7}>

                            <Popconfirm title="Sure to add to your cart?" onConfirm={() => this.handleAddCart(info.bookId)}>
                                <Button size={"large"} style={{marginLeft:"15%"}} ghost  icon={<ShoppingCartOutlined />}    >
                                    加入购物车
                                </Button>
                            </Popconfirm>
                            {/*<Button icon={<TransactionOutlined />}size={"large"} style={{marginLeft:"15%"}} ghost>*/}
                            {/*    立即购买*/}
                            {/*</Button>*/}
                        </Col>

                    </Row>
                    <br/><br/>

                </div>
            </div>


        )

    }

}
