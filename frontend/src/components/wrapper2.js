import React from "react";
import { Layout, Menu } from "antd";
import {
  FileOutlined,
  TeamOutlined,
  VideoCameraFilled,
  HomeOutlined
} from "@ant-design/icons";
import "../styles/wrapper2.css";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
	
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleClick = (e) => {
    this.props.setTeam(e.key)
    console.log('clicked');
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" >
            <Menu.Item key="1" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <SubMenu key="sub1" icon={<TeamOutlined />} title="Teams">
              
              <Menu.Item key="team1" onClick={this.handleClick}>Team 1</Menu.Item>
             
              <Menu.Item key="team2" onClick={this.handleClick}>Team 2</Menu.Item>
              <Menu.Item key="team3" onClick={this.handleClick}>Team 3</Menu.Item>
            </SubMenu>
            {/* <SubMenu key="sub2" icon={<UserOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu> */}
            <Menu.Item key="9" icon={<VideoCameraFilled />}>
              Instant Call
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 'calc(100vh - 64px)' }}
            >
              {this.props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;
