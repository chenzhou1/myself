/*
* @plugin Brick Wall
* @description Brick Wall
* @time 2015-02-21 pm
* @author 陈舟
* @update 2015-02-21
*/

//渲染模板
var brickWallTplFactory = {
	brickwallTpl: '<div class=""><ul>'+
    '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
        '[: val = this.list[i]; :]'+
        '<li><img class="brick-item" style="float: left; margin:[=:this.config.brickMargin:]px" src="[=:val.ImgURL:]" width="[=:val.width:]" height="[=:val.height:]"/></li>'+
    '[: } :]'+
    '</ul></div>'
};

(function ($) {
  "use strict";

  $.fn.BrickWall = function () {
    var me = this,
      config = {
        width: 'auto',
        height: 'auto',
        brickMargin: 5,
        rowBaseHeight: 150,
        wrapper: me||window,
        columnSetId: 10001,
        sTitle: '群众路线实践活动'
      },
      tplRender = tppl(brickWallTplFactory.brickwallTpl),
      infoList = [],
      sFragmentHtml = '',
      imgDatas = [],
      rowDivs = [];

    var init = function(cfg, container){ 
      $.extend(config, cfg);
      
      config.wrapper.html("");
      var start_time = new Date().getTime();
    

      var callback = function(data){
        if(data) infoList = data;
        // 1. 获取图片数据，不污染原始数据
        $.extend(true, imgDatas, infoList);

        _adjustImgFirst();
        _addToRow();
        _adjustImgSecond();
        //_applyDataToImg();

        renderWall(container);  
        initEvent();

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
          url: 'data/brickwall.json',  //url: 'IRSPortalHttpHandler.ashx?method=GetInfoList',
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
        
    _adjustImgFirst = function() {
      // 2. 将保存的数据中的高统一为一个定值，获得其相应的宽
      $.each(imgDatas, function(index, val) {
        imgDatas[index].width = Math.floor(imgDatas[index].width * (config.rowBaseHeight / imgDatas[index].height));
        imgDatas[index].height = config.rowBaseHeight;
      });
    },
    _addToRow = function() {
      // 3. 获取容器宽度，设定一个子容器，依次叠加数据，如果宽大于容器宽度，保存。继续下一轮
      var rowImgWidth = 0;
      var rowImgArr = [];
      var margin = config.brickMargin * 2;

      for (var i = 0, len = imgDatas.length; i < len; i++) {
        if ((rowImgWidth + imgDatas[i].width + margin) <= me.width()-0.5) {
          rowImgWidth += imgDatas[i].width + margin;
          rowImgArr.push(i);
        } else {
          rowDivs.push(rowImgArr);
          rowImgArr = [];
          rowImgWidth = imgDatas[i].width + margin;
          rowImgArr.push(i);
        }
      }

      rowDivs.push(rowImgArr);
            
    },
    _adjustImgSecond = function() {
      // 4. 获取每一个子容器里面内容的宽度，按照父容器宽度比例出高度。然后再次调整每个img的宽度数据；
      var margin = config.brickMargin * 2;
           
      $.each(rowDivs, function(index, val) {
        var totle = 0;

        for (var i = val.length - 1; i >= 0; i--) totle += imgDatas[val[i]].width;

        for (var j = val.length - 1; j >= 0; j--) {
          imgDatas[val[j]].height = Math.floor((me.width()-0.5 - margin * val.length) / totle * imgDatas[val[j]].height);
          imgDatas[val[j]].width = Math.floor((me.width()-0.5 - margin * val.length) / totle * imgDatas[val[j]].width);
        };

        var totleEnd = 0;
        for (var m = val.length - 1; m >= 0; m--) totleEnd += imgDatas[val[m]].width;

        if (val.length) imgDatas[val[val.length - 1]].width += (me.width()-0.5 - margin * val.length) - totleEnd;   
      });
            
    },

    renderWall = function (container) {
    	var data = {
        config: config, 
        list: imgDatas };

      sFragmentHtml += tplRender(data, true); 
           
      me.append(sFragmentHtml);
    },
        
    initEvent = function(){
      var popInfo = $('div.info-pop');
            
      popInfo.on('mouseover', function(event){
        var evt = event|| window.Event,
     	    target = evt.target || evt.srcElement;          
                  
        if (window.event) {  
          evt.cancelBubble=true;  
        } else {  
          evt.stopPropagation();  
        }           	        
      });
        
    };
        
    //init({}, '#container');
        
    return {
      loadData: function (cfg, container) {
        init(cfg, container);
      }
    };

  };

  var brickWall = $("#brickwall").BrickWall();
  brickWall.loadData();

})(Zepto);



/*
        //计算窗口滚动条的位置
        function getScrollOffsets(w){
          w = w || window;
          
          //除了IE8及更早的版本以外, 其他浏览器都能用
          if(w.pageXOffset != null) return {x: w.pageXOffset, y: w.pageYOffset};
          
          // 对标准模式下IE（或任何浏览器）
          var d = w.document;
          if(document.compatMode == "CSS1Compat")
            return {x: d.documentElement.scrollLeft, y:d.documentElement.scrollTop};
          
          // 对怪异模式下的浏览器
          return {x: d.body.scrollLeft, y: d.body.scrollTop};
        }
        
        // 查询窗口的视口尺寸
        function getViewportSize(w){
          w = w || window;
          
          //除了IE8及更早版本以外，其他浏览器都能用
          if(w.innerWidth != null) return {w: w.innerWidth, h:w.innerHeight};
          
          // 对标准模式下的IE（或任何浏览器）
          var d = w.document;
          if(document.compatMode =="CSS1Compat")
            return { w: d.documentElement.clientWidth,
                     h: d.documentElement.clientHeight };
                  
          // 对怪异模式下的浏览器
            return {w: d.body.clientWidth, h: body.clientHeight};
        }
        
        // 元素的右上坐标
        function getElTopRight(el){
          el = el || window;
          
          var box = el.getBoundingClientRect(); //获取在视口坐标的位置
          var offsets = getScrollOffsets();
          
          return {top: box.top + offsets.y, right: box.right + offsets.x};
        }

*/