package org.unibl.etf.dr.dao;

import java.sql.*;
import java.util.*;

public class ConnectionPool {

	private static ConnectionPool connectionPool;

	private String jdbcURL;
	private String username;
	private String password;
	private int preconnectCount;
	private int connectCount;
	private int maxIdleConnections;
	private int maxConnections;
	private Vector<Connection> freeConnections;
	private Vector<Connection> usedConnections;

	static {
		ResourceBundle bundle=PropertyResourceBundle.getBundle("org.unibl.etf.dr.dao.ConnectionPool");
		String jdbcURL=bundle.getString("jdbcURL");
		String username=bundle.getString("username");
		String password=bundle.getString("password");
		String driver=bundle.getString("driver");
		int preconnCount=0;
		int maxIdleConn=20;
		int maxConn=20;
		try {
			Class.forName(driver);
		preconnCount=Integer.parseInt(bundle.getString("preconnectCount"));
		maxIdleConn=Integer.parseInt(bundle.getString("maxIdleConnections"));
		maxConn=Integer.parseInt(bundle.getString("maxConnections"));
		connectionPool=new ConnectionPool(jdbcURL, username, password, preconnCount, maxIdleConn, maxConn);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
	}

	protected ConnectionPool(String aJdbcURL, String aUsername, String aPassword, int aPreconnectCount,
			int aMaxIdleConnections, int aMaxConnections) {
		freeConnections=new Vector<>();
		usedConnections=new Vector<>();
		jdbcURL=aJdbcURL;
		username=aUsername;
		password=aPassword;
		preconnectCount=aPreconnectCount;
		maxConnections=aMaxConnections;
		maxIdleConnections=aMaxIdleConnections;
		Connection conn=null;
		for(int i=0;i<preconnectCount;i++){
			try {
				conn=DriverManager.getConnection(jdbcURL,username,password);
				conn.setAutoCommit(true);
			} catch (SQLException e) {
				e.printStackTrace();
			}
			freeConnections.addElement(conn);
		}
		connectCount=preconnectCount;
	}

	public static ConnectionPool getConnectionPool() {
		return connectionPool;
	}
	
	public synchronized Connection getConnection(){
		Connection conn=null;
		if(freeConnections.size()>0){
			conn=(Connection)freeConnections.elementAt(0);
			freeConnections.removeElementAt(0);
			usedConnections.addElement(conn);
		}else if(connectCount<maxConnections){
			try {
				conn=DriverManager.getConnection(jdbcURL,username,password);
			} catch (SQLException e) {
				e.printStackTrace();
			}
			usedConnections.addElement(conn);
			connectCount++;
		}else{
			try {
				wait();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			conn=(Connection)freeConnections.elementAt(0);
			freeConnections.removeElementAt(0);
			usedConnections.addElement(conn);
		}
		return conn;
	}
	
	public synchronized void returnConnectionToConnectionPool(Connection aConn){
		if(aConn==null){
			return;
		}
		if(usedConnections.removeElement(aConn)){
			freeConnections.addElement(aConn);
			while(freeConnections.size()>maxIdleConnections){
				int index=freeConnections.size()-1;
				Connection conn=(Connection)freeConnections.elementAt(index);
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
				freeConnections.removeElementAt(index);
			}
		}
	}

}