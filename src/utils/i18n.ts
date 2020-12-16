
import zhCN from './language/zh-CN'
import zhTW from './language/zh-TW'
import enUS from './language/en-US'
import viVN from './language/vi-VN'
import store from '@/store'
let dataObj = {
    cn:zhCN,
    tw:zhTW,
    en:enUS,
    vn:viVN
}
;(<any>window).l = (key:string) =>{
    let languageKey:string = store.getState().globalReducer.locale || 'cn'
    try {
        return dataObj[languageKey][key]
    } catch(e){
        console.log(e.message)
        return key
    }
} 

// export default (key:string) =>{
//     let languageKey:string = store.getState().globalReducer.locale || 'cn'
//     try {
//         return dataObj[languageKey][key]
//     } catch(e){
//         console.log(e.message)
//         return key
//     }
// } 