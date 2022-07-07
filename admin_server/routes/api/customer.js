//  这是名医展示对应的API数据
const express = require('express')
const router = express.Router()

const uuid = require('node-uuid')

// 引入加密中间件
const bcrypt = require('_bcryptjs@2.4.3@bcryptjs')

const connection = require('../../config/config')

// $route post /api/customer/add
// @desc  添加新用户的api数据接口
// @params 由用户手机号和密码构成的数据对象
// @public private
router.post('/add', (req, res) => {
  const phone = req.body.phone
  const password = req.body.password

  if (!phone || !password) {
    return res.json({
      status: 400,
      msg: '参数错误，可以在联系我们中进行相应的反馈'
    })

  }

  let customer = {
    phone: req.body.phone,
    password: req.body.password
  }

  const sql = `SELECT * FROM customers WHERE phone = '${customer.phone}'`

  connection.query(sql, (err, result) => {
    if (err) console.log(err.message)
    if (result.length !== 0) {
      return res.json({
        status: 400,
        msg: "当前用户已经存在，请检查后再次操作！！！"
      })
    } else {
      // 进行数据的加密
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err
          // 将加密后的密码 加入的 customer对象中
          customer.password = hash

          // 生成 用户8为ID
          const id = uuid.v1().substr(0, 8)

          // 进行新用户的插入(加密是异步操作，所以放在里面进行插入
          const sql = `INSERT INTO customers VALUES('${id}','${customer.phone}','${customer.password}')`

          connection.query(sql, (err, result) => {
            if (err) return console.log(err.message)

            return res.json({
              status: 0,
              msg: {
                id: id,
                phone: customer.phone,
                password: customer.password
              }
            })
          })
        })
      })
    }
  })
})

// $route post /api/customer/login
// @desc  新用户的登录 api数据接口
// @params 由用户手机号和密码构成的数据对象
// @public private
router.post('/login', (req, res) => {
  const phone = req.body.phone
  const password = req.body.password

  if (!phone || !password) {
    return res.json({
      status: 400,
      msg: '参数错误，可以在联系我们中进行相应的反馈'
    })
  }

  let customer = {
    phone: req.body.phone,
    password: req.body.password
  }

  const sql = `SELECT * FROM customers WHERE phone = '${customer.phone}'`

  connection.query(sql, (err, result) => {
    if (err) console.log(err.message)
    if (result.length === 0) {
      return res.json({
        status: 400,
        msg: "当前用户不存在，请检查后再次操作！！！"
      })
    } else {
      // 密码比对方法
      // 第一个参数为传入的需要比较的密码
      // 第二个是数据库中使用bcrypt进行加密的密码
      bcrypt.compare(req.body.password, result[0].password)
        .then(isCompare => { //回调函数中的形参是boolean值
          if (isCompare) {
            const sql = `SELECT * FROM customers WHERE phone = '${customer.phone}'`
            connection.query(sql, (err, result) => {
              if (err) return console.log(err.message)

              return res.json({
                status: 0,
                msg: result
              })
            })
          } else {
            res.json({
              status: 400,
              msg: ' 用户密码不正确 '
            })
          }
        })
    }
  })
})

// $route post /api/customer/searchUser
// @desc  新用户的登录 api数据接口
// @params 用户手机号
// @public private
router.post('/searchUser',(req,res)=>{
    const phone = req.body.phone

    if(!phone){
      return res.json({
        stauts:0,
        msg:'参数不正确，您可以在联系我们中向我们进行反馈'
      })
    }

    const sql =  `SELECT * FROM appointments WHERE phone ='${phone}'`

    connection.query(sql,(err,result)=>{
      if(err) return console.log(err.message)

      return res.json({
        status:0,
        msg:result
      })

    })
})

// $route post /api/customer/delete
// @desc  新用户的登录 api数据接口
// @params 预约的id值（Aid）
// @public private
router.post('/delete',(req,res)=>{
  const aid = req.body.aid

  const sql = `Delete FROM appointments WHERE aid = '${aid}'`

  connection.query(sql,(err,req)=>{
    if(err) return err.message;

    return res.json({
      status:0,
      msg:'您的预约已取消'
    })
  })
})

module.exports = router
