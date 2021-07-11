import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  BarChartOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "../styles/wrapper.css";

const { Header, Footer, Sider, Content } = Layout;

function Wrapper(props) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={
          setCollapsed
        }
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<BarChartOutlined />}>
            nav 4
          </Menu.Item>
        </Menu>
      </Sider>
			<Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>{props.Header}</Header>
          <Content style={{ margin: '0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {props.children}
            </div>
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>Microsoft Engage ©2021 Created by stuts</Footer> */}
      </Layout>
    </Layout>
  );
}

export default Wrapper;
