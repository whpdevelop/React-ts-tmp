const fs = require('fs')
const path = require('path')
const execSync = require('child_process').execSync; //同步子进程
const readLine = require("readline");
const moment = require('moment')
function awaitWraper(promise) {
    return promise.then((res) => [null, res])
    .catch((err) => [err, null])
}

let name = execSync('git show -s --format=%cn').toString().trim(); //姓名
let email = execSync('git show -s --format=%ce').toString().trim(); //邮箱
let date = new Date(); //日期
let message = execSync('git show -s --format=%s').toString().trim(); //说明
let branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const questionInterface = readLine.createInterface({
    input: process.stdin,
    output: process.stderr
});

let questionFn = ()=>{
    return new Promise((resolve,reject)=>{
        questionInterface.question(`请输入提交信息: `, answer => {
            questionInterface.close();
            if(answer.trim()) {
                resolve(answer.trim())
            } else {
                reject('无打包信息需手动提交')
            }
        });
    })
}

let main = async () => {
   let info =  await awaitWraper(questionFn())
    if(info[0]){
        console.log(info[0])
    } else {
        // Author:${name} <${email}>\n
        let versionStr = 
        `${new Array(40).join('*')}\n\nDate:${moment(new Date()).format('YYYY-MM-DD HH:mm')}\nCommit:${info[1]}\nBranch:${branch}\n\n${new Array(40).join('*')}`;
        console.log(moment(new Date()).format('YYYY-MM-DD HH:mm'))
        try {
            fs.writeFileSync(path.join(process.cwd(),'/dist/version.txt'), versionStr);
            // 写入版本信息之后，自动将版本信息提交到当前分支的git上
            try {
                execSync(`git add .`);
                console.log('git add . => 执行成功')
            } catch(e){
                console.log('git add . => 执行失败')
            }
            try {
                execSync(`git commit -m "${info[1]}"`);
                console.log('git commit  => 执行成功')
            } catch(e){
                console.log('git commit  => 执行失败')
            }
            try {
                execSync(`git push origin ${branch}`);
                console.log('git push  => 执行成功')
            } catch(e){
                console.log('git push  => 执行失败')
            }
        } catch (e) {
            console.log('版本信息文件创建失败：',e.message)
        }
    }
}
main()
