import React from "react";


function foo({x=5,y=4}={}) {
    console.log("打印我们的和",x+y);
}
function add(...values) {
    let sum = 0;
    for(let val of values){
        sum+=val;
    }
    return sum;
}
function push(array,...items) {
    items.forEach(function (item) {
        array.push(item);
    })
    console.log("我的大数据",array);

}
class MathStudy extends React.Component{
    constructor(props) {
        super(props);
    }
    render=()=>{
        // console.log(add(1,24,4,34,43,43,4234,432432,234,32))

       let a = [1,2,3];
        console.log(push(a,1,3,4,6,5,6));
        return(
            <span>
            </span>
        )
    }
}
export default MathStudy;