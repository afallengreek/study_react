import { observable, action } from "mobx";
import {openNotificationWithIcon} from "../utils/method";

class AuthStore {
    api;
    appStore;
    @observable userId = sessionStorage.getItem("userId");
    @observable username = localStorage.getItem("username") || "";
    @observable password = localStorage.getItem("password")||"";
    remember = localStorage.getItem("remember")||false;

    constructor(api, appStore) {
        this.api = api;
        this.appStore = appStore;
    }

    @action setUsername(username) {
        this.username = username;
    }

    @action setPassword(password) {
        this.password = password;
    }

    @action login(params) {
        this.appStore.increaseRequest();
        return this.api.login(params).then(action(data => {
            this.appStore.decreaseRequest();
            if (!data.error) {
                openNotificationWithIcon({type:"success",description:"登陆成功！"});
                this.userId = data.userId;
                sessionStorage.setItem("userId", this.userId);
                sessionStorage.setItem("username", this.username);
                if(params.remember){//记住密码
                    localStorage.setItem("username",params.username);
                    localStorage.setItem("password",params.password);
                    localStorage.setItem("remember","true")
                }else{//不记住密码
                    localStorage.setItem("username","");
                    localStorage.setItem("password","");
                    localStorage.setItem("remember","")
                }
                return Promise.resolve();
            } else {
                openNotificationWithIcon({type:"error",description:"账号或密码有误！"});
                return Promise.reject();
            }
        }));
    }

    @action.bound logout() {
        this.userId = undefined;
        this.username = 'jack';
        this.password = '123456';
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("username");
    }
}

export default AuthStore;
