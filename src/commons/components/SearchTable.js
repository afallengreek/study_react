/**
 * @description 弹出选择表单
 * @author 刘松林
 * @date 2018.12.19
 */
import React, {Component} from 'react';
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';
import {Input, Icon, Button, Col, Row} from 'antd';
import {convertSearchFilter, isEmpty} from "../utils/CommonUtils";
import './SearchTable.css'
import SimpleTable from "./SimpleTable";
import PropTypes from 'prop-types';
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;

class SearchTable extends Component {
  params = null
  value = ''

  constructor(props) {
    super(props);
    this.state = {
      pageInfo: {},
      mouseHover: false,
      searchValue: '',
      textValue: '',
      value: '',
      loading: false,
      selectedRows: [],
      show: false,
      style: {},
      dataSource: [],
      filterData: []
    };
    this.params = props.params
  }

  //传入参数，级联操作
  componentWillReceiveProps(nextProps) {
    console.log("fdsaf4314314",nextProps.value);
    if (nextProps.value && typeof nextProps.value === 'string' && nextProps.value.indexOf(',') === -1) {
      if (this.state.value !== nextProps.value) {
        this.initValue(nextProps.value)
        this.setState({value:nextProps.value})
      }
    } else if (this.state.textValue && !nextProps.value&&!this.props.isNotFormItem) {
      if (this.state.searchValue || this.state.searchValue.length > 0) {
        this.getDataSource();
        this.setState({textValue: '', value: '', searchValue: ''})
      } else {
        this.setState({textValue: '', value: ''})
      }
    }

    if (nextProps.params &&
      this.props.params &&
      Object.values(nextProps.params).toString() !== Object.values(this.props.params).toString()) {
      this.params = nextProps.params
      if (this.props.initValue) {
        this.getInitData()
      } else {
        this.getDataSource()
      }
      if(Object.values(this.props.params)[0]){
        this.setState({searchValue: '', pageInfo: {}},()=>{
          if (this.props.value === nextProps.value && !isEmpty(nextProps.value)) {
            if(this.props.onChange){
              this.props.onChange('');
            }
          }
        })
      }
      return;
    }
  }

