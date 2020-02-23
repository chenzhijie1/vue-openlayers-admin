/**
 * 说明：该文件主要用于添加点线面以及鼠标动态绘制点线面的方法
 * 时间：2019-8-6
 * 作者：梁园
 */
// 要素库文件
import Feature from 'ol/Feature.js';
// 要素类型
import {LineString, Point,Polygon} from 'ol/geom.js';
// 样式类型
import {Circle as CircleStyle, Fill, Stroke, Style,Icon} from 'ol/style.js';
// 绘制图层
import VectorLayer from 'ol/layer/Vector.js';
// 绘制数据源
import VectorSource from 'ol/source/Vector.js';
// 绘制事件
import Draw from 'ol/interaction/Draw.js';
// 填充样式
// 选择要素
import Select from 'ol/interaction/Select.js';

import axios from "axios"
// import { Promise, reject } from 'q';
// import { resolve } from 'url';
let fillStyle = new Fill({
                    color: 'rgba(255, 255, 255, 0.8)'
                })
// 边界样式
let strokeStyle = new Stroke({
                        color: '#ffcc33',
                        width: 2
                    })
// 形状原型样式
let imageCircle = new CircleStyle({
                    radius: 5,
                    fill: new Fill({
                        color: '#ffcc33'
                    })
                })
let icon_style = {
    // anchor: [0.5, 0],
    // anchorOrigin: 'top-right',
    // anchorXUnits: 'fraction',
    // anchorYUnits: 'pixels',
    // offsetOrigin: 'top-right',
    // offset:[0,10],
    //图标缩放比例
    // scale:0.5,
    //透明度
    opacity: 0.75,
    //图标的url
   src:"/static/logo.png" //注意这里使用绝对路径传参
}

let style = new Style({
    //填充色
    fill: fillStyle,
    //边线颜色
    stroke:strokeStyle ,
    //形状
    image: imageCircle
})
/**
 * 说明：添加点
 * @param {*} map     必填，对象，地图对象
 * @param {*} point   必填，数组，坐标
 * @param {*} img     
 */
export function addPoint(map,point,img){

    var point_ = new Feature({
        geometry: new Point(point)
    });
    if(img){
        icon_style.src = img  
    }
    var icon = new Icon(icon_style)
    var style_ = new Style({
        //填充色
        fill: fillStyle,
        //边线颜色
        stroke:strokeStyle ,
        //形状
        image: icon
    })
    point_.setStyle( style_);
    //实例化一个矢量图层Vector作为绘制层
    var source = new VectorSource({
        features: [point_]
    });
    //创建一个图层
    var vector = new VectorLayer({
        source: source
    });
    //将绘制层添加到地图容器中
    map.addLayer(vector);

    return vector;
}
/**
 * 说明：添加线要素
 * @param {*} map           必填，对象，地图对象
 * @param {*} lineString    必填，数组，线要素坐标
 */
export function addLine(map,lineString){
    var line = new Feature({
        geometry: new LineString(lineString)
    });
    //设置点1的样式信息
    line.setStyle(style)

    //实例化一个矢量图层Vector作为绘制层
    var source = new VectorSource({
        features: [line]
    });
    //创建一个图层
    var vector = new VectorLayer({
        source: source
    });
    //将绘制层添加到地图容器中
    map.addLayer(vector);

    return vector;
}

/**
 * 添加面要素
 * @param {*} map       必填，对象，地图对象  
 * @param {*} polygon    必填，数组，面要素的坐标信息
 */
export function addPolygon(map,polygon){
   let polygons = []
    polygon.map((item)=>{
        var polygon = new Feature({
            geometry: new Polygon(item),
            // id:"1"+new Date()
        });
        //设置点1的样式信息
        polygon.setStyle(style)
        // polygon.setId(index)
        polygons.push(polygon)
    })
    //实例化一个矢量图层Vector作为绘制层
    var source = new VectorSource({
        features:polygons
    });
    //创建一个图层
    var vector = new VectorLayer({
        source: source
    });
    //将绘制层添加到地图容器中
    map.addLayer(vector);

    return vector;
}
/**
 * 说明：删除整个要素
 * @param {*} featureLayer    要素图层
 */
export function removeFeaters(featureLayer){
    featureLayer.getSource().clear()
}
/**
 * 说明：根据要素的ID值来删除要指定的要素
 * @param {*} featureLayer    必填，对象，要素图层
 * @param {*} id              必填，数字或字符串，删除要素的id值
 * 
 */
export function removeFeaterById(featureLayer,id){
    let feature = featureLayer.getSource().getFeatureById(id);
    featureLayer.getSource().removeFeature(feature)
}
/**
 * 说明：鼠标交互绘制点线面，默认是"point"(点)
 * @param {*} map       必填，对象，地图对象
 * @param {*} type      必填，字符串，绘制的类型，有"Point"、"LineString"、"Polygon"
 * @param {*} data      选填，对象，绘制对象的属性
 */
export function drawFeature(map,type,data ={}){
    //1、创建数据源
    const source = new VectorSource({wrapX: false});
    // 2、创建绘制图层
    const vector = new VectorLayer({
      source: source
    });
    //3、绘制图层添加到地图上
    map.addLayer(vector)
    // 4、创建绘制对象
    let draw = new Draw({
        source: source,
        type: type
    })
    // 5、添加点击绘制事件
    map.addInteraction(draw)

    draw.on("drawend",e=>{
        console.log("绘制完成",e)
        // 绘制要素添加属性
        e.feature.attribute= data
        // 移除绘制事件
        map.removeInteraction(draw);
    })
}

/**
 * 说明：点击地图获取属性信息,获取矢量数据
 * @param {*} map           必填，对象，地图对象
 */
export function getFeatureInfo(map){
    map.on('click', function (evt) {
        //判断当前单击处是否有要素，捕获到要素时弹出popup
       map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) { 
            console.log("要素信息",feature);
            console.log("图层信息",layer)
            return feature; 
        });
    });
}
export function selectFeature(map){
    // 创建选择对象,默认是单机事件
    const select = new Select();
    // 添加选择事件
    select.on('select', function(e) {
        console.log("要素",e)
    });
    // 将选择对象添加上地图上
    map.addInteraction(select);
}
/**
 * 说明：获取WMS服务数据的要素信息
 * @param {*} map         必填，对象，地图对象
 * @param {*} wmsSource   必填，对象，WMS服务的数据源
 */
export function getWMSInfo(map,wmsSource){
    // return new Promise((resolve,reject)=>{
     var eventKey =   map.on('singleclick', function(evt) {
            let view = map.getView()
            var viewResolution = /** @type {number} */ (view.getResolution());
            var url = wmsSource.getGetFeatureInfoUrl(
              evt.coordinate, viewResolution, 'EPSG:4326',
              {'INFO_FORMAT': 'application/json'});
            if (url) {
                axios.get(url).then(res=>{
                    console.log(res)
                    // resolve(res.data.features,eventKey)
                }).catch(error=>{
                    console.log(error)
                    // reject("查询失败")
                })
            }
        });
        // resolve(eventKey)
        console.log("点击函数",eventKey)
        return eventKey
    // }) 
}

/**
 * 说明：图层控制，用于控制图层的显示与隐藏
 * @param {*} layer          必填，对象，图层名称
 * @param {*} visible        必填，布尔，true表示图层显示，false表示图层的关闭
 */
export function LayersControle(layer,visible = false){
    layer.setVisible(visible)
}




