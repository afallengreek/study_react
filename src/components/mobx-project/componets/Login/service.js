import httpUtils from "../../../../commons/utils/SimpleFeatchUtils";

export async function listAllDataValue(param={}){
    param.keyword = "白菜";
    param.num = 10;
    const needCache = true;
    return httpUtils.get("/recipe/search",param,needCache);
}