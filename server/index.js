const express = require('express')
const app = express()

app.use(require('cors')())
app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/express-test', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true })

const Article = mongoose.model('Article', new mongoose.Schema({
    title: {
        type: String
    },
    body: {
        type: String
    }
}))

// 展示所有文章
app.get('/', async (req, res) => {
    res.send('index')
})

// 新增文章
app.post('/api/articles', async (req, res) => {
    const article = await Article.create(req.body)
    res.send(article)
})

// 文章列表，仅展示用get请求
app.get('/api/articles',async(req,res) =>{
    const article = await Article.find()
    res.send(article)
})

// 删除文章，请求一般是delete
app.delete('/api/articles/:id',async (req,res) =>{
    await Article.findByIdAndDelete(req.params.id)
    res.send({
        status:true
    })
})

// 点击编辑后的文章详情页
app.get('/api/articles/:id',async (req,res) =>{
    const article = await Article.findById(req.params.id)
    res.send(article)
})

// 修改文章接口
app.put('/api/articles/:id',async (req,res) => {
    const article = await Article.findByIdAndUpdate(req.params.id,req.body)
    res.send(article)
})

app.listen(3001, () => {
    console.log('Server is running')
})