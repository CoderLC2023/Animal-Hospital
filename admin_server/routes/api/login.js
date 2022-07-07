// 这是页面登录的逻辑处理文件

const express = require('express')
const router = express.Router()

const bcrypt = require('_bcryptjs@2.4.3@bcryptjs')

const connection = require('../../config/config')

//  $ route POST /api/admin/login
//  @ desc 后台用户的登录
//  @ params email,password  操作者的用户邮箱和密码
//  @ access private
router.post('/login', (req, res) => {
    const sql = `SELECT * FROM employee WHERE email = '${req.body.email}'`
    connection.query(sql, (err, result) => {
        if (err) return console.log(err)
        if (result.length === 0) {
            res.json({
                status: 400,
                msg: "用户不存在，请联系管理员！！！"
            })
        } else {
            const sql = ` SELECT * FROM employee WHERE email = '${req.body.email}' `
            connection.query(sql, (err, reuslt) => {
                if (err) return console.log(err)

                // 密码比对方法
                // 第一个参数为传入的需要比较的密码
                // 第二个是数据库中使用bcrypt进行加密的密码
                bcrypt.compare(req.body.password, result[0].Password)
                    .then(isCompare => { //回调函数中的形参是boolean值
                        if (isCompare) {
                            const sql = `SELECT * FROM employee,categories 
                                        WHERE employee.categoryID = categories.id AND email = '${req.body.email}'`
                            connection.query(sql,(err,result) =>{
                                if (err) return console.log(err)
                                res.json({
                                    status:0,
                                    msg:{
                                        id:result[0].id,
                                        Username:result[0].Username,
                                        email:result[0].email,
                                        gender:result[0].gender?'男':'女',
                                        CreateDate:result[0].CreateDate,
                                        Identity:result[0].Identity,
                                        Categoryname:result[0].Categoryname,
                                        Phone:result[0].Phone,
                                        Address:reuslt[0].Address,
                                        remark: result[0].remark
                                    }
                                })
                            })
                        }else{
                           res.json({
                               status:400,
                               msg:' 用户密码不正确 '
                           })
                        }
                    })
            })
        }
    })
})

module.exports = router
