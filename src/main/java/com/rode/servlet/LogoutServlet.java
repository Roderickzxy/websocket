package com.rode.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LogoutServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 402065045008947332L;
	private static final String LOGIN_USERNAME = "LOGIN_USER";

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("logout user name: " + req.getSession().getAttribute(LOGIN_USERNAME));
		req.getSession().removeAttribute(LOGIN_USERNAME);
		resp.sendRedirect("/websocket/index.jsp");
	}
}
