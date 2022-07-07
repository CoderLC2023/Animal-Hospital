//  这是新闻展示对应的API数据
const express = require('express')
const router = express.Router()

const uuid = require('node-uuid')

const connection = require('../../config/config')

// $route GET /api/news/count
// @desc 获取站内新闻的总数
// @access public
router.get('/count', (req, res) => {
  const sql = `SELECT COUNT(*) AS count FROM news`

  connection.query(sql, (err, result) => {
    if (err) return console.log(err.message);

    return res.json({
      status: 0,
      msg: result[0].count
    })

  })

})

// $route POST /api/news/search/:id
// @desc  获取对应新闻信息，如果是all就获取全部的新闻信息
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

  const sql = `SELECT * FROM employee WHERE email = '${email}'`

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
        sql = `SELECT * FROM news LIMIT ${(currentPage - 1) * pageSize},${pageSize}`
      } else {
        sql = `SELECT * FROM news WHERE Nid = '${id}'`
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

// $route POST /api/news/add
// @desc  添加新闻内容
// @params 新闻内容和操作者邮箱组成的数据对象
// @access private
router.post('/add',(req,res)=>{
  const email = req.body.email
  const createTime = req.body.createTime
  const route = req.body.route
  const title = req.body.title
  const body = req.body.body


  if (!email || !createTime || !route || !title || !body ) {
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

          let sql = `SELECT * FROM news WHERE route = '${route}'
          `

          connection.query(sql, (err, result) => {
              if (err) return console.log(err)

              if (result.length !== 0) {
                  return res.json({
                      status: 0,
                      msg: '路由已存在，请重新设置路由'
                  })
              }
          })

          const nid = uuid.v1().substr(0,8)

          sql = `INSERT INTO news VALUES('${nid}','${email}','${title}','${createTime}','${body}','${route}')`

          connection.query(sql, (err, result) => {
              if (err) return console.log(err)

              return res.json({
                  status: 0,
                  msg: {
                      createTime: req.body.createTime,
                      email: req.body.email,
                      route: req.body.route,
                      title: req.body.title,
                      body: req.body.body,
                      nid
                  }
              })
          })
      }
  })
})

// $route POST /api/news/update/:id
// @desc  更新新闻内容
// @params 新闻内容和操作者邮箱组成的数据对象
// @access private
router.post('/update/:id',(req,res)=>{
  const email = req.body.email
  const id = req.params.id

  const route = req.body.route

  if (!email || !id) {
      return res.json({
          status: 400,
          msg: '参数错误，请重新登录或联系管理员'
      })
  }

  const sql = `SELECT * FROM employee WHERE email = '${email}'`

  // 根据参数 拼接需要更新的内容
  let queryStr = []

  connection.query(sql, (err, result) => {
      if (err) return console.log(err)

      // 如果查无此人 或者 其不是管理员，则无法查看员工信息
      if (result.length === 0 || result[0].Identity !== '管理员') {

          return res.json({
              status: 400,
              msg: '你无权限查看员工信息，可能您不是管理员'
          })

      } else {
          for (item in req.body) {

              // 在更新前，剔除不需要的信息
              if (item === 'createTime' || item === 'nid') {
                  continue
              }

              let str = item + "= '" + req.body[item] + "'"
              queryStr.push(str)
          }
      }

      str = queryStr.join(',')

      const sql = `UPDATE news SET ${str} WHERE nid ='${id}'`

      connection.query(sql,(err,result) =>{
          if(err) return console.log(err.message)

          if(result.length !== 0){
            return res.json({
                status:0,
                msg:"更新新闻信息成功",
                nid:id
            })
          }

          return res.json({
            status: 0,
            msg: "更新新闻信息失败"
        })
      })

    })
})

// $route POST /api/news/delete/:id
// @desc  删除新闻内容
// @params 操作者的工作邮箱
// @access private
router.post('/delete/:id',(req,res) =>{
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
           const sql = `DELETE FROM news WHERE nid = '${id}'`
           connection.query(sql, (err, result) => {
               if (err) return console.log(err)

               if (result.length === 0) {
                   return res.json({
                       status: 400,
                       msg: '新闻删除失败'
                   })
               } else {
                   return res.json({
                       status: 0,
                       msg: '新闻删除成功'
                   })
               }
           })
       }
   })
})

// $route POST /api/news/searchInfo/:queryStr
// @desc 根据新闻的标题对标题内容进行模糊查询
// @params email 用户的操作邮箱
// @access private
router.post('/searchInfo/:queryStr', (req, res) => {
  const queryStr = req.params.queryStr
  const email = req.body.email

  if (!email || !queryStr) {
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
          let count
          let sql = `SELECT COUNT(*) AS count FROM news WHERE title LIKE '%${queryStr}%'`
          connection.query(sql,(err,result)=>{
              if(err) return console.log(err.message);

              count = result[0].count
          })

           sql = `SELECT * FROM news WHERE title LIKE '%${queryStr}%'`
          connection.query(sql,(err,result)=>{
              if(err) return console.log(err.message);

              return res.json({
                  status:0,
                  msg:result,
                  count
              })
          })
      }
  })
})

// $route GET /api/news/searchNews/:route
// @desc 前端获取站内新闻案例
// @access public
router.get('/searchNews/:route',(req,res) =>{
    const route = req.params.route

    let sql = ''

    if(route === 'all'){
        sql = `SELECT * FROM news ORDER BY createTime DESC`
    }else{
        sql = `SELECT * FROM news WHERE route = '/${route}' ORDER BY createTime DESC`
    }

    connection.query(sql,(err,result) =>{
        if(err) console.log(err.message)

        return res.json({
            status:0,
            msg: result
        })
    })

})

module.exports = router