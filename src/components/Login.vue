<template>
  <div class="login">
    <el-form :model="admin" status-icon :rules="rules" ref="admin" label-width="100px" class="demo-ruleForm" style="width:300px;padding:200px 400px 0 400px">

      <el-form-item label="用户名" prop="username">
        <el-input   v-model="admin.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password"  v-model="admin.password" placeholder="请输入密码" show-password autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
<!--        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>-->
        <el-button type="primary" @click="login('admin')">登录</el-button>
        <el-button @click="register()">注册</el-button>
      </el-form-item>
    </el-form>
</div>
</template>
<script>
  export default {

    data() {



      return {
        admin: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      login(formName){
        const _this = this;
        if(true){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log(this.admin)
              this.$http.post(_this.GLOBAL.url +'/admin/login',this.admin).then(function(resp){
                let result =resp.data;
                console.log(result)
                if(result.flag == true){
                  sessionStorage.setItem("admintoken",true)
                  _this.$router.push('/menu')
                }else{
                  if(result.errorcode===111){
                    _this.$alert(result.msg, '消息', {
                      confirmButtonText: '去注册',

                      callback: action => {
                        _this.$router.push('/register')
                        console.log(result.errorcode)
                        console.log(result.msg)
                      }
                    })
                  }else{
                    _this.$alert(result.msg, '消息', {
                      confirmButtonText: '确定',
                      callback: action => {
                        //_this.$router.push('/menu')
                        console.log(result.errorcode)
                      }
                    })
                  }

                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
      /*    this.$router.push('/menu')*/
        }
      },
      register(){
        this.$router.push('/register')
      }
    }
  }
</script>
