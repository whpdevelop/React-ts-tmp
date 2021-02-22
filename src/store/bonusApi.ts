
import { axios } from './request'
import { Utils } from '@/utils'

let test = "http://devbcwapp.dbankglobal.com/bonustrade";
let prod = 'https://cyweb.bitcoinwin.io/bonustrade';

let baseUrl = Utils.isDev()?test:prod;

interface IRes {
    code:number
    data:any
    msg?:string
}
export default class Api {
    static  resHandle (res:IRes,cb:(param:any)=>void,codeStatus=200) {
        let {code,data,msg} = res
        if(code === codeStatus) {
            cb&&cb(data)
            return
        }
        // Toast.fail(msg||'server error')
    }
    static getBonusAmountInfo (){
        return axios({
            method:'get',
            url:`${baseUrl}/api/BonusManage/get/GetBonusAmountInfo`
        })
    }
}
