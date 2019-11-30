import React from "react";
import  "./tests2.css"
import XLSX from "xlsx";
import {Button, Icon, Upload,message} from "antd";
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
class BatchImport extends React.Component{
    state={
        fileList: [],
    }
    //开始导入
     importf=(obj) =>{
             console.log(obj);
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
             // excelJson=convertJson(excelJson);
             //测试用例
             // document.getElementById("excelContent").innerHTML= JSON.stringify( excelJson );
             this.props&&this.props.getJsonData&&this.props.getJsonData(excelJson);
         };
             if(rABS) {
             reader.readAsArrayBuffer(f);
         } else {
                 console.log("我的数据 ",f);
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
    componentDidMount() {


    }
    render=()=>{
        const {  fileList } = this.state;
        const props = {
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
            onChange:(info)=>{
                this.importf([...this.state.fileList, info.file])
            }
        };
        return(
            <span className="batchImport">

             <p id="excelContent">
             </p>
            <Upload {...props}>
              <Button type="primary">
                <Icon type="upload" /> 批量导入
              </Button>
            </Upload>

            </span>
        )
    }
}
export default BatchImport;