/*
* @plugin Title Scolling Box
* @description 单行标题滚动
* @time 2015-01-07 pm
* @author 陈舟
* @update 2015-01-07
*/

(function ($) {
    $.fn.TitleScollingBox = function () {
        var me = this,
            config = {
                width: 450,
                sTitle: '群众路线实践活动',
                windowDom: window,
                direction:'vertival',
                columnIds:[1, 2, 3, 4],
                count: 5,
                setTime: 0,
                hasMask: true,
                callBack: null,
                type: 'list'
            },
            infoList = [],
            boundingBox = null,
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
                   }
               });
      	    } catch(ex){
      		    (infoList||[]).push(
           			{infoId: 1, Title:'深夜食堂是个什么东西，是吃饭的地方吗', imgURL:'images/1.jpg'},
           			{infoId: 2, Title:'长得好看是怎样一种体验，不知道', imgURL:''},
           			{infoId: 3, Title:'公司年会什么时候开始，去看看有什么奖品', imgURL:'images/3.jpg'},
           			{infoId: 4, Title:'新中国成立以来，有哪些法律专业学生必须或者值得了解的案例', imgURL:'images/8.jpg'},
          			{infoId: 5, Title:'为什么知乎比豆瓣和人人高大上', imgURL:'images/9.jpg'}
           	    );
          	 
          	    if(typeof(cb) === 'function') cb();
      	    }
      	
       };
       
       render = function (container) {
         var container = container? document.getElementById(container) : document.body, //$(container || 'body'),
        	 cdiv = document.createElement('div');
        	 timer = null,
             width = config.width,
             sFragmentHtml = '<div class="" style="width: '+width+'px; position: relative; height:30px; overflow: hidden;'+
                             'border:2px solid #ff6600; margin:10px auto; background-color:#f8f8f8; padding:0 10px;">'+
                             '<ul style="position: absolute; margin:0; padding:0 10px; left:0; width:100%;">';

           for (var i = 0, len = infoList.length; i < len; i++) {
           	 var item = infoList[i];
           	 debugger
           	 sFragmentHtml +='<li style="height:30px; line-height:30px;"><span>'+item.Title+'</span></li>';
           }
           
           sFragmentHtml += '</ul></div>';
           
           cdiv.innerHTML = sFragmentHtml;
           container.appendChild(cdiv);
           
           var ul=container.getElementsByTagName('ul')[0];

           if (config.direction =="vertival") ul.style.top=0;
           else ul.style.bottom = 0;    
           
           timer = setInterval(function(){
             var h = parseInt(getStyle(cdiv, 'height')),
                 liFirst = ul.getElementsByTagName('li')[0],
                 liLast = ul.getElementsByTagName('li')[len-1];

             if(config.direction == 'vertival') {
               startMove(ul, {'top':-h}, 
                 function(){
                   var f=liFirst;
                     ul.removeChild(liFirst);
                     ul.appendChild(f);
                     ul.style.top=0;
                });
            }else {
              startMove(ul, {'bottom':-h}, 
                function(){
                  var l=liLast;
                  ul.removeChild(liLast);
                  ul.insertBefore(l, ul.getElementsByTagName('li')[0]);
                  ul.style.bottom=0;
                 })
           }                                    
         }, 3000);
           
        };
        
        function startMove(obj, json, fn){
          var flat=true;
          clearInterval(obj.timer);
          
          obj.timer = setInterval(function(){
            var iCur=0;
            for(var a in json) {
                iCur=parseInt(getStyle(obj,a));
                var speend=(json[a]-iCur)/8;
                speend = speend>0 ? Math.ceil(speend) : Math.floor(speend);
                if(iCur==json[a]) {
                    clearInterval(obj.timer);
                    fn && fn();
                }else{
                    obj.style[a]=iCur+speend+'px';
                }
            }
          }, 45)
        };

        function getStyle(obj,attr){
          if (obj.currentStyle) return obj.currentStyle[attr];
          else return getComputedStyle(obj, false)[attr];
        };
        
        init();
        
        return {
          loadData: function (cfg, container) {
            init(cfg, container);
          }
        };
    };

    titleScollingBox = $.fn.TitleScollingBox();

})(Zepto);
