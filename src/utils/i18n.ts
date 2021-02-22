
import zhCN from '@/utils/language/zh-CN'
import zhTW from '@/utils/language/zh-TW'
import enUS from '@/utils/language/en-US'
import viVN from '@/utils/language/vi-VN'
import {Utils} from './'

let dataObj:any = {
    'zh-CN':zhCN,
    'zh-TW':zhTW,
    'en-US':enUS,
    'vi-VN':viVN
}
window.l = (key:string) =>{
    let languageKey:string  
    let locale = Utils.getItemL('locale')
    languageKey = locale?locale :'zh-CN'
    l.locale = languageKey;
    try {
        return dataObj[languageKey][key]
    } catch(e){
        console.log(e.message)
        return key
    }
}