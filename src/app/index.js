import React, { useState } from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import './style.css';
import HomePage from '../homePage/index';

const { Header, Sider, Content } = Layout;

const routerList = [
  {key: 'UserManage', path: '/UserManage'}
]

function Index() {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout id="components-layout-demo-custom-trigger">
      <Router>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">React Awesome</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/">HomePage</Link>
            </Menu.Item>
            {routerList.map((item) => (
              <Menu.Item key={item.key} icon={<VideoCameraOutlined />}>
                <Link to={item.path}>{item.key}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route exact path="/" component={HomePage}>
              </Route>
              {routerList.map((item) => (
                <Route key={item.key} exact path={item.path} component={Loadable({
                  loader: () => import(`../${item.key}`),
                  loading: () => (<LoadingOutlined />),
                })}>
                </Route>
              ))}
            </Switch>
          </Content>
        </Layout>
      </Router>
    </Layout>
  )
}

export default Index;