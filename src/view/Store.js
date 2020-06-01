import React, {Component, useContext, useEffect, useRef, useState} from "react";
import {Button, Col, Form, Input, Popconfirm, Row, Table} from "antd";
import {SearchOutlined,HeatMapOutlined,AppstoreAddOutlined} from "@ant-design/icons";
import Nar1 from "../components/NarBar";
import { Layout, Menu, } from 'antd';

import {
    CrownOutlined,
    CompassOutlined,
    BulbOutlined,
    CoffeeOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ContactsOutlined,
    UsergroupDeleteOutlined,
    WalletOutlined,
    NodeIndexOutlined,
    MenuOutlined
} from '@ant-design/icons';
import './../css/store.css'
import {getBooks, getBooksByType, getTypes} from "../services/bookService";
import {addToCart} from "../services/cartService";
import {Link} from 'react-router-dom'
const {  Content, Footer, Sider } = Layout;


const { SubMenu } = Menu;

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async e => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };


    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {


    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'COVER',
                dataIndex: 'cover',
                width: '16%',
                align: 'center',
                render:(record)=><img  style={{maxWidth:150, height:'auto'}} src={record} />,

                 //...this.getColumnSearchProps('cover'),
            },
            {
                title: 'BOOK',
                dataIndex: 'book',
                width: '14%',
                editable: false,
                align: 'center',
                key:'book',
                //sorter: (a, b) => a.book-b.book,

                ...this.getColumnSearchProps('book'),
            },
            {
                title: 'AUTHOR',
                dataIndex: 'author',
                width: '10%',
                editable:false,
                align: 'center',

                ...this.getColumnSearchProps('author'),
            },
            {
                title: 'ISBN',
                dataIndex: 'isbn',
                width: '8%',
                editable: false,
                align: 'center',
                sorter: {
                    compare: (a, b) => a.isbn- b.isbn,

                },
                ...this.getColumnSearchProps('isbn'),
            },
            {
                title: 'STOCK',
                dataIndex: 'stock',
                width: '9%',
                editable: false,
                align: 'center',
                sorter: {
                    compare: (a, b) => a.stock- b.stock,

                },
                ...this.getColumnSearchProps('stock'),
            },
            {
                title: 'PRICE(￥)',
                dataIndex: 'price',
                width: '9%',
                editable: false,
                align: 'center',
                sorter: {
                    compare: (a, b) => a.type- b.type,

                },
                ...this.getColumnSearchProps('price'),
            },
            {
                title: 'TYPE',
                dataIndex: 'type',
                width: '9%',
                editable: false,
                align: 'center',
            },
            {
                title: 'DETAIL',
                dataIndex: 'description',
                align: 'center',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (

                        <Link to={{
                            pathname: '/getBookDetails',
                            search: '?id=' +record.key}}
                                target="_blank"
                        >
                            <Button type="primary" >View More</Button>
                        </Link>

                    ) : null,
            },
            {
                title:'SHOPPING CART',
                dataIndex:'cart',
                align: 'center',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to add to your cart?" onConfirm={() => this.handleAddCart(record.key)}>
                            <Button type="primary">Add To Cart</Button>
                        </Popconfirm>
                    ) : null,

            },


        ];
        this.state = {
            count: 2,
            detailDescription:"",
            dataSource: [],
            rowData:[],
            bookTypekey:1,
        };

    }

    componentDidMount() {


        const callback =  (data) => {
            this.setState({ dataSource:data, rowData:data});

        };
         // alert(this.props.bookTypeKey);
         // if(this.props.bookTypeKey>0)
         // {
         //      alert(this.props.bookTypeKey);
         //    getBooksByType(this.props.bookTypeKey,callback);
         //  }
         //  else {
            getBooks( callback);
         // }


    }
    state = {
        searchText: '',
        searchedColumn: '',
        visible: false,
        //dataSource:[],
        collapsed: true,
    };


    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    handleClick = e => {
        function myFilter(a)
        {
           // alert("e.key"+e.key);
            //alert("a.typekey"+a.typeKey);
            if(e.key>0)
            return a.typeKey==e.key;

            return true;
        }
        this.setState({
            bookTypekey:e.key,
          dataSource:this.state.rowData.filter(myFilter)

        });


      console.log(JSON.stringify(this.state.rowData));
      console.log(JSON.stringify(this.state.dataSource));
    };
    hide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = visible => {
        this.setState({ visible });
    };
    handle=()=>{
        const w=window.open('about:blank');
        w.location.href="#/login"
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
    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter(item => item.key !== key),
        });
    };
    handleAddCart=key=>
    {
        addToCart(key);

    };
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: 32,
            address: `London, Park Lane no. ${count}`,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };
    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
    };
    render() {

        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });

        return (

            <Layout className="site-layout background">
                {/*<LeftNar/>*/}

                <Sider  trigger={null}  collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} className="narcolor">

                    <Menu theme="dark" defaultSelectedKeys={["0"]}  onClick={this.handleClick} mode="inline" className="narcolor" >

                        <div className="trigger" >
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: this.toggle,
                            })}
                        </div>
                        <Menu.Item key={0} ><MenuOutlined />   <span className="siyuanheiti">全部书籍</span></Menu.Item>
                        <Menu.Item key="1"><CrownOutlined /><span className="siyuanheiti">编程</span></Menu.Item>
                        <Menu.Item key="2"><span><CompassOutlined /><span className="siyuanheiti">儿童文学</span></span></Menu.Item>
                        <Menu.Item key={3} ><BulbOutlined/><span className="siyuanheiti">魔幻小说</span></Menu.Item>
                        <Menu.Item key={4}><CoffeeOutlined /><span className="siyuanheiti">科幻小说</span></Menu.Item>
                        <Menu.Item key={5}><NodeIndexOutlined /><span className="siyuanheiti">世界名著</span></Menu.Item>
                        <Menu.Item key={6} ><WalletOutlined /><span className="siyuanheiti">社会小说</span></Menu.Item>
                        <Menu.Item key={7} ><UsergroupDeleteOutlined /><span className="siyuanheiti">悬疑小说</span></Menu.Item>
                        <Menu.Item key={8}><ContactsOutlined /><span className="siyuanheiti">青春文学</span></Menu.Item>
                        <Menu.Item key={9} ><AppstoreAddOutlined /><span className="siyuanheiti">传记文学</span></Menu.Item>
                        <Menu.Item key={10} ><HeatMapOutlined /><span className="siyuanheiti">武侠小说</span></Menu.Item>
                        {/*{bigBlock}*/}
                    </Menu>
                </Sider>


                <Content style={{ margin: '0 85px' }}>
                    {/*<Row>*/}
                    {/*         /!*<Col span={4}>*!/*/}
                    {/*         /!*    <Button type="primary" style={{marginBottom: 16,}}>Add a row</Button>*!/*/}
                    {/*         /!*</Col>*!/*/}
                    {/*     </Row>*/}
