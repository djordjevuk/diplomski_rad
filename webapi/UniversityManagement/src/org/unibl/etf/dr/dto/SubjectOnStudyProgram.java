package org.unibl.etf.dr.dto;

import java.io.Serializable;

public class SubjectOnStudyProgram implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private int idSubject;
	private int idStudyProgram;
	private String typeOfSubject;
	private String semester;
	private boolean deleted;

	public SubjectOnStudyProgram() {
		super();
	}

	public int getIdSubject() {
		return idSubject;
	}

	public void setIdSubject(int idSubject) {
		this.idSubject = idSubject;
	}

	public int getIdStudyProgram() {
		return idStudyProgram;
	}

	public void setIdStudyProgram(int idStudyProgram) {
		this.idStudyProgram = idStudyProgram;
	}

	public String getTypeOfSubject() {
		return typeOfSubject;
	}

	public void setTypeOfSubject(String typeOfSubject) {
		this.typeOfSubject = typeOfSubject;
	}

	public String getSemester() {
		return semester;
	}

	public void setSemester(String semester) {
		this.semester = semester;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	@Override
	public String toString() {
		return "Contain [idSubject=" + idSubject + ", idStudyProgram=" + idStudyProgram
				+ ", typeOfSubject=" + typeOfSubject + ", semester=" + semester + ", deleted=" + deleted + "]";
	}

	
}
