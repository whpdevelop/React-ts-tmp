import axios from 'axios'
// import jwt from 'jsonwebtoken'
axios.interceptors.request.use(
  config => {
    config.headers['content-type'] = 'application/json; charset=utf-8'
    config.headers['accept-language'] = 'zh-CN'
    // config.headers.Authorization = `Bearer ${constConfig.token}`
    // console.log('phone_number:',(jwt.decode(constConfig.token) as any).phone_number)
    // console.log('token:',jwt.decode(constConfig.token))
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response) {
      if(error.response.status===401){
        // console.log(`
        //   code:401
        //   token:
        //   // ${constConfig.token}
        // `)
      }
    }
    return Promise.reject(error) // 返回接口返回的错误信息
  })
  export {
    axios
  }