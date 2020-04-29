import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    brandName:'',
    brandId:''
  },
  mutations: {
    setBrand(state,brand){
      state.brandName=brand.brandName;
      state.brandId=brand.brandID;
    }
  },
  actions: {
  },
  modules: {
  }
})
