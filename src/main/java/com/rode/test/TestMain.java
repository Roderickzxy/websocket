package com.rode.test;

import java.net.UnknownHostException;

import org.java_websocket.WebSocketImpl;

import com.rode.websocket.WebSocket;

/**
 * The test class
 * 
 * @author Roderick
 */
public class TestMain {
	public static void main(String[] args) throws InterruptedException {
		System.out.println("开始启动websocket");
		WebSocketImpl.DEBUG = false;
		int port = 8888; // 端口随便设置，只要不跟现有端口重复就可以
		WebSocket s = null;
		try {
			s = new WebSocket(port);
		} catch (UnknownHostException e) {
			System.out.println("启动websocket失败！");
			e.printStackTrace();
		}
		s.start();
		System.out.println("启动websocket成功！");
	}
}
