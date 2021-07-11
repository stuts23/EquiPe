import React from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios';
import Cookies from "js-cookie";

const { SubMenu } = Menu;

class Channel2 extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      chats: [],
    };
  }

  // componentDidMount() {

  //   var config = {
  //     method: "get",
  //     url: "http://localhost:3000/api/v1/users/channels",
  //     headers: {
  //       Authorization: `Bearer ${Cookies.get("token")}`,
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   axios(config).then(res => {
  //     console.log(res)
  //     this.setState({altdata: res.data, data: res.data.filter(obj => obj?.server_id===this.props.team)})

  //   })
  // }

  handleClick = e => {

    //console.log('click ', e);
    this.props.setChannel(e.key)

    var config = {
      method: "get",
      url: "http://localhost:3000/api/v1/users/prevchats",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    };

    axios(config).then(res => {
      //console.log(res)
      //this.setState({altdata: res.data, chats: res.data.filter(obj => obj?.channel_id===e.key)})
      this.props.setChats(res.data.filter(obj => obj?.channel_id===e.key))
    })

  };

  render() {
    //console.log(this.props.channel)
    //console.log(this.state)
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        {this.props.channels?this.props.channels.map(ch => {
          
         return <Menu.Item key={ch.channel_id} icon={<MailOutlined />} title={ch.channel_name}>{ch.channel_name}</Menu.Item>
        })
      :null}
  
       
      </Menu>
    );
  }
}

export default Channel2;