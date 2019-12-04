import React, {Component} from "react";
import {Button, Icon, Upload} from "antd";
import {connect} from 'react-redux';
import XLSX from "xlsx";
import {hide, show} from "../../configs/SharedReducer";
import { seiLocale } from 'sei-utils';
const { seiIntl } = seiLocale;
function convertJson(JsonObject){
    Object.keys(JsonObject).forEach(function(key) {
        if (key.includes(".")) {
            let keys = key.split(".");
            let tempObj = {};
            for (let i = 0; i < keys.length; i++) {
                convertJson[keys[i]] = {};
                if (i === keys.length - 1) {
                    tempObj[keys[i]] = JsonObject[key];
                }
            }
        }
    })
    return JsonObject;
}

class BulkImport extends Component{
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            excelData:[]
        }
    }

    //开始导入
    importfunction=(obj) =>{
        if(this.props.needShow) {
            this.props.show();
        }
        let _this = this;
        /**
         * FileReader共有4种读取方法：
         * 1.readAsArrayBuffer(file)：将文件读取为ArrayBuffer。
         * 2.readAsBinaryString(file)：将文件读取为二进制字符串
         * 3.readAsDataURL(file)：将文件读取为Data URL
         * 4.readAsText(file, [encoding])：将文件读取为文本，encoding缺省值为'UTF-8'
         */
        let wb;//读取完成的数据
        let rABS = false; //是否将文件读取为二进制字符串
        //开始导入
        if(!obj.length>0) {
            return;
        }
        let f = obj[0];
        let reader = new FileReader();
        reader.onload = function(e) {
            let data = e.target.result;
            if(rABS) {
                wb = XLSX.read(btoa(this.fixData(data)), {//手动转化
                    type: 'base64'
                });
            } else {
                wb = XLSX.read(data, {
                    type: 'binary'
                });
            }
            /**
             * wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
             * wb.Sheets[Sheet名]获取第一个Sheet的数据
             */
            let excelJson = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            excelJson=convertJson(excelJson);
            _this.props.getJsonData&&_this.props.getJsonData(excelJson);
        };
        if(rABS) {
            reader.readAsArrayBuffer(f);
        } else {
            reader.readAsBinaryString(f);
        }
    }

    //文件流转BinaryString
    fixData=(data)=> {
        let o = "",
            l = 0,
            w = 10240;
        for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;

    }
    render(){
        const {  fileList } = this.state;
        const props = {
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: [],
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(state => ({
                    fileList: [file],
                }));
                return false;
            },
            fileList,
            onChange:(info)=>{

                this.importfunction([info.file])
            },
            showUploadList:false,
        };
        return(
                <Upload {...props}>
                  <Button {...this.props.buttonProps}>
                    <Icon type="upload" /> {seiIntl.get({key: 'gwmBdm_000104', desc: '批量导入'})}
                  </Button>
                </Upload>
        )
    }
}
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = {hide, show};
export default connect(mapStateToProps, mapDispatchToProps)(BulkImport);
