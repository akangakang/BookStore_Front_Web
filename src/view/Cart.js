import React, {Component} from "react";
import {Alert, Button, Form,Affix, Input, Popconfirm, Row, Col,Table,Layout} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Nar1 from "../components/NarBar";
import './../css/store.css'
import { PlusOutlined,MinusOutlined } from '@ant-design/icons';
import OrderModal from "../components/OrderModal";
import {getCartItems,addToCartByButtom, removeByItemId} from "../services/cartService";
import Price from "../components/Price";

const {  Content, Footer, Sider } = Layout;
const EditableContext = React.createContext();



class SelectTable extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            dataSource:[],
            price:0,
        }
        this.columns = [
            {
                title: 'COVER',
                dataIndex: 'cover',
                width: '16%',
                align: 'center',
                render:(record)=><img  style={{maxWidth:150, height:'auto'}} src={record}  />,

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
                // ...this.getColumnSearchProps('number'),
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <div>
                            <Row>
                                <Col span={8}>
                                    <Popconfirm title="Sure to remove from  your cart?" onConfirm={() => this.removeOne(record.key)}>
                                    <Button type="primary" shape="circle" size="small" icon={<MinusOutlined />}/>
                                    </Popconfirm>
                                </Col>
                                <Col span={8}>
                                    <span>{record.number}</span>
                                </Col>
                                <Col span={8}>
                                    <Popconfirm title="Sure to add to your cart?" onConfirm={() => this.addOne(record.key)}>
                                    <Button type="primary" shape="circle" size="small"  icon={<PlusOutlined />}    />
                                    </Popconfirm>
                                </Col>

                            </Row>
                        </div>


                    ) : null,
            },


        ];
    }
    componentDidMount() {

        const callback =  (data) => {
            this.setState({ dataSource:data});
        };

        getCartItems( callback);

    }
    state = {
        selectedRowKeys: [], // Check here to configure the default column

    };

    onSelectChange = selectedRowKeys => {
        console.log("selectedRowKeys changed: ", selectedRowKeys);

        this.getPrice(selectedRowKeys);
        this.setState({selectedRowKeys: selectedRowKeys });
    };
    getPrice = selecedRowKeys =>{
        let p=0;
        this.state.dataSource.forEach(function (item) {

            selecedRowKeys.forEach(function (u) {
                if(u===item.key)
                {
                    p+=item.price*item.number;
                }

            })

        });
       // alert('p'+parseFloat(p).toPrecision(6));
        this.setState({price:p})
    };
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

    addOne =(key)=>{

        const callback =(num)=>{
            let newIndex=0;

            this.state.dataSource.forEach(function (item,index) {
                if(item.key===key)
                {
                    newIndex=index;
                }

            });
           // alert(newIndex);
            let item=this.state.dataSource;
            if(newIndex>=0)
            {
                item[newIndex].number=num;
                this.setState({dataSource:item});
            }

            this.getPrice(this.state.selectedRowKeys);

        };

        addToCartByButtom(key,callback);
    };
    removeOne =(key)=>{
        const callback =(num)=>{
            let newIndex=0;

            this.state.dataSource.forEach(function (item,index) {
                if(item.key===key)
                {
                    newIndex=index;
                }

            });
            // alert(newIndex);
            let item=this.state.dataSource;
            if(newIndex>=0)
            {
                item[newIndex].number=num;

                if(num>0)
                {
                    this.setState({dataSource:item});
                }
                else {
                    item=item.filter( t =>{return t.number>0});
                    this.setState({dataSource:item});
                }

            }
            this.getPrice(this.state.selectedRowKeys);

        };

        removeByItemId(key,callback);
    };
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                {
                    key: 'odd',
                    text: 'Select Odd Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return false;
                            }
                            return true;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
                {
                    key: 'even',
                    text: 'Select Even Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return true;
                            }
                            return false;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
            ],
        };


        return(
            <div>
                <Row>
                    <Col span={22}>
                        <Table rowSelection={rowSelection} columns={this.columns} dataSource={this.state.dataSource} />
                    </Col>

                    <Col span={1} offset={1}>
                        <Affix offsetTop={60}>
                           <OrderModal num={this.state.price}  selectedKey={this.state.selectedRowKeys}/>
                           <br/>
                           <Price num={this.state.price}/>
                        </Affix>
                    </Col>
                </Row>



            </div>

            );
    }
}


class Cart extends Component{
    render() {
        return (
            <div className="background">
                <div className="container ">
                    <div className="col-md-16 column">


                        <Nar1/>

                        <br/><br/>
                        <br/>
                       {/*<EditableTable/>*/}
                        <SelectTable/>
                        <br/>

                        <br/><br/><br/><br/> <br/><br/><br/><br/> <br/><br/><br/><br/> <br/><br/><br/><br/><br/><br/>
                        <Footer style={{ textAlign: 'center' }} className="background">AKang Design ©2020 Created by AKang</Footer>



                    </div>
                </div>
            </div>
        );
    }
}
export default Cart;
