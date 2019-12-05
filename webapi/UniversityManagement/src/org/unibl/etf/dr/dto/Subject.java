package org.unibl.etf.dr.dto;

import java.io.Serializable;

public class Subject implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int id;
	private String name;
	private String code;
	private int ects;
	private String numberOfClasses;
	private int idFaculty;
	private boolean deleted;

	public Subject() {
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

	public int getEcts() {
		return ects;
	}

	public void setEcts(int ects) {
		this.ects = ects;
	}

	public String getNumberOfClasses() {
		return numberOfClasses;
	}

	public void setNumberOfClasses(String numberOfClasses) {
		this.numberOfClasses = numberOfClasses;
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
		return "Subject [id=" + id + ", name=" + name + ", code=" + code + ", ects=" + ects + ", numberOfClasses="
				+ numberOfClasses + ", idFaculty=" + idFaculty + ", deleted=" + deleted + "]";
	}
	

}
