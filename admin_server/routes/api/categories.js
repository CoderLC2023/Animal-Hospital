//  这是专门用户科室分类的 CRUD 操作的 API

const express = require('express')
const router = express.Router()

const uuid = require('node-uuid')

const connection = require('../../config/config')

// 引入文件上传中间件
const multer = require('multer')

const path = require('path')

// 设置文件上传的默认地址
const upload = multer({ dest: path.join(__dirname, '../../uploads') })

// $ route POST /api/categories/icons/uploads
// @ desc 上传科室的图标
// @ access private
router.post('/icons/uploads', upload.single('file'), (req, res) => {

    // 获取上传的文件的文件信息对象
    const file = req.file
    if (file.length === 0) {
        res.json({
            status: 0,
            msg: '上传的图片为空，请检查'
        })
    } else {
        // 默认是没有url地址的，需要手动进行拼接
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.json({
            status: 0,
            msg: file
        })
    }
})

// $ route GET /api/categories/total/all
// @ desc 获取科室的总数
// @ access public
router.get('/total/all', (req, res) => {
    const sql = `SELECT COUNT(categoryName) AS total FROM categories `
    connection.query(sql, (err, result) => {
        if (err) return console.log(err)
        return res.json({
            status: 0,
            msg: result[0].total
        })
    })
})

//  $ route POST /api/categories/add
//  @ desc  添加新科室
//  @ params 传入科室的信息和操作者的用户邮箱（Memail）
//  @ access private
router.post('/add', (req, res) => {

    const email = req.body.Memail

    if (!email) {
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
            const Categoryname = req.body.Categoryname
            const imageUrl = req.body.imageUrl
            const description = req.body.description
            const url = req.body.url

            let sql = `SELECT * FROM categories WHERE Categoryname = '${Categoryname}'`
            connection.query(sql, (err, result) => {
                if (err) console.log(err.message)

                const id = uuid.v1().substr(0, 8)
                if (result.length === 0) {
                    sql = `SELECT * FROM categories WHERE url = '${url}'`

                    connection.query(sql, (err, result) => {
                        if (err) return console.log(err)

                        if (result.length === 0) {
                            sql = `INSERT INTO categories VALUES('${id}','${Categoryname}','${imageUrl}','${url}','${description}')`
                            connection.query(sql, (error, result) => {
                                if (error) console.log(error.message)
                                return res.json({
                                    status: 0,
                                    msg: {
                                        id: id,
                                        Categoryname,
                                        description,
                                        url,
                                        imageUrl
                                    }
                                })
                            })
                        } else {
                            return res.json({
                                status: 400,
                                msg: {
                                    err: '科室的路由不唯一，已存在，请检查！！！'
                                }
                            })
                        }
                    })


                } else {
                    return res.json({
                        status: 400,
                        msg: {
                            err: '科室已被创建，请检查！！！'
                        }
                    })
                }
            })
        }
    })
})

//  $ route POST /api/categories/limit/:page
//  @ desc  查询所有的科室信息，传入page时，可以进行分页
//          如果传入的是all的时候，显示全部科室信息，且不需要参数pageSize 
//  @ params  pageSize 当前显示的数据条数
//  @ access private
router.post('/limit/:page', (req, res) => {
    const currentPage = req.params.page
    const pageSize = req.body.pageSize
    if (!pageSize && currentPage !== 'all') {
        res.json({
            status: 400,
            msg: '参数错误，请尽快联系管理员'
        })
    }

    let sql

    if (currentPage === 'all') {
        sql = `select * from categories`
    } else {
        const startPage = (currentPage - 1) * pageSize
        sql = `SELECT * FROM categories LIMIT ${startPage},${pageSize}`
    }

    connection.query(sql, (err, result) => {
        if (err) return console.log(err.message)

        return res.json({
            status: 0,
            msg: result
        })
    })
})

//  $ route GET /api/categories/:id
//  @ desc  查询指定的科室信息
//  @ access public
router.get('/:id', (req, res) => {
    const sql = `select * from categories where id = '${req.params.id}'`
    connection.query(sql, (err, result) => {
        if (err) return console.log(err.message)

        return res.json({
            status: 0,
            msg: result
        })
    })
})

