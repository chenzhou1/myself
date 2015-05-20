/*
* @plugin portal news
* @description portal news
* @time 2015-03-21 pm
* @author 陈舟
* @update 2015-03-21
*/

//渲染模板
var portalTplFactory = {
  listTpl: '<div class ="imgList-wapper" style="height:[=:this.config.height:]px;"><ol class="imgList">'+
    '[: for (var val, i = 0, l = this.config.count; i < l; i ++) { :]'+
      '[: val = this.list[i]; :]'+
      '<li class="item"><a href="#"><img src="[=:val.ImgURL:]" data-id="[=:val.InfoId:]"></img></a><h5 class="fn">[=:val.Title:]</h5>'+
      '</li>[: } :]</ol></div>',

	newsTpl: '<section class="" data-layout="" data-id="">'+
	    '<div data-id="" class="">'+ 
        '<div>'+
	    '</div>'+
      '<p></p>'+
      '<ul>'+
      '</ul>'+  
	  '</section>'
};

(function ($) {
  $.fn.PortalNews = function () {
    var me = this,
      config = {
        width: 1000,
        height: 180,
        wrapper: window,
        start: 0,
        count: 10,
        callBack: null
      },
      infoList = [],
      sFragmentHtml = '',
      tplRender = tppl(portalTplFactory.newsTpl);

    var init = function(cfg, container){ 
      $.extend(config, cfg);
      window['callbackJp'] = function (json_data) {
        debugger
      };

      var callback = function(data){
        if(data) infoList = data;
        renderList(container);
        	  
        initEvent();
      };
        	 
      getDatas(config.count, callback);	 
    },

    //信息列表数据
    getDatas = function(count, cb){
      try{
       	$.ajax({
          type: 'GET',
          //url: "https://api.douban.com/v2/book/search?apikey=0c9ca568e0e58e2025d5f03aa2b0aa60&tag=%E7%A7%91%E6%8A%80",
          url: "https://api.douban.com/v2/movie/top250?&start=1&count=2&apikey=0c9ca568e0e58e2025d5f03aa2b0aa60",
          url: "https://api.douban.com/v2/movie/search?tag=喜剧&apikey=0c9ca568e0e58e2025d5f03aa2b0aa60",
          data: { start : config.start, count : config.count }, 
          dataType: 'jsonp',
          timeout: 3000,
          context: $('body'),
          jsonpCallback: 'callbackJp',
          success: function (data) {
            debugger
            config.start = (config.pagenumber++) * config.count;
            if(data && typeof(cb) === 'function') cb(data);
          },
          error: function (xhr, type) {}
        });
      } catch(ex){} 	
    },
        
    renderList = function (container) {
      var data = {
        config: config, 
        list: infoList };

      sFragmentHtml = tplRender(data, true); 
      $(container || 'body').append(sFragmentHtml);
        
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
     	    
        popInfo.show();    
      });
      popInfo.on('mouseout', function(event){
        var evt = event|| window.Event,
       	  target = evt.target || evt.srcElement;
       	          
       	  popInfo.hide();
      });
            
      $('.imgList li > a').on('mouseover', function(event){
        var evt = event|| window.Event,
       	  target = evt.target || evt.srcElement,
          infoId = target.getAttribute('data-id');
       	          
       	var callback = function(info){
       	  var offset = getElTopRight(target);
         	  popInfo.css({top: offset.top+"px", left: offset.right+"px"})
         	          
         	popInfo.html(poptplRender(info, true));
         	popInfo.show();
       	};
       	          
       	getInfo(infoId, callback);    	          
      });
              
      $('.imgList li > a').on('mouseout', function(event){
        var evt = event|| window.Event,
       	  target = evt.target || evt.srcElement;
       	          
       	popInfo.hide();   
      });
    };
          
    init({}, '#container');
        
    return {
      loadData: function (cfg, container) {
        init(cfg, container);
      }
    };
  };

  portalNews = $.fn.PortalNews();

})(Zepto);


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