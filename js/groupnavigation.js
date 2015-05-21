/*
* @plugin Grouping navigation
* @description 分组导航
* @time 2015-02-16 am
* @author 陈舟
* @update 2015-01-16
*/

//tppl渲染模板
var navigationTplFactory = {
  navgrouptpl: '<div id="navgroup" class="wrap wrap-navgroup clearfix"><div class="navgroup-left">'+
    '<div id="group1" class="container"><div id="group1_left" class="aside">'+
    '<div><div class="head"><span>栏目导航</span></div><div><span>深化改革</span></div></div>'+
		'</div>'+
		'<div id="group1_main" class="main"><div id="" class="slider">'+
			'<div class="controller"><a id="stv_left" class="navpng nav-left"></a><a id="stv_right" class="navpng nav-right"></a></div>'+
			'<div id="stv_group" class="group">'+
			  '<div style="overflow: hidden; zoom: 1; float: left; width:30000px">'+
			    '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
	          '[: val = this.list[i]; :]'+
	          '<div class="item"><a href="#" target="_blank" title="[=:val.Title:]" class="item_a" onclick="">[=:val.Title:]'+
	            '<span class="">[=:val.Author:]</span>'+
			        '<span class="">[=:val.Dept:]</span>'+
	          '</a></div>'+
	        '[: } :]'+
			'</div></div></div></div>'+
			'</div></div>'+

    '<div class="navgroup-right">'+
    '<div class="header"><ul class="clearfix">'+
      '<li class="selected"><a href="javascript:;">全部(13)</a></li>'+
      '<li><a href="javascript:;"><span>公司新闻</span><em class="navpng"></em></a></li>'+
      '</ul></div>'+
    '<div class="main">'+
      '<div class="slider">'+
        '<a href="javascript:;" id="group2-left" class="navpng main-left"></a>'+
        '<a href="javascript:;" id="group2-right" class="navpng main-right"></a>'+
        '<div class="container"><div style="overflow: hidden; zoom: 1; width: 32766px;">'+
          '<div style="overflow: hidden; zoom: 1; float: left;">'+  
            '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
            '[: val = this.list[i]; :]'+
            '<div class="item navpng clearfix"><a href="javascript:;" title="[=:val.Title:]" class="">'+
              '<span class="">[=:val.Dept:]</span></a>'+
              '<div><span class="">[=:val.Title:]</span></div>'+
              '<div class="item-hover">'+
                '<div class="tag clearfix">'+
                  '<a href="javascript:;">关注</a>'+
                  '<a href="javascript:;">统计</a>'+
                  '<a href="javascript:;">回复</a>'+
                  '<a href="javascript:;">浏览</a>'+      
                '</div>'+
                '</div></div>'+
          '[: } :]'+
              
        '</div></div></div></div></div>'+

      '</div>',

  navTpl: '<div class="" style="width:[=:this.config.width:]px; height:[=:this.config.height:]px;"><ul>'+
	        '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
	          '[: val = this.list[i]; :]'+
	          '<li>[=:val.Title:]</li>'+
	        '[: } :]'+
	      '</ul>'
};

(function ($) {
  $.fn.navigationGroup = function () {
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
      tplRender = tppl(navigationTplFactory.navgrouptpl),
      infoList = [],
      sFragmentHtml = '';

    var init = function(cfg, container){ 
      $.extend(config, cfg);
       	 
      var callback = function(data){
        if(data) infoList = data;
       	render(container);

       	initEvent();
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
      var group1 = $('#group1');
            
      group1.on('mouseover', function(event){
        var evt = event|| window.Event,
     	    target = evt.target || evt.srcElement;          
                  
        if (window.event) {  
           evt.cancelBubble=true;  
        } else {  
           evt.stopPropagation();  
        }          
     	  //debugger

        $('#group1_main').addClass('main_slideRight');

     	  group1.css('width', '70em');  
      });
      group1.on('mouseout', function(event){
        var evt = event|| window.Event,
       	  target = evt.target || evt.srcElement;
       	          
       	  group1.css('width', '12.5em');  
       	  $('#group1_main').removeClass('main_slideRight');
      }); 

      var group2left = $('#group2-left');
      group2left.on('click', function(event) {
        // body...
      });
      var group2right = $('#group2-right');
      group2right.on('click', function(event) {
        // body...
      });

    };
            
    //init({}, '#container');
    init({}, '#nav-column');
        
    return {
      loadData: function (cfg, container) {
        init(cfg, container);
      }
    };
  };

  navigationGroup = $.fn.navigationGroup();

})(Zepto);
