import moment from 'moment'

const regObj:any = {
    password:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
    email:/^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/,
    mobile:/^[0-9]{4,11}$/
}

String.prototype.format = function (args:any) {
    if (arguments.length > 0) {
        let result = this;
        if (arguments.length === 1 && typeof (args) === "object") {
            for (let key in args) {
                let reg = new RegExp("({" + key + "})", "g");
                result = result.replace(reg, args[key]);
            }
        }
        else {
            for (let i = 0; i < arguments.length; i++) {
                if (arguments[i] === undefined) {
                    return "";
                }
                else {
                    let reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
        return result;
    }
    else {
        return this;
    }
}

class Utils {
    static isDev () {
        return !window.location.href.startsWith('https')
    }
    static getItemL (item:string) {
        if(!item){
            return null
        }
        let result
        try {
            result = JSON.parse((localStorage.getItem(item) as string))
        } catch(err) {
            result = localStorage.getItem(item)
        }
        return result
     }
     static setItemL (key:string,value:any) {
        if(!value || !key){
            return null
        }
         let params = typeof value === 'object'? JSON.stringify(value):value
         return localStorage.setItem(key,params)
     }
     static removeItemL (key:string) {
         localStorage.removeItem(key)
     }
     static getItemS (item:string) {
        if(!item){
            return null
        }
        let result
        try {
            result = JSON.parse((sessionStorage.getItem(item) as string))
        } catch(err) {
            result = sessionStorage.getItem(item)
        }
        return result
     }
     static setItemS (key:string,value:any) {
        if(!value || !key){
            return null
        }
         let params = typeof value === 'object'? JSON.stringify(value):value
         return sessionStorage.setItem(key,params)
     }
     static removeItemS (key:string) {
         sessionStorage.removeItem(key)
     }
  
     static objToQueryStr (obj:any) {
      return Object.keys(obj).map((key) => {
          return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(obj[key]));
        }).join('&');
     }
     static getUrlParams (name:string) { 
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式 
      var r = window.location.search.substr(1).match(reg);  
      if (r != null) return unescape(r[2]); 
      return null; 
    }
     static aLink(hash:string){
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
     static arrOUnique<T,U extends keyof T> (arr:T[],u_key:U){
      let obj:any = {}
      return arr.reduce((prev:T[],next:T)=>{
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
    static toFixed2 (value:any,num=2,type=null) {
      if(!(value - 0)){
          return 0
      } else {
          let val = (value-0).toFixed(num);
          if(val === '0.00') return '0.00'
          let reg = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
          if(type){
              if(Number(val)>0){
                  return '+' + val.replace(reg, "$1,")
              } else if(Number(val)<0) {
                  return val.replace(reg, "$1,")
              }
          } else {
              return val.replace(reg, "$1,");
          }
      }
    }
    static ceil2 (value:number,type:boolean=false) {
      if(!(value - 0)){
          return
      }else {
          let val = Math.ceil((value-0)*100)/100+'';
          let reg = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
          if(type){
              if(Number(val)>0){
                  return '+' + val.replace(reg, "$1,")
              } else if(Number(val)<0) {
                  return val.replace(reg, "$1,")
              }
          } else {
              return val.replace(reg, "$1,");
          }
      }
    }
    static ceil24 (value:number,type:boolean=false) {
      if(!(value - 0)){
          return 0
      }else {
          let val
          val = Math.floor((value-0)*10000)/10000+'';
          let reg = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
          if(type){
              if(Number(val)>0){
                  return '+' + val.replace(reg, "$1,")
              } else if(Number(val)<0) {
                  return val.replace(reg, "$1,")
              }
          } else {
              return val.replace(reg, "$1,");
          }
      }
    }
    static toPercentage (value:number) {
      if(!value) return '--';
      let str=Number(value)*100;
      return `${str}%`;
    }
    static randomNum (minNum:number,maxNum:number) { 
      return parseInt(Math.random()*(maxNum-minNum+1)+minNum + '',10); 
    }
    static dateFormat (minNum:number,maxNum:number) { 
      return parseInt(Math.random()*(maxNum-minNum+1)+minNum + '',10); 
    } 
    static className(...rest:string[]) {
        return rest.join(' ')
    }   
    // static throttle (fn, delay=3000) {
    //     let preTime = Date.now()
    //     return (event) => {
    //         const context = this
    //         // event.persist&&event.persist() // 保留对事件的引用
    //         let doTime = Date.now()
    //         if(doTime - preTime >= delay) {
    //             fn.apply(context)
    //             perTime = Date.now()
    //         }
    //     }
    //   }
      
    /**
     * 防抖Debounce
     */
    // static debounce (fn, delay) {
    //     let timer;
    //     return (...args) => {
    //         // 判断定时器是否存在，清除定时器
    //         if (timer) {
    //             clearTimeout(timer);
    //         }
    //         // 重新调用setTimeout
    //         timer = setTimeout(() => {
    //             fn.apply(this, args);
    //         }, delay);
    //     };
    // }
    static utcToBj (value:any,format = 'YYYY-MM-DD HH:mm:ss') {
        if(value === '--') return '--'
        if(!value) return null
        return moment(value).add(8,'hour').format(format)
    }
    static timeFormat (value:any,format = 'HH:mm:ss') {
        if(value === '--') return '--'
        if(!value) return null
        return moment(value).format(format)
    }
    // static imgError (param:any) {
    //     let {
    //         className,
    //         url
    //     } = param
    //     try {
    //         let  imgUrl = url
    //         return (
    //             <img
    //                 className={className}
    //                 src={imgUrl} 
    //             alt=""/>
    //         )
    //     } catch (e) {
    //         return ''
    //     }
    // }
    static enter (param:any = '',space=false) {
        let str = typeof param === 'string' ? param : param.toString()
        if(space)
            return str.replace(/(\r)?\n/g, '<br />').replace(/\s{2}/g,"&emsp;")
        else
            return str.replace(/(\r)?\n/g, '<br />')
    }
    static checkout(key:string,value:any){
        try{
            if(!regObj[key]) return value.trim().length>0
            return regObj[key].test(value)
        } catch (e){
            console.log(e)
            return false
        }
    }
    /**
     * 
     * @param {图片路径} url 
     * @param {格式} ext 
     */
    static img2base64(param:any,callback:any){
            let {url,ext='png',width=375,height=512} = param
            let canvas:any = document.createElement("canvas"); //创建canvas DOM元素
            let ctx = canvas.getContext("2d");
            let img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = url;
            img.onload = function () {
                canvas.height = height; //指定画板的高度,自定义
                canvas.width = width; //指定画板的宽度，自定义
                ctx?.drawImage(img, 0, 0, width,height); //参数可自定义
                let dataURL = canvas.toDataURL("image/" + ext);
                callback(dataURL); //回掉函数获取Base64编码
                canvas = null;
            }
    }
    /**
     * 
     * @param {2020-01-01 20:20:20} parma 
     */
    static date2ms = (parma='') => {
        try {
            return new Date(parma.replace(/-/g,'/')).getTime()
        } catch(e){
            return 0
        }
    }
}

export default Utils