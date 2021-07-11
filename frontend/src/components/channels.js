import React from "react";
import { List, Typography, Divider } from 'antd';
import { Row, Col } from "antd";

const data = [
  'channel1',
  'channel2',
  'channel3',
  'channel4',
  'channel5',
];

function Channels() {
return(
    <Col>
    <List
      size="small"
      header={<div>Channels</div>}
      bordered
      dataSource={data}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
    </Col>

)
};

export default Channels;