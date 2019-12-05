package org.unibl.etf.dr.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONObject;
import org.unibl.etf.dr.dto.Book;

public class BookDAO {

	private static ConnectionPool connectionPool = ConnectionPool.getConnectionPool();

	private static final String SELECT_BOOKS = "select * from book where deleted=?;";
	private static final String INSERT_BOOK = "insert into book(title, author, category, numberOfPages, isbn, publisher, yearPublication, about) values(?,?,?,?,?,?,?,?);";
	private static final String UPDATE_BOOK = "update book set title=?, author=? , category=?, numberOfPages=?, isbn=?, publisher=?, yearPublication=?, about=? where id=?;";
	private static final String DELETE_BOOK = "update book set deleted=? where id=?;";
	private static final String SELECT_BOOK_WITH_ID = "select * from book where id=?;";

	
	public static JSONArray selectBooks() {
		JSONObject json = null;
		JSONObject data = null;
		JSONArray array = new JSONArray();
		Connection conn = null;
		ResultSet rs = null;
		conn = connectionPool.getConnection();
		Object parametri[] = { false };
		PreparedStatement ps = DAOUtil.preparedStatement(conn, SELECT_BOOKS, false, parametri);
		try {
			rs = ps.executeQuery();
			while (rs.next()) {
				json = new JSONObject();
				data = new JSONObject();
				data.put("id", rs.getInt("id"));
				data.put("title", rs.getString("title"));
				data.put("author", rs.getString("author"));
				data.put("category", rs.getString("category"));
				data.put("numberOfPages", rs.getString("numberOfPages"));
				data.put("isbn", rs.getString("isbn"));
				data.put("publisher", rs.getString("publisher"));
				data.put("yearPublication", rs.getString("yearPublication"));
				data.put("about", rs.getString("about"));
				json.put("dataObject", data);
				array.put(json);
				json = new JSONObject();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				ps.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			connectionPool.returnConnectionToConnectionPool(conn);
		}
		return array;
	}

	public static int insertBook(Book book) {
		Connection conn = null;
		conn = connectionPool.getConnection();
		Object parametri[] = { book.getTitle(), book.getAuthor(), book.getCategory(), book.getNumberOfPages(),
				book.getIsbn(), book.getPublisher(), book.getYearPublication(), book.getAbout() };
		int generatedId = 0;
		PreparedStatement ps = DAOUtil.preparedStatement(conn, INSERT_BOOK, true, parametri);
		ResultSet rs = null;
		try {
			ps.executeUpdate();
			rs = ps.getGeneratedKeys();
			if (rs.next()) {
				generatedId = rs.getInt(1);
			}
			rs.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				ps.close();
				connectionPool.returnConnectionToConnectionPool(conn);
				return generatedId;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return generatedId;
	}

	public static int updateBook(Book book) {
		Connection conn = null;
		conn = connectionPool.getConnection();
		Object parametri[] = { book.getTitle(), book.getAuthor(), book.getCategory(), book.getNumberOfPages(),
				book.getIsbn(), book.getPublisher(), book.getYearPublication(), book.getAbout(), book.getId() };
		int flagSuccess = 0;
		PreparedStatement ps = DAOUtil.preparedStatement(conn, UPDATE_BOOK, true, parametri);
		try {
			flagSuccess = ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				ps.close();
				connectionPool.returnConnectionToConnectionPool(conn);
				return flagSuccess;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return flagSuccess;
	}
	
	public static int deleteBook(int bookId) {
		Connection conn = null;
		conn = connectionPool.getConnection();
		Object parametri[] = { true, bookId};
		int flagSuccess = -1;
		PreparedStatement ps = DAOUtil.preparedStatement(conn, DELETE_BOOK, true, parametri);
		try {
			flagSuccess = ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				ps.close();
				connectionPool.returnConnectionToConnectionPool(conn);
				return flagSuccess;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return flagSuccess;
	}
	
	public static JSONObject selectBookWithId(int id) {
		JSONObject json = null;
		JSONObject data = null;
		Connection conn = null;
		ResultSet rs = null;
		conn = connectionPool.getConnection();
		Object parametri[] = { id };
		PreparedStatement ps = DAOUtil.preparedStatement(conn, SELECT_BOOK_WITH_ID, false, parametri);
		try {
			rs = ps.executeQuery();
			if(rs.next()) {
				json = new JSONObject();
				data = new JSONObject();
				data.put("id", rs.getInt("id"));
				data.put("title", rs.getString("title"));
				data.put("author", rs.getString("author"));
				data.put("category", rs.getString("category"));
				data.put("numberOfPages", rs.getString("numberOfPages"));
				data.put("isbn", rs.getString("isbn"));
				data.put("publisher", rs.getString("publisher"));
				data.put("yearPublication", rs.getString("yearPublication"));
				data.put("about", rs.getString("about"));
				json.put("dataObject", data);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				ps.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			connectionPool.returnConnectionToConnectionPool(conn);
		}
		return json;
	}
}
