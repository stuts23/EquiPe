import React from "react";
import { Layout, Menu } from "antd";
import {
  TeamOutlined,
  VideoCameraFilled,
  HomeOutlined,
  UsergroupAddOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import "../styles/wrapper2.css";
import axios from "axios";
import Cookies from "js-cookie";
import {Link, Redirect, withRouter} from 'react-router-dom';



const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;



class SiderDemo extends React.Component {



  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      team: [],
      
    };
	
  }
  onCollapse = (collapsed) => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };

  handleGetdata = () => {
    let config = {
      method: "get",
      url: "/api/v1/users/team/fetch",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    };

    axios(config).then(res => {
      console.log(res)
      this.setState({team : res.data});
      //this.setState({altdata: res.data, data: res.data.filter(obj => obj?.server_id===this.props.team)})
 })
  }

  componentDidMount() {
   this.handleGetdata();
  };

  handleClick = (e, teamId) => {
    //this.props.setTeam(teamId)
    this.props.history.push(`/team/${teamId}`)
  };

  handleLogout = () => {
    Cookies.remove("token");
    window.location.reload();
  };

  handleSubmit = async () => {
    var config = {
      method: "post",
      url: "/api/v1/openvidu/create",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      data: {},
    };

    const { data } = await axios(config);

    window.open(`/call/${data}`, "_blank");
  };
  
  // loadTeams = () => {
  //   this.setState({redirect: true});
  // }

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {

    const { collapsed } = this.state;

    if (this.state.redirect) {
      return <Redirect push to="/sample" />;
    }
  
    
    return (


      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark"  mode="inline" >
          
            <Menu.Item key="1" icon={<HomeOutlined />} >
            <Link to="/welcome">
              Home
              </Link>
            </Menu.Item>
            
            <SubMenu key="sub1" icon={<TeamOutlined />} title="Teams">
            {this.state.team?this.state.team.map (team => {
               return <Menu.Item id={team.server_id} onClick={(e) => {this.handleClick(e, team.server_id)}}>{team.server_id}</Menu.Item>
            }): null}
            </SubMenu>
            
            <Menu.Item key="9" icon={<UsergroupAddOutlined />}>
            <Link to="/jointeam">
              Join Team
              </Link>
            </Menu.Item>
            
            <Menu.Item key="10" icon={<VideoCameraFilled/>} onClick={this.handleSubmit}>
              Instant Call
            </Menu.Item>
            <Menu.Item key="11" icon={<LogoutOutlined/>}>
              <span onClick={this.handleLogout}>
              Logout
              </span>
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

export default withRouter(SiderDemo);
