import React from "react";
import Wrapper2 from "../components/wrapper2";
import { Row, Col } from "antd";
import "../styles/welcome2.css";
import { Typography } from "antd";
import { Button } from "antd";
import { TeamOutlined, VideoCameraFilled } from "@ant-design/icons";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import welcome_image from "../assets/welcome_image.png";


const { Title, Text } = Typography;

function Welcome() {
  //const history = useHistory();
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

    window.open(`/call/${data}`, "_blank");
  };


  return (
    <Wrapper2>
      <Row>
        <Col span={14}>
        <Row span={24} gutter={[0, 64]} >
          <Title>
            <span style={{ color: "#001529" }}>Welcome to équipe!</span>
          </Title>
        </Row>
        <Row span={24} style={{ marginBottom: "4rem" }}>
          <Col span={24}>
            <Text>
              <span style={{ fontSize: "1.4rem" }}>
              Equipe is new hub to communicate and collaborate with your team in seamless manner.
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
            <Link to="/jointeam"> 
            <Button ghost type="primary" icon={<TeamOutlined />} size="large">
              Join/Create Teams
            </Button>
            </Link>
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
