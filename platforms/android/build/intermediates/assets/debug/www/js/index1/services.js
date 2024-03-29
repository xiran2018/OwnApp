angular.module('language.services', [])

.factory('getLanguage', function() {
  // Might use a resource here that returns a JSON array

  return {
    all: function() {
      return chats;
    },
    getShowLanguage: function() {

      alert("start to excute!!!!!!");
      var actionUrl = "http://10.5.0.218:55580/client/getShowLanguage.action";

      $.ajax( { // 取语言
        url : actionUrl,
        async: false,
        type : "get",
        dataType : "jsonp",
        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        jsonpCallback:"getShowLanguage",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
        error : function(data)
        {
          if(data.status=="200")
          {
            alert("请再试刷新一次");
          }
          else if(data.status=="500")
          {
            alert("服务器崩溃了!!!!");
          }
          else
          {
            alert("there is an errror!!!");
          }
        },
        success : function(data)
        {
          alert("yes,it is success!!!");
          var insertHtml=insertLanguageInPage(data);
          alert(insertHtml);
        }
      });// end of ajax
    }
  };
});


/*在相应的位置插入语言*/
function insertLanguageInPage(data)
{


  var insertHtml="<ul>";
  var len=data.length;
  for(var i=0;i<len;i++)
  {
    var tempId=data[i].id;
    var tempName=data[i].foreignerName;
    if(tempId==7)//说明是用户选择的语言的id
    {
      insertHtml="<a href='javascritp:void(0)' class='downmenu'>"+tempName+"</a>"+insertHtml;
    }
    else
    {
      //if(customerRequestPage.indexOf("?") > 0)
      //{//已经有了别的参数，需要加&
      //	insertHtml+="<li><a href='"+customerRequestPage+"&languageId="+tempId+"'>"+tempName+"</a></li>";
      //}
      //else
      //{//没有别的参数，需要加？
      //	insertHtml+="<li><a href='"+customerRequestPage+"?languageId="+tempId+"'>"+tempName+"</a></li>";
      //}
    }

  }

  insertHtml+="</ul>";

  return insertHtml;

}
