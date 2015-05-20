/*
* @plugin modal box
* @description 模态弹出框
* @time 2015-01-05 pm
* @author 陈舟
* @update 2015-01-07
*/

//渲染模板
var tplFactory = {
		listItem: '<li class=""><a href="#" target="_blank"><%=ColumnName%>|</a><%=Title%></li>',
		content: '<article id="<%=infoId%>" class="modal"><div><h2><%=Title%></h2><div><%=Content%></div><a href="#close"></a><div></article>'
};

(function ($) {
    $.fn.modalbox = function () {
        var me = this,
            config = {
                columnIds:[1, 2, 3, 4],
                count: 10,
                setTime: 0,
                callBack: null
            },
            infoList =[],
            sFragmentHtml = '';

        init = function(cfg, container){ 
        	 $.extend(config, cfg);
        	 
        	 var callback = function(data){
        		 if(data) infoList = data;
        		 render(container);
        	 };
        	 
        	 //那些栏目，那些字段，加载多少条数据
        	 getData(config.columnIds, config.count, callback);
        };
        
        getData = function(columnIds, count, cb){
        	try{
       		    $.ajax({
                    type: 'GET',
                    url: 'IRSPortalHttpHandler.ashx?method=GetInfoListForPortal',
                    // data to be added to query string:
                    data: { columnSetId: '100002', localtionUINo: '1', infoType: 'list', count: count },
                    dataType: 'json',
                    timeout: 3000,
                    context: $('body'),
                    success: function (data) {
                        debugger
                        if(data && typeof(cb) === 'function'){
                            cb(data);
                        }
                    },
                    error: function (xhr, type) {  
                   	 //
                    }
                });
       	    } catch(ex){
       		    (infoList||[]).push(
            			{infoId: 1, Title:'深夜食堂是个什么东西，是吃饭的地方吗', 
            				Content:'深夜食堂是个什么东西，是吃饭的地方吗, 深夜食堂是个什么东西，是吃饭的地方吗'},
            			{infoId: 2, Title:'长得好看是怎样一种体验，不知道', 
            			    Content:'长得好看是怎样一种体验，不知道,长得好看是怎样一种体验，不知道'},
            			{infoId: 3, Title:'公司年会什么时候开始，去看看有什么奖品', 
            			    Content:'公司年会什么时候开始，去看看有什么奖品, 公司年会什么时候开始，去看看有什么奖品'}
            	);
           	 
           	    if(typeof(cb) === 'function') cb();
       	    }
       	
        };
        
        render = function (container) {
        	var sFragmentHtml = '',
        	    tpl = _.template(tplFactory.content);
            
            for (var i = 0, len = infoList.length; i < len; i++) {
            	var item = infoList[i];
            	debugger
            	//toJSON
            	sFragmentHtml += tpl(item);
            }

            $(container || 'body').append(sFragmentHtml);
        };
        
        init();
        
        return {
            loadData: function (cfg, container) {
            	init(cfg, container);
            }
        };
    };

    modalbox = $.fn.modalbox();

})(Zepto);
