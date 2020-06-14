import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import * as userService from "../services/userService"
import {message} from "antd";

export default class AdminRoute extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuthed: false,
            hasAuthed: false,
            isAdmin:false,

        };
    }

    checkAdmin= (data) => {
        console.log(data);
        message.config({
            top: 50,
            duration: 2,
            maxCount: 3,
            rtl: true,
        });
        if (data.status >= 0) {
            if(data.data.userType===0)
            {
                this.setState({isAuthed: true, hasAuthed: true,isAdmin:false});
                message.error(data.msg);
            }
            else {
                this.setState({isAuthed: true, hasAuthed: true, isAdmin:true});
                message.success(data.msg);
            }

        } else {
            message.error(data.msg);
            localStorage.removeItem('user');
            this.setState({isAuthed: false, hasAuthed: true});
        }

    };


    componentDidMount() {
        userService.checkAdmin(this.checkAdmin);
    };

    render() {

        const {component: Component, path:path,exact=false,strict=false} = this.props;
        // const Component=this.props.component;
        // const path=this.props.path;
        // const exact=this.props.exact;

        console.log(this.state.isAdmin);

        if (!this.state.hasAuthed) {
            return null;
        }

        return <Route path={path} exact={exact}  render={props => (

            this.state.isAdmin ? (
               <Component {...props}/>

            ) : (
                <Redirect to={{
                    pathname: '/',
                    state: {from: props.location}
                }}/>
            )
        )}/>
    }
}

