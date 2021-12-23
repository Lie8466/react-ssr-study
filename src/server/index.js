import express from 'express';
import { matchRoutes } from 'react-router-config'
import { render } from './utils';
import { getStore } from '../store';
import routes from '../Routes';

const app = express();
app.use(express.static('public'));

app.get('*', function (req, res) {
	const store = getStore();
	// // 根据路由的路径，来往store里面加数据
	const matchedRoutes = matchRoutes(routes, req.path);
	// 让matchRoutes里面所有的组件，对应的loadData方法执行一次
	const promises = [];
	matchedRoutes.forEach(item => {
		if (item.route.loadData) {
			promises.push(item.route.loadData(store))
		}
	})
	Promise.all(promises).then(() => {
		res.send(render(store, routes, req));
	})
});

var server = app.listen(3000);