const tencentcloud = require("tencentcloud-sdk-nodejs");
const cn = require('./zh-CN')
const dataVn = require('./vi-VN')
const dataEn = require('./en-US')
const fs = require('fs')
const path = require('path')

let fileUrlFn = (fileName)=>{
    return path.join(__dirname,`/${fileName}.js`)
}

// 腾讯翻译
const TmtClient = tencentcloud.tmt.v20180321.Client;

const clientConfig = {
    credential: {
      secretId: "AKIDHwKWS8YjeKp56sIkriJTQ8bolT9ZBgSz",
      secretKey: "Yt2vZxFH5cCaQ1LOAfuscHfnfHdnrfFY",
    },
    region: "ap-beijing",
    profile: {
      signMethod: "HmacSHA256", // 签名方法
      httpProfile: {
        reqMethod: "POST"
      },
    },
  };
  
const client = new TmtClient(clientConfig);
let cnKey = Object.keys(cn).filter(item=>!Object.keys(dataVn).includes(item))
let index = 0
let reqFn = async () => {
  let key = cnKey[index++]
  if(!key) return
  await client.TextTranslate({
      "SourceText": cn[key],
      "Source": "zh",
      "Target": "vi",
      "ProjectId": 0
    }).then(
      (data) => {
        console.log(data);
        dataVn[key] = dataVn[key] || data.TargetText
      },
      (err) => {
        console.error("error", err);
      }
    );
  await client.TextTranslate({
      "SourceText": cn[key],
      "Source": "zh",
      "Target": "en",
      "ProjectId": 0
    }).then(
      (data) => {
        console.log(data);
        dataEn[key] = dataEn[key]||data.TargetText
      },
      (err) => {
        console.error("error", err);
      }
    );
    setTimeout(reqFn,300)
}
let timer
let writeFn = () => {
    let cnL = Object.keys(cn).length
    let enL = Object.keys(dataEn).length
    let vnL = Object.keys(dataVn).length
    console.log('cnL',cnL)
    console.log('enL',enL)
    console.log('vnL',vnL)
    if(cnL === enL && cnL === vnL){

    let dbEn = 
`
const data = ${JSON.stringify(dataEn,null,4)}
module.exports = data
`
     fs.writeFileSync(fileUrlFn('en-US'),dbEn,'utf-8')
     console.log('英文翻译成功')
     let dbVn = 
`
const data = ${JSON.stringify(dataVn,null,4)}
module.exports = data
`
     fs.writeFileSync(fileUrlFn('vi-VN'),dbVn,'utf-8')
     console.log('越南翻译成功')
     timer&&clearTimeout(timer)
     return
    }
    timer = setTimeout(writeFn,1000)
}
if(cnKey.length>0){
  reqFn()
  writeFn()
} else {
    console.log('无可翻译文本')
}
