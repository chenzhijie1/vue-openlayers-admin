<template>
  <div>
       <Map class="map" ref="map" zoom='6' :center="center" :isShowBaseMap="true" :isScaleLine="true"></Map>
       <!-- <div id="mouse-position"></div> -->
  </div> 
</template>

<script>
import Map from '../../../components/map/index'
import { OverviewMap} from 'ol/control.js';
// 加载天地图的相关依赖包文件
import TileLayer from 'ol/layer/Tile.js';
import XYZ from 'ol/source/XYZ';
// 
import View from 'ol/View.js';
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
        // 默认加载天地图矢量数据
        let layers = []
        var TiandiMap_vec = new TileLayer({
            name: '天地图矢量图层',
            source: new XYZ({
                url: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d', //mapkey为天地图密钥
                wrapX: false,
            }),
        });
        layers.push(TiandiMap_vec)
        // 创建鹰眼控件
        let overviewMap =  new OverviewMap({
            //鹰眼控件样式（see in overviewmap-custom.html to see the custom CSS used）
            className: 'ol-overviewmap ol-custom-overviewmap',
            //鹰眼中加载同坐标系下不同数据源的图层
            layers:layers,
            //鹰眼控件展开时功能按钮上的标识（网页的JS的字符编码）
            collapseLabel: '\u00BB',
            //鹰眼控件折叠时功能按钮上的标识（网页的JS的字符编码）
            label: '\u00AB',
            //初始为展开显示方式
            collapsed: true,
            view: new View({
                projection: 'EPSG:4326',
            })
        })
        console.log("+++++",overviewMap)
        // 将鹰眼控件加载到地图上

        this.map.addControl(overviewMap)
    }
}
</script>

<style scoped>

</style>>
