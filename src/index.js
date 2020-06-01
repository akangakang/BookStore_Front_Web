import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Store from "./view/Store";
import Register from './view/Register'
import Home from './view/Home'
import * as serviceWorker from './serviceWorker';
import Nar1 from "./components/NarBar";
import Login from './view/Login';
import BasicRouter from './router/BasicRouter'
import store from './view/Store'
// ReactDOM.render(<Register />,document.getElementById('root'));

// ReactDOM.render(<Store />,document.getElementById('root'));
// //
ReactDOM.render(< BasicRouter />,document.getElementById('root'));
// ReactDOM.render(<Nar1/>,document.getElementById('root'));
// ReactDOM.render(<Home />,document.getElementById('root'));
// ReactDOM.render(<Login/>,document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
