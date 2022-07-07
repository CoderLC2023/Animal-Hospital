// 这是进行管理员和员工的登录等操作的js文件

const express = require('express')
const router = express.Router()

// 引入加密中间件
const bcrypt = require('_bcryptjs@2.4.3@bcryptjs')
bcrypt.gen
const uuid = require('node-uuid')
const connection = require('../../config/config')

// $route GET /api/employee/getCount
// @desc 获取员工总数
// @access public
router.get('/getCount', (req, res) => {
    const sql = `SELECT COUNT(Eid) as count FROM employee`

    connection.query(sql, (err, result) => {
        if (err) return console.log(err)

        res.json({
            status: 0,
            count: result[0].count
        })
    })

})


//  $ route POST /api/employee/limit/:page
//  @ desc 根据page的值获取指定个数的员工信息，如果page是all，那么就获取全部的员工的信息(默认按照入职时间降序排列)
//  @ params  Memail  操作者的邮箱地址  pageSize 当前显示的数据条数
//  @ access private
router.post('/limit/:page', (req, res) => {
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

            currentPage = req.params.page
            let sql

            if (currentPage !== 'all') {
                // 如果限制了个数，就取出对应个数的数据
                pageSize = req.body.pageSize

                const startPage = (currentPage - 1) * pageSize

                sql = `SELECT * FROM employee,categories 
                             WHERE employee.categoryID = categories.id
                             ORDER BY CreateDate DESC
                             LIMIT ${startPage}, ${pageSize}`

            } else {
                // 如果没有限制个数 就返回全部的员工的信息
                sql = 'SELECT * FROM employee,categories WHERE employee.categoryID = categories.id ORDER BY CreateDate DESC'
            }

            connection.query(sql, (err, result) => {
                if (err) return console.log(err.message)

                return res.json({
                    status: 0,
                    // 循环遍历职工信息，只返回有用的信息
                    msg: result.map(item => {
                        return {
                            Uid: item.Eid,
                            id: item.categoryID,
                            Username: item.Username,
                            gender: item.gender === '0' ? '男' : '女',
                            CreateDate: item.CreateDate,
                            identity: item.Identity,
                            Categoryname: item.Categoryname,
                            Phone: item.Phone,
                            Address: item.Address,
                            remark: item.remark,
                            email: item.email
                        }
                    })
                })
            })
        }
    })

})

//  $ route POST /api/employee/add
//  @ desc 添加新员工
//  @ params {Memail，name，email,gender,date,identity,password,categoryID,phone,address,remark} 员工的属性和操作者的邮箱地址
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
                msg: '你无权执行此项操作，可能您不是管理员'
            })
        } else {

            let employee = {
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                date: req.body.date,
                identity: req.body.identity,
                categoryID: req.body.categoryID,
                phone: req.body.phone,
                address: req.body.address,
                remark: req.body.remark,
                password: req.body.password
            }

            const sql = `SELECT * FROM employee WHERE email = '${employee.email}'`
            connection.query(sql, (err, result) => {
                if (err) console.log(err.message)
                if (result.length !== 0) {
                    return res.json({
                        status: 400,
                        msg: "当前用户已经存在，请检查后再次操作！！！"
                    })
                } else {
                    // 进行数据的加密（新员工的默认登录密码是123456）
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) throw err
                        bcrypt.hash('123456', salt, (err, hash) => {
                            if (err) throw err
                            // 将加密后的密码 加入的 employee对象中
                            employee.password = hash

                            // 生成 用户8为ID
                            const id = uuid.v1().substr(0, 8)

                            // 判断用户有没有输入备注，输入了就赋值，没有输入就是 空字符串
                            employee.remark = employee.remark ? employee.remark : ''

                            // 进行员工的插入(加密是异步操作，所以放在里面进行插入)
                            const sql = `INSERT INTO employee 
                                VALUES('${id}','${employee.name}','${employee.email}','${employee.gender}',
                                '${employee.date}','${employee.identity}','${employee.password}','${employee.categoryID}',
                                '${employee.phone}','${employee.address}', '${employee.remark}','http://http://localhost:3000/uploads/avatar-default.png')`

                            connection.query(sql, (err, result) => {
                                if (err) return console.log(err.message)

                                return res.json({
                                    status: 0,
                                    msg: {
                                        id: id,
                                        name: employee.name,
                                        email: employee.email,
                                        gender: employee.gender,
                                        date: employee.date,
                                        identity: employee.identity,
                                        categoryID: employee.categoryID,
                                        phone: employee.phone,
                                        address: employee.address,
                                        remark: employee.remark
                                    }
                                })
                            })

                        })
                    })

                }
            })

        }
    })
})

//  $ route POST /api/employee/:id
//  @ desc 获取指定员工的信息
//  @ params  Memail  操作者的邮箱地址
//  @ access private
router.post('/:id', (req, res) => {
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
            const sql = ` SELECT * FROM employee,categories 
                        WHERE employee.categoryID = categories.id AND employee.Eid = '${req.params.id}' `
            connection.query(sql, (err, result) => {
                if (err) return console.log(err.message)
                return res.json({
                    status: 0,
                    msg: {
                        // 输出部分的员工信息

                        id: result[0].id,
                        Username: result[0].Username,
                        email: result[0].email,
                        gender: result[0].gender ? '男' : '女',
                        CreateDate: result[0].CreateDate,
                        identity: result[0].Identity,
                        categoryID: result[0].categoryID,
                        Phone: result[0].Phone,
                        Address: result[0].Address,
                        remark: result[0].remark
                    }
                })
            })
        }
    })

})

