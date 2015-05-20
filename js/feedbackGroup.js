/*
* @plugin feedbackGroup
* @description feedbackGroup
* @time 2015-02-23 pm
* @author 陈舟
* @update 2015-02-23
*/

//渲染模板
var feedbackTplFactory = {
  listTpl: '<div id="irs_Feedback" class="feedback" style="">'+
    '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
      '[: val = this.list[i]; :]'+
      '<a id="[=:val.Id:]" href="javascript:;" title="[=:val.Title:]" class="btn [=:val.Cls:]" style=""><em>[=:val.Title:]</em></a>[: } :]</div>'
};

(function ($) {
  $.fn.FeedbackGroup = function () {
    var me = this,
      config = {
        width: 50,
        wrapper: window,
        count: 6,
        callBack: null
      },
      infoList = [],
      sFragmentHtml = '',
      tplRender = tppl(feedbackTplFactory.listTpl);

    var init = function(cfg){ 
      $.extend(config, cfg);

      renderFeedback();    
      initEvent();   		     	 
    },
        
    renderFeedback = function () {
      var data = {
        config: config, 
        list: [{Id:"backTop", Cls:'backtop icon-arrow-up', Title:'返回顶部'},
               {Id:"feedback", Cls:'icon-pencil', Title:'我要反馈'}] };

      sFragmentHtml = tplRender(data, true); 
   
      $('body').append(sFragmentHtml);   
    },

    initEvent = function(){
      var backTop = $('#backTop'),
        viewSize = getViewportSize(),
        timer = null,
        istop = true;
            
      backTop.on('click', function(event){
        var evt = event|| window.Event,
          target = evt.target || evt.srcElement,
          offsets = getScrollOffsets();       
        
        if (window.event) {  
           evt.cancelBubble=true;  
        } else {  
          evt.stopPropagation();
        }          
        
        timer = setInterval(function(){
          var top = document.documentElement.scrollTop||document.body.scrollTop,
              clientHeight = viewSize.h,
              ispeed = Math.floor(-top / 6);

          document.documentElement.scrollTop = document.body.scrollTop = top + ispeed;

          if(0 === top) clearInterval(timer);

          istop = true;

        }, 30);
      });

      window.onscroll = function(){
        var itop = document.documentElement.scrollTop||document.body.scrollTop,
          clientHeight = viewSize.h;

        if(itop >= clientHeight){
          backTop.css({display: 'block'});
        }else{
          backTop.css({display: 'none'});
        }
        
        if(!istop) clearInterval(timer);

        istop = false;
      };

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
    };
        
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
    };
        
    // 元素的右上坐标
    function getElTopRight(el){
      el = el || window;
          
      var box = el.getBoundingClientRect(); //获取在视口坐标的位置
      var offsets = getScrollOffsets();
          
      return {top: box.top + offsets.y, right: box.right + offsets.x};
    };
        
    init();
        
    return {
      loadData: function (cfg) {
        init(cfg);
      }
    };
  };

  feedbackGroup = $.fn.FeedbackGroup();

})(Zepto);
