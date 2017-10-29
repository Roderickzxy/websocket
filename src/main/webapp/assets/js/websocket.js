/**
 * * 申请一个WebSocket对象，参数是需要连接的服务器端的地址， * 同http协议使用http://开头一样， *
 * WebSocket协议的URL使用ws://开头， * 另外安全的WebSocket协议使用wss://开头 * 创建人：晓枫 创建时间
 * 2016-8-18
 */

var ws = new WebSocket("ws://127.0.0.1:18888");
window.onload=function(){ 
	check_status();
};
ws.onopen = function()// 当websocket创建成功时，即会触发onopen事件
{
};
ws.onmessage = function(evt)// 当客户端收到服务端发来的消息时，会触发onmessage事件，参数evt.data中包含server传输过来的数据
{
	if(evt.data.indexOf('SYS:')==0){
		$("#span").append(evt.data.substring(4)+"</br>");
	}else{
		$('#chat_content').append(evt.data.substring(5)+"</br>");
	}
};
ws.onclose = function(evt)// 当客户端收到服务端发送的关闭连接的请求时，触发onclose事件
{
	alert("connection interrupted!");
};
ws.onerror = function(evt)// 如果出现连接，处理，接收，发送数据失败的时候就会触发onerror事件
{
	alert("WebSocketError!");
};
function check_status(){
	$.ajax({
		url:'/websocket/LoginServlet',
		type: 'GET',
		async:false,
		success:function(json){
			if(json.code==200){
				$('#login_div').html('<form action="/websocket/LogoutServlet" >login user: <span id="user_name">'+json.data+'</span>  <input type="submit" method="post" value="logout"/></form>');
				$('#system_msg').show();
				$('#chat_area').show();
				//定时任务，每1秒查看ws状态是否可发送
				sendMsg(json.data);
			}
		},
		error:function(json){
			alert('cannot connect to server, please check your network and server\'s status.');
		}
	})
}
function sendMsg(message){
	var t;
	t=setInterval(function(){ 
		if(ws.readyState == ws.OPEN) { 
			clearInterval(t);
			ws.send(message);
		} 
	}, 200); 
}
function sendChatMsg(){
	sendMsg($('#input_content').val());
	$('#input_content').val('');
}
function selectImage(){
	$('#image_select').click();
}

function changeImage(file){
	var name = $('#user_name').html();
	var date = new Date().getTime();
	$('#chat_content').append("<font style=\"color:green\">"+name+"  "+new Date().Format("yyyy-MM-dd HH:mm:ss")+"</font></br><div><img id=\""+date+"\" class=\"preview\" style=\"max-width:31%;\" src=\"<?=IMG_URL.$cost['cover'].'_s.jpg';?>\"><img src=\"assets/image/loading1.gif\"/></div><br>");
	if (file.files && file.files[0]){  
        var reader = new FileReader();  
        reader.onload = function(evt){  
	        $('#'+date).attr('src' , evt.target.result);
	    }    
        reader.readAsDataURL(file.files[0]);  
    }else{  
    	$('#'+date).attr('src' , file.value);
    } 
}
function login(){
	var content = document.getElementById("content").value;
	$.ajax({
		url:'/websocket/LoginServlet',
		data: {name:content},
		type:'POST',
		async:false,
		success: function(data){
			if(data==200){
				if (content == null || content == "") {
					ws.send("tourist");// 用于叫消息发送到服务端 注：此处为用户名
				} else {
					ws.send(content);
				}
				$('#login_div').html('<form action="/websocket/LogoutServlet" >login user:<span id="user_name">'+content+'</span>  <input type="submit" method="post" value="logout"/></form>');
				$('#system_msg').show();
				$('#chat_area').show();
			}else{
				alert('login failed. please check backend logs.');
			}
		},
		error:function(data){
			alert('login failed. please check your network.');
		}
	});
}

//对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
//例子： 
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
 var o = {
     "M+": this.getMonth() + 1, //月份 
     "d+": this.getDate(), //日 
     "h+": this.getHours(), //小时 
     "m+": this.getMinutes(), //分 
     "s+": this.getSeconds(), //秒 
     "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
     "S": this.getMilliseconds() //毫秒 
 };
 if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
 for (var k in o)
 if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
 return fmt;
}

