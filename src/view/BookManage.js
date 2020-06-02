import React, {Component, useContext, useEffect, useRef, useState} from "react";
import {Button, Col, Form, Input, message, Popconfirm, Row, Table} from "antd";
import {SearchOutlined,HeatMapOutlined,AppstoreAddOutlined} from "@ant-design/icons";
import Nar1 from "../components/NarBar";
import { Layout, Menu, } from 'antd';

import './../css/store.css'
import {
    deleteBook,
    editBook,
    getBooks,
    editType,
    getBooksAllInfo,
    getBooksByType,
    getTypes,
    deleteType, addType, addBook, editImg
} from "../services/bookService";
import { Tabs } from 'antd';
import NestedTable from "../components/NestedTableForOrder";
import UploadImg from "../components/UploadImg";

const { TabPane } = Tabs;
const {  Content, Footer} = Layout;


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
                title: 'ID',
                dataIndex: 'key',
                width: '1%',
                align: 'center',
                sorter: {
                    compare: (a, b) => a.key- b.key,

                },

                ...this.getColumnSearchProps('key'),
            },
            {
                title: 'COVER',
                dataIndex: 'cover',
                align: 'center',
                // editable: true,
                render:(text,record)=>
                    (record.cover == "")? <UploadImg getBase64={this.getBase64} id={record.key}/>:
                        <Popconfirm title="确定要修改封面?您将放弃此封面" onConfirm={() => this.handleChangeImg(record.key)}>
                          {  (this.state.up == record.key)? <UploadImg getBase64={this.getBase64} id={record.key}/>
                            :<img alt={record.book} style={{maxWidth:90, height:'auto'}} src={record.cover}  />}

                        </Popconfirm>

                ,
                // getBase64={this.getBase64} key={record.key}
            // <img  style={{maxWidth:150, height:'auto'}} src={record} />
                //...this.getColumnSearchProps('cover'),
            },
            {
                title: 'BOOK',
                dataIndex: 'book',
                width: '12%',
                editable: true,
                align: 'center',
                key:'book',
                //sorter: (a, b) => a.book-b.book,

                ...this.getColumnSearchProps('book'),
            },
            {
                title: 'AUTHOR',
                dataIndex: 'author',
                width: '10%',
                editable: true,
                align: 'center',

                //...this.getColumnSearchProps('author'),
            },
            {
                title: 'ISBN',
                dataIndex: 'isbn',
                width: '1%',
                editable: true,
                align: 'center',
                sorter: {
                    compare: (a, b) => a.isbn- b.isbn,

                },
                ...this.getColumnSearchProps('isbn'),
            },
            {
                title: 'STOCK',
                dataIndex: 'stock',
                width: '1%',
                editable: true,
                align: 'center',
                sorter: {
                    compare: (a, b) => a.stock- b.stock,

                },
                ...this.getColumnSearchProps('stock'),
            },
            {
                title: 'PRICE',
                dataIndex: 'price',
                width: '1%',
                editable: true,
                align: 'center',
                sorter: {
                    compare: (a, b) => a.price- b.price,

                },
                // ...this.getColumnSearchProps('price'),
            },
            {
                title: 'TYPE',
                dataIndex: 'type',
                width: '7%',
                editable: true,
                align: 'center',
                // sorter: {
                //     compare: (a, b) => a.type- b.type,
                //
                // },
                ...this.getColumnSearchProps('type'),
            },
            {
                title: 'DESCRIPTION',
                dataIndex: 'description',
                width: '45%',
                editable: true,
                align: 'center',
                // sorter: {
                //     compare: (a, b) => a.description- b.description,
                //
                // },
                //...this.getColumnSearchProps('description'),
            },
            {
                title: 'SALE',
                dataIndex: 'sale',
                width: '1%',
                editable:true,
                align: 'center',
                // sorter: {
                //     compare: (a, b) => a.sale- b.sale,
                //
                // },
                // render: (text, record) =>
                //     this.state.dataSource.length >= 1 ? (
                //         <Switch defaultChecked onChange={this.onChange} />
                //     ) : null,

                ...this.getColumnSearchProps('sale'),
            },

            {
                title: 'DELETE',
                dataIndex: 'operation',
                align: 'center',
                width: '1%',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (

                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <Button type="primary">Delete</Button>

                        </Popconfirm>
                    ) : null,
            },



        ];
        this.state = {

            dataSource: [],
            rowData:[],
            up:0,

        };

    }

    componentDidMount() {
          const callback =  (data) => {
            this.setState({ dataSource:data, rowData:data});

        };
        getBooksAllInfo( callback);
    }
    state = {
        searchText: '',
        searchedColumn: '',
        visible: false,
        //dataSource:[],

    };
    handleChangeImg=(key)=>{
      this.setState({
          up:key
      })
    };
     getBase64=(img,key, callback)=> {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
         const newData = [...this.state.dataSource];
         const index = newData.findIndex(item => key === item.key);
         const item = newData[index];
         let newImg =item;
       const mycall=()=>{
           this.setState({
               up:-1,
               dataSource:newData
           })
       };


         // alert( newImg['cover']);
         // newData.splice(index, 1, { ...item, ...row });
         // const callback=(data)=>{
         //     message.config({
         //         top: 50,
         //         duration: 2,
         //         maxCount: 3,
         //         rtl: true,
         //     });
         //     if(data.status>0)
         //     {
         //         this.setState({
         //             dataSource: newData,
         //         });
         //     }
         //     else message.error(data.msg);
         // };
        reader.readAsDataURL(img);

         reader.onload = function () {
             // 若只需base64编码部分，可以根据 ',' 进行分割取后面部分即可
             newImg['cover']=reader.result.split(',').toString();
             newData.splice(index, 1, { ...item, ...newImg });
             editImg(key,reader.result.split(',').toString(),mycall);

         }
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
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
        //alert(key);

        const callback=(data)=>{
            message.config({
                top: 50,
                duration: 2,
                maxCount: 3,
                rtl: true,
            });
            if(data.status>0)
            {
                message.success(data.msg);
                this.setState({
                dataSource: dataSource.filter(item => item.key !== key),
            });
            }
            else{
                message.error(data.msg);
            }

        };
        deleteBook(key,callback);

    };
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            // key: count,
            book: `write book name here`,
            author: `write author here`,
            isbn: `isbn `,
            stock: `1`,
            type: `编程`,
            sale: `1`,
            description: `description `,
            price:'0',
            cover:""
        };
        const  callback=(data)=>{
            alert(JSON.stringify(data));
            this.setState({
                dataSource: [...dataSource, data],
            });
        };
        addBook(newData,callback);
        // this.setState({
        //     dataSource: [...dataSource, newData],
        //     count: count + 1,
        // });
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
       //alert(JSON.stringify(row));
        //alert(JSON.stringify(row));
        //alert(index);
        newData.splice(index, 1, { ...item, ...row });
        const callback=(data)=>{
            message.config({
                top: 50,
                duration: 2,
                maxCount: 3,
                rtl: true,
            });
            if(data.status>0)
            {
                this.setState({
                    dataSource: newData,
                });
            }
            else message.error(data.msg);
        };

        editBook(row,callback);

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
             <div>
            <Row>
                <Col span={4}>
                    <Button type="primary" style={{marginBottom: 16} } onClick={this.handleAdd}>Add a row</Button>
                </Col>
            </Row>

                 <Table
                     components={components}
                     rowClassName={() => 'editable-row'}
                     bordered
                     dataSource={dataSource}
                     columns={columns}
                 />


            </div>
        );
    }
}
class EditableTableForType extends React.Component {


    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'TypeId',
                dataIndex: 'typeid',
                width: '15%',
                editable: true,
                align: 'center',
                key:'typeid',
                sorter: (a, b) => a.typeid-b.typeid,

