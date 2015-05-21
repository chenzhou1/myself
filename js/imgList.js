/*
* @plugin ImgList
* @description ImgList
* @time 2015-01-16 pm
* @author 陈舟
* @update 2015-01-16
*/

//渲染模板
var imgTplFactory = {
  listTpl: '<div class ="imgList-wapper" style="height:[=:this.config.height:]px;"><ol class="imgList">'+
    '[: for (var val, i = 0, l = this.config.count; i < l; i ++) { :]'+
      '[: val = this.list[i]; :]'+
      '<li class="item"><a href="#"><img src="[=:val.ImgURL:]" data-id="[=:val.InfoId:]"></img></a><h5 class="fn">[=:val.Title:]</h5>'+
      '</li>[: } :]</ol></div>',

	InfoPopTpl: '<div class="pop-content">'+
	    '<div class="info">'+
	      '<h4><a target="_blank" href="">[=:this.Title:]</a></h4>'+
	      '<p class="meta"><span class="green">交流园地</span><span>[=:this.Dept:]</span><span>[=:this.Author:]</span></p>'+
	      '<p>[=:this.Content:]</p>'+     
	    '</div>'+
	    '<p class="comment"><span></span></p>'+      
	  '</div>'
};

(function ($) {
  $.fn.Imglist = function () {
    var me = this,
      config = {
        width: 1000,
        height: 180,
        wrapper: window,
        columnSetId: 10001,
        columnIds:[],
        sTitle: '群众路线实践活动',
        count: 5,
        callBack: null
      },
      infoList = [],
      sFragmentHtml = '',
      tplRender = tppl(imgTplFactory.listTpl),
      poptplRender = tppl(imgTplFactory.InfoPopTpl);

    var init = function(cfg, container){ 
      $.extend(config, cfg);
        	 
      var callback = function(data){
        if(data) infoList = data;
        renderList(container);
        	  
        initEvent();
      };
        	 
      getInfoListData(config.columnSetId, config.count, callback);	 
    },

    //信息列表数据
    getInfoListData = function(columnId, count, cb){
      try{
       	$.ajax({
          type: 'GET', //url: 'IRSPortalHttpHandler.ashx?method=GetInfoList',
          url: 'data/infoList.json',
          // data to be added to query string:
          //data: { columnId: columnId, infoType: 'list', count: count },
          dataType: 'json',
          timeout: 3000,
          context: $('body'),
          success: function (data) {
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
          
      $('body').append('<div class="info-pop" style="top: 0px; left: 0px;"></div>');
    },
        
    getInfo = function(infoId, cb){
      var info = infoList[3];
          
      info = infoList.filter(function(item){ 
        return item['InfoId']==infoId;
      });
          
      if(typeof(cb) === 'function') cb(info[0]);
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
        
    init({}, '#container');
        
    return {
      loadData: function (cfg, container) {
        init(cfg, container);
      }
    };
  };

  imglist = $.fn.Imglist();

})(Zepto);