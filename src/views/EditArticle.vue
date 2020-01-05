<template>
  <!-- 阻止默认行为，而且提交表单 -->
  <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">
    <el-form-item label="文章标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>

    <el-form-item label="文章内容">
      <el-input type="textarea" v-model="article.body"></el-input>
    </el-form-item>
    <el-form-item>
      <!-- 原生 type 属性，表示是提交按钮 -->
      <el-button type="primary" native-type="submit">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      article: {}
    };
  },
  methods: {
    saveArticle() {
      // 在main.js中给Vue原型挂载了axios实例，方便发起请求
      this.$http.put(`articles/${this.$route.params.id}`, this.article).then(res => {
        console.log(res.data);

        // element-ui成功按钮的设置
        this.$message({
          message: "文章更新成功",
          type: "success"
        });

        // 跳转页面
        this.$router.push("/articles/index");
      });
      console.log(this.article); // this.article获取提交表单的内容。article是el-form中:model设置的
    },
    fetch(){
      // 进入编辑页面需要请求该条编辑数据
      this.$http.get(`articles/${this.$route.params.id}`).then(res => {
        this.article = res.data
      })
    }
  },
  created(){
    this.fetch()
  }
};
</script>