const path = require('path')
const fs = require('fs')

let jsxFn = (fileName,flag=true)=>( 
`
import React, { useState,useEffect } from 'react'
${flag?"import './"+fileName+".scss'":"import 'style.scss'"}

import { connect } from 'react-redux'
import { mapDispatchToPropsFN } from '@/store/reducers/global.reducer'

import { l } from '@/utils'

interface IProps = {

}
const ${fileName} = (props:IProps) => {
    return (
        <div className="">
        </div>
    )
}
let mapStateToProps = (state) => {
    let {
        local
    } = state.globalReducer
    return {
        local
    }
}
let mapDispatchToProps = {
    mapDispatchToPropsFN
}
export default connect(mapStateToProps,mapDispatchToProps)(${fileName});
`)
let step = 1;
let pathFile
let fileName
let createPatn
process.stdin.setEncoding('utf8');
 console.log(`
%c /* *
    *  功能: 创建模板
    *  path: 创建模板的路径
    *  fileName: 
    *   => 没有后缀是目录
    *   => 有后缀是文件
    */
 `,"color:red")
 process.stdout.write('path => ');
 process.stdin.on("data", (input) => { 
     let inp = input.trim()
     if(!inp){
         if(step === 1) process.stdout.write('path =>');
         if(step === 2) process.stdout.write('fileName =>');
     } else {
         if(step === 1) {
            pathFile = inp
            step = 2
            process.stdout.write('fileName => ');
            return
         }
         if(step ===2){
            fileName = inp.slice(0, 1).toUpperCase() + inp.slice(1)
            process.stdin.emit("end")
         }
         if(fileName.indexOf('.tsx')>-1){
            createPatn = path.join(pathFile,fileName)
            fs.writeFile(createPatn,jsxFn(fileName.split('.')[0],false),'utf8',function(error){
                if(error){
                    console.log(error);
                    return false;
                }
                console.log('写入 tsx 成功');
            })
         } else {
            createPatn = path.join(pathFile,fileName)
            fs.mkdir(createPatn,function(error){
                if(error){
                    console.log(error);
                    return false;
                }
                console.log('创建目录成功');
                fs.writeFile(path.join(createPatn,`${fileName}.tsx`),jsxFn(fileName),'utf8',function(error){
                    if(error){
                        console.log(error);
                        return false;
                    }
                    console.log('写入 tsx 成功');
                })
                fs.writeFile(path.join(createPatn,`${fileName}.scss`),'','utf8',function(error){
                    if(error){
                        console.log(error);
                        return false;
                    }
                    console.log('写入 scss 成功');
                })
            })
         }
     }
 })