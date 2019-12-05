package org.unibl.etf.dr.dto;

import java.io.Serializable;

public class StudyProgram implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int id;
	private String name;
	private String code;
	private int cycle;
	private String duration;
	private int totalECTS;
	private int idFaculty;
	private boolean deleted;
	
	public StudyProgram() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public int getCycle() {
		return cycle;
	}

	public void setCycle(int cycle) {
		this.cycle = cycle;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public int getTotalECTS() {
		return totalECTS;
	}

	public void setTotalECTS(int totalECTS) {
		this.totalECTS = totalECTS;
	}

	public int getIdFaculty() {
		return idFaculty;
	}

	public void setIdFaculty(int idFaculty) {
		this.idFaculty = idFaculty;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	@Override
	public String toString() {
		return "StudyProgram [id=" + id + ", name=" + name + ", code=" + code + ", cycle=" + cycle + ", duration="
				+ duration + ", totalECTS=" + totalECTS + ", idFaculty=" + idFaculty + ", deleted=" + deleted + "]";
	}


}
