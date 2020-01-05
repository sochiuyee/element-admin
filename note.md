### 使用vue cli3做前端页面
```js
vue create 项目名
```

### 使用[element-ui](https://github.com/ElementUI/vue-cli-plugin-element)
[快速上手](https://element.eleme.cn/#/zh-CN/component/quickstart)
- 因为使用vue cli@3，所以使用`vue add element`

### 因为后端接口比较简单，所以放在同一文件夹element-admin中。
- 在项目`npm i express mongoose cors`
- 创建server文件夹，新建index.js
- `nodemon server` 因为自动找server文件夹下的index.js运行

****
**前端页面**
[element-ui](https://element.eleme.cn/#/zh-CN/component/installation)
- 根据页面内容查找相应的组件等的代码

### 因为前端需要请求后端接口，使用axios
- 在main.js中
```js
import axios from 'axios'
// 在Vue原型上添加一个属性$http就可以在任意vue页面用this.$http使用axios，创建一个axios实例，设置根地址就不用每次请求都输入一遍根地址
Vue.prototype.$http = axios.create({
  baseURL:'http://localhost:3001/api/'
})
```
- 在CreateArticle.vue中
```js
 saveArticle() {
      // 在main.js中在Vue原型上添加$http属性，值为axios实例对象。前端使用post请求地址与后端的新增文章接口一致。this.article是表单内容，是post请求体。请求地址结合main.js中设置，实际是http://localhost:3001/api/articles
      this.$http.post("articles", this.article).then(res => {
        console.log(res.data);
        // element-ui成功按钮的设置
        this.$message({
          message: "文章创建成功",
          type: "success"
        });
        // 跳转页面
        this.$router.push("/articles/index");
      });
      console.log(this.article); // this.article获取提交表单的内容。article是model设置的
    }
  }
```


**编写后端接口**
1. 引入`express、mongoose、cors`并使用
- 设计存储数据的模型
```js
const Article = mongoose.model('Article', new mongoose.Schema({
    title: {
        type: String
    },
    body: {
        type: String
    }
}))
```

- get请求通常展示内容，post请求是用户提交内容。put请求提交修改内容，delete请求删除内容



