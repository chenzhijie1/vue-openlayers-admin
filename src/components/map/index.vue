<template>
  <div>
    <div id="map" class="map"></div>
  </div> 
</template>
<script>
// 映入css文件、
import "ol/ol.css";
// import "../utils/openlayers/css/OverviewMap.css";
import Map from "ol/Map.js";
// import Overlay from "ol/Overlay";
import View from "ol/View.js";
// import TileLayer from "ol/layer/Tile.js";
// import XYZ from "ol/source/XYZ";
// 比例尺
import ScaleLine from "ol/control/ScaleLine";
// 地图服务
import {
  tiandituVetorMap,
//   tiandituImgMap
} from "../../Utils/ol/mapServer";
export default {
  props: ["zoom", "center", "isShowBaseMap", "isScaleLine"],
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new Map({
        target: "map",
        view: new View({
          projection: "EPSG:4326",
          center: this.center || [0, 0],
          zoom: this.zoom || 2
        })
      });
      console.log("+++++",this.isShowBaseMap)
      if (this.isShowBaseMap) tiandituVetorMap(this.map);
      if (this.isScaleLine) this.showScaleLine();
    },
    // 显示比例尺
    showScaleLine: function() {
      //实例化比例尺控件（ScaleLine）
      var scaleLineControl = new ScaleLine({
        //设置比例尺单位，degrees、imperial、us、nautical、metric（度量单位）
        units: "metric"
      });
      this.map.addControl(scaleLineControl);
    }
  }
};
</script>
<style>
.map {
  width: 100%;
  height: 100%;
}
</style>


