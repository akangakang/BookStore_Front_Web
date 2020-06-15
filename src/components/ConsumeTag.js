import React, {Component} from "react";
import {Card} from "antd";
import {TransactionOutlined} from "@ant-design/icons";

class ConsumeTag extends Component{
    render(){
        return(
            <div>
                <Card title="消费额(元)"   hoverable bordered={false} style={{ width: 150 }}>

                    <p><TransactionOutlined />  {parseFloat(this.props.num).toFixed(2)}</p>

                </Card>
            </div>
        );
    }
}

export default ConsumeTag;
