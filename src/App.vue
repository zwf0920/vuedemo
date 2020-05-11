<!--
<template>
  <div id="app">
    &lt;!&ndash;
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/content">Content</router-link>
    </div>
    &ndash;&gt;
    <div style="width:100%;height: 60px;color: white;background-color: slateblue;text-align: center;font-size: 38px;">
      <span >后台管理系统</span>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
-->
<template>
  <div id="app">
    <div style="width:100%;height: 60px;color: white;background-color: slateblue;text-align: center;font-size: 38px;">
      <span >后台管理系统</span>
    </div>

    <router-view/>

  </div>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      // const item = {
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // };
      // return {
      //   tableData: Array(20).fill(item)
      // }
      return{

      }
    }
  };
</script>
