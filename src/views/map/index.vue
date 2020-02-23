<template>
  <div class="map-box">
      <Map class="map" ref="map" zoom='6' :center="center" :isShowBaseMap="true" :isScaleLine="true"></Map>
  </div>
</template>

<script>
import Map from '../../components/map/index'
// import {tiandituVetorMap}from '../../Utils/ol/mapServer'
// import {setMapCenter}from '../../Utils/ol/mapOperate'
// import {addPoint}from '../../Utils/ol/feature'
export default {
  data(){
    return{
      center:[113.4,34.56]
    }
  },
  components:{
    Map
  },
  mounted(){
     var map = this.$refs.map.map
     console.log("++++",map)
     
    //  tiandituVetorMap(map)
    //  setMapCenter(map,[112.3,32.21])
    //  addPoint(map,[112.3,32.21],"/images/banner.jpg")
  }
}
</script>

<style>
.map-box{
  height: 100%;
  width: 100%;
}
.map{
  height: 100%;
  width: 100%
}
</style>