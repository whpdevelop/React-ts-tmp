
// parent.window.postMessage({
//     jsAction:"go",
//     page:"recharge"
// },'*');
// parent.window.postMessage({
//     jsAction:"go",
//     page:"back"
// }, "*");
// parent.window.postMessage({
//     jsAction: "share",
//     url:base64,
//     width,
//     height
// }, "*");

// parent.window.postMessage({
//     jsAction: "getToken",
// },'*');

// quotation  行情
// position  持仓       
// 参数 BTC 、BSV  K线

export interface IParam {
    jsAction:"go"|"share"|"getToken"|"quotation"
    page?:"recharge" | "back" | null
    url?:string | null
    width?:number | null 
    height?:number | null 
}
/**
 * @param param 
 * @param jsAction:"go"|"share"
 * @param page?:"recharge" | "back" | null
 * @param url?:string | null
 * @param width?:number | null 
 * @param height?:number | null 
 */
export const jsAction = (param:IParam) => {
        window.parent.window.postMessage(param, "*");
}
