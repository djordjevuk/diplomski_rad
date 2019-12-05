package org.unibl.etf.dr.dao;

import java.sql.*;

public class DAOUtil {

	public DAOUtil() {
		super();
	}

	public static PreparedStatement preparedStatement(Connection conn, String sqlQuery, boolean returnGeneratedKeys,
			Object... values) {
		PreparedStatement ps = null;
		try {
			ps = conn.prepareStatement(sqlQuery,
					returnGeneratedKeys ? Statement.RETURN_GENERATED_KEYS : Statement.NO_GENERATED_KEYS);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		setVrijednosti(ps, values);
		return ps;
	}

	public static void setVrijednosti(PreparedStatement ps, Object... values) {
		for (int i = 0; i < values.length; i++) {
			try {
				ps.setObject(i + 1, values[i]);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}
