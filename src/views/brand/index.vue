<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="品牌名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="品牌分类" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择品牌区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品牌标签" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="正品保证" name="type"></el-checkbox>
          <el-checkbox label="免费送货" name="type"></el-checkbox>
          <el-checkbox label="免费搬送" name="type"></el-checkbox>
          <el-checkbox label="免费安装" name="type"></el-checkbox>
          <el-checkbox label="网站补贴" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="营业时间" required>
        <template>
          <el-row>
            周一至周五
            <el-time-select
              placeholder="起始时间"
              v-model="startTime"
              :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }"
            ></el-time-select>
            <el-time-select
              placeholder="结束时间"
              v-model="endTime"
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
              v-model="startTime"
              :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }"
            ></el-time-select>
            <el-time-select
              placeholder="结束时间"
              v-model="endTime"
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
      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>

      <el-form-item label="门店">
        <el-row>
          <el-button type="primary" @click="addStore"> 添加门店</el-button>
        </el-row>
        <el-row v-for="(item,index) in storeList" :key="index">
          <Shop :data="item" />
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Shop from "./childpage/shop";
export default {
  components: {
    Shop
  },
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
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
      storeList:[]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addStore(){
      let shop={user:'',region:'',area:''};
      this.storeList.push(shop)
    }
  }
};
</script>
<style lang="less" coped>
</style>