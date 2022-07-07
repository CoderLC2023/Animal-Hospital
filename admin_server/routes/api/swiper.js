//  这是首页轮播对应的API数据
const express = require('express')
const router = express.Router()

const uuid = require('node-uuid')

const connection = require('../../config/config')

// $route GET /api/swiper/count
// @description 获取站内轮播图的总数
// @access public
router.get('/count', (req, res) => {
    const sql = `SELECT COUNT(*) AS count FROM swiper`

    connection.query(sql, (err, result) => {
        if (err) return console.log(err.message);

        return res.json({
            status: 0,
            msg: result[0].count
        })

    })

})

// $route GET /api/swiper/userData
// @description 为前台提供可以使用的轮播图数据
// @access public
router.get('/userData',(req,res)=>{
    const sql = `SELECT * FROM swiper WHERE useful = 'true'`

    connection.query(sql,(err,result)=>{
        if(err) console.log(err.message);

        return res.json({
            status:0,
            msg:result
        })
    })

})

// $route POST /api/swiper/search/:id
// @description  获取对应轮播图信息，如果是all就获取全部的科室信息(管理员使用)
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
                sql = `SELECT * FROM swiper LIMIT ${(currentPage - 1) * pageSize},${pageSize}`
            } else {
                sql = `SELECT * FROM swiper WHERE Sid = '${id}'`
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
// @description  添加轮播图内容
// @params 轮播图内容和操作者邮箱组成的数据对象
// @access private
router.post('/add', (req, res) => {
    const email = req.body.email
    const createTime = req.body.createTime
    const route = req.body.route
    const title = req.body.title
    const description = req.body.description
    const imgUrl = req.body.imgUrl

    if (!email || !createTime || !route || !title || !description || !imgUrl) {
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

            let sql = `SELECT * FROM swiper WHERE route = '${route}'
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

            const sid = uuid.v1().substr(0, 8)

            sql = `INSERT INTO swiper VALUES('${sid}','${title}','${imgUrl}','${route}','${createTime}','${description}','false')`

            connection.query(sql, (err, result) => {
                if (err) return console.log(err)

                return res.json({
                    status: 0,
                    msg: {
                        createTime: req.body.createTime,
                        email: req.body.email,
                        route: req.body.route,
                        title: req.body.title,
                        description: req.body.description,
                        imgUrl: req.body.imgUrl,
                        sid
                    }
                })
            })
        }
    })
})

// $route POST /api/swioer/update/:id
// @description  更新轮播图内容
// @params 轮播图内容和操作者邮箱组成的数据对象
// @access private
router.post('/update/:id', (req, res) => {
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
                if (item === 'createTime' || item === 'sid' || item === 'email') {
                    continue
                }

                let str = item + "= '" + req.body[item] + "'"
                queryStr.push(str)
            }
        }

        str = queryStr.join(',')

        const sql = `UPDATE swiper SET ${str} WHERE sid ='${id}'`

        connection.query(sql, (err, result) => {
            if (err) return console.log(err.message)

            if (result.length !== 0) {
                return res.json({
                    status: 0,
                    msg: "更新轮播图信息成功",
                    Sid: id
                })
            }

            return res.json({
                status: 0,
                msg: "更新轮播图信息失败"
            })
        })

    })
})

// $route POST /api/swiper/delete/:id
// @description  删除轮播图内容
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
            const sql = `DELETE FROM swiper WHERE sid = '${id}'`
            connection.query(sql, (err, result) => {
                if (err) return console.log(err)

                if (result.length === 0) {
                    return res.json({
                        status: 400,
                        msg: '轮播图删除失败'
                    })
                } else {
                    return res.json({
                        status: 0,
                        msg: '轮播图删除成功'
                    })
                }
            })
        }
    })
})

// $route POST /api/swiper/searchInfo/:queryStr
// @description 根据轮播图的标题对标题内容进行模糊查询
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
            let sql = `SELECT COUNT(*) AS count FROM swiper WHERE title LIKE '%${queryStr}%'`
            connection.query(sql, (err, result) => {
                if (err) return console.log(err.message);

                count = result[0].count
            })

            sql = `SELECT * FROM swiper WHERE title LIKE '%${queryStr}%'`
            connection.query(sql, (err, result) => {
                if (err) return console.log(err.message);

                return res.json({
                    status: 0,
                    msg: result,
                    count
                })
            })
        }
    })
})

// $route POST /api/swiper/changeUse/:id
// @description 设置轮播图是否被启用
// @params email 用户的操作邮箱,是否启用的状态
// @access private
router.post('/changeUse/:id', (req, res) => {
    const email = req.body.email
    const id = req.params.id
    const useful = req.body.useful

    if (!email || !id || !useful) {
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

        }

        const sql = `UPDATE swiper SET useful = '${useful}' WHERE sid ='${id}'`

        connection.query(sql, (err, result) => {
            if (err) return console.log(err.message)

            if (result.length !== 0) {
                return res.json({
                    status: 0,
                    msg: "更新轮播图状态成功",
                    Sid: id
                })
            }

            return res.json({
                status: 0,
                msg: "更新轮播图状态失败"
            })
        })

    })
})

module.exports = router