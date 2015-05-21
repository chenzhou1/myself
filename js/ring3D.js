/*
* @plugin Ring3D
* @description Ring3D
* @time 2015-02-21 pm
* @author 陈舟
* @update 2015-02-21
*/

//渲染模板
var ringTplFactory = {
  //<div class="plane one">1</div>
	ringTpl: '<div class="experiment-animation"><div class="ring backfaces">'+
    '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
        '[: val = this.list[i]; :]'+
        '<img class="plane" src="[=:val.ImgURL:]" width="[=:val.width:]" height="[=:val.height:]" '+
        'style="transform: rotateY([=:val.localtion:]deg) translateZ(380px);-webkit-transform: rotateY([=:val.localtion:]deg) translateZ(380px); -ms-transform: rotateY([=:val.localtion:]deg) translateZ(380px);"/>'+
    '[: } :]'+
    '</div></div>'
};

(function ($) {
  "use strict";

  $.fn.Ring3D = function () {
    var me = this,
      config = {
        width: 'auto',
        height: 'auto',
        brickMargin: 1,
        rowBaseHeight: 135,
        wrapper: me||window,
        columnSetId: 10001,
        sTitle: '群众路线实践活动'
      },
      tplRender = tppl(ringTplFactory.ringTpl),
      infoList = [],
      sFragmentHtml = '',
      iTotal = 0,
      imgDatas = [];

    var init = function(cfg, container){ 
      $.extend(config, cfg);
      
      config.wrapper.html("");
      var start_time = new Date().getTime();
    

      var callback = function(data){
        if(data) infoList = data;
        // 1. 获取图片数据，不污染原始数据
        $.extend(true, imgDatas, infoList);

        _adjustImg();

        renderRing(container);  

        var diff = new Date().getTime() - start_time;
        console.log(imgDatas);
        console.info("耗时"+diff+"ms");

      };
        	 
      getListData(config.columnSetId, config.count, callback);	 

    },

    //信息数据
    getListData = function(columnId, count, cb){
      try{
       	$.ajax({
          type: 'GET', 
          url: 'data/ring.json',  //url: 'IRSPortalHttpHandler.ashx?method=GetInfoList',
          dataType: 'json',
          timeout: 1000,
          context: $('body'),
          success: function (data) {
            if(data && typeof(cb) === 'function') cb(data);
          },
          error: function (xhr, type) {}
        });
      } catch(ex){} 	
    },
        
    _adjustImg = function() {
      // 2. 将保存的数据中的高统一为一个定值，获得其相应的宽
      $.each(imgDatas, function(index, val) {
        imgDatas[index].width = Math.floor(imgDatas[index].width * (config.rowBaseHeight / imgDatas[index].height));
        iTotal += imgDatas[index].width + 5;
        imgDatas[index].height = config.rowBaseHeight;
      });
      
      var temp = 0;
      $.each(imgDatas, function(index, val) {
        imgDatas[index].localtion = Math.floor(temp + 360 * (val.width / iTotal));
        temp = imgDatas[index].localtion;
      });

    },
  
    renderRing = function (container) {
    	var data = {
        config: config, 
        list: imgDatas };

      sFragmentHtml += tplRender(data, true); 
           
      me.append(sFragmentHtml);
    };
        
    return {
      loadData: function (cfg, container) {
        init(cfg, container);
      }
    };

  };

  var ring3D = $("#ring").Ring3D();
  ring3D.loadData();

})(Zepto);
