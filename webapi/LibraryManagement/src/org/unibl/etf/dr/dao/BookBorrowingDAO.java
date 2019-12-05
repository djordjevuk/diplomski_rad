package org.unibl.etf.dr.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;

import org.json.JSONArray;
import org.json.JSONObject;
import org.unibl.etf.dr.dto.BookBorrowing;

public class BookBorrowingDAO {

	private static ConnectionPool connectionPool = ConnectionPool.getConnectionPool();

	private static final String SELECT_ALL_BOOK_BORROWING = "select bb.*, m.numberOfMembershipCard, m.name, m.surname, b.title from book_borrowing as bb inner join member as m on bb.idMember = m.id inner join book as b on bb.idBook = b.id where bb.deleted = ?;";
	private static final String INSERT_BOOK_BORROWING = "insert into book_borrowing(idMember, idBook, dateOfBorrowing, dateOfReturning, returned) values(?,?,?,?,?);";
	private static final String UPDATE_BOOK_BORROWING = "update book_borrowing set idMember=?, idBook=?, dateOfBorrowing=?, dateOfReturning=?, returned=? where id=?;";
	private static final String DELETE_BOOK_BORROWING = "update book_borrowing set deleted=? where id=?;";
	private static final String SELECT_BOOK_BORROWING_WITH_ID = "select bb.*, m.numberOfMembershipCard, m.name, m.surname, b.title from book_borrowing as bb inner join member as m on bb.idMember = m.id inner join book as b on bb.idBook = b.id where bb.id=?;";

	public static JSONArray selectAllBookBorrowing() {
		JSONObject json = null;
		JSONObject data = null;
		JSONArray array = new JSONArray();
		Connection conn = null;
		ResultSet rs = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		conn = connectionPool.getConnection();
		Object parametri[] = { false };
		PreparedStatement ps = DAOUtil.preparedStatement(conn, SELECT_ALL_BOOK_BORROWING, false, parametri);
		try {
			rs = ps.executeQuery();
			while (rs.next()) {
				json = new JSONObject();
				data = new JSONObject();
				data.put("id", rs.getInt("id"));
				data.put("idMember", rs.getString("idMember"));
				data.put("idBook", rs.getString("idBook"));
				data.put("dateOfBorrowing", sdf.format(rs.getDate("dateOfBorrowing")));
				if (rs.getDate("dateOfReturning") != null){
					data.put("dateOfReturning", sdf.format(rs.getDate("dateOfReturning")));
				}
				else{
					data.put("dateOfReturning", JSONObject.NULL);
				}
				data.put("returned", rs.getBoolean("returned"));
				data.put("memberOfLibrary", rs.getString("m.numberOfMembershipCard") + " - " + rs.getString("m.name")
						+ " " + rs.getString("m.surname"));
				data.put("title", rs.getString("b.title"));
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

	public static int insertBookBorrowing(BookBorrowing bookBorr) {
		Connection conn = null;
		conn = connectionPool.getConnection();
		Object parametri[] = { bookBorr.getIdMember(), bookBorr.getIdBook(), bookBorr.getDateOfBorrowing(),
				bookBorr.getDateOfReturning(), bookBorr.isReturned() };
		int generatedId = 0;
		PreparedStatement ps = DAOUtil.preparedStatement(conn, INSERT_BOOK_BORROWING, true, parametri);
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

	public static int updateBookBorrowing(BookBorrowing bookBorr) {
		Connection conn = null;
		conn = connectionPool.getConnection();
		Object parametri[] = { bookBorr.getIdMember(), bookBorr.getIdBook(), bookBorr.getDateOfBorrowing(),
				bookBorr.getDateOfReturning(), bookBorr.isReturned(), bookBorr.getId() };
		int flagSuccess = 0;
		PreparedStatement ps = DAOUtil.preparedStatement(conn, UPDATE_BOOK_BORROWING, true, parametri);
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

	public static int deleteBookBorrowing(int bookBorrId) {
		Connection conn = null;
		conn = connectionPool.getConnection();
		Object parametri[] = { true, bookBorrId };
		int flagSuccess = -1;
		PreparedStatement ps = DAOUtil.preparedStatement(conn, DELETE_BOOK_BORROWING, true, parametri);
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

	public static JSONObject selectBookBorrowingWithId(int id) {
		JSONObject json = null;
		JSONObject data = null;
		Connection conn = null;
		ResultSet rs = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		conn = connectionPool.getConnection();
		Object parametri[] = { id };
		PreparedStatement ps = DAOUtil.preparedStatement(conn, SELECT_BOOK_BORROWING_WITH_ID, false, parametri);
		try {
			rs = ps.executeQuery();
			if (rs.next()) {
				json = new JSONObject();
				data = new JSONObject();
				data.put("id", rs.getInt("id"));
				data.put("idMember", rs.getString("idMember"));
				data.put("idBook", rs.getString("idBook"));
				data.put("dateOfBorrowing", sdf.format(rs.getDate("dateOfBorrowing")));
				if (rs.getDate("dateOfReturning") != null){
					data.put("dateOfReturning", sdf.format(rs.getDate("dateOfReturning")));
				}
				else{
					data.put("dateOfReturning", JSONObject.NULL);
				}
				data.put("returned", rs.getBoolean("returned"));
				data.put("memberOfLibrary", rs.getString("m.numberOfMembershipCard") + " - " + rs.getString("m.name")
						+ " " + rs.getString("m.surname"));
				data.put("title", rs.getString("b.title"));
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
