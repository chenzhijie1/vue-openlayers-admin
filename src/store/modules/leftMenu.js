
/**
 * 说明：记录左侧菜单记录
 */
// 状态值
const state = {
     leftMenuData:null,
}
// 更改状态值函数
const mutations={
    changeLeftMenu(state,meunData){
        console.log("=====",meunData)
        state.leftMenuData = meunData
        // return state
    }
}
// 异步修改状态值
const actions={

}

export default  {
    namespaced: true,
    state,
    mutations,
    actions
}