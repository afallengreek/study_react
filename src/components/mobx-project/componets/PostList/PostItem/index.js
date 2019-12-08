import React from "react";
import { observer } from "mobx-react";
import { getFormatDate } from "../../../utils/date";
import "./style.css";
import {List, Icon, Tooltip} from 'antd';
import {Link} from "react-router-dom";
const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 ,color:"red"}} />
        {text}
  </span>
);
function PostItem(props) {
  const { post } = props;
  return (
      <List.Item
          key={post.title}
          actions={[
              <IconText type="like-o" text="156" key="list-vertical-like-o" />,
          ]}
          extra={
              <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
          }
      >
          <List.Item.Meta
              title={<Tooltip title={"点击查看详情"}>
                  <Link to={`/mobxProject/posts/${post.id}`}
                        onClick={()=>{setTimeout(()=>window.location.reload(),100);}}>{post.title}</Link></Tooltip>}
              description={ <span>更新时间：<span>{getFormatDate(post.updatedAt)}</span> </span>}
          />
          作者：{post.author.username}
      </List.Item>
  );
}

export default observer(PostItem);
