import React from "react";
import { observer } from "mobx-react";
import { getFormatDate } from "../../../utils/date";
import "./style.css";
import { List,Icon } from 'antd';
const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
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
              title={<a>{post.title}</a>}
              description={ <span>更新时间：<span>{getFormatDate(post.updatedAt)}</span> </span>}
          />
          作者：{post.author.username}
      </List.Item>
  );
}

export default observer(PostItem);
