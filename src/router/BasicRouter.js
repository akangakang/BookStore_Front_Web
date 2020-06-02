import React from 'react';

import Home from '../discard/Home'



import {HashRouter, Route, Switch} from 'react-router-dom';
import Store from "../view/Store";
import Register from "../view/Register";
import Cart from "../view/Cart"
import Login from "../view/Login";
import BookDetail from "../view/BookDetail"
import LoginRoute from "./LoginRoute";
import PrivateRoute from "./PrivateRoute";
import OrderView from "../discard/Order";
import OrderView1 from "../view/OrderView";
import HomeView from "../view/HomeView";
import bookManage from "../view/BookManage";
import userManage from "../view/UserManage";
const BasicRouter = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={HomeView}/>
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/store" component={Store}/>
            <Route exact path="/register" component={Register}/>
            <PrivateRoute exact path="/cart" component={Cart}/>
            <Route exact path="/getBookDetails" component={BookDetail}/>
            <PrivateRoute exact path="/order" component={OrderView1}/>
            <PrivateRoute exact path="/bookManage" component={bookManage}/>
            <PrivateRoute exact path="/userManage" component={userManage}/>
        </Switch>
    </HashRouter>
);


export default BasicRouter;
//import {history} from "./history";

// class BasicRoute extends React.Component{
//
//     constructor(props) {
//         super(props);
//
//         history.listen((location, action) => {
//             // clear alert on location change
//             console.log(location,action);
//         });
//     }
//
//     render(){
//         return(
//             <Router history={history}>
//                 <Switch>
//                     <Route exact path="/" component={Home} />
//                     <Route exact path="/login" component={Login} />
//                     <Redirect from="/*" to="/" />
//
//                 </Switch>
//
//             </Router>
//         )
//     }
//
//
// }
//
// export default BasicRoute;
