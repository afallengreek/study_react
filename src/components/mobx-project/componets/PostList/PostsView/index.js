import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from "react-router-dom";
import PostItem from "../PostItem";
import { List, Avatar, Icon } from 'antd';

@observer
class PostsView extends Component {
  render() {
    const { posts } = this.props;
    return (
        <List
            itemLayout="vertical"
            // size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 10,
            }}
            dataSource={posts.slice()}
            footer={
                <div>
                    <b>发表自己的看法</b>
                </div>
            }
            renderItem={item => (
               <PostItem post={item}/>
            )}
        />
    );
  }
}

export default PostsView;