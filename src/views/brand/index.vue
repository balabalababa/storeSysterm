<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="品牌名称">
        <el-input v-model="ruleForm.brandName" disabled></el-input>
      </el-form-item>
      <el-form-item label="折扣信息">
        <el-input v-model="ruleForm.brandSubtitle"></el-input>
      </el-form-item>
      <el-form-item label="品牌分类">
        <el-select v-model="ruleForm.brandClass" placeholder="请选择品牌区域">
          <el-option
            :label="item.classifyName"
            :value="item.classifyId"
            v-for="(item,index) in ruleForm.classList"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品牌标签">
        <el-checkbox-group v-model="ruleForm.brandTagList">
          <el-checkbox
            :label="item.tagName"
            name="type"
            v-for="(item,index) in ruleForm.tagList"
            :key="index"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="营业时间" required>
        <template>
          <el-row>
            周一至周五
            <el-time-select
              placeholder="起始时间"
              v-model="ruleForm.brandWeektimeOpen"
              :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }"
            ></el-time-select>
            <el-time-select
              placeholder="结束时间"
              v-model="ruleForm.brandWeektimeClose"
              :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }"
            ></el-time-select>
          </el-row>
          <el-row>
            周六至周日
            <el-time-select
              placeholder="起始时间"
              v-model="ruleForm.brandWeekendtimeOpen"
              :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }"
            ></el-time-select>
            <el-time-select
              placeholder="结束时间"
              v-model="ruleForm.brandWeekendtimeClose"
              :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }"
            ></el-time-select>
          </el-row>
        </template>
      </el-form-item>

      <el-form-item label="门店">
        <el-row>
          <el-button type="primary" @click="addStore">添加门店</el-button>
        </el-row>
        <el-row v-for="(item,index) in ruleForm.brandStoreList" :key="index">
          <Shop :shop="item" @editEnd="editEnd" />
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Shop from "./childpage/shop";
import qs from "qs";
export default {
  components: {
    Shop
  },
  filters: {},
  data() {
    return {
      ruleForm: {},
      startTime: "",
      endTime: "",
      rules: {
        name: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择品牌区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个品牌性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择品牌资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写品牌形式", trigger: "blur" }]
      },
      storeList: []
    };
  },
  mounted() {
    this.getBrandList();
  },
  methods: {
    editEnd(data) {
      this.getBrandList();
    },
    getBrandList() {
      this.$fetch("/merchant/brandManager/initial").then(res => {
        res.data.brandTagList = JSON.parse(res.data.brandTagList);
        this.ruleForm = res.data;
        this.ruleForm.brandTagList.forEach((item, index) => {
          this.ruleForm.brandTagList[index] = this.tagName(item);
        });
      });
    },
    submitForm(formName) {
      let data = {};
      // Object.assign(data,this.ruleForm);
      data = JSON.parse(JSON.stringify(this.ruleForm));
      data.brandTagList.forEach((item, index) => {
        data.brandTagList[index] = this.returnTag(item);
      });
      data.brandTagList = JSON.stringify(data.brandTagList);
      data.brandTag=data.brandTagList;
      delete data.classList;
      delete data.tagList;
      delete data.brandStoreList;
      delete data.brandImage;
      this.$post("merchant/brandManager/update", qs.stringify(data)).then(
        res => {
          if(res.code==0){
            this.$message.succeess('保存成功');
          }
        }
      );
    },
    addStore() {
      let shop = {
        brandID: this.$store.state.brandId,
        brandStoreName: "",
        brandStorePhone: "",
        brandStoreProvice: "",
        brandStoreCity: "",
        brandStoreArea: "",
        brandStoreDescAddr: ""
      };
      this.$post("merchant/brandManager/store", qs.stringify(shop)).then(
        res => {
          if (res.code == 0) {
            this.$message.success("新增成功");
            this.getBrandList();
          }
        }
      );
    },
    //转换标签名
    tagName(id) {
      switch (id) {
        case 1:
          return "正品保证";
          break;
        case 2:
          return "免费送货";
          break;
        case 3:
          return "免费搬楼";
          break;
        case 4:
          return "免费安装";
          break;
        case 5:
          return "网站补贴";
          break;
      }
    },
    //逆向转换标签
    returnTag(name) {
      switch (name) {
        case "正品保证":
          return 1;
          break;
        case "免费送货":
          return 2;
          break;
        case "免费搬楼":
          return 3;
          break;
        case "免费安装":
          return 4;
          break;
        case "网站补贴":
          return 5;
          break;
      }
    }
  }
};
</script>
<style lang="less" coped>
</style>