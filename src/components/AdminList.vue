<template>
  <div>
<el-table :data="tableData">
  <el-table-column prop="adminid" label="管理员id" width="140">
  </el-table-column>
  <el-table-column prop="username" label="管理员名称" width="140">
  </el-table-column>

  <el-table-column prop="password" label="密码">
  </el-table-column>
  <el-table-column prop="flag" label="标记">
  </el-table-column>
  <el-table-column
    fixed="right"
    label="操作"
    width="100">
    <template slot-scope="scope">
      <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
      <el-button @click="deleteBook(scope.row)" type="text" size="small">删除</el-button>
    </template>
  </el-table-column>
</el-table>
<el-pagination
  background
  layout="prev, pager, next"
  :page-size="pageSize"
  :total="total"
  @current-change="page"
>
</el-pagination>
  </div>
</template>
<script>
  export default {
    methods:{
      deleteBook(row){
        const _this = this
        this.$http.delete(_this.GLOBAL.url +'/admin/deleteById/'+row.roleid).then(function(resp){
          _this.$alert(row.name+'删除成功！', '消息', {
            confirmButtonText: '确定',
            callback: action => {
              window.location.reload()
            }
          })
        })
      },
      edit(row) {
        this.$router.push({
          path: '/update',
          query:{
            id:row.roleid
          }
        })
      },
      page(currentPage){
        const _this = this
        this.$http.get(_this.GLOBAL.url +'/findAll/'+(currentPage-1)+'/1').then(function(resp){
          console.log(resp)
          _this.tableData = resp.data.content
          _this.pageSize = resp.data.size
          _this.total = resp.data.totalElements
        })
      }
    },
    data() {
      return {
        pageSize:2,
        total:1000,
        tableData: []

      }
    },

    created() {
      if (!sessionStorage.getItem("admintoken")){
        console.log(sessionStorage.getItem("admintoken"))
        const _this=this
        _this.$router.push('/login')
      }
      const _this = this

      this.$http .get(_this.GLOBAL.url +'/admin/findAll/0/4').then(function(resp){
        console.log(resp)
        _this.tableData = resp.data.content
        _this.pageSize = resp.data.size
        _this.total = resp.data.totalElements
      })
    }
  };
</script>