<br/>
                         <Table
                              components={components}
                              rowClassName={() => 'editable-row'}
                             bordered
                             dataSource={dataSource}
                              columns={columns}
                          />
                </Content>

            </Layout>
           //  <div>
           // <Row>
           //     <Col span={4}>
           //         <Button type="primary" style={{marginBottom: 16,}}>Add a row</Button>
           //     </Col>
           // </Row>
           //
           //      <Table
           //          components={components}
           //          rowClassName={() => 'editable-row'}
           //          bordered
           //          dataSource={dataSource}
           //          columns={columns}
           //      />
           //

           // </div>
        );
    }
}

class LeftNar extends Component{
    state = {
        collapsed: true,
    };
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <Sider  trigger={null}  collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} className="narcolor">
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" className="narcolor">
                    <div className="trigger" >
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                    </div>
                    <SubMenu
                        className="narcolor"
                        key="sub1"
                        title={<span><CrownOutlined /><span className="siyuanheiti">青春美学</span></span>}
                    >
                        {/*<Menu.Item key="3"><span className="siyuanheiti">三毛</span></Menu.Item>*/}
                        {/*<Menu.Item key="4"><span className="siyuanheiti">刘同</span></Menu.Item>*/}
                        {/*<Menu.Item key="5"><span className="siyuanheiti">饶雪漫</span></Menu.Item>*/}
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span><CompassOutlined /><span className="siyuanheiti">历史文学</span></span>}
                    >
                        {/*<Menu.Item key="6" ><span className="siyuanheiti">斯塔夫里阿诺斯</span></Menu.Item>*/}
                        {/*<Menu.Item key="7"   ><span className="siyuanheiti">约翰·基根</span></Menu.Item>*/}
                    </SubMenu>
                    <SubMenu
                        key="sub3"
                        title={
                            <span><BulbOutlined/><span className="siyuanheiti">科普读物</span></span>}
                    >
                        {/*<Menu.Item key="8" ><span className="siyuanheiti">叶灵凤</span></Menu.Item>*/}
                        {/*<Menu.Item key="9"   ><span className="siyuanheiti">文森特·T.德维塔</span></Menu.Item>*/}
                    </SubMenu>
                    <SubMenu
                        key="sub4"
                        title={
                            <span><CoffeeOutlined /><span className="siyuanheiti">保健养生</span></span>}
                    >
                        {/*<Menu.Item key="10" ><span className="siyuanheiti">三毛</span></Menu.Item>*/}
                        {/*<Menu.Item key="11"   ><span className="siyuanheiti">三毛</span></Menu.Item>*/}
                    </SubMenu>

                </Menu>
            </Sider>
        );
    }
}
class store extends Component{
    constructor(props) {
        super(props);

        this.state = {
            bookTypekey:0,
            bookType:[],
            table:<EditableTable bookTypeKey={1}/>

        };

    }