//  $ route POST /api/categories/update/:id
//  @ desc  修改指定科室信息
//  @ params 传入需要修改的科室信息和操作者的用户邮箱（Memail）
//  @ access private
router.post('/update/:id', (req, res) => {

    const email = req.body.Memail
    const id = req.params.id

    if (!email) {
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

            const url = req.body.url

            const sql = `SELECT * FROM categories WHERE url = '${url}' AND id != '${id}'`

            connection.query(sql, (err, result) => {
                if (err) return console.log(err)

                if (result.length !== 0) {
                    return res.json({
                        status: 400,
                        msg: '科室的路由不唯一，已存在，请检查！！！'
                    })
                }

                // 根据参数 拼接需要更新的内容
                let queryStr = []
                for (item in req.body) {
                    if (item === 'Memail' || item === 'imgUrl') {
                        continue;
                    }

                    let str = item + " = '" + req.body[item] + "'"
                    queryStr.push(str)
                }
                const str = queryStr.join(',')

                let sql = `UPDATE categories SET ${str} WHERE id = '${req.params.id}'`

                connection.query(sql, (err, result) => {
                    if (err) console.log(err.message)

                    const id = req.params.id


                    const sql = `SELECT * FROM categories WHERE id = '${id}'`

                    connection.query(sql, (err, result) => {
                        if (err) return console.log(err)

                        return res.json({
                            status: 0,
                            msg: result[0]
                        })

                    })
                })

            })

        }
    })
})

//  $ route POST /api/categories/delete/:id
//  @ desc  删除科室信息
//  @ params 操作者的用户邮箱（Memail）
//  @ access private
router.post('/delete/:id', (req, res) => {
    const email = req.body.Memail

    if (!email) {
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
            const sql = `SELECT * FROM employee,categories 
                        WHERE employee.categoryID = categories.id AND categories.id = '${req.params.id}'`

            connection.query(sql, (err, result) => {
                if (err) return console.log(err)

                if (result.length !== 0) {
                    return res.json({
                        status: 400,
                        msg: '需要删除的科室中存在员工，暂时无法进行删除'
                    })
                } else {
                    const sql = `delete from categories where id = '${req.params.id}'`

                    connection.query(sql, (err, result) => {
                        if (err) return console.log(err)

                        const sql = `SELECT * FROM categories`

                        connection.query(sql, (err, result) => {
                            if (err) return console.log(err)
                            return res.json({
                                status: 0,
                                msg: result
                            })
                        })


                    })
                }
            })
        }
    })
})

//  $ route POST /api/categories/search/:currentPage
//  @ desc  查询科室信息并分页(如果是all，则获取全部科室分类，且不需要pageSize)
//  @ params 操作者的用户邮箱（Memail） queryStr 查询字符串 pageSize 当前页显示的数据总数
//  @ access private
router.post('/search/:currentPage', (req, res) => {
    const email = req.body.Memail
    const queryStr = req.body.queryStr
    const pageSize = req.body.pageSize
    const currentPage = req.params.currentPage
    if (!email && !queryStr && !currentPage) {
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
            let sql = `SELECT COUNT(id) AS count FROM categories WHERE Categoryname LIKE '%${queryStr}%' `
            connection.query(sql, (err, result) => {
                if (err) return err.message
                count = result[0].count
            })

            if (currentPage !== 'all' && pageSize) {
                sql = `SELECT * FROM categories WHERE Categoryname LIKE '%${queryStr}%' LIMIT ${(currentPage - 1) * pageSize},${pageSize} `

            } else {
                sql = `SELECT * FROM categories WHERE Categoryname LIKE '%${queryStr}%' `
            }
            connection.query(sql, (err, result) => {
                if (err) return console.log(err)
                return res.json({
                    status: 0,
                    count,
                    msg: result

                })
            })
        }
    })
})

//  $ route POST /api/categories/search/chartData/category
//  @ desc  email
//  @ params 操作者的用户邮箱（Memail）
//  @ access private
router.post('/search/chartData/category', (req, res) => {
    const email = req.body.email
    if (!email) {
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
                msg: '你无权限查看统计数据，可能您不是在职员工'
            })

        } else {
            const sql = `SELECT categoryName,COUNT(*) AS count FROM employee,categories 
                    WHERE categories.id = employee.categoryID GROUP BY  employee.categoryID`

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

//  $ route GET /api/categories/searchAll/categories
//  @ desc  前台获取科室信息
//  @ access public
router.get('/searchAll/categories',(req,res)=>{
    const sql = `SELECT * FROM categories`

    connection.query(sql,(err,result)=>{
        if(err) console.log(err.message)

        return res.json({
            status:0,
            msg:result
        })

    })

})



module.exports = router