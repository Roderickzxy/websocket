<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>WebSocket</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<script type="text/javascript" src="assets/js/jquery/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="assets/js/websocket.js"></script>
</head>
<body style="width: 97%;height: 97%;">
	<div id="login_div">
		username : <input type="text" id="content" name="content">
		<button onclick="login()">login</button>
	</div>
	<div id="system_msg" style="display:none;float: left;border: double;padding: 10px;width: 21%;">
		<span id="span"> </span>
	</div>
	<div id="chat_area" style="display:none;float: right;width: 75%;border: double;">
		<div id="chat_content" style="width: 99%;height: 400px;padding: 10px;"></div>
		<input id="input_content" style="float:left;width: 94%;" type="text" style="width: 96%;"/>
		<button style="width: 6%;" onclick="sendChatMsg()">send</button>
	</div>
</body>
</html>
