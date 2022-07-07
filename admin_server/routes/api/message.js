//  这是留言板对应的API数据
const express = require('express')
const router = express.Router()

const uuid = require('node-uuid')

const connection = require('../../config/config')

// $route GET /api/message/count
// @desc 获取用戶留言的总数
// @access public
router.get('/count', (req, res) => {
  const sql = `SELECT COUNT(*) AS count FROM messages`

  connection.query(sql, (err, result) => {
    if (err) return console.log(err.message);

    return res.json({
      status: 0,
      msg: result[0].count
    })

  })

})

// $route POST /api/message/search/:id
// @desc  获取对应留言信息，如果是all就获取全部的展示信息
// @params 操作者的邮箱 PageSize 每页显示个数 currentPage 当前显示页数 id 显示那一条数据（如果是all就显示全部）
// @access private
router.post('/search/:id', (req, res) => {
  const id = req.params.id
  const currentPage = req.body.currentPage
  const pageSize = req.body.pageSize
  const email = req.body.email


  if (!id || !email || (id !== 'all' && !currentPage) || (id !== 'all' && !pageSize)) {
    return res.json({
      status: 400,
      msg: '参数错误，请重新登录或联系管理员'
    })
  }

  const sql = `SELECT * FROM success WHERE email = '${email}'`

  connection.query(sql, (err, result) => {
    if (err) return console.log(err)

    // 如果查无此人 或者 其不是管理员，则无法查看员工信息
    if (result.length === 0) {

      return res.json({
        status: 400,
        msg: '你无权限查看员工信息，可能您不是管理员'
      })

    } else {
      let sql
      if (id === 'all') {
        sql = `SELECT * FROM messages LIMIT ${(currentPage - 1) * pageSize},${pageSize}`
      } else {
        sql = `SELECT * FROM messages WHERE messageId = '${id}'`
      }

      connection.query(sql, (err, result) => {
        if (err) return console.log(err.message)

        return res.json({
          status: 0,
          msg: result
        })
      })
    }
  })


})

// $route POST /api/message/add
// @desc  添加留言内容
// @params 名医展示内容
// @access private
router.post('/add', (req, res) => {
  const createTime = req.body.createTime
  const address = req.body.address || '(用户未设置)'
  const name = req.body.name || '(匿名用户)'
  const body = req.body.body
  const phone = req.body.phone || '(用户未设置)'
  const email = req.body.email || '(用户未设置)'


  if (!createTime || !body) {
    return res.json({
      status: 400,
      msg: '参数错误，请重新登录或联系管理员'
    })
  }

  const messageId = uuid.v1().substr(0, 8)

  sql = `INSERT INTO messages VALUES('${messageId}','${name}','${createTime}','${phone}','${email}','${address}','${body}')`

  connection.query(sql, (err, result) => {
    if (err) return console.log(err)

    return res.json({
      status: 0,
      msg: {
        createTime: req.body.createTime,
        email: req.body.email,
        address: req.body.address,
        name: req.body.name,
        body: req.body.body,
        phone: req.body.phone,
        messageId
      }
    })
  })
})


//  $ route POST /api/message/date/:startDate/:endDate
//  @ desc 根据入职时间进查找
//  @ params email  操作者的用户邮箱
//  @ access private
router.post('/date/:startDate/:endDate', (req, res) => {

  const email = req.body.email
  const startDate = req.params.startDate
  const endDate = req.params.endDate

  if (!email) {
    return res.json({
      status: 400,
      msg: '参数错误，请重新登录或联系管理员'
    })
  }

  const sql = `SELECT * FROM messages WHERE createTime BETWEEN '${startDate}' AND '${endDate}'`

  connection.query(sql, (err, result) => {
    if (err) return console.log(err.message)

    res.json({
      status: 0,
      msg: result
    })
  })
})



// $route POST /api/message/delete/:id
// @desc  删除展示内容
// @params 操作者的工作邮箱
// @access private
router.post('/delete/:id', (req, res) => {
  const email = req.body.email
  const id = req.params.id

  if (!email || !id) {
    return res.json({
      status: 400,
      msg: '参数错误，请重新登录或联系管理员'
    })
  }

  const sql = `SELECT * FROM employee WHERE email = '${email}'`

  connection.query(sql, (err, result) => {
    if (err) return console.log(err)

    // 如果查无此人 或者 其不是管理员，则无法查看员工信息
    if (result.length === 0 || result[0].Identity !== '管理员') {

      return res.json({
        status: 400,
        msg: '你无权限查看员工信息，可能您不是管理员'
      })

    } else {
      const sql = `DELETE FROM messages WHERE messageId = '${id}'`
      connection.query(sql, (err, result) => {
        if (err) return console.log(err)

        if (result.length === 0) {
          return res.json({
            status: 400,
            msg: '内容删除失败'
          })
        } else {
          return res.json({
            status: 0,
            msg: '评论内容删除成功'
          })
        }
      })
    }
  })
})

module.exports = router