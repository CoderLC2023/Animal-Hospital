// 根据不同的用户身份 去获取不同的后台侧边栏内容，以达到权限控制的目的
const express = require('express')
const router = express.Router()

const connection = require('../../config/config')

// $route POST /api/authority
// @params email 操作者的邮箱
// @desc 根据用户的身份返回后台侧边栏的操作列表和对应路由，以便于进行权限控制
// @access public
router.post('/', (req, res) => {
    if(!req.body.email){ // 如果没有请求的参数
        return  res.json( {
            status:400,
            msg:'参数错误，请重新登录或联系管理员'
        })
    }

    const sql = `SELECT * FROM employee WHERE email = '${req.body.email}'`

    connection.query(sql, (err, result) => {
        if (err) return console.log(err)
        
        if (result) {
            
            const Identity = result[0].Identity
        
            if (Identity === '管理员') { // 管理员的侧边栏
                return res.json({
                    status: 0,
                    msg: [
                        {
                            name: '首 页',
                            route: '/main',
                            icon:'fa fa-tachometer'
                        },
                        {
                            name: '员工管理',
                            route: '/employee',
                            icon:'fa fa-street-view'
                        },
                        {
                            name: '科室管理',
                            route: '/offices',
                            icon:'fa fa-hotel '
                        },
                         {
                            name: '个人中心',
                            route: '/infoCenter',
                            icon:'fa fa-cogs'
                        },
                        {
                            name: '用户管理',
                            icon:'fa fa-group',
                            children: [
                                { name: '用户信息', route: '/userInfo',icon:'fa fa-user-circle' },
                                { name: '预约管理', route: '/appointment',icon:'fa fa-cubes' },
                                { name: '留言管理', route: '/msgBox',icon:'fa fa-info-circle' }
                            ]
                        }, {
                            name: '站内管理',
                            icon:'fa fa-institution ',
                            children: [
                                { name: '轮播图', route: '/swipe',icon:'fa fa-inbox' },
                                { name: '成功案例', route: '/success',icon:'fa fa-telegram' },
                                { name: '站内新闻', route: '/news',icon:'fa fa-newspaper-o' },
                                { name: '名医展示', route: '/docShow',icon:'fa fa-user-md' }
                            ]
                        }

                    ]
                })
            } else if (Identity === '医师') {
                return res.json({
                    status: 0,
                    msg: [
                        {
                            name: '首 页',
                            route: '/docIndex',
                            icon:'fa fa-tachometer'
                        },
                        {
                            name: '个人中心',
                            route: '/docInfo',
                            icon:'fa fa-info-circle'
                        },
                        {
                            name: '预约管理',
                            route: '/docAppoint',
                            icon:'fa fa-object-group'
                        },
                        {
                            name: '用户信息',
                            route: '/docUserInfo',
                            icon:'fa fa-user-circle'
                        }
                    ]
                })
            }
        }else{
            return res.json({
                status:0,
                msg:'用户不存在，请联系管理员！！！'
            })
        }
    })
})


module.exports = router