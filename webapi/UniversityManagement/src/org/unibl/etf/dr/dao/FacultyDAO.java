package org.unibl.etf.dr.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONObject;
import org.unibl.etf.dr.dto.Faculty;

public class FacultyDAO {

	private static ConnectionPool connectionPool = ConnectionPool.getConnectionPool();

	private static final String SELECT_FACULTIES = "select * from faculty where deleted=?;";
	private static final String INSERT_FACULTY = "insert into faculty(name, address, established, telephone, webSite) values (?,?,?,?,?);";
	private static final String UPDATE_FACULTY = "update faculty set name=?, address=?, established=?, telephone=?, webSite=? where id=?;";
	private static final String DELETE_FACULTY = "update faculty set deleted=? where id=?;";
	private static final String SELECT_FACULTY_WITH_ID = "select * from faculty where id=?;";

	public static JSONArray selectFaculties() {
		JSONObject json = null;
		JSONObject data = null;
		JSONArray array = new JSONArray();
		Connection conn = null;
		ResultSet rs = null;
		conn = connectionPool.getConnection();
		Object parametri[] = { false };
		PreparedStatement ps = DAOUtil.preparedStatement(conn, SELECT_FACULTIES, false, parametri);
		try {
			rs = ps.executeQuery();
			while (rs.next()) {
				json = new JSONObject();
				data = new JSONObject();
				data.put("id", rs.getInt("id"));
				data.put("name", rs.getString("name"));
				data.put("address", rs.getString("address"));
				data.put("established", rs.getString("established"));
				data.put("telephone", rs.getString("telephone"));
				data.put("webSite", rs.getString("webSite"));
				data.put("facultyName", rs.getString("name"));
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

	public static int insertFaculty(Faculty faculty) {
		Connection conn = null;
		conn = connectionPool.getConnection();
		Object parametri[] = { faculty.getName(), faculty.getAddress(), faculty.getEstablished(), faculty.getTelephone(), faculty.getWebSite() };
		int generatedId = -1;
		PreparedStatement ps = DAOUtil.preparedStatement(conn, INSERT_FACULTY, true, parametri);
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

	public static int updateFaculty(Faculty faculty) {
		Connection conn = null;
		conn = connectionPool.getConnection();
		Object parametri[] = { faculty.getName(), faculty.getAddress(), faculty.getEstablished(), faculty.getTelephone(),
				faculty.getWebSite(), faculty.getId()  };
		int flagSuccess = 0;
		PreparedStatement ps = DAOUtil.preparedStatement(conn, UPDATE_FACULTY, true, parametri);
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
	
	public static int deleteFaculty(int facultyId) {
		Connection conn = null;
		conn = connectionPool.getConnection();
		Object parametri[] = { true, facultyId};
		int flagSuccess = 0;
		PreparedStatement ps = DAOUtil.preparedStatement(conn, DELETE_FACULTY, true, parametri);
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
	
	public static JSONObject selectFacultyWithId(int id) {
		JSONObject json = null;
		JSONObject data = null;
		Connection conn = null;
		ResultSet rs = null;
		conn = connectionPool.getConnection();
		Object parametri[] = { id };
		PreparedStatement ps = DAOUtil.preparedStatement(conn, SELECT_FACULTY_WITH_ID, false, parametri);
		try {
			rs = ps.executeQuery();
			if(rs.next()) {
				json = new JSONObject();
				data = new JSONObject();
				data.put("id", rs.getInt("id"));
				data.put("name", rs.getString("name"));
				data.put("address", rs.getString("address"));
				data.put("established", rs.getString("established"));
				data.put("telephone", rs.getString("telephone"));
				data.put("webSite", rs.getString("webSite"));
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
