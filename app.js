import express from 'express'
// const fetch = require('node-fetch');
import fetch from 'node-fetch'
const app = express();

app.get('/api/reset', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send({ message: 'Missing url parameter' });
    }

    try {
        // 从给定的URL中获取JSON数据
        const response = await fetch(url);
        const json = await response.json();
        
        // 将JSON序列化为字符串并替换正则表达式
        const jsonString = JSON.stringify(json)
                                .replace(/(%|>|=|<)/g, '');

        // 解析新的JSON字符串并发送响应
        const newJson = JSON.parse(jsonString);
        res.send(newJson);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
});

// 启动服务器并监听指定端口
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
