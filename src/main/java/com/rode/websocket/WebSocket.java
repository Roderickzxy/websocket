package com.rode.websocket;

import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

public class WebSocket extends WebSocketServer {

	private static final String SYSTEM_CODE = "SYS:";
	private static final String USER_CODE = "USER:";
	private static final SimpleDateFormat SF = new SimpleDateFormat(
			"yyyy-MM-dd HH:mm:ss");
	/** * 客户端发送消息到服务器时触发事件 */
	int j = 0;
	int h = 0;
	int e = 0;
	int l = 0;

	public WebSocket(InetSocketAddress address) {
		super(address);
		System.out.println("地址" + address);
	}

	public WebSocket(int port) throws UnknownHostException {
		super(new InetSocketAddress(port));
		System.out.println("端口" + port);
	}

	/** * 触发关闭事件 */
	@Override
	public void onClose(org.java_websocket.WebSocket conn, int message,
			String reason, boolean remote) {
		userLeave(conn);
	}

	/** * 触发异常事件 */
	@Override
	public void onError(org.java_websocket.WebSocket conn, Exception message) {
		System.out.println("Socket异常:" + message.toString());
		e++;
	}

	@Override
	public void onMessage(org.java_websocket.WebSocket conn, String message) {
		System.out.println("onMessage:" + message);
		if (WebSocketPool.containConnection(conn)) {
			WebSocketPool.sendMessageToUser(
					conn,
					USER_CODE + "<font style='color:green'>"
							+ WebSocketPool.getUserByKey(conn) + "  "
							+ SF.format(new Date()) + "</br>" + message
							+ "</font>");
			WebSocketPool.sendMessageToOtherUsers(
					conn,
					USER_CODE + "<font style='color:blue'>"
							+ WebSocketPool.getUserByKey(conn) + "  "
							+ SF.format(new Date()) + "</br>" + message
							+ "</font>");
		} else {
			message = message.toString();
			if (message != null) { // 将用户加入
				this.userjoin(message.toString(), conn);
			}
		}
	}

	/** * 触发连接事件 */
	@Override
	public void onOpen(org.java_websocket.WebSocket conn,
			ClientHandshake handshake) {
		System.out.println("有人连接Socket conn:" + conn);
		l++;
	}

	/** * 用户加入处理 * @param user */
	public void userjoin(String user, org.java_websocket.WebSocket conn) {
		// WebSocketPool.sendMessage(user); // 把当前用户加入到所有在线用户列表中
		String joinMsg = SYSTEM_CODE + "[系统]" + user + "上线了！";
		WebSocketPool.sendMessage(joinMsg); // 向所有在线用户推送当前用户上线的消息
		WebSocketPool.addUser(user, conn); // 向连接池添加当前的连接对象
		WebSocketPool.sendMessage(SYSTEM_CODE + "当前在线用户为："
				+ WebSocketPool.getOnlineUser().toString()); // 向当前连接发送当前在线用户的列表
	}

	/** * 用户下线处理 * @param user */
	public void userLeave(org.java_websocket.WebSocket conn) {
		String user = WebSocketPool.getUserByKey(conn);
		boolean b = WebSocketPool.removeUser(conn); // 在连接池中移除连接
		if (b) {
			String joinMsg = SYSTEM_CODE + "[系统]" + user + "下线了";
			WebSocketPool.sendMessage(joinMsg); // 向在线用户发送当前用户退出的消息
		}
	}
}
