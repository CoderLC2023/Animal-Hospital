// 这是获取近三天的天气信息的API（数据来源于 和风天气）
const express = require('express')
const router = express.Router()

const request = require('request')

// $route POST /api/weather/
// @params location 需要查询那个城市的天气信息
// @desc 获取对应地区的当前，未来三天的天气信息
// @access private
router.post('/', (req, res) => {
    const location = req.body.location

    if (!location) {
        return res.json({
            status: 400,
            msg: '参数错误！，请尽快联系管理员！！！'
        })
    }

    // 用以暂存实时天气数据
    let now = {}

    // 请求 实时的天气你数据
    let url = `https://api.heweather.net/s6/weather/now?location=${location}&key=e68b4d5405c048aa82f791e972a530e1`
    request(url, (err, response, body) => {
        if (err) return console.log(err.message);

        const now = JSON.parse(body).HeWeather6[0].now

        // 请求 三日（今天，明天，后天的天气数据）
        url = `https://api.heweather.net/s6/weather/forecast?location=${location}&key=e68b4d5405c048aa82f791e972a530e1`

        request(url, (err, response, body) => {
            if (err) return console.log(err.message);


            const bodyObj = JSON.parse(body).HeWeather6[0]

            const imageUrl = `http://localhost:3000/weather_icon/${now.cond_code}.png`

            bodyObj.now = now
            bodyObj.now.imageUrl = imageUrl

            let arr = bodyObj.daily_forecast
            arr.map((item,index) => {
                bodyObj.daily_forecast[index].cond_code_d_img = `http://localhost:3000/weather_icon/${item.cond_code_d}.png`
                bodyObj.daily_forecast[index].cond_code_n_img = `http://localhost:3000/weather_icon/${item.cond_code_n}.png`
            })

            return res.json({
                status: 0,
                msg: bodyObj
            })
        })
    })


})



module.exports = router