package org.unibl.etf.dr.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;

import org.json.JSONArray;
import org.json.JSONObject;
import org.unibl.etf.dr.dto.Member;

public class MemberDAO {

	private static ConnectionPool connectionPool = ConnectionPool.getConnectionPool();

	private static final String SELECT_MEMBERS = "select * from member where deleted=?;";
	private static final String INSERT_MEMBER = "insert into member(numberOfMembershipCard, name, surname, address, email, telephone, dateOfMembership) values (?,?,?,?,?,?,?);";
	private static final String UPDATE_MEMBER = "update member set numberOfMembershipCard=?, name=?, surname=? , address=?, email=?, telephone=?, dateOfMembership=? where id=?;";
	private static final String DELETE_MEMBER = "update member set deleted=? where id=?;";
	private static final String SELECT_MEMBER_WITH_ID = "select * from member where id=?;";

	public static JSONArray selectMembers() {
		JSONObject json = null;
		JSONObject data = null;
		JSONArray array = new JSONArray();
		Connection conn = null;
		ResultSet rs = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		conn = connectionPool.getConnection();
		Object parametri[] = { false };
		PreparedStatement ps = DAOUtil.preparedStatement(conn, SELECT_MEMBERS, false, parametri);
		try {
			rs = ps.executeQuery();
			while (rs.next()) {
				json = new JSONObject();
				data = new JSONObject();
				data.put("id", rs.getInt("id"));
				data.put("numberOfMembershipCard", rs.getString("numberOfMembershipCard"));
				data.put("name", rs.getString("name"));
				data.put("surname", rs.getString("surname"));
				data.put("address", rs.getString("address"));
				data.put("email", rs.getString("email"));
				data.put("telephone", rs.getString("telephone"));
				data.put("dateOfMembership", sdf.format(rs.getDate("dateOfMembership")));
				data.put("memberOfLibrary", rs.getString("numberOfMembershipCard") + " - " + rs.getString("name") + " " + rs.getString("surname"));
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

	public static int insertMember(Member member) {
		Connection conn = null;
		conn = connectionPool.getConnection();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Object parametri[] = { member.getNumberOfMembershipCard(), member.getName(), member.getSurname(), member.getAddress(), member.getEmail(),
				member.getTelephone(), sdf.format(member.getDateOfMembership()) };
		int generatedId = -1;
		PreparedStatement ps = DAOUtil.preparedStatement(conn, INSERT_MEMBER, true, parametri);
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

	public static int updateMember(Member member) {
		Connection conn = null;
		conn = connectionPool.getConnection();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Object parametri[] = { member.getNumberOfMembershipCard(), member.getName(), member.getSurname(), member.getAddress(), member.getEmail(),
				member.getTelephone(), sdf.format(member.getDateOfMembership()), member.getId() };
		int flagSuccess = 0;
		PreparedStatement ps = DAOUtil.preparedStatement(conn, UPDATE_MEMBER, true, parametri);
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
	
	public static int deleteMember(int memberId) {
		Connection conn = null;
		conn = connectionPool.getConnection();
		Object parametri[] = { true, memberId};
		int flagSuccess = 0;
		PreparedStatement ps = DAOUtil.preparedStatement(conn, DELETE_MEMBER, true, parametri);
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
	
	public static JSONObject selectMemberWithId(int id) {
		JSONObject json = null;
		JSONObject data = null;
		Connection conn = null;
		ResultSet rs = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		conn = connectionPool.getConnection();
		Object parametri[] = { id };
		PreparedStatement ps = DAOUtil.preparedStatement(conn, SELECT_MEMBER_WITH_ID, false, parametri);
		try {
			rs = ps.executeQuery();
			if(rs.next()) {
				json = new JSONObject();
				data = new JSONObject();
				data.put("id", rs.getInt("id"));
				data.put("numberOfMembershipCard", rs.getString("numberOfMembershipCard"));
				data.put("name", rs.getString("name"));
				data.put("surname", rs.getString("surname"));
				data.put("address", rs.getString("address"));
				data.put("email", rs.getString("email"));
				data.put("telephone", rs.getString("telephone"));
				data.put("dateOfMembership", sdf.format(rs.getDate("dateOfMembership")));
				data.put("memberOfLibrary", rs.getString("numberOfMembershipCard") + " - " + rs.getString("name") + " " + rs.getString("surname"));
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
