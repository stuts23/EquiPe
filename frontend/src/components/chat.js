import React from "react";
import { List, message, Avatar, Spin } from "antd";
import { Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

import reqwest from "reqwest";

import WindowScroller from "react-virtualized/dist/commonjs/WindowScroller";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import VList from "react-virtualized/dist/commonjs/List";
import InfiniteLoader from "react-virtualized/dist/commonjs/InfiniteLoader";

const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

class Chatpage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      altdata: [],
      prevChats: [],
    };
  }

  loadedRowsMap = {};

  handleUpdate = (msg) => {
    const { data } = this.state;
    //console.log("update recieved");
    //console.log(data, msg);

    //data.push(msg)

    // let processdata = data.filter(obj => obj.channel===this.props.channel);
    // processdata.push(msg)
   //console.log(this.state.altdata)
    let newdata=this.state.altdata
    //console.log(this.state.altdata)
    newdata.push(msg)
    let testdata = newdata.filter(obj => obj?.channel_id===this.props.channel)
    //console.log(processdata)
    //console.log(newdata, this.state.altdata, testdata)

    this.setState((prevState) => {
      //console.log(newdata)
      return {
        ...prevState,
        data: testdata,
        altdata: newdata,
      };
    });
  }

  componentDidMount() {

      // var config = {
      //   method: "get",
      //   url: "http://localhost:3000/api/v1/users/prevchats",
      //   headers: {
      //     Authorization: `Bearer ${Cookies.get("token")}`,
      //     "Content-Type": "application/json",
      //   },
      // };
  
      // axios(config).then(res => {
      //   console.log(res)
      //   this.setState({altdata: res.data, data: res.data.filter(obj => obj?.channel_id===this.props.channel)})
  
      // })
      
    this.setState({data: this.props.chats})
    //console.log(this.props.chats)
    this.props.socket.on("update", this.handleUpdate);
    // this.fetchData((res) => {
    //   this.setState({
    //     data: res.results,
    //   });
    // });

    this.handleUpdate();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        prevChats: nextProps.chats
      }
    )
    if(this.state.prevChats.length!==nextProps.chats.length){
      this.setState({
        data: nextProps.chats
      })
    }
    console.log(nextProps)
  }
  
  fetchData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: "json",
      method: "get",
      contentType: "application/json",
      success: (res) => {
        callback(res);
      },
    });
  };

  handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });
    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      this.loadedRowsMap[i] = 1;
    }
    if (data.length > 0) {
      message.warning("Virtualized List loaded all");
      this.setState({
        loading: false,
      });
      return;
    }
    
  };

  isRowLoaded = ({ index }) => !!this.loadedRowsMap[index];

  renderItem = ({ index, key, style }) => {
    const { data } = this.state;
    const item = data[index];
    //console.log(item)
    return (
      <List.Item key={key} style={style}>
        <List.Item.Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={<a href="https://ant.design">{item.user_name}</a>}
        
        />
        <div>{item.msg}</div>
      </List.Item>
    );
  };

  render() {
    //console.log(this.state)
    const { data } = this.state;
    const vlist = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
      onRowsRendered,
      width,
    }) => (
      <VList
        autoHeight
        height={height}
        isScrolling={isScrolling}
        onScroll={onChildScroll}
        overscanRowCount={2}
        rowCount={data.length}
        rowHeight={73}
        rowRenderer={this.renderItem}
        onRowsRendered={onRowsRendered}
        scrollTop={scrollTop}
        width={width}
      />
    );
    const autoSize = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
      onRowsRendered,
    }) => (
      <AutoSizer disableHeight>
        {({ width }) =>
          vlist({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered,
            width,
          })
        }
      </AutoSizer>
    );
    const infiniteLoader = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
    }) => (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.handleInfiniteOnLoad}
        rowCount={data.length}
      >
        {({ onRowsRendered }) =>
          autoSize({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered,
          })
        }
      </InfiniteLoader>
    );
    return (
      <Col>
        <List>
          {data.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
          {this.state.loading && <Spin className="demo-loading" />}
        </List>
      </Col>
    );
  }
}

export default Chatpage;
