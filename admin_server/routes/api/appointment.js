//  这是预约管理对应的API数据
const express = require('express')
const router = express.Router()

const uuid = require('node-uuid')

const connection = require('../../config/config')

// $route POST /api/appointment/count/
// @desc 获取成功案例的个数
// @params 操作者的邮箱
// @access public
router.post('/count', (req, res) => {
    const email = req.body.email

    let sql = `SELECT * FROM employee WHERE email = '${email}'`

    connection.query(sql, (err, result) => {
        if (err) return console.log(err.message);

        if (result[0].Identity === '管理员') {
            sql = `SELECT COUNT(Aid) AS count FROM appointments`
        } else if (result[0].Identity === '医师') {
            sql = `SELECT COUNT(Aid) AS count FROM appointments WHERE categoryID = '${result[0].categoryID}'`
        }

        connection.query(sql, (err, result) => {
            if (err) return console.log(err.message)

            return res.json({
                status: 0,
                msg: result[0].count
            })

        })
    })
})

// $route POST /api/appointment/search/:id
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

    const sql = `SELECT * FROM employee WHERE email = '${email}'`

    connection.query(sql, (err, result) => {
        if (err) return console.log(err)

        // 如果查无此人 或者 其不是在职员工，则无法查看员工信息
        if (result.length === 0) {

            return res.json({
                status: 400,
                msg: '你无权限查看预约信息，可能您不是在职员工'
            })

        } else {
            const categoryId = result[0].categoryID

            let sql
            if (id === 'all') {
                if (categoryId === '0') {
                    sql = `SELECT * FROM appointments,categories WHERE appointments.categoryId = categories.id
                    LIMIT ${(currentPage - 1) * pageSize},${pageSize}`
                } else {
                    sql = `SELECT * FROM appointments,categories WHERE appointments.categoryId = categories.id
                    AND appointments.categoryId = '${categoryId}'
                    LIMIT ${(currentPage - 1) * pageSize},${pageSize}`
                }

            } else {
                if (categoryId === '0') {
                    sql = `SELECT * FROM appointments,categories WHERE Aid = '${id}' AND appointments.categoryId = categories.id`
                } else {
                    sql = `SELECT * FROM appointments,categories WHERE Aid = '${id}' AND appointments.categoryId = categories.id
                            AND  appointments.categoryId='${categoryId}'`
                }
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


// $route POST /api/appointment/add
// @desc  添加预约
// @params 预约内容和创建时间组成的数据对象
// @access private
router.post('/add', (req, res) => {
    const time = req.body.time
    const name = req.body.name
    const phone = req.body.phone
    const CategoryId = req.body.categoryId
    const special = req.body.special
    const body = req.body.body
    const createTime = req.body.createTime

    if (!CategoryId || !time || !name || !phone || !body || !special || !createTime) {
        return res.json({
            status: 400,
            msg: '参数错误，请重新登录或联系管理员'
        })
    }

    const Aid = uuid.v1().substr(0, 8)

    const month = createTime.substr(0, 7)

    const sql = `SELECT COUNT(*) AS count FROM appointments WHERE NAME = '张三' AND createTime LIKE '${month}%'`

    connection.query(sql, (err, result) => {
        if (err) return console.log(err.message);

        // 每月用户可以预约的次数为 35 次
        if (result.count > 35) {
            return res.json({
                status: 400,
                msg: '您当月的预约次数过多,您可以到店直接排队就诊'
            })
        } else {
            const today = createTime.substr(0, 10)
            const sql = `SELECT COUNT(*) AS count FROM appointments WHERE createTime LIKE '${month}%'`
            connection.query(sql, (err, result) => {
                if (err) return console.log(err.message);
                if (result.count > 50) {
                    return res.json({
                        status: 400,
                        msg: '当日预约人数已满，请择日重试'
                    })
                } else {
                    const sql = `INSERT INTO appointments VALUES('${Aid}','${phone}','${name}','${CategoryId}','${time}','${createTime}','${special}','${body}')`

                    connection.query(sql, (err, result) => {
                        if (err) return console.log(err)

                        return res.json({
                            status: 0,
                            msg: {
                                createTime: req.body.createTime,
                                phone: req.body.phone,
                                title: req.body.title,
                                body: req.body.body,
                                CategoryId: req.body.CategoryId,
                                name: req.body.name,
                                time: req.body.time,
                                special: req.body.special,
                                Aid
                            }
                        })
                    })
                }
            })
        }
    })


})

// $route POST /api/appointment/delete/:id
// @desc  删除预约内容
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
                msg: '你无权删除预约数据，可能您不是管理员'
            })

        } else {
            const sql = `DELETE FROM appointments WHERE Aid = '${id}'`
            connection.query(sql, (err, result) => {
                if (err) return console.log(err)

                if (result.length === 0) {
                    return res.json({
                        status: 400,
                        msg: '预约删除失败'
                    })
                } else {
                    return res.json({
                        status: 0,
                        msg: '预约删除成功'
                    })
                }
            })
        }
    })
})


// $route POST /api/appointment/searchInfo/:queryStr
// @desc 根据预约者的联系电话对标预约信息进行模糊查询
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

        // 如果查无此人 或者 其不是在在职员工，则无法查看员工信息
        if (result.length === 0) {

            return res.json({
                status: 400,
                msg: '你无权限查看预约信息，可能您不是在职员工'
            })

        } else {
            let count
            let sql

            const categoryId = result[0].categoryID

            if (categoryId === '0') {
                sql = `SELECT COUNT(*) AS count FROM appointments WHERE phone LIKE '%${queryStr}%'`
            } else {
                sql = `SELECT COUNT(*) AS count FROM appointments WHERE phone LIKE '%${queryStr}%' 
                      AND appointments.categoryId = '${categoryId}'`
            }
            connection.query(sql, (err, result) => {
                if (err) return console.log(err.message);

                count = result[0].count
            })

            if (categoryId === '0') {
                sql = `SELECT * FROM appointments WHERE phone LIKE '%${queryStr}%'`
            } else {
                sql = `SELECT * FROM appointments WHERE phone LIKE '%${queryStr}%'
                AND appointments.categoryId = '${categoryId}'`
            }

            connection.query(sql, (err, result) => {
                if (err) return console.log(err.message);

                const sql = `SELECT categoryName FROM categories WHERE id = '${categoryId}'`

                msg = result

                connection.query(sql, (err, result) => {
                    if (err) return console.log(err.message)

                    if (msg.length !== 0) {
                        msg[0].Categoryname = result[0].categoryName
                    }

                    return res.json({
                        status: 0,
                        msg,
                        count
                    })
                })
            })
        }
    })
})

module.exports = router