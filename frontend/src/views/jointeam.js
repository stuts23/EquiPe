import React, {useState} from "react";
import Wrapper2 from "../components/wrapper2";
import { Row, Col } from "antd";
import { Input, Button, Typography } from 'antd';
import join_team from "../assets/join_team.png";
import axios  from "axios";
import Cookies from 'js-cookie';

const { Title } = Typography;

function JoinTeam() {
	const [teamname, setTeamname] = useState('')
	const [teamid, setTeamid] = useState('')
	const [newteam, setNewteam] = useState('')

	const handleTeamJoin = () => {
		let data = JSON.stringify({serverId: newteam })
		let config = {
		  method: "post",
		  url: "/api/v1/users/team/join",
		  headers: {
			Authorization: `Bearer ${Cookies.get("token")}`,
			"Content-Type": "application/json"},
	
		  data: data,
		
		};
	
		axios(config).then(res => {
		  console.log(res)
		  //setChannels(res.data.filter(obj => obj?.server_id===team));
		  //this.setState({altdata: res.data, data: res.data.filter(obj => obj?.server_id===this.props.team)})
		  alert('You have successfully joined the team');
		  window.location.reload()
		})
	}

	const handleTeamCreate = () => {
		let data = JSON.stringify({serverId: teamid, serverName:teamname})
		let config = {
		  method: "post",
		  url: "/api/v1/users/team/create",
		  headers: {
			Authorization: `Bearer ${Cookies.get("token")}`,
			"Content-Type": "application/json"},
	
		  data: data,
		
		};
	
		axios(config).then(res => {
		  console.log(res)
		  //setChannels(res.data.filter(obj => obj?.server_id===team));
		  //this.setState({altdata: res.data, data: res.data.filter(obj => obj?.server_id===this.props.team)})
		  alert('Team is successfully created!');
		  window.location.reload()
		})

		.catch(err => {
			alert('Team id already exists!');
		})


	}

  return (
	<Wrapper2>
    <Row guuter={[64, 0]}>
			<Col span={12}> 
			<Row>
				<Title>Join Team</Title>
			</Row>
			<Row>
			<span style={{ marginBottom: "2rem" }}>
				<img alt={"join team"} src={join_team}>
				</img>
				</span>
			</Row>
			<Row gutter={[0, 16]}>
				<Col span={16}>
			<Input placeholder="Team Id" onChange={(e) => setTeamid(e.target.value)} value={teamid}/>
			<Input placeholder="Team Name" onChange={(e) => setTeamname(e.target.value)} value={teamname}/>
			<Button type="primary" onClick={() => handleTeamCreate()}>
          Create Team
        </Button>
				</Col>
			</Row>
	
			</Col>
			<Col span={12}> 
			<Row>
				<Title>Create Team</Title>
			</Row>
			<Row>
			<span style={{ marginBottom: "2rem" }}>
				<img alt={"join team"} src={join_team}>
				</img>
				</span>
			</Row>
			<Row gutter={[0, 16]}>
		
			<Col span={16}>
			<Input placeholder="Team Id" onChange={(e) => setNewteam(e.target.value)} value={newteam}/>
			<Button type="primary" onClick={() => handleTeamJoin()}>
          Join Team
        </Button>
		</Col>
		
			</Row>
			</Col>

		{/* <Col span={12}>
		<Input size="large" placeholder="Copy link to Join Team" />
		</Col>
		<Col span={6}>
		<Button type="primary" size="large">
          Join Team
        </Button>
		</Col>
		</Row>
		<Row>
		<Col span={15}>
		<Divider plain>or</Divider>
		</Col> */}
		</Row>

	</Wrapper2>
		
		);
}

export default JoinTeam;
