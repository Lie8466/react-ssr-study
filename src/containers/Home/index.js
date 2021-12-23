import React, { Component } from 'react';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { getHomeList } from './store/actions';

class Home extends Component {

	getList() {
		const { list } = this.props;
		return list.map(item => <div key={item.id}>{item.name}</div>)
	}

	render() {
		return (
			<div>
				<Header />
				{this.getList()}
				<button onClick={()=>{alert('click1')}}>
					click
				</button>
			</div>
		)
	}

	componentDidMount() {
		this.props.getHomeList();
	}
}

Home.loadData = (store) => {
	// 这个函数，负责在服务器端渲染之前，把这个路由需要的数据提前加载好
	return store.dispatch(getHomeList())
}

const mapStateToProps = state => ({
	list: state.home.newsList
});

const mapDispatchToProps = dispatch => ({
	getHomeList() {
		dispatch(getHomeList());
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
