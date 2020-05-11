<template>
    <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="角色id">
            <el-input v-model="ruleForm.roleid" hidden></el-input>
        </el-form-item>

      <el-form-item label="角色编号">
        <el-input v-model="ruleForm.orderNo" hidden></el-input>
      </el-form-item>

       <el-form-item label="角色名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="图片" prop="author">
          <el-upload
            class="avatar-uploader"
            action="lei"
            :on-change="handleChange"
            :show-file-list="false"
            :http-request="httpRequest"><!--覆盖默认上传-->
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

            <el-input v-model="ruleForm.picpath" v-show="false"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

    </el-form>
</template>
<style >
  .avatar-uploader {
    margin-top: 20px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
    height: 178px;
  }

  .avatar-uploader:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: flex;
  }
</style>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    roleid: '',
                    name: '',
                    picpath: '',
                    orderNo: ''
                },
                rules: {
                    name: [
                        { required: true, message: '角色名称不能为空', trigger: 'blur' }
                    ],
                    orderNo: [
                      { required: true, message: '角色编号不能为空', trigger: 'blur' }
                    ]

                },
              fileList: [{name: '1.jpeg', url: './assets/logo.png'}],
              imageUrl: '',
              tempUrl: '',
            };
        },
        methods: {
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.put(_this.GLOBAL.url +'/role/update',this.ruleForm).then(function(resp){
                            if(resp.data == 'success'){
                                _this.$alert('《'+_this.ruleForm.name+'》修改成功！', '消息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push('/rolelist')
                                    }
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },




            //将上传图片的原路径赋值给临时路径
            handleChange(file, fileList) {
              this.tempUrl = URL.createObjectURL(file.raw);
            },
            //实现图片上传功能
            httpRequest(item) {
              //验证图片格式大小信息
              const isJPG = item.file.type == 'image/jpeg' || item.file.type == 'image/png';
              const isLt2M = item.file.size / 1024 / 1024 < 2;
              if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
              }
              if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
              }
              //图片格式大小信息没问题 执行上传图片的方法
              if (isJPG && isLt2M == true) {
                // post上传图片
                let _this = this;
                //定义FormData对象 存储文件
                let mf = new FormData();
                //将图片文件放入mf
                mf.append('image_data', item.file);

                _this.imageUrl = _this.tempUrl;
                this.$http.put(_this.GLOBAL.url +'/role/addImage',mf).then(function(resp){
                  alert(123);
                  console.log(resp.data);
                  /*if(resp.data == 'success'){
                    _this.$alert('《'+_this.ruleForm.name+'》修改成功！', '消息', {
                      confirmButtonText: '确定',
                      callback: action => {
                        _this.$router.push('/rolelist')
                      }
                    })
                  }*/
                })
                /*App.$Api.fileUpload(mf, function (result) {
                  if (result.result == "true") {
                    App.$notify.success({
                      title: '温馨提示：',
                      message: result.message,
                    });
                    //将临时文件路径赋值给显示图片路径（前端显示的图片）
                    App.imageUrl = App.tempUrl;
                    //将后台传来的数据库图片路径赋值给car对象的图片路径
                    App.car.carImg = result.imgUrl;
                  } else {
                    App.$notify.error({
                      title: '温馨提示：',
                      message: result.message,
                    });
                  }
                })*/
              }
            },
            handleRemove(file, fileList) {
              console.log(file, fileList);
            },
            handlePreview(file) {
              console.log(file);
            },
            handleExceed(files, fileList) {
              this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
              return this.$confirm(`确定移除 ${ file.name }？`);
            }
            /*addImage: function () {
                const _this = this
                if (_this.$refs.new_image.files.length !== 0) {
                  var formData = new FormData()
                  formData.append('image_data', _this.$refs.new_image.files[0]);
                  //单个文件进行上传
                  this.$http.post('/addImage', formData, {
                    headers: {
                      "Content-Type": "multipart/form-data"
                    }
                  }).then(response => {

                  })
                }
            }*/
        },
        created() {
            const _this = this
            this.$http.get(_this.GLOBAL.url +'/role/findById/'+this.$route.query.id).then(function(resp){
                _this.ruleForm = resp.data;
                if(_this.ruleForm.picpath){
                  _this.imageUrl ='http://localhost:8282'+ _this.ruleForm.picpath;
                }

            })
        }
    }
</script>
