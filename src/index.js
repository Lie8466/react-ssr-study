import express from 'express';
import React from 'react';
// IMP: 需要使用react-dom/server. 虚拟DOM为react实现客户端和服务端渲染提供了很大的便利性
import { renderToString } from 'react-dom/server';
import Home from './features/Home';

const app = express();
const content = renderToString(<Home />);
const port = 3000

console.log(content);

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.end(`
		<html>
			<head>
				<title>ssr</title>
			</head>
			<body>
                <div id="root">${content}</div>
			</body>
		</html>
  `);
});

var server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});