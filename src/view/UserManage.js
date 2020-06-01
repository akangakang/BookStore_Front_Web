import React, {Component, useContext, useEffect, useRef, useState} from "react";
import {Button, Col, Form, Input, message, Popconfirm, Row, Table} from "antd";
import {SearchOutlined,HeatMapOutlined,AppstoreAddOutlined} from "@ant-design/icons";
import Nar1 from "../components/NarBar";
import { Layout, Menu, } from 'antd';

import './../css/store.css'
import {
    deleteBook,
} from "../services/bookService";
import { Tabs } from 'antd';
import {getAllUser,editUser} from "../services/userService";

const { TabPane } = Tabs;
const {  Content, Footer} = Layout;



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
                dataIndex: 'userId',
                width: '3%',
                align: 'center',
                sorter: {
                    compare: (a, b) => a.userId- b.userId,

                },

                ...this.getColumnSearchProps('userId'),
            },
            {
                title: 'NAME',
                dataIndex: 'name',
                width: '5%',
                align: 'center',
                sorter: {
                    compare: (a, b) => a.name- b.name,

                },
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'NICKNAME',
                dataIndex: 'nickname',
                width: '5%',
                editable: true,
                align: 'center',
                key:'book',
                sorter: (a, b) => a.nickname-b.nickname,

                ...this.getColumnSearchProps('nickname'),
            },
            {
                title: 'PHONE',
                dataIndex: 'tel',
                width: '5%',
                editable: true,
                align: 'center',
                sorter: (a, b) => a.tel-b.tel,
                ...this.getColumnSearchProps('tel'),
            },
            {
                title: 'E-mail',
                dataIndex: 'email',
                width: '3%',
                editable: true,
                align: 'center',
                sorter: {
                    compare: (a, b) => a.email- b.email,

                },
                ...this.getColumnSearchProps('email'),
            },
            {
                title: 'ADDRESS',
                dataIndex: 'address',
                width: '4%',
                editable: true,
                align: 'center',
                sorter: {
                    compare: (a, b) => a.address- b.address,

                },
                ...this.getColumnSearchProps('address'),
            },
            {
                title: 'PASSWORD',
                dataIndex: 'password',
                width: '5%',
                // editable: true,
                align: 'center',
                sorter: {
                    compare: (a, b) => a.password- b.password,

                },
                ...this.getColumnSearchProps('password'),
            },
            {
                title: 'USER TYPE',
                dataIndex: 'userType',
                width: '5%',
                editable: true,
                align: 'center',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                       <div>
                           {record.userType==0 ? <Button >普通用户</Button> :<Button >管理员</Button>}
                       </div>


                    ) : null,
                ...this.getColumnSearchProps('userType'),
            },


            {
                title: 'BAN',
                dataIndex: 'isBanned',
                align: 'center',
                width: '5%',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to modify?" onConfirm={() => this.handleBan(record)}>
                            {record.isBanned==0 ? <Button type="primary">禁用</Button> :<Button type="primary">解除</Button>}
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
            // console.log(JSON.stringify(data));
        };
        getAllUser(callback);

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
    handleBan = row => {
        const dataSource = [...this.state.dataSource];
        //alert(key);
        if(row.isBanned==1)
        {
            //说明被禁用了 点按钮要解除禁用
            row.isBanned=0;
        }
        else if(row.isBanned==0)
        {
            row.isBanned=1;
        }

        this.handleSave(row);
    };


    handleSave = row => {
        message.config({
            top: 55,
            duration: 5,
            maxCount: 3,
            rtl: true,
        });
        if(row.userType=="管理员"){
            row.userType=1;
        }
        else if(row.userType=="普通用户")
        {
            row.userType=0;
        }
        else if(row.userType!=1  && row.userType!=0){
            message.error("输入形式错误：请输入 管理员 或 普通用户 ； 或输入 1（代表管理员） 或 0（代表普通用户)")
            return;
        }

        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.userId === item.userId);
        const item = newData[index];
        //alert(JSON.stringify(row));
        //alert(JSON.stringify(row));
        //alert(index);
        newData.splice(index, 1, { ...item, ...row });
        const callback=(data)=>{
            message.config({
                top: 55,
                duration: 2,
                maxCount: 3,
                rtl: true,
            });
            if(data.status>0)
            {
                this.setState({
                    dataSource: newData,
                });
                message.success(data.msg)
            }
            else message.error(data.msg);
        };

        editUser(row,callback);

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


class userManage extends Component{

    render() {


        return (
            <div className="background">
                <Layout style={{ minHeight: '100vh' }} >
                    <div className="background">
                        <Nar1/>
                        <br/><br/><br/>
                        <Layout className="site-layout background">



                            <Content style={{ margin: '0 85px' }}>
                                <br/><br/>

                                        <EditableTable />

                            </Content>

                        </Layout>

                        <br/><br/><br/><br/> <br/><br/><br/><br/> <br/><br/><br/><br/> <br/><br/><br/><br/>
                        <Footer style={{ textAlign: 'center' }} className="background">AKang Design ©2020 Created by AKang</Footer>
                    </div>
                </Layout>

            </div>


        );
    }
}

export default userManage;