//  $ route POST /api/employee/update/:id
//  @ desc 更新指定员工的信息
//  @ params  Memail  操作者的邮箱地址,和需要更新列及数据构成的数据对象
//  @ access private
router.post('/update/:id', (req, res) => {
    const email = req.body.Memail

    if (!email) {
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
        if (result.length === 0 ) {

            return res.json({
                status: 400,
                msg: '你无权限查看员工信息，可能您不是管理员'
            })

        } else {
            for (item in req.body) {

                // 在更新前，剔除不需要的信息
                if (item === 'date' || item === 'Memail') {
                    continue
                }


                let str = item + "= '" + req.body[item] + "'"
                queryStr.push(str)
            }
        }

        let str = queryStr.join(',')

        str = str.replace('name', 'Username')

        const id = req.params.id

        const sql = `UPDATE employee SET ${str} WHERE Eid = '${id}'`

        connection.query(sql, (err, result) => {
            if (err) return console.log(err.message)

            req.body.id = req.params.id

            return res.json({
                status: 0,
                msg: {
                    // 输出员工所更新部分的信息
                    result: req.body
                }
            })
        })
    })

})

//  $ route POST /api/employee/update/password/:id
//  @ desc 更新指定员工的密码
//  @ params  password  用户提交的需要修改的密码 id 用户的员工id
//  @ access private
router.post('/update/password/:id', (req, res) => {
    const id = req.params.id
    const pass = req.body.password
    if (!pass || !id) {
        return {
            status: 400,
            msg: '参数错误，请尽快联系管理员！！！'
        }
    }

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(pass, salt, function (err, hash) {
            const sql = `UPDATE employee SET PASSWORD = '${hash}' WHERE Eid = '${id}'`
            connection.query(sql, (err, result) => {
                if (err) return console.log(err.message)
                return res.json({
                    status: 0,
                    msg: '密码修改成功'
                })
            })
        });
    })
})

//  $ route POST /api/employee/delete/:id
//  @ desc 删除指定员工
//  @ params Memail  操作者的用户邮箱
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
                msg: '你无权执行此项操作，可能您不是管理员'
            })
        } else {
            const id = req.params.id

            const sql = `select * FROM employee WHERE employee.Eid = '${id}'`

            connection.query(sql, (err, result) => {
                if (err) return console.log(err)

                if (result.length !== 0) {
                    const sql = `DELETE FROM employee WHERE employee.Eid = '${id}'`

                    connection.query(sql, (err, result) => {
                        if (err) return console.log(err)

                        res.json({
                            status: 0,
                            msg: " 删除成功 "
                        })
                    })
                } else {
                    res.json({
                        status: 400,
                        msg: ' 该用户不存在，请确认是否已经被删除 '
                    })
                }
            })
        }
    })
})

//  $ route POST /api/employee/search/:queryColumn
//  @ desc 根据查询信息进查找
//  @ params Memail  操作者的用户邮箱， queryColumn 查询字段 queryStr 查询关键字
//  @ access private
router.post('/search/:queryColumn', (req, res) => {

    const email = req.body.Memail
    const queryStr = req.body.queryStr
    const queryColumn = req.params.queryColumn

    if (!email || !queryStr) {
        return res.json({
            status: 400,
            msg: '参数错误，请重新登录或联系管理员'
        })
    }

    const sql = `SELECT * FROM employee,categories 
                    WHERE employee.categoryID = categories.id 
                    AND  ${queryColumn} LIKE '%${queryStr}%'`

    connection.query(sql, (err, result) => {
        if (err) return console.log(err.message)

        result.map(item => {
            item.identity = item.Identity
            item.gender = item.gender === '0'?'女':'男'
        })


        res.json({
            status: 0,
            msg: result
        })

    })
})


//  $ route POST /api/employee/date/:startDate/:endDate
//  @ desc 根据入职时间进查找
//  @ params Memail  操作者的用户邮箱
//  @ access private
router.post('/date/:startDate/:endDate', (req, res) => {

    const email = req.body.Memail
    const startDate = req.params.startDate
    const endDate = req.params.endDate

    if (!email) {
        return res.json({
            status: 400,
            msg: '参数错误，请重新登录或联系管理员'
        })
    }

    const sql = `SELECT * FROM employee WHERE CreateDate BETWEEN '${startDate}' AND '${endDate}'`

    connection.query(sql, (err, result) => {
        if (err) return console.log(err.message)

        result.map(item => {
            item.gender = item.gender === '0'?'女':'男'
        })

        res.json({
            status: 0,
            msg: result
        })
    })
})



//  $ route POST /api/employee/searchEmp/email
//  @ desc 根据用户工作邮箱查找对应员工的相关信息
//  @ access private
router.post('/searchEmp/email',(req,res) => {
    const email = req.body.Memail

    if(!email){
        return res.json({
            status:400,
            msg:'参数不正确，请尽快联系管理员！！！'
        })
    }

    const sql = `SELECT * FROM employee,categories WHERE categories.id = employee.categoryID AND email ='${email}'`

    connection.query(sql,(err,result) =>{
        if(err) return consle.log(err.message)

        return res.json({
            status:0,
            msg:result[0]
        })
    })

})

// 导出路由，以便于在入口文件中进行使用
module.exports = router
