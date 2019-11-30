import { Modal, Button } from 'antd';
import React from "react";

const confirm = Modal.confirm;

function showConfirm() {
    confirm({
        title: 'Do you Want to delete these items?',
        content: 'Some descriptions',
        onOk() {
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}

function showDeleteConfirm() {
    confirm({
        title: 'Are you sure delete this task?',
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}

function showPropsConfirm() {
    confirm({
        title: 'Are you sure delete this task?',
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        okButtonProps: {
            disabled: true,
        },
        cancelText: 'No',
        onOk() {
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}
class modalConfirm extends React.Component {
render(){
    return (
        <div>
            <Button onClick={showConfirm}>
                Confirm
            </Button>
            <Button onClick={showDeleteConfirm} type="dashed">
                Delete
            </Button>
            <Button onClick={showPropsConfirm} type="dashed">
                With extra props
            </Button>
        </div>
    )
}
}

export default modalConfirm;