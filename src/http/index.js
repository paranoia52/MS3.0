const BaseUrl = 'http://127.0.0.1:3000'
import axios from 'axios'

axios.defaults.baseURL = BaseUrl
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // console.log(config)
    if (config.url.indexOf('login') === -1 && sessionStorage.getItem('token')) {
      config.headers["token"] = sessionStorage.getItem('token')
    }
    return config
  },
  error => {
    return Promise.error(error)
  })

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  });
}


/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, JSON.stringify(params)).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
