import React from 'react';
import {Tag, Row, Col,  Input, Button, Table,} from 'antd'



import {getOneOrder, getOrderTime} from "../services/orderService";

import './../css/login.css'
import './../css/bookDetail.css'
import { SearchOutlined,FieldTimeOutlined ,CheckSquareOutlined} from "@ant-design/icons";


class OneOrderList extends React.Component {

    constructor(props) {
        super(props);

        this.columns = [
            {
                title: 'COVER',
                dataIndex: 'cover',
                width: '16%',
                align: 'center',
                render:(record)=><img  style={{maxWidth:90, height:'auto'}} src={record}  />,

                //...this.getColumnSearchProps('cover'),
            },
            {
                title: 'BOOK',
                dataIndex: 'book',
                width: '15%',
                editable:false,
                align: 'center',
                key:'book',
                // sorter: (a, b) => a.book-b.book,

                ...this.getColumnSearchProps('book'),
            },
            {
                title: 'AUTHOR',
                dataIndex: 'author',
                width: '15%',
                editable: false,
                align: 'center',

                ...this.getColumnSearchProps('author'),
            },

            {
                title: 'ISBN',
                dataIndex: 'isbn',
                width: '15%',
                editable: false,
                align: 'center',
                sorter: {
                    compare: (a, b) => a.isbn- b.isbn,

                },
                ...this.getColumnSearchProps('isbn'),
            },
            {
                title: 'PRICE (￥)',
                dataIndex: 'price',
                width: '15%',
                editable: false,
                align: 'center',
                sorter: {
                    compare: (a, b) => a.price- b.price,

                },
                ...this.getColumnSearchProps('price'),
            },
            {
                title: 'QUANTITY',
                dataIndex: 'number',
                width: '18%',
                editable: false,
                align: 'center',
                sorter: {
                    compare: (a, b) => a.number- b.number,

                },
                ...this.getColumnSearchProps('number'),
            },


        ];
    }


    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },


    });
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {

        return(
            <div>


                <Table pagination={false} columns={this.columns} dataSource={this.props.dataSource} />
                <br/>
            </div>

        );
    }
}


class OneOrder extends React.Component{

    constructor(props) {
        super(props);

        // this.state = {
        //     orderInfo:null,
        //     time:null,
        //     newTime:null
        // };
        // const callback =(data) => {this.setState({orderInfo: data})};
        // getOneOrder(this.props.itemId, callback);
    }

    // componentDidMount(){
    //     // alert("id"+bookId);
    //     // const callback1 =(data) => {this.setState({orderInfo: data})};
    //     // const callback2 =(data) =>{
    //     //     let timestamp4 = new Date(data);
    //     //     this.setState({time:timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8)})
    //     // };
    //     // getOneOrder(this.props.itemId, callback1);
    //     // getOrderTime(this.props.itemId, callback2);
    //
    //     let timestamp4 = new Date(this.props.item.date);
    //     this.setState({newTime:timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8)})
    //
    // }

    render(){
        return(

                <div >
                    <br/>
                    <div className="show1">
                        <br/>
                        <Row>
                            <Col span={22} offset={1}>
                                <Row>
                                    <Col >
                                        <Button type="primary" icon={<CheckSquareOutlined />}>
                                            Order :{ this.props.item.orderId}
                                        </Button>
                                    </Col>
                                    <Col offset={1}>
                                        <Button type="primary" icon={<FieldTimeOutlined />}>
                                            Order :{new Date(this.props.item.date).toLocaleDateString().replace(/\//g, "-") + " " + new Date(this.props.item.date).toTimeString().substr(0, 8)}
                                        </Button>
                                    </Col>

                                </Row>

                                <br/>

                                <OneOrderList dataSource={this.props.item.myOrder}/>
                            </Col>
                        </Row>


                    </div>
                    <br/>
                </div>


        );
    }
}
export default OneOrder;
