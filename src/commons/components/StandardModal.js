/**
 * auth：liyan
 * dec： 应界面布局要求，主要调整footer按钮样式和位置，其属性与ant自带的Modal属性相同
 */
import React, {Component} from 'react';
import {Button, Modal} from "antd";
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
class StandardModal extends Component {

    render() {
        const {
            title, visible, confirmLoading, onOk, onCancel, okText, cancelText, okButtonProps, cancelButtonProps,
            footer, afterClose, width, mask, maskStyle, maskClosable, bodyStyle, destroyOnClose, wrapClassName,
            zIndex,centered
        } = this.props;
        const {moreProps, children} = this.props;//还有许多没有写到的属性可通过diyProps传值
        //默认的footer
        const button = [
            <Button key="ok" type="primary" {...okButtonProps} loading={confirmLoading}
                    onClick={onOk}>{okText ? okText : seiIntl.get({key: 'gwmBdm_000092', desc: '确定'})}</Button>,
            <Button key="cancel" type="default" {...cancelButtonProps} onClick={onCancel}>
                {cancelText ? cancelText : "取消"}
            </Button>,
        ];
        return (
          <div>
            <Modal
              visible={visible}
              title={<span className={'header-span'}>{title}</span>}
              confirmLoading={confirmLoading}
              onCancel={onCancel}
              width={width}
              footer={footer=== false ? null:footer===undefined?button:footer}
              afterClose={afterClose}
              mask={mask}
              maskStyle={maskStyle}
              maskClosable={maskClosable}
              bodyStyle={bodyStyle}
              destroyOnClose={destroyOnClose}
              wrapClassName={wrapClassName}
              zIndex={zIndex}
              centered={centered !== false}
              {...moreProps}
            >
              {React.Children.map(children, (child, i) => {
                return child;
              })}
            </Modal>
          </div>

        );
    }
}

export default StandardModal;

/**
 * 应界面设计要求将confirm的取消确定按钮位置、样式调换
 * @param props
 */
export function confirm(props) {
    const {title,onOk,onCancel,okText, cancelText,cancelButtonProps ,okButtonProps} = props
    Modal.confirm({
        title:<span className={'header-span'}>{title}</span>,
        cancelText: okText ? okText : seiIntl.get({key: 'gwmBdm_000092', desc: '确定'}),
        okText:cancelText ? cancelText : seiIntl.get({key: 'gwmBdm_000093', desc: '取消'}),
        okButtonProps: cancelButtonProps?cancelButtonProps:{type: "default"},
        cancelButtonProps: okButtonProps?okButtonProps:{type: "primary"},
        destroyOnClose:true,
        ...props,//其他更多属性
        onOk:onCancel,
        onCancel:onOk,
    });
}

