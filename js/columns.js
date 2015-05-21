/*
* @plugin Grouping column
* @description 分组栏目
* @time 2015-02-16 am
* @author 陈舟
* @update 2015-01-16
*/

//tppl渲染模板
var columnTplFactory = {
  columntpl: '<div class="wrap_305_305_350 clearfix"><div class="aside"><div class="column">'+
    '<div class="cln_head">'+
      '<h4 class="cln_title"><a href="javascript:;">通过公告</a></h4>'+
      '<div class="cln_links"><a href="javascript:;">通知</a><span></span><a href="javascript:;">公告</a><span></span></div>'+
      '<a href="javascript:;" class="navpng cln_down" data-button="11"></a>'+
    '</div>'+
    '<div class="cln_main" data-column="11" style="display: block;">'+
      '<ul class="cln_list">'+
      '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
        '[: val = this.list[i]; :]'+
        '<li><a href="javascript:;">[=:val.Title:]</a></li>'+
      '[: } :]'+
      '</ul><ul class="cln_list mt18 cln_other" data-column="112" style="display: none;">'+
      '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
        '[: val = this.list[i]; :]'+
        '<li><a href="javascript:;">[=:val.Title:]</a></li>'+
      '[: } :]'+
      '</ul></div></div>'+
    
    '<div class="column mt20">'+
    '<div class="cln_head">'+
      '<h4 class="cln_title"><a href="javascript:;">最新要闻</a></h4>'+
      '<div class="cln_links"><a href="javascript:;">集团</a><span></span><a href="javascript:;">行业</a><span></span></div>'+
      '<a href="javascript:;" class="navpng cln_down" data-button="12"></a>'+
    '</div>'+
    '<div class="cln_main" data-column="12" style="display: block;">'+
      '<ul class="cln_list">'+
      '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
        '[: val = this.list[i]; :]'+
        '<li><a href="javascript:;">[=:val.Title:]</a></li>'+
      '[: } :]'+
      '</ul><ul class="cln_list mt18 cln_other" data-column="122" style="display: none;">'+
      '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
        '[: val = this.list[i]; :]'+
        '<li><a href="javascript:;">[=:val.Title:]</a></li>'+
      '[: } :]'+
      '</ul></div></div></div>'+
    
    '<div class="aside"><div class="column">'+
    '<div class="cln_head">'+
      '<h4 class="cln_title"><a href="javascript:;">公司文件</a></h4>'+
      '<div class="cln_links"><a href="javascript:;">会议</a><span></span><a href="javascript:;">通知</a><span></span></div>'+
      '<a href="javascript:;" class="navpng cln_down" data-button="21"></a>'+
    '</div>'+
    '<div class="cln_main" data-column="21" style="display: block;">'+
      '<ul class="cln_list">'+
      '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
        '[: val = this.list[i]; :]'+
        '<li><a href="javascript:;">[=:val.Title:]</a></li>'+
      '[: } :]'+
      '</ul><ul class="cln_list mt18 cln_other" data-column="212" style="display: none;">'+
      '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
        '[: val = this.list[i]; :]'+
        '<li><a href="javascript:;">[=:val.Title:]</a></li>'+
      '[: } :]'+
      '</ul></div></div>'+
    
    '<div class="column mt20">'+
    '<div class="cln_head">'+
      '<h4 class="cln_title"><a href="javascript:;">群众路线</a></h4>'+
      '<div class="cln_links"><a href="javascript:;">部门</a><span></span><a href="javascript:;">集团</a><span></span></div>'+
      '<a href="javascript:;" class="navpng cln_down" data-button="22"></a>'+
    '</div>'+
    '<div class="cln_main" data-column="22" style="display: block;">'+
      '<ul class="cln_list">'+
      '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
        '[: val = this.list[i]; :]'+
        '<li><a href="javascript:;">[=:val.Title:]</a></li>'+
      '[: } :]'+
      '</ul><ul class="cln_list mt18 cln_other" data-column="222" style="display: none;">'+
      '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
        '[: val = this.list[i]; :]'+
        '<li><a href="javascript:;">[=:val.Title:]</a></li>'+
      '[: } :]'+
      '</ul></div></div></div>'+

    '<div class="main"><div class="column">'+
    '<div class="cln_head">'+
      '<h4 class="cln_title"><a href="javascript:;">深化改革</a></h4>'+
      '<div class="cln_links"><a href="javascript:;">社会</a><span></span><a href="javascript:;">行业</a><span></span></div>'+
      '<a href="javascript:;" class="navpng cln_down" data-button="31"></a>'+
    '</div>'+
    '<div class="cln_main" data-column="31" style="display: block;">'+
      '<ul class="cln_list">'+
      '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
        '[: val = this.list[i]; :]'+
        '<li><a href="javascript:;">[=:val.Title:]</a></li>'+
      '[: } :]'+
      '</ul><ul class="cln_list mt18 cln_other" data-column="312">'+
      '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
        '[: val = this.list[i]; :]'+
        '<li><a href="javascript:;">[=:val.Title:]</a></li>'+
      '[: } :]'+
      '</ul></div></div></div>'+

    '</div>'
};

(function ($) {
  $.fn.columns = function () {
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
      tplRender = tppl(columnTplFactory.columntpl),
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
      var heads = $('.cln_head a[data-button]');
      
      heads.on('click', function(e){
        var evt = event|| window.Event,
          target = evt.target || evt.srcElement,     
          data_btn = target.getAttribute('data-button'),
          curcolumncode = code = parseInt(data_btn),
          iscolumn1 = code%2===1 ? true : false,
          othercolumncode = iscolumn1 ? (code+1) : (code-1) ;
                  
        if (window.event) {  
           evt.cancelBubble = true;  
        } else {  
           evt.stopPropagation();  
        }          
        //debugger
        var btn = $('.cln_head a[data-button="'+data_btn+'"]');
        if(btn){
          //展开 还是 收起
          if(btn.hasClass('cln_up')){
            btn.removeClass('cln_up');
            
            $('.column div ul[data-column="'+curcolumncode+'2'+'"]').hide();
            $('.column div[data-column="'+othercolumncode+'"]').show();
            $('.column div ul[data-column="'+othercolumncode+'2'+'"]').hide();

          }else{
            btn.addClass('cln_up');

            $('.column div[data-column="'+curcolumncode+'"]').show();
            $('.column div ul[data-column="'+curcolumncode+'2'+'"]').show();
            $('.column div[data-column="'+othercolumncode+'"]').hide();
          }
        }

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

  columns = $.fn.columns();

})(Zepto);
