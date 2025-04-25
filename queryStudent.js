const { Pool } = require('pg');

// 创建数据库连接池
const pool = new Pool({
    user: 'postgres',     // 替换为你的数据库用户名
    host: '192.168.110.219',         // 数据库主机地址
    database: 'test',         // 数据库名
    password: '123321', // 替换为你的数据库密码
    port: 5432,               // PostgreSQL默认端口
});

async function findStudentByName(name) {
    try {
        // SQL查询 - 只查询name, gender, age字段
        const query = 'SELECT name, gender, age FROM students WHERE name = $1';
        const values = ['张三'];

        // 执行查询
        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            console.log('找到学生信息：', result.rows[0]);
            return result.rows[0];
        } else {
            console.log('未找到该学生');
            return null;
        }
    } catch (error) {
        console.error('查询出错：', error);
        throw error;
    } finally {
        // 确保在完成后关闭连接池
        await pool.end();
    }
}

// 执行查询
findStudentByName('张三')
    .catch(err => console.error('程序执行出错：', err)); 