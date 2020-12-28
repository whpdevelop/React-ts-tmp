const path = require('path')
const fs = require('fs')
const axios = require('axios')
const {traditionalized} = require('./cn2tw')
const zhCN  = require('../src/utils/language/zh-CN.js')

const  username = 'dbay-register+download'
const password = 'dbay-register+download'
// const url = 'http://192.168.0.126:8888'
const url = 'http://47.52.0.186:10198'
const lObj = {
    cn:'zh-CN',
    vn:'vi-VN',
    en:'en-US',
    tw:'zh-TW'
}
let fileUrlFn = (fileName)=>{
    return path.join(process.cwd(),`/src/utils/language/${fileName}.js`)
}
let ctnFn = (data) => {
    return  (
    `module.exports = ${JSON.stringify(data,null,4)}`
    )
}
let getLangFn = (locale,token) => {
    axios.get(`${url}/getDataAll`,{
        headers: {
            'Authorization': token
        }
    }).then(res=>{
        let {data:{code,data}} = res
        if(code !== 200) return console.log('fail')
        let obj = {}
        let itemKey = locale === 'vn'?'vi':locale
        data.filter(item=>item.type === username).forEach(item=>{
            obj[item.key] = item[itemKey]
        })
        let fileUrl = fileUrlFn(lObj[locale])
        fs.writeFileSync(fileUrl,ctnFn(obj,lObj[locale]),'utf-8')
        console.log('success')
        
    })
}

 (async ()=>{
    let {data:{code,data:token}} = await axios.post(`${url}/login`,{
        username,
        password
    })
    if(code !==200) return console.log('获取token失败')
    console.log(code)
    console.log(token)
    process.stdin.setEncoding('utf8');
    console.log(`
       /* *
       *   type: 
       *   => cn 更新远程 cn.json
       *   => tw 更新本地 tw.json
       *   => en 更新本地 en.json
       *   => vn 更新本地 vn.json
       */
    `)
    process.stdout.write('=>');
    process.stdin.on("data", (input) => {
       if(input.trim() === 'cn'){
           process.stdin.emit('end');
            axios.post(`${url}/addData`,
            {
                data:zhCN
            },
            {
                headers: {
                    'Authorization': token
                }
            }
            ).then(res=>{
                console.log(res.data.msg)
            }).catch(err=>{
                console.log(err)
            })
       }
       // console.log(input.trim() === 'en')
       if(input.trim() === 'en'){
           process.stdin.emit('end');
           getLangFn('en',token)
       }
       // console.log(input.trim() === 'vn')
       if(input.trim() === 'vn'){
           process.stdin.emit('end');
           getLangFn('vn',token)
       }
       if(input.trim() === 'tw'){
           let tw = {}
           process.stdin.emit('end');
           try {
               for(var key in zhCN){
                   tw[key] = traditionalized(zhCN[key])
               }
               fs.writeFileSync(fileUrlFn(lObj.tw),ctnFn(tw,lObj.tw),'utf-8')
               console.log('success')
           } catch(e){
               console.log('fail')
           }
       }
   
   })
 })()
// process.stdin.on('end', () => {
//     process.stdout.write('end');
// });