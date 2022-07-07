//  这是用户管理管理对应的API数据
const express = require('express')
const router = express.Router()

const uuid = require('node-uuid')

const connection = require('../../config/config')

// $route POST /api/user/count/
// @desc 获取成功案例的个数
// @params 操作者的邮箱
// @access public
router.post('/count', (req, res) => {
    const email = req.body.email

    let sql = `SELECT * FROM employee WHERE email = '${email}'`

    connection.query(sql, (err, result) => {
        if (err) return console.log(err.message);

        if (result[0].Identity === '管理员') {
            sql = `SELECT COUNT(Uid) AS count FROM users`
        } else if (result[0].Identity === '医师') {
            sql = `SELECT COUNT(Uid) AS count FROM users WHERE categoryID = '${result[0].categoryID}'`
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

// $route POST /api/user/search/:id
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
                    sql = `SELECT * FROM users,categories WHERE users.categoryId = categories.id
                    LIMIT ${(currentPage - 1) * pageSize},${pageSize}`
                } else {
                    sql = `SELECT * FROM users,categories WHERE users.categoryId = categories.id
                    AND users.categoryId = '${categoryId}'
                    LIMIT ${(currentPage - 1) * pageSize},${pageSize}`
                }

            } else {
                if (categoryId === '0') {
                    sql = `SELECT * FROM users,categories WHERE Uid = '${id}' AND users.categoryId = categories.id`
                } else {
                    sql = `SELECT * FROM users,categories WHERE Uid = '${id}' AND users.categoryId = categories.id
                            AND  users.categoryId='${categoryId}'`
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


// $route POST /api/user/add
// @desc  添加预约
// @params 预约内容和操作者邮箱组成的数据对象
// @access private
router.post('/add', (req, res) => {
    const createTime = req.body.createTime
    const name = req.body.name
    const phone = req.body.phone
    const CategoryId = req.body.categoryID
    const special = req.body.special
    const address = req.body.address
    const email = req.body.email


    if (!CategoryId || !name || !phone || !address || !special || !email) {
        return res.json({
            status: 400,
            msg: '参数错误，请重新登录或联系管理员'
        })
    }

    const sql = `SELECT * FROM users WHERE phone ='${phone}'`

    connection.query(sql, (err, result) => {
        if (err) return console.log(err.message);

        if (result.length !== 0) {
            return res.json({
                status: 400,
                msg: '您已经注册,请直接登录'
            })
        } else {
            const Uid = uuid.v1().substr(0, 8)

            const sql = `INSERT INTO users VALUES('${Uid}','${name}','${createTime}','${phone}','${address}','${email}','${CategoryId}','${special}')`
            
            connection.query(sql, (err, result) => {
                if (err) return console.log(err)

                return res.json({
                    status: 0,
                    msg: {
                        createTime: req.body.createTime,
                        email: req.body.email,
                        phone: req.body.phone,
                        title: req.body.title,
                        address: req.body.address,
                        CategoryId: req.body.CategoryId,
                        name: req.body.name,
                        time: req.body.time,
                        special: req.body.special,
                        Uid
                    }
                })
            })
        }
    })


})

// $route POST /api/user/delete/:id
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
            const sql = `DELETE FROM users WHERE Uid = '${id}'`
            connection.query(sql, (err, result) => {
                if (err) return console.log(err)

                if (result.length === 0) {
                    return res.json({
                        status: 400,
                        msg: '用户删除失败'
                    })
                } else {
                    return res.json({
                        status: 0,
                        msg: '用户删除成功'
                    })
                }
            })
        }
    })
})


// $route POST /api/users/searchInfo/:queryStr
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
                sql = `SELECT COUNT(*) AS count FROM users WHERE phone LIKE '%${queryStr}%'`
            } else {
                sql = `SELECT COUNT(*) AS count FROM users WHERE phone LIKE '%${queryStr}%' 
                      AND users.categoryId = '${categoryId}'`
            }
            connection.query(sql, (err, result) => {
                if (err) return console.log(err.message);

                count = result[0].count
            })

            if (categoryId === '0') {
                sql = `SELECT * FROM users WHERE phone LIKE '%${queryStr}%'`
            } else {
                sql = `SELECT * FROM users WHERE phone LIKE '%${queryStr}%'
                AND users.categoryId = '${categoryId}'`
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