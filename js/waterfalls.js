/*
* @plugin Waterfalls
* @description Waterfalls
* @time 2015-02-24 pm
* @author 陈舟
* @update 2015-02-24
*/

//渲染模板
var waterfallsTplFactory = {
  listTpl: '<div id="waterfalls" class="waterfalls" style="">'+
    //'<h3>[=:this.config.sTitle:]</h3>'+
    '[: for (var val, i = 0, l = this.config.ulcount; i < l; i ++) { :]'+
      '<ul></ul>[: } :]'+
    '</div>',
  //medium small price catalog author[] author_intro id rating
  itemTpl: '<li class=""><div><img src="[=:this.images.large:]" alt="[=:this.title:]"></div>'+
    '<p><a>[=:this.summary.substr(0, 25):]</a></p></li>'
};

(function ($) {
  $.fn.Waterfalls = function () {
    var me = this,
      config = {
        width: '100%',
        height: 'auto',
        wrapper: window,
        columnSetId: 10001,
        sTitle: '群众路线实践活动',
        pagenumber: 0,
        start: 0,
        count: 10,
        ulcount: 4
      },
      infoList = [],
      uls = null,
      sFragmentHtml = '',
      tplRender = tppl(waterfallsTplFactory.listTpl),
      itemtplRender = tppl(waterfallsTplFactory.itemTpl);

    var init = function(cfg, container){ 
      $.extend(config, cfg);
      var data = {config: config};
      sFragmentHtml = tplRender(data, true);
      $(container || 'body').append(sFragmentHtml);  

      var callback = function(data){
        uls = $('#waterfalls ul');

        if(data) infoList = data;
        renderList(container);     

        initEvent();

      };
      
      getListData(config.columnSetId, config.count, callback);	 
    },

    //信息列表数据
    getListData = function(columnId, count, cb){
      try{ 
       	ajax({
          type: 'jsonp',
          //url: "https://api.douban.com/v2/movie/search?apikey=0c9ca568e0e58e2025d5f03aa2b0aa60&tag=%E5%96%9C%E5%89%A7",
          url: "https://api.douban.com/v2/book/search?apikey=0c9ca568e0e58e2025d5f03aa2b0aa60&tag=%E7%A7%91%E6%8A%80",
          data: { start : config.start, count : config.count },  //dataType: 'json',
          timeout: 3000,
          cbName: 'callback',
          success: function (data) {
            config.start = (config.pagenumber++) * config.count;
            /*  count: 2 start: 0 title: "带有标签 "喜剧" 的条目 total: 200  */
            if(data && data.books && typeof(cb) === 'function') cb(data.books);
          },
          error: function (xhr, type) {}
        });
      } catch(ex){ } 
    },
        
    renderList = function (container) {
      for(var i=0, len=infoList.length; i<len; i++){
        var item = infoList[i];
        sFragmentHtml = itemtplRender(item, true); 

        uls.sort(function (ul1, ul2) {
          return ul1.offsetHeight - ul2.offsetHeight;
        });

        uls.first().append(sFragmentHtml);
      } 
    },
    initEvent = function(){
      var scrollfn = window.onscroll;

      if(typeof scrollfn === 'function'){  
        window.onscroll = window.onresize = function () {
          var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
          scrollfn.call(this);

          if (document.body.scrollHeight - document.documentElement.clientHeight - scrollT < 380) {
            var callback = function(data){
              if(data) infoList = data;
              renderList(container);  
            };
      
            getListData(config.columnSetId, config.count, callback);
          }
        };
      }
    },

    ajax = function (json) {
      var timer = null;
      json = json || {};

      if (!json.url) {
        console.log('用法不符合规范，地址必须写');
        return;
      }

      json.type = json.type || 'get';
      json.data = json.data || {};
      json.time = json.time || 5;
      json.cbName = json.cbName || 'cb';

      if (window.XMLHttpRequest) {
        var oAjax = new XMLHttpRequest();
      } else {
        var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
      }

      switch (json.type.toLowerCase()) {
        case 'get':
          oAjax.open('GET', json.url + '?' + json_url(json.data), true);
          oAjax.send();
          oAjax.onreadystatechange = ajax_fn;
          break;
        case 'post':
          oAjax.open('POST', json.url, true);
          oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          oAjax.send(json_url(json.data));
          oAjax.onreadystatechange = ajax_fn;
          break;
        case 'jsonp':
          var fnName = 'my_jsonp' + Math.random();
          fnName = fnName.replace('.', '');
          window[fnName] = function (json_data) {
            debugger
            clearTimeout(timer);
            json.success && json.success(json_data);

            oHead.removeChild(oS);
          }

          json.data[json.cbName] = fnName;

          var oS = document.createElement('script');
          oS.type = "text/javascript";
          oS.src = json.url + '&' + jsonUrl(json.data);
          var oHead = document.getElementsByTagName('head')[0];
          oHead.appendChild(oS);
          break;
      }

      json.loadingFn && json.loadingFn();

      function ajax_fn() {
        if (oAjax.readyState == 4) {
          if (oAjax.status >= 200 && oAjax.status < 300 || oAjax.status == 304) {
            clearTimeout(timer);
            json.success && json.success(oAjax.responseText);
          } else {
            clearTimeout(timer);
            json.error && json.error(oAjax.status);
          }
        }
      }

      timer = setTimeout(function () {
        console.log('网络超时');
        oAjax.onreadystatechange = null;
      }, json.timeout);
    },

    jsonUrl = function (json) {
      var arr = [];
      json.t = Math.random();

      for (var name in json) arr.push(name + '=' + json[name]);

      return arr.join('&');
    };
        
    init();
        
    return {
      loadData: function (cfg, container) {
        init(cfg, container);
      }
    };
  };

  waterfalls = $.fn.Waterfalls();

})(Zepto);
