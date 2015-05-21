/*
* @plugin Table
* @description Table
* @time 2015-01-12 pm
* @author 陈舟
* @update 2015-01-12
*/

//渲染模板
var cardTplFactory = {
  listTpl: '<div class ="card-wapper" style="height:[=:this.config.height:]px;"><ol class="card">'+  //'<h3>[=:this.config.sTitle:]</h3>'+
    '[: for (var val, i = 0, l = this.config.count; i < l; i ++) { :]'+
      '[: val = this.list[i]; :]'+
      '<li id="cardItem[=:val.InfoId:]" class="item">'+
        '<h4 class="fn">[=:val.Title:]</h4>'+
        '<ul><li>[=:val.Content:]</li><li>[=:val.Dept:]</li><li>[=:val.Author:]</li><li>[=:val.Published:]</li></ul>'+
        '<p><a class="[=:val.BtnStyle:] action">[=:val.Author:]</a></p>'+
      '</li>[: } :]</ol></div>'
};

(function ($) {
  $.fn.Card = function () {
    var me = this,
      config = {
        width: 980,
        height: 350,
        wrapper: window,
        columnSetId: 10001,
        columnIds:[],
        sTitle: '群众路线实践活动',
        count: 4,
        callBack: null
      },
      infoList = [],
      sFragmentHtml = '',
      tplRender = tppl(cardTplFactory.listTpl);

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

  card = $.fn.Card();

})(Zepto);
