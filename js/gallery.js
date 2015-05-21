/*
* @plugin img gallery
* @description 图片墙
* @time 2015-01-04 pm
* @author 陈舟
* @update 2015-01-04
*/

(function ($) {
  $.fn.ImgWall = function () {
    var me = this,
      config = {
        width: 600,
        height: 450,
        sTitle: '群众路线实践活动',
        windowDom: window,
        columnIds:[1, 2, 3, 4],
        fields:['id', 'title', 'imgURL'],
        count: 10,
        setTime: 0,
        hasMask: true,
        callBack: null,
        type: 'list'
      },
      infoList = [],
      sFragmentHtml = '';

    var init = function(cfg, container){
      $.extend(config, cfg);
        	 
      var callback = function(data){
        if(data) infoList = data;
        render(container);
      };

      //那些栏目，那些字段，加载多少条数据
      getData(config.columnIds, config.fields, config.count, callback);                  
    },
        
    getData = function(columnIds, fields, count, cb){
      try{
        $.ajax({
          type: 'GET',
          //url: 'IRSPortalHttpHandler.ashx?method=GetInfoListForPortal',
          url: 'data/imgList.json',
          // data to be added to query string:
          //data: { columnSetId: '100002', localtionUINo: '1', infoType: 'list', count: count },
          dataType: 'json',
          timeout: 3000,
          context: $('body'),
          success: function (data) {
            if(data && typeof(cb) === 'function') cb(data);
          },
          error: function (xhr, type) {   }
        });
      } catch(ex){}
        	
    },
        
    render = function (container) {
      var wallWidth = config.width,
        wallHeight = config.height;
        	
      sFragmentHtml = '<div class="img-wall" style="width: '+wallWidth+'px; height: '+wallHeight+'px;">';
      sFragmentHtml += '<h1><span>LinkWorks <abbr title="and" class="amp">&amp;</abbr> '+config.sTitle+'</span></h1>';
            
      for (var i = 0, len = infoList.length; i < len; i++) {
        var item = infoList[i],
          sclass = "large imgbox",
          sstyle = "bottom: 12px; right: 365px; -webkit-transform: rotate(10deg); transform: rotate(10deg);",
          ileftRightPitch = Math.floor(Math.random()*wallWidth),
          ionDownPitch = Math.floor(Math.random()*30),
          irotationAngle = Math.floor(Math.random()*30);
            	    
        switch(i%4){
          case 0: 
            sclass = "large imgbox";
            sstyle = "bottom: "+ionDownPitch+"px; right: "+ileftRightPitch+"px; " +
            		     "-webkit-transform: rotate("+irotationAngle+"deg); " +
            		     "transform: rotate("+irotationAngle+"deg);";
            break;
          case 1:
            sclass = "medium imgbox";
            sstyle = "top: "+ionDownPitch+"px; right: "+ileftRightPitch+"px; " +
   		    		       "-webkit-transform: rotate("+-irotationAngle+"deg); " +
   		    		       "transform: rotate("+-irotationAngle+"deg);";
            break;
          case 2:
            sclass = "small imgbox";
            sstyle = "top: "+ionDownPitch+"px; left: "+ileftRightPitch+"px; " +
   		    		       "-webkit-transform: rotate("+irotationAngle+"deg); " +
   		    		       "transform: rotate("+irotationAngle+"deg);";
            break;
          case 3:
            sclass = "imgbox";
            sstyle = "bottom: "+ionDownPitch+"px; left: "+ileftRightPitch+"px; " +
	    		           "-webkit-transform: rotate("+-irotationAngle+"deg); " +
	    		           "transform: rotate("+-irotationAngle+"deg);";
            break;
          default: break;
        }
            	
        sFragmentHtml += '<a class="'+sclass+'" style="'+sstyle+'" href="#"><img src="'+item.ImgURL+'">'+item.Title+'</a>';
      }
            
      sFragmentHtml += '</div>';

      $(container || config.windowDom.document.body).append(sFragmentHtml);
    };
        
    init({}, '#gallery');
        
    return {
      loadData: function (cfg, container) {
        init(cfg, container);
      }
    };
  };

  imgWall = $.fn.ImgWall();

})(Zepto);
