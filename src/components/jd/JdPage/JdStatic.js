import React from "react";

import JdHeader from "./JdHeader";
import JdFooter from "./JdFooter";
import JdContent from "./JdContent";

class JdStatic extends React.Component{
    render=()=>{
        return(
            <span>
               <JdHeader/>
                <JdContent/>
                <JdFooter/>
            </span>
        )
    }
}
export default JdStatic;