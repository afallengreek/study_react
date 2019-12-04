/**
 * Created by liusonglin on 2018/7/12.
 */

import React, { Component } from 'react';
import { TreeSelect } from 'antd';
import { isEqual, isEmpty } from 'lodash';
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
const TreeNode = TreeSelect.TreeNode;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

export default class TreeSelectWithService extends Component {
    renderFirstLoad = 0;
    constructor(props) {
        super(props)
        this.state = {
            value: null,
            dataSource: [],
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.params &&
            this.props.params &&
            Object.values(nextProps.params).toString() !== Object.values(this.props.params).toString()){
            this.setState({params:nextProps.params})
            this.getDataSource(nextProps.params)
        }
        if (!isEqual(nextProps.config.data, this.props.config.data)) {
            this.setState({ dataSource: nextProps.config.data })
        }
    }

    componentDidMount() {
        this.getDataSource(this.props.params)
    }

    getDataSource(params) {
        let dataSource = [];
        if (this.props.config.data) {
            dataSource = this.props.config.data;
            if (this.props.initValue && dataSource && dataSource > 0) {
                const { key } = this.props.config
                this.setState({ dataSource, value: dataSource[0][key] })
            } else {
                this.setState({ dataSource, value: null })
            }
        } else {
            this.props.config.service(params).then((res) => {
                if (res.data && res.data.length > 0) {
                    dataSource = res.data;
                } else {
                    dataSource = res;
                }
                if (this.props.initValue && dataSource && dataSource > 0) {
                    const { key } = this.props.config
                    this.setState({ dataSource, value: dataSource[0][key] })
                } else {
                    if (this.props.value) {
                        let node = this.getNodesByKeys(dataSource, this.props.value, this.props.config.key);
                        if (node) {
                            this.setState({ value: this.props.value })
                            if (this.props.value) {
                                this.props.onChange(this.props.value, node);
                            }
                        } else {
                            this.setState({ value: null })
                            this.props.onChange(null);
                        }
                    }

                    this.setState({ dataSource, value: null })
                }
            })
        }
    };

    handleChange = (value) => {
        this.setState({ value: value })
        if (this.props.onChange) {
            this.props.onChange(value, this.getNodesByKeys(this.state.dataSource, value, this.props.config.key));
        }
    }

    getAllTreeNode() {
        const { key, text } = this.props.config
        return this.getTreeNode(this.state.dataSource, key, text)
    }

    /**
     * 根据key获取节点信息
     * @param treeData
     * @param key
     * @param mainKey 以哪一个值为判断一样的标准
     * @returns {*}
     */
    getNodeByKey = (treeData, key, mainKey) => {
        mainKey = mainKey || "id";
        for (let item of treeData) {
            if (item[mainKey] === key) {
                return item
            } else {
                if (item.children && item.children.length > 0) {
                    if (this.getNodeByKey(item.children, key, mainKey)) {
                        return this.getNodeByKey(item.children, key, mainKey);
                    }
                }
            }
        }
    };
    getNodesByKeys = (treeData, keys, mainKey) => {
        let treeArray = []
        if (!(treeData instanceof Array)) {
            treeArray.push(treeData)
        } else {
            treeArray = treeData;
        }
        let nodes = [];
        if (keys instanceof Array) {
            for (let key of keys) {
                let node = this.getNodeByKey(treeArray, key, mainKey);
                nodes.push(node)
            }
        } else {
            return this.getNodeByKey(treeArray, keys, mainKey)
        }
        return nodes;
    };
    getTreeNode(treeData, key, text) {
        let treeArray = []
        if (!(treeData instanceof Array)) {
            treeArray.push(treeData)
        } else {
            treeArray = treeData;
        }
        let treeNodeArray = []
        for (let i = 0; i < treeArray.length; i++) {
            let treeNode = treeArray[i];
            //设置显示title
            let {showTitles}=this.props;
            let title='';
            if(showTitles&&showTitles.length>0){
                showTitles.map(t=>{
                    title=title+' '+treeNode[t]
                })
            }else {
                title=treeNode[text]
            }
            if (treeNode.children && treeNode.children.length > 0) {
                treeNodeArray.push(<TreeNode value={treeNode[key]} disabled={this.props.config.onlyLeaf} title={title} key={`${treeNode.id}_${i}_${treeNode.nodeLevel}_node`}>
                    {this.getTreeNode(treeNode.children, key, text)}</TreeNode>)
            } else {
                treeNodeArray.push(<TreeNode value={treeNode[key]} isLeaf title={title} key={`${treeNode.id}_${i}_${treeNode.nodeLevel}_subnode`} />)
            }
        }
        return treeNodeArray;
    }
    shouldComponentUpdate(nextProps, nextState){
        const allowFirstLoading = this.state.dataSource.length===0;

        // allowFirstLoading:允许加载数据
        if(allowFirstLoading){
            return true;
        }
        //获得数据后允许加载出第一次数据
        if(this.state.dataSource.length>0){
            this.renderFirstLoad ++;
        }
        if(this.renderFirstLoad === 1){
            return true;
        }
        // if(nextProps.params && this.props.params ){
        //     if(Object.values(nextProps.params).toString() !== Object.values(this.props.params).toString()){
        //         return true;
        //     }
        // }
        // 减少接受参数为空的渲染
        if(!nextProps.value&&!this.state.value&&!nextProps.params){
            return false;
        }
        // 减少两次接受值一样的渲染
        if(nextProps.value===this.state.value){
            return false;
        }
        return true;
    }
    componentDidUpdate() {
        const defaultValue = this.props.value
        if (this.state.value === defaultValue) {
            return;
        }
        if (this.props.initValue && !defaultValue) {
            const { key } = this.props.config
            if (this.state.dataSource && this.state.dataSource.length > 0) {
                this.setState({ value: this.state.dataSource[0][key] })
                if (this.props.onChange) {
                    this.props.onChange(this.state.dataSource[0][key], this.state.dataSource[0]);
                }
            }
        } else {
            if(defaultValue) {
                let node = this.getNodesByKeys(this.state.dataSource, defaultValue, this.props.config.key);
                this.setState({value: defaultValue})
                if (defaultValue) {
                    this.props.onChange(defaultValue, node);
                }
            }
        }
    }
    //展开时是否重新加载数据
    onDropdownVisibleChange = (open) => {
        if (open && this.props.loadByOpen) {
            this.getDataSource()
        }
    };
    render() {
        const { allowClear = true } = this.props;
        const { dataSource } = this.state;
        return (
            <TreeSelect
                onDropdownVisibleChange={this.onDropdownVisibleChange}
                disabled={this.props.disabled}
                showSearch
                style={{ width: this.props.width ? this.props.width : '100%' }}
                value={isEmpty(dataSource) ? "" : this.state.value}
                dropdownStyle={{ maxHeight: 260, overflow: 'auto' }}
                placeholder={seiIntl.get({key: 'gwmBdm_000069', desc: '请选择'})}
                allowClear={allowClear}
                treeCheckable={this.props.treeCheckable}
                showCheckedStrategy={SHOW_PARENT}
                treeNodeFilterProp={'title'}
                onChange={this.handleChange}
            >
                {this.getAllTreeNode()}
            </TreeSelect>
        );
    }
}
