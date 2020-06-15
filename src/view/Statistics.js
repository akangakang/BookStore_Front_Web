import React, {Component} from "react";

import Nar1 from "../components/NarBar";
import { Layout,  } from 'antd';

import './../css/store.css'

import { Tabs } from 'antd';
import UserTable from "../components/UserTableForStatistics";
import BookTable from "../components/BookTableForStatistics";
const { TabPane } = Tabs;
const {  Content, Footer} = Layout;



class Statistics extends Component{


    render() {


        return (
            <div className="background">
                <Layout style={{ minHeight: '100vh' }} >
                    <div className="background">
                        <Nar1/>
                        <br/><br/><br/>
                        <Layout className="site-layout background">

                            <Content style={{ margin: '0 85px' }}>

                                <Tabs defaultActiveKey="1" >
                                    <TabPane tab="书籍销量统计" key="1">

                                       <BookTable/>
                                    </TabPane>
                                    <TabPane tab="用户消费统计" key="2">
                                        <UserTable/>
                                    </TabPane>


                                </Tabs>


                            </Content>

                        </Layout>

                        <br/><br/><br/><br/> <br/><br/><br/><br/> <br/><br/><br/><br/> <br/><br/><br/><br/><br/><br/>
                        <Footer style={{ textAlign: 'center' }} className="background">AKang Design ©2020 Created by AKang</Footer>
                    </div>
                </Layout>

            </div>


        );
    }
}

export default Statistics;
