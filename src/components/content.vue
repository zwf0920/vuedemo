<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <table>
      <tr>
        <td>id</td>
        <td>商圈名称</td>
        <td>城区名称</td>
      </tr>
      <tr v-for="item in users">
        <td>{{item.id}}</td>
        <td>{{item.storename}}</td>
        <td>{{item.chengqu}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      users:[]
    }
  },
  created(){
    const _this =this
    this.$http.get('http://127.0.0.1:8181/user/getAll')
      .then(function (response) {
        // handle success
        console.log(response);
        _this.users=response.data
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
