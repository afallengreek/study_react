/**
 * @Description:
 * @Author: CHEHSHUANG
 * @Date: 2019/4/17
 */
import React from "react";
import {InputNumber,Input} from "antd";
import SearchTable from "../SearchTable";
import SelectWithService from "../SelectWithService";

const CustomComponent =(props)=>{
  const {type,...rest} = props;
  return getComponent(type,rest);
}
export const getComponent = (type,props) => {
  switch (type) {
    case "number":
      return <InputNumber {...props}/>;
    case "searchTable":
      props.canNotClear = !props.allowClear;
      return <SearchTable {...props}/>;
    case "selectWithService":
      return <SelectWithService {...props}/>;
    default:
      return <Input {...props}/>
  }
}
export default CustomComponent;
