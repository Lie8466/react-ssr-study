import Home from './containers/Home';
import Login from './containers/Login';

export default [
	{
		path: '/',
    component: Home,
    loadData: Home.loadData,
    exact: true,
    key: 'home'
  }, {
		path: '/login',
    component: Login,
    exact: true,
    key: 'login'
  }
];