  componentDidUpdate(){
    if (this.state.show&&this.innerInput) {
      this.innerInput.input.focus()
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (e) => {
    if (this.mainContent && !this.mainContent.contains(e.target)) {
      if (this.state.show) {
        this.setState({show: false})
      }
    }
  }

  componentWillMount() {
    if (!this.props.value) {
      this.setState({textValue: '', value: ''})
    }
    const {initValue} = this.props;
    if (initValue && !this.props.value) {
      this.getInitData()
    } else {
      this.getDataSource()
    }
  }

  initValue=(value)=>{
    if(value){
      const {text,key,keyFieldType}=this.props.config;
      if (this.props.config.searchService) {
        let searchParam = {keyword: value}
        this.props.config.searchService(this.state.dataSource, searchParam, [key]).then(data => {

          if (data && data.length > 0) {
            this.props.onChange&&this.props.onChange(value, data[0]);
            this.props.selectChange&&this.props.selectChange(data[0]);
              let  textVal = "";
              if(text.includes('.')){
                  textVal = data[0][text.split('.')[0]][text.split('.')[1]];
              }else {
                  textVal = data[0][text];
              }
            this.setState({value: value, textValue: textVal});
          }
        })
      } else {

        let searchParam = {...this.params};
        let fieldType=keyFieldType?keyFieldType:"String";
        searchParam['Q_EQ_' + key+'_'+fieldType] = value;
        this.props.config.dataService(convertSearchFilter({...searchParam})).then(res => {
          let list;
          if(res&&res.data){
                res = res.data;
          }
          if (res.rows) {
            list = res.rows
          } else {
            list = res;
          }
          let result = this.bulidByCloumns(list)
          if(result && result.length>0){
            let index = result.findIndex(item => item[key] === value);
            this.props.onChange&&this.props.onChange(value,index!==-1?result[index]:{});
            this.props.selectChange&&this.props.selectChange(index!==-1?result[index]:{});
            let  textVal = "";
            if(text.includes('.')){
                textVal = index!==-1?result[index][text.split('.')[0]][text.split('.')[1]]:""
            }else {
                textVal = index!==-1?result[index][text]:"";
            }
            this.setState({value:value, textValue: textVal})
          }
        })
      }
    }
  }

  getInitData(value) {
    const {key, text} = this.props.config;
    //如果是分页查询，拼装下参数
    let requestParams={...value, ...this.params};
    if (!this.props.config.searchService){
      requestParams =convertSearchFilter(requestParams);
    }
    this.props.config.dataService(requestParams).then((res) => {
      let list;
      if(res&&res.data){
        res = res.data;
      }
      if (res && res.rows) {
        list = res.rows;
      } else {
        list = res;
      }
      let result = this.bulidByCloumns(list)
      if (result && result.length > 0) {
        let textVal = ''
        if(text.includes('.')){
          textVal = result[0][text.split('.')[0]][text.split('.')[1]]
        }else {
          textVal = result[0][text];
        }
        this.setState({dataSource: res, filterData: res, textValue: textVal, value: list[0][key]},
          //状态更新完毕之后执行
          ()=>{
            if(this.props.onChange){
              this.props.onChange(list[0][key], list[0]);
            }
            if (this.props.selectChange) {
              this.props.selectChange(list[0]);
            }
          })
      }
    });
  };

  getDataSource(value, pageInfo) {
    const {key, text} = this.props.config;
    this.setState({loading: true});
    //如果是分页查询，拼装下参数
    let requestParams={...value,pageInfo, ...this.params};
    if (!this.props.config.searchService){
      requestParams =convertSearchFilter(requestParams);
    }
    this.props.config.dataService(requestParams).then((res) => {
      if(res&&res.data){
            res = res.data;
      }
      if (res && !res.rows) {
        res = res.filter(item => Object.keys(item).includes('frozen')?item.frozen!==true:true)
      }
      this.setState({dataSource: res, filterData: res})
      this.setState({loading: false});
      if (this.props.value && this.props.selectChange) {
        let list;
        if (res && res.rows) {
          list = res.rows;
        } else {
          list = res;
        }
        let index = list.findIndex(item => item[key] === this.props.value);
        if (index!==-1){
          this.props.selectChange(list[index]);
        }
      }
      this.initValue(this.props.value)
    }).catch(err => {
      this.setState({loading: false});
    })
  };

  pageChange = (pagination) => {
    this.setState({pageInfo: pagination});
    if (!this.props.config.searchService) {
      this.getDataSource({quickValue: this.state.searchValue}, pagination);
    }
  };

  handleSearch = (values) => {
    if (this.props.config.searchService) {
      let searchParam = {keyword: values}
      this.props.config.searchService(this.state.dataSource, searchParam).then(data => {
        this.setState({filterData: data.rows ? data.rows : data})
      })
    } else {
      let searchParam = {quickSearchValue: values}
      this.getDataSource(searchParam)
    }
    this.setState({searchValue: values})
  }

  refreshData = (value) => {
    this.getDataSource(value);
  }

  rowOnChange = (selectedRows) => {
    const {key, text} = this.props.config
    if (!this.props.multiple) {
      if (selectedRows.length > 0) {
        let textVal = ''
        if(text.includes('.')){
          textVal = selectedRows[0][text.split('.')[0]][text.split('.')[1]]
        }else {
          textVal = selectedRows[0][text];
        }
        this.setState({
          show: false,
          textValue: textVal,
          value: selectedRows[0][key],
          selectedRows: []
        },()=>{
          if(this.props.onChange){
            this.props.onChange(selectedRows[0][key], selectedRows[0]);
          }
        })
      }
    } else {
      let textValue = [];
      let keyValue = []
      for (let i = 0; i < selectedRows.length; i++) {
        textValue.push(selectedRows[i][text]);
        keyValue.push(selectedRows[i][key])
      }
      this.setState({textValue: textValue.toString(), value: keyValue, selectedRows},()=>{
        if(this.props.onChange){
          this.props.onChange(keyValue, selectedRows);
        }
      })
    }
    if (this.props.selectChange) {
      if (!this.props.multiple){
        this.props.selectChange(selectedRows[0]);
      }else {
        this.props.selectChange(selectedRows);
      }

    }
  }

  emptyValue = () => {
    this.setState({textValue: '', value: '', selectedRows: []},()=>{
      if(this.props.onChange){
        this.props.onChange('')
      }
      if (this.props.selectChange){
        this.props.selectChange([])
      }
    })
  }

  bulidByCloumns = (list) => {
    const {columns} = this.props.config;
    for (let i = 0; i < list.length; i++) {
      let data = list[i];
      columns.map(item => {
        if (item['render']) {
          item.render(data[item['dataIndex']], data)
        }
      })
    }
    return list;
  }

  handleSure = () => {
    this.setState({show: false, selectedRows: []})
  }

  searchChange = (e) => {
    this.setState({searchValue: e.target.value})
  }

  dropDown = () =>{
    const {columns} = this.props.config
    const {filterData} = this.state;
    return <div id={'SearchTableChild'} ref={(ref) => this.mainContent = ref} style={this.state.style}>
      <Row style={{background: '#F3F8FC', padding: 1}}>
        <Col span={24} style={{textAlign: 'right'}}>{this.search()}</Col>
      </Row>
      <SimpleTable
        checkBox={this.props.multiple}
        rowsSelected={this.state.selectedRows}
        loading={this.state.loading}
        onSelectRow={this.rowOnChange}
        data={filterData}
        columns={columns}
        heightY={180}
        pageChange={this.props.config.searchService?null:this.pageChange}
      />
    </div>
  }

  showDrop = (e) => {
    this.setState({show:true})
  }

  search = () => {
    return (<Input.Search
      key="TableSearchI"
      placeholder={seiIntl.get({key: 'gwmBdm_000095', desc: '请输入查询关键字'})}
      value={this.state.searchValue}
      onChange={this.searchChange}
      onSearch={value => this.handleSearch(value)}
      ref={(ref) => this.innerInput = ref}
      style={{marginRight: '5px'}}
    />)
  }

  getSuffixCompoennt = () => {
    const { canNotClear, value: propValue, isNotFormItem, disabled } = this.props;
    const { value, mouseHover } = this.state;
    let suffix = [];
    if (disabled) {
      return false;
    }
    if (!canNotClear && (propValue || (isNotFormItem && value)) && mouseHover){
      suffix.push((
        <Icon
          key="emptyClick"
          type="close-circle"
          theme="filled"
          className="close-circle"
          onClick={this.emptyValue}
        />
      ));
    } else {
      suffix.push((
        <Icon key="selectClict"
              type="down"
              onClick={this.showDrop}
        />
      ));
    }

    return suffix;
  }

  render() {
    const suffix = !this.props.disabled&& ([
      !this.props.canNotClear&&(this.props.value ||(this.props.isNotFormItem&&this.state.value))? <Icon key="emptyClick" type="close" onClick={this.emptyValue}/>:"",
      <Icon key="selectClict" type="down" onClick={this.showDrop}/>,
    ])
    return (
      <Dropdown
        overlay={this.dropDown()}
        animation="slide-up"
        visible={this.state.show}
        className='searchTable'
      >
        <Input placeholder={this.props.placeholder} disabled={this.props.disabled} onFocus={this.showDrop}
               readOnly style={this.props.style}
               title={this.state.textValue}
               value={this.state.textValue} ref={(ref) => this.searchInput = ref}
               suffix={this.getSuffixCompoennt()}
               onMouseEnter={() => {
                 this.setState({
                   mouseHover: true
                 });
               }}
               onMouseLeave={(e) => {
                 const { nodeName } = e.relatedTarget;
                 if (!['path', 'svg'].includes(nodeName)) {
                   this.setState({
                     mouseHover: false
                   });
                 }
               }}
        />
      </Dropdown>
    );
  }
}

SearchTable.propTypes={
  //默认
  placeholder:PropTypes.string,
  //选择回调方法,formItem使用，一般不用自己实现
  onChange:PropTypes.func,
  //选择回调方法，自主回调选择变化
  selectChange:PropTypes.func,
  //过滤条件动态请求参数
  params:PropTypes.object,
  //
  value:PropTypes.string,
  //
  config:PropTypes.object,

}


export default SearchTable;
