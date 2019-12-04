/**
 * @Description:
 * @Author: Pengxu
 * @Date: 2019/3/27
 */
import React from "react";
import {Row} from 'antd';
import PropTypes from 'prop-types';
export function FormRowWrapperNew(props) {
    let contentArray = [];
    let content = props.children;
    // let itemNumber = props.itemNumber||3;
    //将FormItem分组并重新渲染

    for(let item of content){
        if(item) {
                //将用span包含的子元素取出来
                if(item.type==="span" || item.type==="Row"||item.type==="Tooltip"){
                    for(let childItem of item.props.children){
                        if(childItem) {
                            contentArray.push(childItem);
                        }
                    }
                }else{
                    contentArray.push(item);
                }
        }
    }
    //实现span超过24自动加Row换行
    let renderContent =[];
    let lineSpanSum = 0;
    for(let i=0;i<contentArray.length;i++){
        let j = parseInt(lineSpanSum/24);
        if(!renderContent[j]){
            renderContent[j] = [];
        }
        renderContent[j].push(contentArray[i])
        if(contentArray[i].props.hidden){
            lineSpanSum += 0;
        }else{
           lineSpanSum += (contentArray[i].props.span||8);
        }
    }
    return  <span>
        {renderContent.map((renderItem,index)=>{
           return <Row key={index}>
               {
                   renderItem.map((item) => {
                       //为每个元素设置唯一key
                       item = React.cloneElement(item, {
                           key:item.props.code,
                       });
                       //代理组件的明细的处理
                       //如果是ignoreDetail为true则忽略明细的代理
                       if(!item.props.ignoreDetail) {
                           item = React.cloneElement(item, {
                               isAdd:props.isAdd,
                               isNewItem:true,
                               disabled: props.isDetail||item.props.disabled,
                               rules: (props.isDetail||item.props.disabled) ? [{required: false, message: ''}] :
                                   (item.props.rules||[{required: false, message: ''}]),
                               validator: (props.isDetail||item.props.disabled) ? null :
                                   (item.props.validator||null)
                           });
                       }
                       return   React.cloneElement(item, {
                                      isNewItem:true,
                                   });
                   })
               }
            </Row>
        })}
    </span>
}
FormRowWrapperNew.propTypes ={
    isDetail: PropTypes.bool,
    isHidden: PropTypes.bool,
    isAdd:PropTypes.bool,
}

