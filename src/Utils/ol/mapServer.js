/**
 * 说明：封装所有的地图服务，返回图层名称，单一图层则返回图层名称，多个图层返回对象
 */
// import TileLayer from 'ol/layer/Tile.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {XYZ,TileWMS,Vector as VectorSource,Cluster} from 'ol/source.js';
import {Heatmap as HeatmapLayer} from 'ol/layer.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import ImageWMS from 'ol/source/ImageWMS';
import WMSLayer from "ol/layer/Image";
import MVT from 'ol/format/MVT.js';
import {createXYZ} from 'ol/tilegrid';
import {Circle as CircleStyle, Fill, Stroke, Style, Text,Icon} from 'ol/style.js';
import {get as projGet} from 'ol/proj';
// import {bbox as bboxStrategy} from 'ol/loadingstrategy.js';
// import axios from "axios"
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
/**
 * 说明：加载天地图矢量服务
 * @param {*} map     必填，对象，地图对象
 */
export function tiandituVetorMap(map){
     /**
     * 加载天地图的矢量图层
     */
    var TiandiMap_vec = new TileLayer({
            name: '天地图矢量图层',
        source: new XYZ({
            url: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d', //mapkey为天地图密钥
            wrapX: false,
            //设置crossOrigin 
        }),
    });
    /**
     * 添加天地图适量的标注信息
     */
    var TiandiMap_cva = new  TileLayer({
        name: '天地图矢量注记图层',
        source: new XYZ({
            // 设置crossOrigin
            // crossOrigin: 'anonymous',
            url: 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d', //mapkey为天地图密钥
            wrapX: false,
            
        }),
    });

    console.log("+++------++++")
    // 添加到地图上
    map.addLayer(TiandiMap_vec);
    map.addLayer(TiandiMap_cva);
    // 返回图层名称
    return {
        TiandiMap_vec,TiandiMap_cva
    }
    
}

/**
 * 说明：加载天地图影像服务
 * @param {*} map       必填，对象，地图对象
 */
export function tiandituImgMap(map){
    var TiandiMap_img = new TileLayer({
        name: "天地图影像图层",
        source: new XYZ({
            url: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d"  ,//parent.TiandituKey()为天地图密钥
            wrapX: false,
        })
    });
    var TiandiMap_cia = new TileLayer({
        name: "天地图影像注记图层",
        source: new XYZ({
            url: "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d" ,//parent.TiandituKey()为天地图密钥
            wrapX: false,
            
        })
    });
     // 添加到地图上
     map.addLayer(TiandiMap_img);
     map.addLayer(TiandiMap_cia);
     // 返回图层名称
     return {
        TiandiMap_img,TiandiMap_cia
     }
}
// 加载geoserver发布的WMS数据
export function geoServeWMS(map,url,params){
    var wms = new TileLayer({
        source: new TileWMS({
            url: url,
            params: params,
        })
    });
    map.addLayer(wms)
    return wms;
}

export function WMS(map){
  var maplayer = new WMSLayer({
    source: new ImageWMS({
        url: 'http://192.168.74.136:8080/geoserver/cx/wms',
        params: {
            'LAYERS': 'cx:grid', //此处可以是单个图层名称，也可以是图层组名称，或多个图层名称  
            'VERSION': '1.1.0',
            'TILED': false
        },
        ratio: 1.5,
        serverType: 'geoserver' //服务器类型                  
    })
  })
  map.addLayer(maplayer)
  return maplayer;
}

// 加载热力图
export function showHeatMap(map){
    let heatMapLayer = new HeatmapLayer({
        source: new VectorSource({
          //我们使用json数据
          url: '/static/hubei.geojson',
          format: new GeoJSON(),
         
           // projection: 'EPSG:3857',
        }),
        //这里可以根据自己项目的实际，绑定页面的控件动态调整
        blur: 5,
        radius: 3,
        gradient:[ '#FFFACD', '#EEE8AA', '#F0E68C', '#DAA520']
    });

    // heatMapLayer.getSource().on('addfeature', function(event) {
    //     var POPULATION = event.feature.get('POPULATION');
    //     console.log("++++++",POPULATION)
    //     //设定权重减去的数字是为了过滤地震等级，比如只想显示3级以上地震，那就减去3
    //     // event.feature.set('weight', POPULATION-156);  
    //     event.feature.set('radius', POPULATION);  
    //     event.feature.set('blur', POPULATION);  
    // });

   map.addLayer(heatMapLayer)
}
// 加载高德地图
export function showGaodeMap(map){
    var gaode = new TileLayer({
        source: new XYZ({
            url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=6&x={x}&y={y}&z={z}',//parent.TiandituKey()为天地图密钥
            wrapX: false,
            // projection: 'EPSG:3857',
        }),
        opacity:0.4
    });
     // 添加到地图上
     map.addLayer(gaode);
}

// 加载arcgis发布的墨蓝色地图
export function showCoolMap(map){
    var coolMap = new TileLayer({
        source: new XYZ({
            url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',//parent.TiandituKey()为天地图密钥
            wrapX: false,
            // projection: 'EPSG:3857',
        }),
        opacity:0.4
    });
     // 添加到地图上
     map.addLayer(coolMap);
}



/**
  说明：加载geojson文件进行聚合显示
 */
export function showcluster(map,url){
    var source = new VectorSource({
          //我们使用json数据
          url:url,
          format: new GeoJSON(),
    });

    var clusterSource = new Cluster({
        distance: 200,
        source: source
    });

    var styleCache = {};
    var clusters = new VectorLayer({
      source: clusterSource,
      style: function(feature) {
        var size = feature.get('features').length;
        var style = styleCache[size];
        
        if (!style) {
          if(size == 1){
            style = new Style({
              image: new CircleStyle({
                radius: 20,
                stroke: new Stroke({
                  color: '#fff'
                }),
                fill: new Fill({
                  color: '#000'
                })
              }),
              text: new Text({
                text: size.toString(),
                fill: new Fill({
                  color: '#fff'
                })
              })
            });
          }else{
            var img = /** @type {HTMLCanvasElement} */ document.createElement('img')
            img.src='/static/makers.gif'
            style = new Style({
              image:new Icon({
                //透明度
                opacity: 0.75,
                img:img,
                imgSize: [20, 20],
                //图标的url
                // src:"/static/logo.png" //注意这里使用绝对路径传参
              }),
              text: new Text({
                text: size.toString(),
                fill: new Fill({
                  color: '#fff'
                })
              })
          });

          }
          
          styleCache[size] = style;
        }
        return style;
      }
    });

    map.addLayer(clusters)
} 
/**
 * 说明：加载瓦片矢量数据
 * @param {*} map 
 */
export function showVectorTile(map){
  var tile_layer = new VectorTileLayer({
    source: new VectorTileSource({
      format:new MVT(),
      tileGrid: createXYZ({
        extent: projGet('EPSG:4326').getExtent(), 
        maxZoom: 22
      }),
      tilePixelRatio: 1,
      tileUrlFunction: function (tileCoord) {
          return 'http://localhost:8080/geoserver/gwc/service/tms/1.0.0/newcapec%3Ahunan@my_titles@pbf/' + (tileCoord[0] - 1)
              + '/' + tileCoord[1] + '/' + (Math.pow(2, tileCoord[0] - 1) + tileCoord[2]) + '.pbf';
          // return 'http://localhost:8080/geoserver/gwc/service/tms/1.0.0/newcapec%3Ahunan@my_titles@pbf/{z}/{x}/{-y}.pbf';
      }
    })
  })
  map.addLayer(tile_layer)
}