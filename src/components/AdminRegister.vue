<template>
  <div class="login">
    <el-form :model="admin" status-icon :rules="rules" ref="admin" label-width="100px" class="demo-ruleForm" style="width:300px;padding:200px 400px 0 400px">
      <el-form-item label="id" >
        <el-input   v-model="admin.adminid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input   v-model="admin.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password"  v-model="admin.password" placeholder="请输入密码" show-password autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password2">
        <el-input type="password"  v-model="admin.password2" placeholder="请确认密码" show-password autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <!--        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>-->
        <el-button @click="register('admin')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {

    data() {


      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.admin.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        admin: {
          username: '',
          password: '',
          password2: ''

        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          password2: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      register(formName){
        const _this = this;
        if(true){
          _this.$refs[formName].validate((valid) => {
            console.log(this.admin)
            if (valid) {
              _this.$http.post(_this.GLOBAL.url +'/admin/register',this.admin).then(function(resp){
                let result =resp.data;
                console.log(result)
                if(result.flag == true){
                  _this.$alert(result.msg, '消息', {
                    confirmButtonText: '去登录',

                    callback: action => {
                      _this.$router.push('/login')
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

              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
          /*    this.$router.push('/menu')*/
        }
      }
    }
  }
</script>
