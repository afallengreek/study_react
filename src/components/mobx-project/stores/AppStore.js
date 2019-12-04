import {observable, computed, action, runInAction} from "mobx";

class AppStore {
    @observable requestQuantity = 0;
    @observable error = null;
    @observable percent = 0;
    percentTimer = null;

    @computed get isLoading() {
        return this.requestQuantity > 0;
    }

    // 当前进行的请求数量加1
    @action increaseRequest() {
        if(!this.percentTimer) {
            this.percentTimer = setInterval(this.increasePercent, 30);
        }
        this.requestQuantity ++;
    }
    //当前的进度加1
    @action.bound increasePercent(){
        runInAction(() => {
            if(this.percent !== 99)
            this.percent += 1
        })
    }
    // 当前进行的请求数量减1
    @action decreaseRequest() {
        if(this.requestQuantity===1){
            this.percent = 100;
            setTimeout(()=>{runInAction(()=>{
                this.percent = 0;
                this.requestQuantity--;
                clearInterval(this.percentTimer)
                this.percentTimer = null;
            })
            },300)
        }else{
            this.requestQuantity--;
        }
    }

    // 设置错误信息
    @action setError(error) {
        this.error = error;
    }

    // 删除错误信息
    @action.bound removeError() {
        this.error = null;
    }
}

export default AppStore;