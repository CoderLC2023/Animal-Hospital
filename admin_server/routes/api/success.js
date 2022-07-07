//  这是案例展示对应的API数据
const express = require('express')
const router = express.Router()

const uuid = require('node-uuid')

const connection = require('../../config/config')

// $route POST /api/success/search/:id
// @params id需要查找的案例（如果为all则表示全部）pageSize 当前的页的显示条数 currentPage 当前显示的页数
// @desc 根据传入的参数，获取指定的展示案例并分页
// @access private
router.post('/search/:id', (req, res) => {
    const id = req.params.id
    const email = req.body.email
    const pageSize = req.body.pageSize
    const currentPage = req.body.currentPage

    if (!email || !id || (!pageSize && id !== 'all' || !currentPage && id != 'all')) {
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
                sql = `SELECT * FROM success LIMIT ${(currentPage - 1) * pageSize},${pageSize}`

            } else {
                sql = `SELECT * FROM success WHERE sid = '${id}'`
            }

            connection.query(sql, (err, result) => {
                if (err) return console.log(err)

                return res.json({
                    status: 0,
                    msg: result
                })

            })
        }
    })
})

// $route POST /api/success/add
// @params  新建案例数据构成的数据对象
// @desc 添加一个新的成功案例
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

            let sql = `SELECT * FROM success WHERE route = '${route}'
            `

            const sid = uuid.v1().substr(0, 8)

            connection.query(sql, (err, result) => {
                if (err) return console.log(err)

                if (result.length !== 0) {
                    return res.json({
                        status: 0,
                        msg: '路由已存在，请重新设置路由'
                    })
                }
            })

            sql = `INSERT INTO Success VALUES('${sid}','${createTime}','${email}','${route}','${title}','${photo}','${body}')`
            connection.query(sql, (err, result) => {
                if (err) return console.log(err)

                return res.json({
                    status: 0,
                    msg: {
                        createTime: req.body.createTime,
                        email: req.body.email,
                        route: req.body.route,
                        title: req.body.title,
                        photo: req.body.photo,
                        body: req.body.body,
                        sid
                    }
                })
            })
        }
    })
})

// $route POST /api/success/update/:id
// @params email 用户的操作邮箱  新建案例数据构成的数据对象即sid
// @desc 更新一个成功案例
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
                if (item === 'createTime' || item === 'sid') {
                    continue
                }

                let str = item + "= '" + req.body[item] + "'"
                queryStr.push(str)
            }
        }

        str = queryStr.join(',')

        const sql = `UPDATE success SET ${str} WHERE sid ='${id}'`
        connection.query(sql, (err, result) => {
            if (err) return console.log(err.message)

            if (result.length === 0) {
                return res.json({
                    status: 400,
                    msg: '更新案例信息失败'
                })
            }

            return res.json({
                status: 0,
                msg: "更新案例信息成功",
                sid: id
            })
        })

    })
})

// $route POST /api/success/delete/:id
// @params email 用户的操作邮箱  需要删除案例的sid
// @desc 删除一个成功案例
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
            const sql = `DELETE FROM success WHERE sid = '${id}'`
            connection.query(sql, (err, result) => {
                if (err) return console.log(err)

                if (result.length === 0) {
                    return res.json({
                        status: 400,
                        msg: '删除案例失败'
                    })
                } else {
                    return res.json({
                        status: 0,
                        msg: '删除案例成功'
                    })
                }
            })
        }
    })
})


// $route GET /api/success/total/
// @desc 获取成功案例的个数
// @access public
router.get('/total', (req, res) => {
    const sql = `SELECT COUNT(sid) AS count FROM Success`

    connection.query(sql, (err, result) => {
        if (err) return console.log(err.message)

        return res.json({
            status: 0,
            msg: result[0].count
        })

    })

})

// $route POST /api/success/searchInfo/:queryStr
// @desc 根据案例的标题对标题内容进行模糊查询
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
            let sql = `SELECT COUNT(*) AS count FROM Success WHERE title LIKE '%${queryStr}%'`
            connection.query(sql, (err, result) => {
                if (err) return console.log(err.message);

                count = result[0].count
            })

            sql = `SELECT * FROM Success WHERE title LIKE '%${queryStr}%'`
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

// $route GET /api/success/searchAll/:route
// @desc 获取全部的成功案例信息
// @access public
router.get('/searchAll/:route', (req, res) => {
    const route = req.params.route
    let sql
    if (route === 'all') {
        sql = `SELECT * FROM success`
    } else {
        sql = `SELECT * FROM success WHERE route = '/${route}'`
    }

    connection.query(sql, (err, result) => {
        if (err) return err.message

        return res.json({
            status: 0,
            msg: result
        })
    })
})


module.exports = router