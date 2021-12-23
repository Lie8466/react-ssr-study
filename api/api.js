const express = require('express');
const app = express();
//引入url包
const url = require('url');
const port = 1300;

app.use(express.json());

const formatStr = (s) => {
    return `00${s}`.substr(-2);
};

const getFormattedDate = () => {
    const date = new Date();
    const str = `${date.getFullYear()}-${formatStr(date.getMonth() + 1)}-${formatStr(date.getDate())}`
                + ` ${formatStr(date.getHours())}:${formatStr(date.getMinutes())}:${formatStr(date.getSeconds())}`;
    return str;
}

const list = [{
    name: 'Lily',
    id: '1'
}, {
    name: 'Tom',
    id: '2'
}, {
    name: 'Jerry',
    id: '3'
}];

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});


app.get('/content', (req, res) => {
    try {
        res.send(JSON.stringify({
            code: 0,
            result: `Next.js gives you the best developer experience with all the features you need for production ${getFormattedDate()}`
        }));
    } catch (e) {
        console.log(e);
        res.send(JSON.stringify({
            code: -1
        }));
    }

});


app.get('/get-list', (req, res) => {
    try {
        res.send(JSON.stringify({
            code: 0,
            result: list,
            timeStr: getFormattedDate()
        }));
    } catch (e) {
        console.log(e);
        res.send(JSON.stringify({
            code: -1
        }));
    }

});

app.get('/get-detail', (req, res) => {
    try {
        const path = url.parse(req.url, true);
        const query = path.query || {};
        const id = query.id;
        const detail = list.find(i => i.id === id);
        if (detail) {
            res.send(JSON.stringify({
                code: 0,
                result: detail
            }));
            return;
        }
        res.send(JSON.stringify({
            code: -1
        }));
    } catch (e) {
        console.log(e);
        res.send(JSON.stringify({
            code: -1
        }));
    }

});


app.get('*', (req, res) => {
    try {
        res.send(`<html><head><title>接口说明</title></head><body>`
                + `<div id="root">使用 /get-list 获取列表数据， 使用 /get-detail?id=1 获取详情数据 </div></body></html>`)
    } catch (e) {
        console.log(e);
        res.send('出错了!' + JSON.stringify(e))
    }

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})