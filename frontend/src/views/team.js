import React, { useState, useEffect } from "react";
import Wrapper2 from "../components/wrapper2";
import { Row, Col } from "antd";
import Channel2 from "../components/channel2";
import Chat from "../components/chat";
import "../styles/wrapper2.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, PlusOutlined } from "@ant-design/icons";
import FormItem from "antd/lib/form/FormItem";
//import io from "socket.io-client";

import axios from "axios";
import Cookies from "js-cookie";

const io = require("socket.io-client")("", {
});
var baseUrl = "";

const Team = () => {
  let socket = io.connect(baseUrl, { transports: ["websocket", "polling"] });

  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState("");
  const [team, setTeam] = useState("");
  const [channels, setChannels] = useState([]);
  const [chats, setChats] = useState([]);
  const [newchannel, setNewchannel] = useState([]);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    socket.emit("simple-chat-message", {
      channel_id: channel,
      msg: message,
      user_name: "stuts",
    });
  };

  useEffect(() => {
    let config = {
      method: "get",
      url: "/api/v1/users/channels",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    };

    axios(config).then((res) => {
      //console.log(res)
      setChannels(res.data.filter((obj) => obj?.server_id === team));
      //this.setState({altdata: res.data, data: res.data.filter(obj => obj?.server_id===this.props.team)})
    });
  }, [channels, team]);

  const handleChannelCreate = () => {
    let data = JSON.stringify({
      channelId: newchannel,
      channelName: newchannel,
      serverId: team,
    });
    let config = {
      method: "post",
      url: "/api/v1/users/channel/create",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },

      data: data,
    };

    axios(config).then((res) => {
      console.log(res);
      //setChannels(res.data.filter(obj => obj?.server_id===team));
      //this.setState({altdata: res.data, data: res.data.filter(obj => obj?.server_id===this.props.team)})
    });
  };

  return (
    <Wrapper2 setTeam={setTeam}>
      <Row>
        <Col span={19}></Col>
        <Col span={3}>
        <Button ghost type="primary" htmlType="submit">
         Invite to  Team
        </Button>
        </Col>
        <Col span={2}>
        <Button type="primary" htmlType="submit">
          Start Call
        </Button>
        </Col>
      </Row>
      <Row gutter={[16, 0]}>
        <Col span={6}>
          <div className="scrollable-view">
            <Channel2
              channel={channel}
              setChannel={setChannel}
              team={team}
              channels={channels}
              setChats={setChats}
            />
          </div>
          <Row gutter={[8, 0]}>
            <Col span={20}>
              <Form>
                <Form.Item name="message">
                  <Input
                    placeholder="Create Channel"
                    onChange={(e) => setNewchannel(e.target.value)}
                    value={newchannel}
                  />
                </Form.Item>
              </Form>
            </Col>
            <Col span={4}>
              <Form>
                <Form.Item name="message">
                  <Button
                    ghost
                    type="primary"
                    htmlType="submit"
                    icon={<PlusOutlined />}
                    onClick={handleChannelCreate}
                  />
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col span={18}>
          <div className="scrollable-view">
            <Chat channel={channel} socket={socket} chats={chats} />
          </div>
          <Row gutter={[8, 0]}>
            <Col span={22}>
              <Form>
                <Form.Item name="message">
                  <Input
                    onChange={handleMessage}
                    placeholder="What's on your mind..."
                  />
                </Form.Item>
              </Form>
            </Col>
            <Col span={2}>
              <Form>
                <Form.Item name="message">
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={sendMessage}
                  >
                    Send
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper2>
  );
};

export default Team;
