const cn = require('./zh-CN')
const en = require('./en-US')
const vi = require('./vi-VN')
const fs = require('fs')

// {"key" : "t20", "zh" : "", "en" : "", "vi" : "", "type" : "dbay-register+download"}
let arr = []
for(let key in cn){
    let obj = {}
    obj.key = key
    obj.zh = cn[key]
    obj.en = en[key]
    obj.vi = vi[key]
    obj.type = "dbay-links"
    arr.push(obj)
}

let main = () =>  {
    if(!arr[0].type) return console.log(`obj.type = "不能为空"`)
    console.log('==========')
    fs.writeFileSync('./data.js',JSON.stringify(arr,null,4),'utf-8')
    console.log('==========')
}
main()
