/**
 * @description 树控件
 * @author 李艳
 */
import React,{Component} from "react";
import {Input, Tree, Card,message} from "antd";
import {hide, show} from "../../configs/SharedReducer";
import connect from "react-redux/es/connect/connect";
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import ReactDOM from "react-dom";
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

class StandardTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dadaSource: [],
      searchValue: "",
      findResultData: [],
      autoExpandParent: true,
      expandedKeys: [],
      selectedKeys: [],
      selectedNodes: {},
      loading: false,
      yHeight: null,
    }
  }

  updateSize = () => {
    if (this.simpleDiv) {
      let yHeight = document.body.clientHeight - this.getElementTop(this.simpleDiv) - 5;
      let scrollY = (this.props.heightY ? (this.props.heightY + 12) : (yHeight - 83));
      this.setState({scrollY},() => {
            this.ps && this.ps.update();
      })
    }
  }

  getElementTop = (element) => {
    if (element) {
      let actualTop = element.offsetTop;
      let current = element.offsetParent;

      while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }
      return actualTop;
    }
    return 0;
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize);
  }

  componentDidMount() {
    this.updateSize();
    window.addEventListener('resize', this.updateSize);
  }
   wrappedScroller = () => {
      if (this.ps) {
          this.ps.destroy();
          this.ps = null;
      }
     const simpleDivDom = ReactDOM.findDOMNode(this.simpleDiv);
      this.ps = new PerfectScrollbar(simpleDivDom);
      this.ps && this.ps.update();
    }
  componentWillReceiveProps(nextProp) {
    let {dadaSource} = nextProp;
    if(!(dadaSource instanceof Array)){
      dadaSource=[dadaSource];
    }
    if (this.state.dada !== dadaSource) {
      this.setState({dadaSource},()=>this.wrappedScroller())
    }
  }

  //树节点选择触发
  onSelect = (selectedKeys) => {
    this.setState({selectedKeys});
    let selectedNodes = getNodesByKeys(this.state.dadaSource, selectedKeys);
    if (this.props.onSelect) {
      this.props.onSelect(selectedKeys, selectedNodes)
    }
  };
  onCheck = (selectedKeys) => {
    let selectedNodes = getNodesByKeys(this.state.dadaSource, selectedKeys);
    if (this.props.onCheck) {
      this.props.onCheck(selectedKeys, selectedNodes)
    }
  };

  //查找树节点
  handleSearch = (value) => {
    let dadaSource = JSON.parse(JSON.stringify(this.state.dadaSource));
    let findResultData = this.findNode(value, dadaSource);
    this.keyList = [];
    this.getExpandedKeys(findResultData);
    let expandedKeys = this.keyList;
    if (value === "") {//没有搜索关键字
      this.setState({
        findResultData: findResultData,
        searchValue: value,
        autoExpandParent: false,
        expandedKeys: []
      })
    } else {
      this.setState({
        findResultData: findResultData,
        searchValue: value,
        autoExpandParent: true,
        expandedKeys: expandedKeys
      })
    }
  };

  getExpandedKeys = (data) => {
    for (let item of data) {
      this.keyList.push(item.id);
      if (item.children && item.children.length > 0) {
        this.getExpandedKeys(item.children)
      }
    }
  };

  //树控件展开时
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  //查找关键字节点
  findNode = (value, tree) => {
    return tree.map(treeNode => {
      //如果有子节点
      if (treeNode.children && treeNode.children.length > 0) {
        treeNode.children = this.findNode(value, treeNode.children);
        //如果标题匹配
        if (treeNode.name.indexOf(value) > -1) {
          return treeNode
        } else {//如果标题不匹配，则查看子节点是否有匹配标题
          treeNode.children = this.findNode(value, treeNode.children);
          if (treeNode.children && treeNode.children.length > 0) {
            return treeNode
          }
        }
      } else {//没子节点
        if (treeNode.name.indexOf(value) > -1) {
          return treeNode
        }
      }
    }).filter((treeNode, i, self) => treeNode)
  };

  renderTreeNodes = (data) => {
    return data.map((item) => {
      const i = item.name.indexOf(this.state.searchValue);
      const beforeStr = item.name.substr(0, i);
      const afterStr = item.name.substr(i + this.state.searchValue.length);
      const name = i > -1 ? (
        <span>
                    {beforeStr}
          <span style={{color: '#f50'}}>{this.state.searchValue}</span>
          {afterStr}
                </span>
      ) : <span>{item.name}</span>;
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode title={name} key={item.id}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={name} key={item.id} isLeaf/>;
    });
  };
  //移动节点
  onDrop = (info) => {

    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    //const dropPos = info.node.props.pos.split('-');
    //const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    // let params = {nodeId: dragKey, targetParentId: dropKey};
    const loop = (data, id, callback) => {
      data.forEach((item, index, arr) => {
        if (item.id === id) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, id, callback);
        }
      });
    };
    let params = {};
    const data = [...this.state.dadaSource];
    let dragNode = getNodeByKey(data, dragKey);
    if (!dragNode.parentId) {
      message.error(seiIntl.get({key: 'gwmBdm_000082', desc: '无法移动根节点！'}));
      return;
    }
    let node = getNodeByKey(data, dropKey);
    if (info.dropToGap) {
      if (!node.parentId) {
        message.error(seiIntl.get({key: 'gwmBdm_000083', desc: '无法将节点设置为根节点！'}));
        return;
      } else {
        params = {nodeId: dragKey, targetParentId: node.parentId};
      }

    } else {
      params = {nodeId: dragKey, targetParentId: dropKey};
    }
    if (this.props.moveService) {
      this.props.moveService(params).then((result) => {
        if (result.status === "SUCCESS") {
          message.success(result.message ? result.message : seiIntl.get({key: 'gwmBdm_000084', desc: '移动成功'}));
          // 更新本地树,有时后台获取的数据格式不一样，交给外层处理
          if (this.props.initService) {
            this.props.initService()
          }
        } else {
          message.error(result.message ? result.message : seiIntl.get({key: 'gwmBdm_000085', desc: '移动失败'}))
        }
      }).catch(err => {
      }).finally(() => {
      });
    }

  };

  render() {
    return (
      <div>
        <div className={'tbar-box'}>
          <div className={'tbar-btn-box'}>&nbsp;{this.props.leftExtra ? this.props.leftExtra : ""}</div>
          <div className={'tbar-search-box'}>
            <Search
              key="search"
              placeholder={seiIntl.get({key: 'gwmBdm_000086', desc: '输入名称查询'})}
              onSearch={e => this.handleSearch(e)}
              style={{width: 220}}
              allowClear
            />
          </div>
        </div>
        <div ref={(div) => this.simpleDiv = div}  style={{position: "relative"}}>
          <Card style={{height: (this.state.scrollY||0) + 70}} bordered={false} bodyStyle={{padding: "0 0px 0px 30px"}}>
          {this.state.dadaSource.length > 0 ? (
              <DirectoryTree
                checkedKeys={this.props.selectedKeys?this.props.selectedKeys:this.state.selectedKeys}
                checkStrictly={this.props.checkStrictly||false}
                expandAction={"doubleClick"}
                onSelect={this.onSelect}
                autoExpandParent={this.state.autoExpandParent}
                expandedKeys={this.state.expandedKeys}
                onExpand={this.onExpand}
                onDragEnter={this.onDragEnter}
                checkable={this.props.checkable ? this.props.checkable : false}
                onCheck={this.onCheck}
                draggable={this.props.draggable !== false}
                onDrop={this.onDrop}>
                {this.renderTreeNodes(this.state.searchValue === "" ? this.state.dadaSource : this.state.findResultData)}
              </DirectoryTree>
          ) : null}
          </Card>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    show: () => {
      dispatch(show())
    },
    hide: () => {
      dispatch(hide())
    },
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StandardTree)

export function getNodeByKey(dadaSource, key) {
  for (let item of dadaSource) {
    if (item.id === key) {
      return item
    } else {
      if (item.children && item.children.length > 0) {
        if (getNodeByKey(item.children, key)) {
          return getNodeByKey(item.children, key);
        }
      }
    }
  }
}

export function getNodesByKeys(dadaSource, keys) {
  let nodes = [];
  if (keys instanceof Array) {
    for (let key of keys) {
      let node = getNodeByKey(dadaSource, key);
      nodes.push(node)
    }
  } else {
    return getNodeByKey(dadaSource, keys)
  }
  return nodes;
}
