<template>
  <div>
       <Map class="map" ref="map" zoom='6' :center="center" :isShowBaseMap="true" :isScaleLine="true"></Map>
       <div id="mouse-position"></div>
  </div> 
</template>

<script>
import Map from '../../../components/map/index'
import MousePosition from 'ol/control/MousePosition';
import {createStringXY} from "ol/coordinate"
export default {
    data(){
        return{
            center:[113.4,34.56],
            map:null
        }
    },
    components:{
        Map
    },
    mounted(){
        this.map = this.$refs.map.map
           //实例化鼠标位置控件（MousePosition）
        var mousePositionControl = new MousePosition({
            //坐标格式
            coordinateFormat:createStringXY(4),
            //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
            projection: 'EPSG:4326',
            //坐标信息显示样式类名，默认是'ol-mouse-position'
            className: 'custom-mouse-position',
            //显示鼠标位置信息的目标容器
            target: document.getElementById('mouse-position'),
            //未定义坐标的标记
            undefinedHTML: '&nbsp;'
        });
        this.map.addControl(mousePositionControl)
    }
}
</script>

<style scoped>
/* 鼠标位置控件层样式设置 */
#mouse-position {
    float: left;
    position: absolute;
    top: 75px;
    left: 250px;
    width: 200px;
    height: 20px;
    /*在地图容器中的层，要设置z-index的值让其显示在地图上层*/
    z-index: 2000;
}
/* 鼠标位置信息自定义样式设置 */
.custom-mouse-position {
    color: rgb(0,0,0);
    font-size: 16px;
    font-family: "微软雅黑";
}
</style>>
