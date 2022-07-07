//  这是名医展示对应的API数据
const express = require('express')
const router = express.Router()

const uuid = require('node-uuid')

const connection = require('../../config/config')

// $route GET /api/doctor/count
// @desc 获取需要展示的医师的总数
// @access public
router.get('/count', (req, res) => {
    const sql = `SELECT COUNT(*) AS count FROM doctors`

    connection.query(sql, (err, result) => {
        if (err) return console.log(err.message);

        return res.json({
            status: 0,
            msg: result[0].count
        })

    })

})

// $route POST /api/doctor/search/:id
// @desc  获取对应名医展示信息，如果是all就获取全部的展示信息
// @params 操作者的邮箱 PageSize 每页显示个数 currentPage 当前显示页数 id 显示那一条数据（如果是all就显示全部）
// @access private
router.post('/search/:id', (req, res) => {
    const id = req.params.id
    const currentPage = req.body.currentPage
    const pageSize = req.body.pageSize

    if (!id || (id === 'all' && !currentPage) || (id === 'all' && !pageSize)) {
        return res.json({
            status: 400,
            msg: '参数错误，请重新登录或联系管理员'
        })
    }

    let sql = '';

    if (id === 'all') {
        sql = `SELECT * FROM doctors LIMIT ${(currentPage - 1) * pageSize},${pageSize}`
    } else {
        sql = `SELECT * FROM doctors WHERE docId = '${id}'`
    }

    connection.query(sql, (err, result) => {
        if (err) return console.log(err.message)

        return res.json({
            status: 0,
            msg: result
        })
    })
})

// $route POST /api/doctor/add
// @desc  添加名医展示内容
// @params 名医展示内容和操作者邮箱组成的数据对象
// @access private
router.post('/add', (req, res) => {
    const email = req.body.email
    const createTime = req.body.createTime
    const route = req.body.route
    const title = req.body.title
    const body = req.body.body
    const photo = req.body.photo


    if (!email || !createTime || !route || !title || !body || !photo) {
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

            let sql = `SELECT * FROM doctors WHERE route = '${route}'
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

            const docId = uuid.v1().substr(0, 8)

            sql = `INSERT INTO doctors VALUES('${docId}','${email}','${createTime}','${photo}','${title}','${route}','${body}')`

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
                        photo: req.body.photo,
                        docId
                    }
                })
            })
        }
    })
})


// $route POST /api/doctor/searchInfo/:queryStr
// @desc 根据展示的标题对标题内容进行模糊查询
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
            let sql = `SELECT COUNT(*) AS count FROM doctors WHERE title LIKE '%${queryStr}%'`
            connection.query(sql, (err, result) => {
                if (err) return console.log(err.message);

                count = result[0].count
            })

            sql = `SELECT * FROM doctors WHERE title LIKE '%${queryStr}%'`
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

// $route POST /api/doctor/update/:id
// @desc  更新展示内容
// @params 展示内容和操作者邮箱组成的数据对象
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
                if (item === 'createTime' || item === 'nid') {
                    continue
                }

                let str = item + "= '" + req.body[item] + "'"
                queryStr.push(str)
            }
        }

        str = queryStr.join(',')

        const sql = `UPDATE doctors SET ${str} WHERE docId ='${id}'`

        connection.query(sql, (err, result) => {
            if (err) return console.log(err.message)

            if (result.length !== 0) {
                return res.json({
                    status: 0,
                    msg: "更新展示内容成功",
                    docId: id
                })
            }

            return res.json({
                status: 0,
                msg: "更新展示内容失败"
            })
        })

    })
})

// $route POST /api/doctor/delete/:id
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
            const sql = `DELETE FROM doctors WHERE docId = '${id}'`
            connection.query(sql, (err, result) => {
                if (err) return console.log(err)

                if (result.length === 0) {
                    return res.json({
                        status: 400,
                        msg: '展示内容删除失败'
                    })
                } else {
                    return res.json({
                        status: 0,
                        msg: '展示内容删除成功'
                    })
                }
            })
        }
    })
})

// $route GET /api/doctor/searchAll
// @desc  前台展示医师信息
// @access public
router.get('/searchAll', (req, res) => {
    let sql = `SELECT * FROM doctors`

    connection.query(sql, (err, result) => {
        if (err) return console.log(err.message)

        return res.json({
            status: 0,
            msg: result
        })
    })
})

// $route GET /api/doctor/searchDoctor/
// @desc  根据具体的路由展示具体医师信息
// @params  请求的路由地址
// @access private 
router.post('/searchDoctor', (req, res) => {
    const route = req.body.route
    if (!route) {
        res.json({
            status: 400,
            msg: '参数错误，请尽快联系管理员'
        })
    }

    let sql = `SELECT * FROM doctors WHERE route = '${route}'`

    connection.query(sql, (err, result) => {
        if (err) return console.log(err.message)

        return res.json({
            status: 0,
            msg: result[0]
        })
    })
})

module.exports = router