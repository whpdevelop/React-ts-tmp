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
        console.log(
`
    # 主要type
    feat:     增加新功能
    fix:      修复bug
    # 特殊type
    docs:     只改动了文档相关的内容
    style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
    build:    构造工具的或者外部依赖的改动，例如webpack，npm
    refactor: 代码重构时使用
    revert:   执行git revert打印的message
    # 暂不使用type
    test:     添加测试或者修改现有测试
    perf:     提高性能的改动
    ci:       与CI（持续集成服务）有关的改动
    chore:    不修改src或者test的其余修改，例如构建过程或辅助工具的变动
`
        )
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
        `
        ${new Array(40).join('*')}
        Date:${moment(new Date()).format('YYYY-MM-DD HH:mm')}
        Commit:${info[1]}
        Branch:${branch}
        ${new Array(40).join('*')}
        `;
        console.log(moment(new Date()).format('YYYY-MM-DD HH:mm'))
        try {
            fs.writeFileSync(path.join(process.cwd(),'/build/version.txt'), versionStr);
            // 写入版本信息之后，自动将版本信息提交到当前分支的git上
            try {
                execSync(`git add .`);
                console.log('git add . => 执行成功')
            } catch(e){
                console.log('git add . => 执行失败')
            }
            try {
                execSync(`git commit -m "${info[1]} ${moment(new Date()).format('YYYY-MM-DD HH:mm')}"`);
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
