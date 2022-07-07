// 设置axios的请求和响应拦截

import axios from 'axios'
import { Message, Loading } from 'element-ui';
import router from './router'

let loading

const startLoading = () => {    
    loading = Loading.service({
        lock: true,
        text: '拼命加载中。。。',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

const endLoading = () => {    
    loading.close()
}

// 请求拦截  设置统一header
axios.interceptors.request.use(config => {
    startLoading()

    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截  
axios.interceptors.response.use(response => {
    endLoading()

    return response
}, error => {
    // 错误提醒
    endLoading()

    Message.error(error.response.data)

    router.push('/login')

    return Promise.reject(error)
})

export default axios