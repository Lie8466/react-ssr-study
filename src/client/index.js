import React from 'react';
import ReactDom from 'react-dom';

import Home from '../features/Home';

// https://reactjs.org/docs/react-dom.html#render 认为元素已经在服务端渲染过，会做一些增加事件的操作
ReactDom.hydrate(<Home />, document.getElementById('root'))