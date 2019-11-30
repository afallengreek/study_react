import React from "react";


function foo({x=5,y=4}) {
    console.log("打印我们的和",x+y);
}
class ArrayStudy extends React.Component{
    constructor(props) {
        super(props);

    }

    render=()=>{
        let a1 = [1,2,3,4];
        console.log(foo());
        return(
            <span>
            </span>
        )
    }
}
export default ArrayStudy;