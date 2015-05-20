/*
* @plugin Table
* @description Table
* @time 2015-01-12 pm
* @author 陈舟
* @update 2015-01-12
*/

//渲染模板
var tplFactory = {
	  listItemTpl:  '<li class="item">'+
      '<img src="<%=ImgURL%>" data-id="<%=InfoId%>"></img>'+
      '<div>'+
      '<h5 class="fn"><%=Title%></h5>'+
      '<ul><li><span><%=Dept%></span></li><li><span><%=Author%></span><span><%=SendDate%></span></li></ul>'+
      '</div>'+
    '</li>'
};

(function ($) {
    $.fn.TableBox = function () {
        var me = this,
            config = {
        	  width: 980,
        	  height: 500,
              wrapper: window,
        	  columnSetId: 10001,
              columnIds:[],
              sTitle: '群众路线实践活动',
              count: 6,
              callBack: null
            },
            infoList = [],
            sFragmentHtml = '',
            tabsContent = null;

        init = function(cfg, container){ 
        	 $.extend(config, cfg);
        	 
        	 var callback = function(data){
        		 if(data) columnlist = data;
        		 renderList(container);
        	 };
        	 
        	 //Table 栏目
        	 getInfoListData(config.columnSetId, config.count, callback);	 
        };

        //信息列表数据
        getInfoListData = function(columnId, count, cb){
        	try{
       		    $.ajax({
                    type: 'GET',
                    url: 'IRSPortalHttpHandler.ashx?method=GetInfoList',
                    // data to be added to query string:
                    data: { columnId: columnId, infoType: 'list', count: count },
                    dataType: 'json',
                    timeout: 3000,
                    context: $('body'),
                    success: function (data) {
                        if(data && typeof(cb) === 'function') {
                        	infoList = data;
                        	cb(container);
                        }
                    },
                    error: function (xhr, type) {}
                });
       	    } catch(ex){
       	      infoList.push(
       	        {InfoId: 1, BtnStyle:'basic', Title:'深夜食堂是个什么东西，是吃饭的地方吗', ImgURL:'images/1.jpg',
       	        	Author:'陆小凤', Dept:'协同事业部', SendDate:'2015-1-7'},
       	        {InfoId: 4, BtnStyle:'small', Title:'新中国成立以来，有哪些法律专业学生必须或者值得了解的案例', ImgURL:'images/4.jpg',
       	            	Author:'花满楼', Dept:'协同事业部', SendDate:'2015-1-12'},
       	        {InfoId: 5, BtnStyle:'enterprise', Title:'为什么知乎比豆瓣和人人高大上',  ImgURL:'images/5.jpg',
       	            	Author:'陈舟', Dept:'西门吹雪', SendDate:'2015-1-3'}
       	      );
      	 
           	  if(typeof(cb) === 'function') cb();
       	    } 	
        };
        
        renderList = function (container) {
          var sFragmentHtml = '',
    	      width = config.width,
	          height = config.height,
    	      slistHtml = '',
    	      listTpl = _.template(tplFactory.listItemTpl);
    	//width: '+width+'px;
    	  sFragmentHtml = '<div class ="card-wapper" style="height: '+height+'px;"><h3>'+
    	    config.sTitle+'</h3><ol class="card">';
    	  
          for (var i = 0, len = infoList.length; i < len; i++) {
        	var item = infoList[i];  
        	//toJSON
        	slistHtml += listTpl(item);          	
          }
       
          sFragmentHtml += slistHtml + '</ol></div>';
        
          $(container || 'body').append(sFragmentHtml);
        
        };
        
        init();
        
        return {
          loadData: function (cfg, container) {
            init(cfg, container);
          }
        };
    };

    tablebox = $.fn.TableBox();

})(Zepto);
