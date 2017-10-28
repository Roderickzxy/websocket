package com.rode.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginServlet extends HttpServlet {

	private static final String LOGIN_USERNAME = "LOGIN_USER";
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// 获取登录页面，判断是否有登录状态，有的话直接使用该用户登录
		Object username = req.getSession().getAttribute(LOGIN_USERNAME);
		resp.setContentType("application/json;charset=utf8");
		if (req.getSession().getAttribute(LOGIN_USERNAME) != null) {
			resp.getWriter().write("{\"code\":200, \"data\":\"" + username + "\"}");
		} else {
			resp.getWriter().write("{\"code\":403}");
		}
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("login name: " + req.getParameter("name"));
		req.getSession().setAttribute(LOGIN_USERNAME, req.getParameter("name"));
		resp.setContentType("application/json;charset=utf8");
		resp.getWriter().write("200");
	}
}
