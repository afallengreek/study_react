import React from "react";
class AdvanceFunctionTest1 extends React.Component{
    constructor(props) {
        super(props);
        this.state={

        };
    }
    splat=(fun)=>{
        return (...args)=>{
           return fun(...args)};
    }
    render=()=>{
        console.log("423542")
        let addArrayElements = this.splat(function (...args) {
            console.log("F'sdfdsa",args);
            let sum =0;
            for(let item of args){
                sum +=item;
            }
            return sum;
            })
        console.log("gsdfg",addArrayElements(1,2))
        return(
            <span >423423
            </span>
        )
    }
}
export default AdvanceFunctionTest1;