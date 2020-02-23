import Vue from 'vue'
import Vuex from 'vuex'

// 
import leftMenu from './modules/leftMenu'
// 
Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        leftMenu
    },
    state:{
        count:1
    },
    mutations:{
        change(state,num){
            return state+=num
        }
    }
})

export default store