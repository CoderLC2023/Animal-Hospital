//  这是服务器d端进行数据库配置的文件

const mysql = require('mysql')

module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'hospital',
    // useConnectionPooling: true
  });
