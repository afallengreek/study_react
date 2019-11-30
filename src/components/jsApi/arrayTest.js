import React from "react";
import './apiTest8.css';
import {my$} from "../common/commonUtil";
class arrayTest extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hidden:true,
        };
    }
    componentDidMount() {
        var arr=[10,20,30,40,50];
        //把第一个元素的值删除,追加到数组的最后
           arr.push(arr.shift());
           console.log(arr);
           arr.push(arr.shift());
           console.log(arr);
           arr.push(arr.shift());
           console.log(arr);
           arr.push(arr.shift());
           console.log(arr);
           arr.push(arr.shift());
           console.log(arr);


        // arr.unshift(arr.pop());
        // console.log(arr);
        // arr.unshift(arr.pop());
        // console.log(arr);
        // arr.unshift(arr.pop());
        // console.log(arr);
        // arr.unshift(arr.pop());
        // console.log(arr);
        // arr.unshift(arr.pop());
        // console.log(arr);
    }


    render=()=>{
        return(
            <div>
            </div>
        )
    }
}
export default arrayTest;