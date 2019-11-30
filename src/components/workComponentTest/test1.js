import React from "react";



export function SupplierCheck(editData, originData, sex) {
    this.editData=editData;
    this.originData=originData;
}
SupplierCheck.prototype.getText=function(target){
    let color="red";
    let theBack="";
    let nullResult="原值为空";
    let text=this.getEdit(target);
    if(text instanceof Object){
        text="";
    }
    let result=this.getDiffOrigin(target);

    if(result===theBack){
        return <span style={{color:""}}>{text}</span>;
    }else if(result===nullResult){
        return <span style={{color:color}}>{text}</span>;
    }else if(result===false){
        return <span style={{color:color}}>{text}</span>;
    }else{
        return <span style={{color:color}}>{text}</span>;
    }
}

SupplierCheck.prototype.getTitle=function(target,title){
    let color="red";
    let theBack="";
    let nullResult="原值为空";
    if(!this.originData||!this.editData){
        return <span>{title}</span>;
    }
    let result=this.getDiffOrigin(target);
    if(result===theBack){
        return <span style={{color:""}}>{title}</span>;
    }else if(result===nullResult){
        return <span style={{color:color}}>{title}</span>;
    }else if(result===false){
        return <span style={{color:color}}>{title}</span>;
    }else{
        return <span style={{color:color}}>{title}</span>;
    }
}
SupplierCheck.prototype.getColor=function(target){
    let color="red";
    let theBack="";
    let nullResult="原值为空";
    let result=this.getDiffOrigin(target);
    if(result===theBack){
        return {color:""};
    }else if(result===nullResult){
        return {color:color};
    }else if(result===false){
        return {color:color};
    }else{
        return {color:color};
    }
};
SupplierCheck.prototype.getMoreEdit=function(target,connector){
    let str="";
    for(let j=0;j<target.length;j++){
        str+=this.getEdit(target[j])?(this.getEdit(target[j])+(connector[j]?connector[j]:"")):"";
    }
    return str;
};
SupplierCheck.prototype.getMoreIsSomeTitle=function(target,title){
    let flag=true;
    for(let i=0;i<target.length;i++){
        if(this.getDiffOrigin(target[i])!==""){
            flag=false;
        }
    }
    if(flag){
        return <span>{title}</span>
    }else{
        return <span style={{color:"red"}}>{title}</span>
    }
};
SupplierCheck.prototype.getMoreDiffOrigin=function(target,connector){
    let flag=true;
    for(let i=0;i<target.length;i++){
        if(this.getDiffOrigin(target[i])!==""){
            flag=false;
        }
    }
    let str="";
    for(let j=0;j<target.length;j++){
        console.log("我的值",this.getOrigin(target[j]),target[j]);
        str+=this.getOrigin(target[j])?(this.getOrigin(target[j])+(connector[j]?connector[j]:"")):"";
    }
    if(flag){
        return <span>{str}</span>
    }else{
        return <span style={{color:"red"}}>{str}</span>
    }
};
// ：0、null、NaN、undefined、"" 转成布尔值为false 其他则一律返回true
SupplierCheck.prototype.getDiffOrigin=function(target){
    let theBack="";
    let nullResult="原值为空";
    target=target.split(".");
    let editData1,originData1;
    if(this.editData) {
        editData1 = Object.assign(this.editData);
    }
    else{
        editData1 = this.editData;
    }
    if(this.originData) {
        originData1 = Object.assign(this.originData);
    }else{
        originData1=this.originData1;
    }
    if(!originData1||!editData1){
        return theBack;
    }
    let flagOrigin = false, flagEdit = false;
    for (let i = 0; i < target.length; i++) {
        if (flagEdit) {
            if (i === target.length - 1) {
                let data = originData1[target[i]];
                if (!data || data === "") {
                    return theBack;
                }
                else {
                    return data;
                }
            } else {
                if (originData1[target[i]]) {
                    originData1 = originData1[target[i]];
                } else {
                    return theBack;
                }
            }
        }
        else if (flagOrigin) {
            if (i === target.length - 1) {
                let data = editData1[target[i]];
                if (!data || data === "") {
                    return theBack;
                }
                else {
                    return nullResult;
                }
            } else {
                if (editData1[target[i]]) {
                    editData1 = editData1[target[i]];
                } else {
                    return theBack;
                }
            }
        }
        else if (originData1[target[i]] && editData1[target[i]]) {
            if (i === target.length - 1) {
                if (originData1[target[i]]===editData1[target[i]]) {
                    return theBack;
                }
                else {
                    return originData1[target[i]];
                }
            }
            originData1 = originData1[target[i]];
            editData1 = editData1[target[i]];
        }
        else if (originData1[target[i]] && !editData1[target[i]]) {
            if (i === target.length - 1) {
                if (originData1[target[i]]===""||originData1[target[i]]==={}) {
                    return theBack;
                }
                else {
                    return originData1[target[i]];
                }
            }
            flagEdit = true;
            originData1 = originData1[target[i]];
        }
        else if (!originData1[target[i]] && editData1[target[i]]) {
            if (i === target.length - 1) {
                if (editData1[target[i]]===""||editData1[target[i]]==={}) {
                    return theBack;
                }
                else {
                    return originData1[target[i]]===false?false:nullResult;
                }
            }
            flagOrigin = true;
            editData1 = editData1[target[i]];
        }
        else if (!originData1[target[i]] && !editData1[target[i]]) {
            if(originData1[target[i]]===editData1[target[i]]){
                return theBack;
            }
            else if(originData1[target[i]]===false){
                return false;
            }
            else if(editData1[target[i]]===false){
                return nullResult;
            }
            else{
                return theBack;
            }
        }
    }
}
SupplierCheck.prototype.checkExist=function(target){
    target=target.split(".");
    let editData1;
    if(this.editData) {
        editData1 = Object.assign(this.editData);
    }
    else{
        editData1 = this.editData;
    }
    if(!editData1){
        return false;
    }
    for(let i=0;i<target.length;i++){
        if(i===target.length-1){
            if(editData1[target[i]]||editData1[target[i]]===false){
                return true;
            }else{
                return false;
            }
        }
        else if(!editData1[target[i]]){
            return false;
        }
        editData1=editData1[target[i]];
    }
}
SupplierCheck.prototype.checkExist=function(target){
    target=target.split(".");
    let editData1;
    if(this.editData) {
        editData1 = Object.assign(this.editData);
    }
    else{
        editData1 = this.editData;
    }
    if(!editData1){
        return "";
    }
    for(let i=0;i<target.length;i++){
        if(i===target.length-1){
            if(editData1[target[i]]||editData1[target[i]]===false){
                return true;
            }else{
                return "";
            }
        }
        else if(!editData1[target[i]]){
            return "";
        }
        editData1=editData1[target[i]];
    }
}
SupplierCheck.prototype.getEdit=function(target){
    let theBack="";
    target=target.split(".");
    let editData1;
    if(this.editData) {
        editData1 = Object.assign(this.editData);
    }
    else{
        editData1 = this.editData;
    }
    if(!editData1){
        return theBack;
    }
    for(let i=0;i<target.length;i++){
        if(i===target.length-1){
            if(editData1[target[i]]||editData1[target[i]]===false){
                return editData1[target[i]];
            }else{
                return theBack;
            }
        }
        else if(!editData1[target[i]]){
            return theBack;
        }
        editData1=editData1[target[i]];
    }
}
SupplierCheck.prototype.getOrigin=function(target){
    let theBack="";
    target=target.split(".");
    let originData1;
    if(this.editData) {
        originData1 = Object.assign(this.originData);
    }
    else{
        originData1 = this.originData;
    }
    if(!originData1){
        return theBack;
    }
    for(let i=0;i<target.length;i++){
        if(i===target.length-1){
            if(originData1[target[i]]||originData1[target[i]]===false){
                return originData1[target[i]];
            }else{
                return theBack;
            }
        }
        else if(!originData1[target[i]]){
            return theBack;
        }
        originData1=originData1[target[i]];
    }
}
