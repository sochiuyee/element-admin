<template>
  <div>
    <el-table :data="articles">
      <!-- prop是通过axios请求回来的数据带有的属性 -->
      <el-table-column prop="title" label="题目" width="140"></el-table-column>
      <el-table-column prop="body" label="内容" width="220"></el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <!-- scope表示当前这行的数据，element-ui规定的 -->
        <template slot-scope="scope">
          <el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
          <el-button @click="remove(scope.row._id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.$http.get("articles").then(res => {
        this.articles = res.data;
      });
    },
    edit(id) {
      // 路由跳转
      this.$router.push(`/articles/${id}/edit`)
    },
    remove(id) {
      // 后台删除文章接口的请求是delete
      this.$http.delete(`articles/${id}`).then(res => {
        console.log(res.data);
        this.$message({
          message: "文章删除成功",
          type: "success"
        });
        // 删除完数据需要重新刷新页面
        this.fetch();
      });
    }
  }
};
</script>