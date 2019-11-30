import React from "react";
export function test(obj) {
    let ans=[];
    for(let key in obj){
        if(obj.hasOwnProperty(key))
        ans.push(key+" :"+obj[key])
    }
    return ans;

 }
class tests1 extends React.Component{
    test =()=> {

    };
    render=()=>{
       let map=new Map();
       let temp="1";
       temp=temp.padEnd(10,"0");
        var C = function() {this.foo = 'bar'; this.baz = 'bim';};
        C.prototype.bop = 'bip';
        console.log(test(new C()));

       for(let [key,value] of map){
           console.log(key+"的值为"+value);
       }
        return(
            <span>423</span>
        )
    }
}
export default tests1;