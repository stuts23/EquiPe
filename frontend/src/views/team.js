import React, { useState } from "react";
import Wrapper2 from "../components/wrapper2";
import { Row, Col } from "antd";
import Channels from "../components/channels";
import Channel2 from "../components/channel2";
import Chat from "../components/chat";
import "../styles/wrapper2.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, PlusOutlined } from "@ant-design/icons";
import FormItem from "antd/lib/form/FormItem";
import io from "socket.io-client";

var baseUrl = "http://localhost:3000";

const Team = () => {
  let socket = io.connect(baseUrl);

  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState("");
  const [team, setTeam] = useState("");

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

  return (
    <Wrapper2 setTeam={setTeam}>
      <Row gutter={[16, 0]}>
        <Col span={6}>
          <div className="scrollable-view">
            <Channel2 channel={channel} setChannel={setChannel} team={team}/>
          </div>
          <Row gutter={[8, 0]}>
            <Col span={20}>
              <Form>
                <Form.Item name="message">
                  <Input placeholder="Create Channel" />
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
                  />
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col span={18}>
          <div className="scrollable-view">
            <Chat channel={channel} socket={socket} />
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
