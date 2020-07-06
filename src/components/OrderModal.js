import React from "react";
import {Modal, Button, message} from 'antd';
import {TransactionOutlined} from "@ant-design/icons";
import "../css/orderModal.css"
import {placeOrder} from "../services/orderService";

class OrderModal extends React.Component {

    state = { visible: false };

    showModal = () => {

        this.setState({
            visible: true,
        });
    };




    handleOk = e => {
        console.log(e);



        if(this.props.num===0)
        {
            message.config({
                top: 50,
                duration: 2,
                maxCount: 3,
                rtl: true,
            });
          message.error("您未选中商品")
        }
        else {
            placeOrder(this.props.selectedKey);
            message.config({
                top: 50,
                duration: 2,
                maxCount: 3,
                rtl: true,
            });
            // message.success("成功");
            // window.location.href="#/order";
        }

        this.setState({
            visible: false,
        });



    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>

                <Button type="primary" onClick={this.showModal}>
                    结算
                </Button>
                <Modal
                    title="确认付款"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>总价为</p>
                    <p><TransactionOutlined />  {parseFloat(this.props.num).toFixed(2)}</p>
                </Modal>
            </div>
        );
    }
}
export default OrderModal;
