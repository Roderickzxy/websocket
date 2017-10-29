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
				$('#login_div').html('<form action="/websocket/LogoutServlet" >login user:'+json.data+'  <input type="submit" method="post" value="logout"/></form>');
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
				$('#login_div').html('<form action="/websocket/LogoutServlet" >login user:'+content+'  <input type="submit" method="post" value="logout"/></form>');
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



