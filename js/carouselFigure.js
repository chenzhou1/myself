/*
* @plugin Carousel Figure
* @description 轮播图
* @time 2015-02-16 am
* @author 陈舟
* @update 2015-01-16
*/

//tppl渲染模板
var carouselTplFactory = {
  carouseTpl: '<div class="gallery"><ul class="fade">'+
    '[: for (var val, i = 0, l = 4; i < l; i ++) { :]'+
        '[: val = this.list[i]; :]'+
        '<li><img src="[=:val.ImgURL:]" /><i></i></li>'+
    '[: } :]'+
    '</ul><p class="indicator">'+
    '[: for (var val, i = 0, l = 4; i < l; i ++) { :]'+
        '<i></i>'+
    '[: } :]'+
    '</p></div>'
    //<div class="type"><label>轮播类型:</label><select><option>淡入淡出</option><option>3D效果</option></select></div>
};

(function ($) {
  $.fn.carouselFigure = function () {
    var me = this,
      config = {
        width: 960,
        height: 165,
        sTitle: '信息发布栏目分组导航',
        windowDom: window,
        setTime: 0,
        hasMask: true,
        callBack: null,
        type: 'list'
      },
      tplRender = tppl(carouselTplFactory.carouseTpl),
      infoList = [],
      sFragmentHtml = '';

    var init = function(cfg, container){ 
      $.extend(config, cfg);
       	 
      var callback = function(data){
        if(data) infoList = data;
       	render(container);

       	//initEvent();
      };
       	 
      //那些栏目，那些字段，加载多少条数据
      getData(config.columnIds, config.count, callback);
    },
       
    getData = function(columnIds, count, cb){
      try{
      	$.ajax({
          type: 'GET',  //url: 'IRSPortalHttpHandler.ashx?method=GetInfoListForPortal',
          url: 'data/navgroups.json',
          //data: { columnSetId: '100002', localtionUINo: '1', infoType: 'list', count: count },
          dataType: 'json',
          timeout: 3000,
          context: $('body'),
          success: function (data) {
            //debugger
            if(data && typeof(cb) === 'function') cb(data);                
          },
          error: function (xhr, type) { }
          });
        } catch(ex){}
      },
       
    render = function (container) {
      var data = {
          config: config, 
          list:infoList };

      sFragmentHtml += tplRender(data, true); 
           
      $(container || 'body').append(sFragmentHtml);
    },

    initEvent = function(){
      var type = $('.type select')[0],
        gallery = $('.gallery ul')[0],
        indicator = $('.gallery p')[0],
        css = ['fade', 'three-D'];

      type.onchange = function(){
        indicator.className = '';
        setTimeout(function(){
          gallery.className = css[type.selectedIndex];
          indicator.className = 'indicator';
        }, 10);
      }
    
    };
            
    init({}, '#carousel');

    return {
      loadData: function (cfg, container) {
        init(cfg, container);
      }
    };
  };

  carouselFigure = $.fn.carouselFigure();

})(Zepto);
