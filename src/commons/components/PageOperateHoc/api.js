import httpUtils from "../../../commons/utils/FeatchUtils.js";
import { authAPI } from "../../../configs/DefaultConfig";

//登陆
export const checkAuth = (params={}) => {
  return httpUtils.postJson(authAPI+"/userAuth/checkAuth",params)
}

