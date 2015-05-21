/*
* @plugin Table
* @description Table
* @time 2015-01-12 pm
* @author 陈舟
* @update 2015-01-12
*/

//渲染模板
var tableTplFactory = {
  listTpl: '<div class="table-wapper" style="width:[=:this.config.width:]px; height:[=:this.config.height:]px;">'+
    '<h3>[=:this.config.sTitle:]</h3><div class="list-box">'+
    '[: for (var val, i = 0, l = this.list.length; i < l; i ++) { :]'+
      '[: val = this.list[i]; :]'+
      '<section id="listItem[=:val.InfoId:]" class="list-item">'+
        '<a><h3>[=:val.Title:]</h3></a>'+
        '<div><span>[=:val.Author:]</span><span>[=:val.Dept:]</span><span>[=:val.Published:]</span></div></section>[: } :]'+
        '</div></div>'
};

(function ($) {
  $.fn.TableBox = function () {
    var me = this,
      config = {
        width: 310,
        height: 360,
        wrapper: window,
        columnSetId: 10001,
        columnIds:[],
        sTitle: '群众路线实践活动',
        count: 6,
        callBack: null
      },
      infoList = [],
      sFragmentHtml = '',
      tplRender = tppl(tableTplFactory.listTpl);

    var init = function(cfg, container){ 
      $.extend(config, cfg);

      var callback = function(data){
        if(data) infoList = data;
        renderList(container);       		 
      };
        	 
      //Table 栏目
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
    };
        
    init({}, '#container');
        
    return {
      loadData: function (cfg, container) {
        init(cfg, container);
      }
    };
  };

  tablebox = $.fn.TableBox();
  tablebox.loadData({}, '#carousel');

})(Zepto);
