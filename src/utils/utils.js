import moment from 'moment'
import React from 'react'

const regObj = {
    password:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
    email:/^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/,
    mobile:/^[0-9]{4,11}$/
}

class Utils {
    static isDev () {
        return window.location.href.startsWith('https')
    }
    static getItemL (item) {
        if(!item){
            return null
        }
        let result
        try {
            result = JSON.parse(localStorage.getItem(item))
        } catch(err) {
            result = localStorage.getItem(item)
        }
        return result
     }
     static setItemL (key,value) {
        if(!value || !key){
            return null
        }
         let params = typeof value === 'object'? JSON.stringify(value):value
         return localStorage.setItem(key,params)
     }
     static removeItemL (key) {
         localStorage.removeItem(key)
     }
     static getItemS (item) {
        if(!item){
            return null
        }
        let result
        try {
            result = JSON.parse(sessionStorage.getItem(item))
        } catch(err) {
            result = sessionStorage.getItem(item)
        }
        return result
     }
     static setItemS (key,value) {
        if(!value || !key){
            return null
        }
         let params = typeof value === 'object'? JSON.stringify(value):value
         return sessionStorage.setItem(key,params)
     }
     static removeItemS (key) {
         sessionStorage.removeItem(key)
     }
  
     static objToQueryStr (obj) {
      return Object.keys(obj).map((key) => {
          return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(obj[key]));
        }).join('&');
     }
     static getUrlParams (name) { 
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式 
      var r = window.location.search.substr(1).match(reg);  
      if (r != null) return unescape(r[2]); 
      return null; 
    }
     static aLink(hash){
        let aEle = document.createElement('a')
        aEle.href = hash
        aEle.target = '_blank'
        aEle.click()
     }
     /**
      * 根据对象数组中的某一项去重
      * @param {*} arr 
      * @param {*} u_key 
      */
     static arrOUniqueFn (arr,u_key){
      let obj = {}
      return arr.reduce((prev,next)=>{
          if(!obj[next[u_key]]){
              obj[next[u_key]] = true
              prev.push(next)
          }
        return prev 
      },[])
    }
    /**
     * 小数点保留位数
     * @param {*} value 数值
     * @param {*} num  保留位数 默认 2
     * @param {*} type +-
     */
    static toFixed2 (value,num=2,type=null) {
      if(!(value - 0)){
          return 0
      } else {
          let val = (value-0).toFixed(num);
          if(val === '0.00') return '0.00'
          let reg = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
          if(type){
              if(val.replace(reg, "$1,")>0){
                  return '+' + val.replace(reg, "$1,")
              } else if(val.replace(reg, "$1,")<0) {
                  return val.replace(reg, "$1,")
              }
          } else {
              return val.replace(reg, "$1,");
          }
      }
    }
    static ceil2 (value,type) {
      if(!(value - 0)){
          return
      }else {
          let val = Math.ceil((value-0)*100)/100+'';
          let reg = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
          if(type){
              if(val.replace(reg, "$1,")>0){
                  return '+' + val.replace(reg, "$1,")
              } else if(val.replace(reg, "$1,")<0) {
                  return val.replace(reg, "$1,")
              }
          } else {
              return val.replace(reg, "$1,");
          }
      }
    }
    static ceil24 (value,type) {
      if(!(value - 0)){
          return 0
      }else {
          let val
          val = Math.floor((value-0)*10000)/10000+'';
  
          // if(value-0>=100){
          //     val = Math.floor((value-0)*100)/100+'';
          // }else{
          //     val = Math.floor((value-0)*10000)/10000+'';
          // }
          let reg = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
          if(type){
              if(val.replace(reg, "$1,")>0){
                  return '+' + val.replace(reg, "$1,")
              } else if(val.replace(reg, "$1,")<0) {
                  return val.replace(reg, "$1,")
              }
          } else {
              return val.replace(reg, "$1,");
          }
      }
    }
    static toPercentage (value) {
      if(!value) return '--';
      let str=Number(value)*100;
      str+="%";
      return str;
    }
    static randomNum (minNum,maxNum) { 
      return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
    }
    static dateFormat (minNum,maxNum) { 
      return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
    } 
    static classNameFn (...rest) {
        return rest.join(' ')
    }   
    static throttle (fn, delay) {
        // 定义上次触发时间
        let last = 0;
        return (...args) => {
          const now = + Date.now();
          if (now > last + delay) {
            last = now;
            fn.apply(this, args);
          }
        };
      }
      
    /**
     * 防抖Debounce
     */
    static debounce (fn, delay) {
        let timer;
        return (...args) => {
            // 判断定时器是否存在，清除定时器
            if (timer) {
                clearTimeout(timer);
            }
            // 重新调用setTimeout
            timer = setTimeout(() => {
                fn.apply(this, args);
            }, delay);
        };
    }
    static utcToBj (value,format = 'YYYY-MM-DD HH:mm') {
        if(value === '--') return '--'
        if(!value) return null
        return moment(value).add(8,'hour').format(format)
    }
    static timeFormat (value,format = 'HH:mm:ss') {
        if(value === '--') return '--'
        if(!value) return null
        return moment(value).format(format)
    }
    static imgError (param) {
        let {
            width=27,
            height=27,
            url
        } = param
        try {
            let  imgUrl = require(`../assets${url}`)
            return (
                <img
                    width={width}
                    height={height}
                    src={imgUrl} 
                alt=""/>
            )
        } catch (e) {
            return ''
        }
    }
    static enter (param = '',space=false) {
        let str = typeof param === 'string' ? param : (param).toString()
        if(space)
            return str.replace(/(\r)?\n/g, '<br />').replace(/\s{2}/g,"&emsp;")
        else
            return str.replace(/(\r)?\n/g, '<br />')
    }
    static checkout(key,value){
        try{
            if(!regObj[key]) return value.trim().length>0
            return regObj[key].test(value)
        } catch (e){
            console.log(e)
            return false
        }
    }
}

export default Utils