const {
    REACT_APP_HOST = '',
} = process.env;
export const appkey = "1c440e36f4071735";
export const host = REACT_APP_HOST||"";
export const gatewayHost = host + "/api-gateway";
export const basicUrl = "/basic-service";
export const contrastAPI = "http://10.255.16.65:8650"
export const cmAPI = "/cm-service";
export const pmAPI = "/pm-service";
export const fimUrl = "/fim-service";
export const brmBafUrl = "/brm-baf-service";
export const authAPI = "/auth-service";
export const basicAPI = "/basic-service";
export const bafAPI = "/brm-baf-service";
export const bgtAPI = "/brm-bgt-service";
export const amAPI = "/am-service";
export const borAPI = "/brm-bor-service";
export const bmAPI = "/bm-service";
export const wmAPI = "/wm-service";
export const smAPI = "/sm-service";
export const brmActUrl = '/brm-act-service';

export const uploadUrl = "";
export const defaultPageSize = 15;

export const defaultPageSizeOptions = ['15', '50', '100'];
export const rowGutter = 20;



