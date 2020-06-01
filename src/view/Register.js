import React, {Component} from "react";
import './../css/login.css'
import 'antd/dist/antd.css';

import {Steps, message, Alert} from 'antd';

import {
    Form,
    Input,

    Select,
    Row,
    Col,

    Button,
    AutoComplete,
} from 'antd';
import {
    UserOutlined,
UnlockOutlined,
    PhoneOutlined,
    ShoppingCartOutlined,
    PaperClipOutlined,
} from '@ant-design/icons';
import {register} from "../services/userService";
const { Step } = Steps;

const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const RegistrationForm = () => {
    const [form] = Form.useForm();
    const callback=(data)=>
    {
        if(data.status>0)
        {
            message.success(data.msg);
            window.location.href="#/login";
        }
        else {
            message.error(data.msg);
        }

    };
    const onFinish = values => {
        console.log('Received val' +
            'ues of form: ', values);

        register(values,callback);
    };


    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}

            scrollToFirstError
        >
            <Form.Item
                name="username"
                label="Username"

                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="nickname"
                label="Nickname"

                rules={[
                    {
                        required: true,
                        message: 'Please input your nickname!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
            name="tel"
            label="Phone"

            rules={[
                {
                    required: true,
                    message: 'Please input your phone number!',
                    whitespace: true,
                },
            ]}
        >
            <Input />
        </Form.Item>
            <Form.Item
                name="address"
                label="Address"

                rules={[
                    {
                        required: true,
                        message: 'Please input your phone address!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <br/>
            <Form.Item {...tailFormItemLayout}>

                <Button ghost htmlType="submit">Register</Button>

        </Form.Item>
        </Form>
    );
};

class StepBar extends React.Component {


    render() {

        return (
            <div>
                {/*<Steps current={this.props.num}>*/}
                {/*    <Step title="Username" description="This is a description." />*/}
                {/*    <Step title="Password"  description="This is a description." />*/}
                {/*    <Step title="Email" description="This is a description." />*/}
                {/*</Steps>*/}
                <Steps>
                    <Step status="finish" title="Username" icon={<UserOutlined />} />
                    <Step status="finish" title="Phone" icon={<PhoneOutlined />} />
                    <Step status="finish" title="Password" icon={<UnlockOutlined />} />
                    <Step status="finish" title="E-mail" icon={<PaperClipOutlined />} />
                </Steps>,
            </div>
        );
    }
}

class Register extends Component{
    render() {
        return (
            <div >
                <div className="container ">
                    <div className="col-md-12 column">
                        <br/> <br/> <br/>
                        <StepBar  num={0}/>
                        <br/>
                        <br/>
                    </div>
                    <br/><br/><br/><br/><br/><br/><br/><br/>

                    <Row>
                        <Col span={6}></Col>
                        <Col span={10} >
                            <RegistrationForm/>
                        </Col>
                        <Col span={8}></Col>
                    </Row>

                </div>
            </div>
        );
    }

}
export default Register;