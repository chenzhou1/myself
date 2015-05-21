/*
* @plugin Tab box
* @description Tab 组件
* @time 2015-01-05 pm
* @author 陈舟
* @update 2015-01-07
*/

//渲染模板
var tabTplFactory = {
  columnTpl: '<div class="tab" style="width:[=:this.config.width:]px; height:[=:this.config.height:]px;">'+
    '<div class="tabNav">'+
    '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
      '[: val = this.list[i]; :]'+
      '<span id="[=:val.Id:]" class="[=:val.klassName:]"><a href="#tab[=:val.InfoId:]_content">[=:val.columnName:]</a></span>'+
    '[: } :]'+
    '</div><div class="tabContent">'+
    '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
      '[: val = this.list[i]; :]'+
      '<div id="tab[=:val.Id:]_content" class="[=:val.klassName:]"></div>[: } :]'+
    '</div></div>',
 
	listTpl: '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
      '[: val = this.list[i]; :]'+
      '<section id="tabList[=:val.InfoId:]" class="list-item">'+
        '<h3>[=:val.Title:]</h3><div><span>[=:val.Author:]</span><span>[=:val.Dept:]</span><span>[=:val.Published:]</span></div>'+
      '</section>[: } :]'
};

(function ($) {
  $.fn.TabBox = function () {
    var me = this,
      config = {
        width: 460,
        height: 360,
        wrapper: window,
        columnSetId: 10001,
        columnIds:[],
        count: 6,
        setTime: 0,
        callBack: null
      },
      columnlist=[],
      infoList=[],
      sFragmentHtml = '',
      tabsContent = null,
      tplRender = tppl(tabTplFactory.listTpl)
      columntplRender = tppl(tabTplFactory.columnTpl);

    var init = function(cfg, container){ 
      $.extend(config, cfg);
        	 
      var callback = function(data){
        if(data) columnlist = data;
        render(container);
        		 
        initEvent();
        //那些栏目，加载多少条数据
        var randerListCB = function(container){
          renderList(container);
        };
        for(var i=0, len = columnlist.length; i<len; i++){
          getInfoListData(columnlist[i].Id, config.count, randerListCB);
        }
      };
        	 
      //Tab 栏目组
      getGroupData(config.columnSetId, callback);     	   	 
    },
        
    //栏目分组数据
    getGroupData = function(columnSetId, cb){
      try{
       	$.ajax({
          type: 'GET', //url: 'IRSPortalHttpHandler.ashx?method=GetGroupData',
          url: 'data/columnList.json',
          // data to be added to query string:
          //data: { columnSetId: columnSetId, boxType: 'tab' },
          dataType: 'json',
          timeout: 3000,
          context: $('body'),
          success: function (data) {
            
            if(data && typeof(cb) === 'function') cb(data[0]);     
          },
          error: function (xhr, type) {
            debugger 
          }
        });
      } catch(ex){}	
    },
        
    //信息列表数据
    getInfoListData = function(columnId, count, cb){
      var container = '#tab'+columnId+'_content';
      infoList = [];
        	
      try{
       	$.ajax({
          type: 'GET', //url: 'IRSPortalHttpHandler.ashx?method=GetInfoList',
          url: 'data/columnList.json',
          // data to be added to query string:
          //data: { columnId: columnId, infoType: 'list', count: count },
          dataType: 'json',
          timeout: 3000,
          context: $('body'),
          success: function (data) {
            if(data && typeof(cb) === 'function')	{
              infoList = data[1];
              cb(container);
            }
          },
          error: function (xhr, type) {} 
        });
      } catch(ex){ }      	
    },
        
    render = function (container) {
      var data = {
        config: config, 
        list: columnlist };

      sFragmentHtml = columntplRender(data, true); 
            
      $(container || 'body').append(sFragmentHtml);
    },
        
    renderList = function (container) {
      var data = {
        config: config, 
        list: infoList };

      sFragmentHtml = tplRender(data, true); 

      $(container).append(sFragmentHtml);
    },
        
    initEvent = function(){  
      tabsContent = $('.tabContent div');
          
      $('.tabNav span').on('mouseover', function(event){
        var evt = event|| window.Event,
     	    target = evt.target || evt.srcElement;
     	         
        var tabId = target.id,
          parent = target.parentNode,
          spanEL = target;
              
        if(target['nodeName']=='SPAN'){
          tabId = target.id;
        }else if(parent['nodeName']=='SPAN'){
          tabId = parent.id;
          spanEL = parent;
        }
              
        var tabList= spanEL.parentNode.childNodes;
        var len2 = tabList.length;
        for(var j = 0; j < len2; j++) {
          tab = tabList[j];
          tab.className = (tab.id == tabId) ? 'current' : '';

          var content = tabsContent[j];
          if (content && tab.id == tabId) content.className = 'current';
          else content.className = '';         
        }
              
      });
             		                          	
    };
        
    init({}, '#container');
        
    return {
      loadData: function (cfg, container) {
        init(cfg, container);
      }
    };
  };

  tabbox = $.fn.TabBox();

})(Zepto);
