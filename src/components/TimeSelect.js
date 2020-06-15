import React, {Component} from "react";
import { DatePicker } from 'antd';
import { Space, Radio, Button } from 'antd';
const { RangePicker } = DatePicker;

class TimeSelect extends Component{
    constructor(props) {
        super(props);
    }
    state={
        date:[],
    };

    onChange=(dates: [moment, moment], dateStrings: [string, string])=>{
        // alert(dates);
        // alert(dateStrings);
        this.setState({
            date:dateStrings
        })
    };

    onClickSearch=()=>{
      this.props.onSearch(this.state.date);
    };


    render(){
        return(
            <Space size={'small'}>

                <RangePicker  renderExtraFooter={() => "按时间范围查询" } onChange={this.onChange}/>
                <Button type="primary" onClick={this.onClickSearch}>搜索</Button>
                <Button type="primary" onClick={this.props.onCancel}>取消</Button>
            </Space>

        );
    }
}

export default TimeSelect;
