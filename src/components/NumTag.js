import React, {Component} from "react";
import {Card} from "antd";
import {FormOutlined} from "@ant-design/icons";

class NumTag extends Component{
    render(){
        return(
            <div>
                <Card title="购书数量(本)"   hoverable bordered={false} style={{ width: 150 }}>

                    <p><FormOutlined/> { this.props.num}</p>

                </Card>
            </div>
        );
    }
}
export default NumTag
