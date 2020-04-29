<template>
  <div>
    <el-upload
      :action="api"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-upload="beforeAvatarUpload14"
      :file-list="this.dialogImageUrl"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      api: "https://jsonplaceholder.typicode.com/posts/",
      pic: [],
      dialogImageUrl: [],
      dialogVisible: false
    };
  },
  mounted() {
    this.pic.forEach(res => {
      this.dialogImageUrl.push({
        url: res
      });
    });
  },
  methods: {
    //删除时的事件
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let a = file.url;
      console.log(a);
      let b = this.pic.indexOf(a);
      console.log(b);
      this.pic.splice(b, 1);
      this.dialogImageUrl.splice(b, 1);
      console.log(this.pic);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 头像上传之前
    beforeAvatarUpload14(file) {
      var that = this;
      // 判断类型是不是图片
      if (!/image\/\w+/.test(file.type)) {
        that.$message("请确保文件为图像类型");
        return false;
      } else {
        var article_image, image_base64;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
          image_base64 = this.result.split(",")[1];
          article_image = image_base64;
          var params = {
            imgdata: article_image
          };
          that.$axios
            .post(that.api + "upload", params)
            .then(res => {
              if (res.data.status == 1) {
                console.log(111);
                that.pic.push(res.data.result.url);
                that.dialogImageUrl.push({
                  url: res.data.result.url
                });
                console.log(that.pic);
                console.log(222);
              } else if (res.data.status == 0) {
                that.$message.error(res.data.message);
              }
            })
            .catch(error => {});
        };
      }
    }
  }
};
</script>