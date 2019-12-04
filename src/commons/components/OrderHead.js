/**
 * @Description:单据头
 * @Author: CHEHSHUANG
 * @Date: 2019/3/28
 */
import React, {Component} from 'react';
import {Card} from "antd";
import BarCode from "./barCode/BarCode";
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
class OrderHeadCard extends Component {
    getBarCode = () => {
        const {editData,barCode} = this.props;
        console.log("barCode:",barCode)
        // let barCode = editData ? editData.code : null;
        let creatorName = editData ? editData.creatorName : null;
        let createdDate = editData ? editData.createdDate : null;
        if (barCode) {
            return (
                <div className={"order-barCode-info"}>
                    <BarCode barCode={barCode}/>
                    <div className={"order-create-info"}>
                        {this.getFlowStatus()}
                        <div className={"creatorName"}>{seiIntl.get({key: 'gwmBdm_000099', desc: '创单人：'})}{creatorName}</div>
                        <div className={"createdDate"}>{seiIntl.get({key: 'gwmBdm_000100', desc: '创单时间：'})}{createdDate}</div>
                    </div>
                </div>
            )
        }
        return null;
    }
    getFlowStatus = () => {
        const {editData} = this.props;
        let flowStatus = editData ? editData.flowStatus : null;
        let flowStatusRemark = editData ? editData.flowStatusRemark : null;
        if (flowStatus) {
            let className = "base-status ";
            switch (flowStatus) {
                case "INPROCESS":
                    className += "is-processing";
                    break;
                case "COMPLETED":
                    className += "is-completed";
                    break;
                case "INIT":
                    className += "is-notStart";
                    break;
                default:
                    break;
            }
            return <div className={className}>{flowStatusRemark}</div>;
        }
        return null;
    }

    render() {
        const {barCode, creatorName = "", creatorDate = "", title, style, bodyStyle, headStyle} = this.props;
        return (
            <Card
                style={{height: "100%", ...style}}
                className={"order-card"}
                headStyle={{background: "rgba(214, 224, 233, 0.2)", ...headStyle}}
                bodyStyle={{padding: "0 8px", height: "calc(100% - 70px)", ...bodyStyle}}
                title={<span className={"order-head-title"}>{title}</span>}
                extra={this.getBarCode()}
            >
                {
                    this.props.children
                }
            </Card>
        );
    }
}

export default OrderHeadCard;