    // componentDidMount(){
    //     //
    //     //     const callback=(data)=>{
    //     //
    //     //         this.setState({bookType:data});
    //     //         // alert(this.state.bookType);
    //     //
    //     //     };
    //     //     getTypes(callback);
    //     //
    //     // }
    state = {
        collapsed: true,
    };
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    handleClick = e => {
        console.log('click ', e);

        this.setState({
            bookTypekey:e.key,

        });
        alert(this.state.bookTypekey);
    };

    render() {
        // const bigBlock = [];
        // this.state.bookType.forEach((b) => {
        //     let id=b.typeid;
        //     bigBlock.push(
        //         <SubMenu
        //             key={id}
        //             title={
        //                 <span><CompassOutlined /><span className="siyuanheiti">{b.name}</span></span>}
        //         >
        //
        //         </SubMenu>
        //         );
        //
        //     }
        // );


        return (
            <div className="background">
            <Layout style={{ minHeight: '100vh' }} >
                <div className="background">
                <Nar1/>
                <br/><br/><br/>
                {/*<Layout className="site-layout background">*/}
                {/*    /!*<LeftNar/>*!/*/}
                {/*    <Sider  trigger={null}  collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} className="narcolor">*/}

                {/*        <Menu theme="dark" defaultSelectedKeys={["0"]}  onClick={this.handleClick.bind(this)} mode="inline" className="narcolor" >*/}

                {/*            <div className="trigger" >*/}
                {/*                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {*/}
                {/*                    className: 'trigger',*/}
                {/*                    onClick: this.toggle,*/}
                {/*                })}*/}
                {/*            </div>*/}
                {/*            <Menu.Item key="0" ><MenuOutlined />   <span className="siyuanheiti">全部书籍</span></Menu.Item>*/}
                {/*            <Menu.Item key="1" ><CrownOutlined /><span className="siyuanheiti">编程</span></Menu.Item>*/}
                {/*            <Menu.Item key="2" ><span><CompassOutlined /><span className="siyuanheiti">儿童文学</span></span></Menu.Item>*/}
                {/*            <Menu.Item key="3" ><BulbOutlined/><span className="siyuanheiti">魔幻小说</span></Menu.Item>*/}
                {/*            <Menu.Item key="4" ><CoffeeOutlined /><span className="siyuanheiti">科幻小说</span></Menu.Item>*/}
                {/*            <Menu.Item key="5" ><NodeIndexOutlined /><span className="siyuanheiti">世界名著</span></Menu.Item>*/}
                {/*            <Menu.Item key="6" ><WalletOutlined /><span className="siyuanheiti">社会小说</span></Menu.Item>*/}
                {/*            <Menu.Item key="7" ><UsergroupDeleteOutlined /><span className="siyuanheiti">悬疑小说</span></Menu.Item>*/}
                {/*            <Menu.Item key="8" ><ContactsOutlined /><span className="siyuanheiti">青春文学</span></Menu.Item>*/}
                {/*            <Menu.Item key="9" ><AppstoreAddOutlined /><span className="siyuanheiti">传记文学</span></Menu.Item>*/}
                {/*            <Menu.Item key="10" ><HeatMapOutlined /><span className="siyuanheiti">武侠小说</span></Menu.Item>*/}
                {/*            /!*{bigBlock}*!/*/}
                {/*        </Menu>*/}
                {/*    </Sider>*/}


                {/*    <Content style={{ margin: '0 85px' }}>*/}
                {/*        /!*<EditableTable />*!/*/}
                {/*        {this.state.table}*/}
                {/*    </Content>*/}

                {/*</Layout>*/}
                    <EditableTable />
                    <br/><br/><br/><br/> <br/><br/><br/><br/> <br/><br/><br/><br/> <br/><br/><br/><br/><br/><br/>
                <Footer style={{ textAlign: 'center' }} className="background">AKang Design ©2020 Created by AKang</Footer>
                </div>
            </Layout>

            </div>


        );
    }
}

export default store;
