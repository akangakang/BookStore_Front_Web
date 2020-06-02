import React, {Component} from "react";

import {Row, Col} from 'antd';
import {Form, Input, Button, Checkbox} from 'antd';

import 'antd/dist/antd.css';
import './../css/login.css'
import {UserOutlined} from '@ant-design/icons';
import {withRouter} from "react-router-dom";

import * as userService from "../services/userService"
const onFinish = values => {
    console.log('Success:', values);
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

class LogInBlock extends React.Component{
    formRef = React.createRef();


    render() {
        // const { getFieldDecorator } = this.props.form;
        const onFinish = values => {
            console.log('Received values of form: ', values);
            userService.login(values);
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        return (
            <div >
                <div className="login">

                    <Row>
                        <Col span={6}></Col>
                        <Col span={12}>
                            <div>
                                <div className="title"><span>Log In</span></div>
                                <div className="myh4">
                                <Form
                                    name="basic"
                                    initialValues={{remember: true}}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    ref={this.formRef}
                                >

                                    <span className="myh4">Username  </span>
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                    >

                                        <Input placeholder="input  username " prefix={<UserOutlined />}/>


                                    </Form.Item>

                                    <span className="myh4">Password   </span>
                                    <Form.Item
                                        name="password"
                                        rules={[{ required: true, message: 'Please input your password!' }]}>

                                            <Input.Password placeholder="input password"/>

                                    </Form.Item>

                                    {/*<Form.Item name="remember" valuePropName="checked">*/}
                                    {/*    <Checkbox> <span className="myh5">Remember me</span></Checkbox>*/}

                                    {/*</Form.Item>*/}

                                    <Row>

                                        <Col span={17}> <a href='#/register'> <Button ghost ><span>Register</span></Button></a></Col>
                                        <Col span={7}>
                                            <Form.Item >

                                                        <Button ghost htmlType="submit">
                                                            Log In
                                                        </Button>

                                                </Form.Item>
                                            </Col>
                                        </Row>


                                </Form>
                                </div>


                            </div>



                        </Col>

                        <Col span={6}></Col>
                    </Row>


                </div>
            </div>
    );
    }


}

class Login extends Component{


    render() {
        return(
        <div>
        <LogInBlock />

        </div>


        );
    }
}

export default withRouter(Login);
