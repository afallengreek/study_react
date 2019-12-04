/**
 * 面包屑页头
 * @props: pathData 接收array参数
 * array示例:
 * [
 *  {name: "xxx", path="xxx" }
 *  {name: "xxx" }
 * ]
 */
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Breadcrumb} from "antd"
import PropType from "prop-types"
import "./index.css"
import {Scrollbars} from "react-custom-scrollbars";

const {Item} = Breadcrumb;

class HeadBreadcrumb extends Component {
  getBreadcrumbItems = () => {
    const {pathData} = this.props;
    return pathData.map((item, index) => (
        <Item key={index} href={item.path || null}>
          {item.name}
        </Item>
      )
    );
  }

  render() {
    const {style,className,children, pathData, rightExtra, rightExtraClass, extra, extraClass, autoScroll} = this.props;
    const hasHead = extra || pathData || rightExtra;
    return (
      <div className={"page-breadcrumb "+(!pathData&&!rightExtra?"no-breadcrumb":"")} hidden={this.props.hidden}>
        {
          pathData || rightExtra ? (
            <div className={"breadcrumb-box"}>
              {
                pathData ? (
                  <Breadcrumb>
                    {this.getBreadcrumbItems()}
                  </Breadcrumb>
                ) : null
              }
              {
                rightExtra ? <div className={rightExtraClass || "bread-right-extra"}>{rightExtra}</div> : null
              }
            </div>
          ) : null
        }
        {
          extra ? <div className={extraClass || "bread-extra"}>{extra}</div> : null
        }
        <div className={["page-box",hasHead ? "page-box-head":"page-box-no-head",className ? className : ""].join(" ")} style={{...style}}>
          {
            autoScroll ? (
              <Scrollbars autoHide={true}>
                {children}
              </Scrollbars>
            ) : children
          }
        </div>
      </div>
    )
  }
}
HeadBreadcrumb.protoType={
  pathData: PropType.array,
  autoScroll: PropType.bool,
  extra: PropType.any,
  extraClass: PropType.string,
  rightExtra: PropType.any,
  rightExtraClass: PropType.string,
  children: PropType.any,
  style: PropType.object,
  contentClass: PropType.string
}
export default withRouter(HeadBreadcrumb)
