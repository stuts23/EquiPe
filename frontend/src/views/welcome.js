import React from "react";
import Wrapper2 from "../components/wrapper2";
import { Row, Col } from "antd";
import "../styles/welcome2.css";
import { Typography } from "antd";
import { Button } from "antd";
import { TeamOutlined, VideoCameraFilled } from "@ant-design/icons";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import axios from "axios";
import welcome_image from "../assets/welcome_image.png";

const { Title, Text } = Typography;

function Welcome() {
  const history = useHistory();
  const handleSubmit = async () => {
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

    history.push(`/call/${data}`);
  };

  return (
    <Wrapper2>
      <Row>
        <Col span={14}>
        <Row span={24} gutter={[0, 64]} style={{ marginTop: "4rem" }}>
          <Title>
            <span style={{ color: "#001529" }}>Welcome to Connect App!</span>
          </Title>
        </Row>
        <Row span={24} style={{ marginBottom: "4rem" }}>
          <Col span={24}>
            <Text>
              <span style={{ fontSize: "1.4rem" }}>
                It is a new way to communicate and collaborate with your team.
                It’s faster, better organized, and more efficient.
              </span>
            </Text>
          </Col>
        </Row>
        <Row align="middle" gutter={[12]} wrap>
          <Col span={5.5}>
            <Button
              type="primary"
              icon={<VideoCameraFilled />}
              size="large"
              onClick={handleSubmit}
            >
              Start Instant Call
            </Button>
          </Col>
          <Col span={1}>
            <p style={{ textAlign: "center", margin: "0" }}>or</p>
          </Col>
          <Col span={5.5}>
            <Button ghost type="primary" icon={<TeamOutlined />} size="large">
              Explore Teams
            </Button>
          </Col>
        </Row>
        </Col>
        <Col span={3}>
          <div>
          <img className="photo" src={welcome_image} alt='welcomeimg' wrap>
          </img>
          </div>
        </Col>
      </Row>
    </Wrapper2>
  );
}

export default Welcome;
