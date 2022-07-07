//  这是后台的主文件

const express = require('express')
const bodyParser= require('body-parser')
const path = require('path')

const app = express()

// 数据库配置文件
const dbConfig = require('./config/config')

// dbConfig.connect()

// 中间件的设置
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// 加载路由文件
const categories =  require('./routes/api/categories')
const employee =  require('./routes/api/employee')
const Login =  require('./routes/api/login')
const Authority  = require('./routes/api/authoriry')
const Weather  = require('./routes/api/weather')
const Success  = require('./routes/api/success')
const News  = require('./routes/api/news')
const Doctor  = require('./routes/api/doctor')
const Message  = require('./routes/api/message')
const Appointment  = require('./routes/api/appointment')
const User  = require('./routes/api/users')
const Swiper  = require('./routes/api/swiper')
const Customer  = require('./routes/api/customer')

// 挂载路由
app.use('/api/categories',categories)
app.use('/api/employee',employee)
app.use('/api/',Login)
app.use('/api/authority',Authority)
app.use('/api/weather',Weather)
app.use('/api/success',Success)
app.use('/api/news',News)
app.use('/api/doctor',Doctor)
app.use('/api/message',Message)
app.use('/api/appointment',Appointment)
app.use('/api/user',User)
app.use('/api/swiper',Swiper)
app.use('/api/customer',Customer)

// 开放 静态资源文件
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))
app.use('/weather_icon',express.static(path.join(__dirname,'./weather_icon')))
app.use('/public',express.static(path.join(__dirname,'./public')))

app.listen(3000,function(){
    console.log('Server is running on port 3000');
})