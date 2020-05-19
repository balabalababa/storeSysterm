<template>
  <div>
    <el-upload
      :action="action"
      list-type="picture-card"
      :on-change="handleChange"
      :file-list="fileList"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="fileList" alt />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // api: "api/merchant/mainImage/upload",
      api: "merchant/mainImage/upload",
      fileList: [],
      dialogVisible: false
    };
  },
  mounted() {
    this.getImgList();
  },
  methods: {
    getImgList() {
      this.$fetch("merchant/mainImage/list").then(res => {
        res.data.images.forEach((item, index) => {
          this.fileList.push({ name: index, url: item });
        });
        // this.fileList=res.data.images;
      });
    },
    handleChange(file, fileList) {
      // this.fileList = fileList.slice(-3);
      console.log(file, fileList);
    },
    handleRemove(file, fileList) {
      this.$fetch("/merchant/mainImage/delete", { fileName: file.url }).then(
        res => {
          if (res.data == "objkt") {
            this.$message.success("删除成功");
          }
        }
      );
    }
  }
};
</script>