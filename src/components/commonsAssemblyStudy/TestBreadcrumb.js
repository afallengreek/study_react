import React from "react";
import HeadBreadcrumb from "../../commons/components/breadcrumb/HeadBreadcrumb";

class TestBreadcrumb extends React.Component{
    constructor(props) {
        super(props);

    }
    getPath=()=>{
        return [{name: `费用预提`}, {name: `超级王企鹅`}];
    }
    componentWillMount() {
    }
    render=()=>{
        return(
            <HeadBreadcrumb
                pathData={this.getPath()}
                rightExtra="fsdafs"
                extra="r234532"
            >

                <h1>4234</h1>
                <h1>4234</h1>
                <h1>4234</h1>
                <h1>4234</h1>
                <h1>4234</h1>
                <h1>4234</h1>

            </HeadBreadcrumb>
        )
    }
}
export default TestBreadcrumb;