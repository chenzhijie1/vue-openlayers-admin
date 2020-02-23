/**
 * 说明：该文件用于地图基本操作的函数封装
 */
/**
 * 说明：动态设置地图中心
 * @param {*} map      必填，对象，地图对象
 * @param {*} center   必填，数组，地图中心坐标
 */
 export function setMapCenter(map,center){
     //地图视图的初始参数
     var view = map.getView();
     view.setCenter(center)
 }
/**
 * 说明：动态地图显示级别函数
 * @param {*} map        必填，对象，地图对象
 * @param {*} zomm       必填，数字，地图显示级别
 */
 export function setMapZoom(map,zomm){
    //地图视图的初始参数
    var view = map.getView();
    view.setZoom(zomm)
 }
/**
 * 说明：保存地图为png图
 * @param {*} map         必填，对象，地图对象
 * @param {*} name        选填，字符串，默认导出是map.png
 */
 export function saveMapPng(map,name="map"){
     console.log("++++++++",map)
     // 实现canvas转化成图片
    map.once('postcompose', function (event) {
        var canvas = event.context.canvas;
        var MIME_TYPE = "image/png";
 
        var imgURL = canvas.toDataURL(MIME_TYPE);
        console.log(imgURL)
        var dlLink = document.createElement('a');
        dlLink.download = name+".png";
        dlLink.href = imgURL;
        dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
 
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
    });
    map.renderSync();
 }