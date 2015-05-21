/*
* @plugin Accordion Box
* @description 手风琴组件
* @time 2015-01-07 pm
* @author 陈舟
* @update 2015-01-07
*/

//渲染模板
var accordionTplFactory = {            
  listTpl: '<div class="accordion" style="width:[=:this.config.width:]px; height:[=:this.config.height:]px;">'+
    '<h3>[=:this.config.sTitle:]</h3>'+
    '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
      '[: val = this.list[i]; :]'+
      '<section id="acdn[=:val.InfoId:]" class="section">'+
        '<a href="#acdn[=:val.InfoId:]"><h4>[=:val.Title:]</h4></a>'+
          '<div><img src="[=:val.ImgURL:]"/><p>[=:val.Content:]</p>'+
            '<span>[=:val.Author:]</span><span>[=:val.Dept:]</span><span>[=:val.Published:]</span>'+
    '</div></section>[: } :]'+
    '</div>'

};

(function ($) {
  $.fn.AccordionBox = function () {
    var me = this,
      config = {
        width: 310,
        height: 380,
        sTitle: '群众路线实践活动',
        windowDom: window,
        columnIds:[1, 2, 3, 4],
        count: 5,
        setTime: 0,
        hasMask: true,
        callBack: null,
        type: 'list'
      },
      infoList = [],
      sFragmentHtml = '',
      tplRender = tppl(accordionTplFactory.listTpl);

    var init = function(cfg, container){ 
      $.extend(config, cfg);
       	 
      var callback = function(data){
        if(data) infoList = data;
       	render(container);
      };
       	 
      //那些栏目，那些字段，加载多少条数据
      getData(config.columnIds, config.count, callback);
    },
       
    getData = function(columnIds, count, cb){
      try{
      	$.ajax({
          type: 'GET',  //url: 'IRSPortalHttpHandler.ashx?method=GetInfoListForPortal',
          url: 'data/infoList.json',
          // data to be added to query string:
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
        list: infoList };
      
      sFragmentHtml += tplRender(data, true);

      $(container || 'body').append(sFragmentHtml);
    };
            
    init({}, '#container');
        
    return {
      loadData: function (cfg, container) {
        init(cfg, container);
      }
    };
  };

  accordionBox = $.fn.AccordionBox();

})(Zepto);
