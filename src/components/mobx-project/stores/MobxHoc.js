/**
 * @Description:资产采购Mobx管理
 * @Author: Pengxu
 * @Date: 2019/8/7
 */
import React, {Component} from 'react';
import {Provider} from "mobx-react";
import stores from "./index";
import {useStrict} from 'mobx';

useStrict(true);
export default WrappedComponent => {
    return class MobxHoc extends Component{

        render(){
                const rootStore =  stores;
                return <span>
                           <Provider  {...rootStore} approveStore={this.props} >
                               <WrappedComponent />
                            </Provider>
                            {/*<DevTools />*/}
                        </span>
        }
    }

}