                ...this.getColumnSearchProps('typeid'),
            },
            {
                title: 'Type',
                dataIndex: 'name',
                width: '15%',
                editable: true,
                align: 'center',

                //sorter: (a, b) => a.book-b.book,

                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'Description',
                dataIndex: 'description',
                width: '55%',
                editable: true,
                align: 'center',

                ...this.getColumnSearchProps('description'),
            },
            {
                title: 'OPERATION',
                dataIndex: 'operation',
                align: 'center',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.typeid)}>
                            <Button type="primary">Delete</Button>
                        </Popconfirm>
                    ) : null,
            },



        ];
        this.state = {

            dataSource: [],
            rowData:[],

        };

    }

    componentDidMount() {
        const callback =  (data) => {
            this.setState({ dataSource:data, rowData:data});

        };
        getTypes( callback);
    }
    state = {
        searchText: '',
        searchedColumn: '',
        visible: false,
        //dataSource:[],

    };


    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
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
        //alert(key);

        const callback=(data)=>{
            message.config({
                top: 50,
                duration: 2,
                maxCount: 3,
                rtl: true,
            });
            if(data.status>0)
            {
                message.success(data.msg);
                this.setState({
                    dataSource: dataSource.filter(item => item.typeid !== key),
                });
            }
            else{
                message.error(data.msg);
            }

        };
        deleteType(key,callback);

    };
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
                name:'write type name here',
                description:'write description here'
        };

        const  callback=(data)=>{
            this.setState({
                dataSource: [...dataSource, data],
            });
        };
        addType(newData,callback);
    };
    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.typeid === item.typeid);
        const item = newData[index];
        //alert(JSON.stringify(row));
        //alert(index);
        newData.splice(index, 1, { ...item, ...row });
        const callback=(data)=>{
            message.config({
                top: 50,
                duration: 2,
                maxCount: 3,
                rtl: true,
            });
            if(data.status>0)
            {
                this.setState({
                    dataSource: newData,
                });
            }
            else message.error(data.msg);

        };

        editType(row,callback);

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
            <div className="container">
                <Row>
                    <Col span={4}>
                        <Button type="primary" style={{marginBottom: 16} } onClick={this.handleAdd}>Add a row</Button>
                    </Col>
                </Row>

                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />


            </div>
        );
    }
}

class bookManage extends Component{

    render() {


        return (
            <div className="background">
                <Layout style={{ minHeight: '100vh' }} >
                    <div className="background">
                        <Nar1/>
                        <br/><br/><br/>
                        <Layout className="site-layout background">
                            {/*<LeftNar/>*/}



                            <Content style={{ margin: '0 85px' }}>

                                <Tabs defaultActiveKey="1" >
                                    <TabPane tab="Book Manage" key="1">
                                        <EditableTable />
                                    </TabPane>
                                    <TabPane tab="Type Manage" key="2">
                                        <EditableTableForType />
                                    </TabPane>
                                    <TabPane tab="Order Manage" key="3">
                                       <NestedTable/>
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

export default bookManage;
