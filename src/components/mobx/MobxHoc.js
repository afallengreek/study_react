/**
 * @Description:
 * @Author: Pengxu
 * @Date: 2019/4/18
 */
import React, {Component} from 'react';
import {observable} from "mobx";

const NameStore = (name, age, traceEnabled = false) =>
    observable({
        name,
        age,
        traceEnabled,
        /* 推导值 */
        get completedCount() {
            return this.name+"的年龄为"+this.age;
        }
    });
export default WrappedComponent => {

    return class MobxHoc extends Component{
        render(){
                const nameStore = NameStore("Ruby", 38);
                return    <WrappedComponent store={nameStore}/>
        }
    }

}
