package org.unibl.etf.dr.dto;

import java.io.Serializable;
import java.util.Date;

public class BookBorrowing implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private int id;
	private int idMember;
	private int idBook;
	private Date dateOfBorrowing;
	private Date dateOfReturning;
	private boolean returned;
	private boolean deleted;

	public BookBorrowing() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getIdMember() {
		return idMember;
	}

	public void setIdMember(int idMember) {
		this.idMember = idMember;
	}

	public int getIdBook() {
		return idBook;
	}

	public void setIdBook(int idBook) {
		this.idBook = idBook;
	}

	public Date getDateOfBorrowing() {
		return dateOfBorrowing;
	}

	public void setDateOfBorrowing(Date dateOfBorrowing) {
		this.dateOfBorrowing = dateOfBorrowing;
	}

	public Date getDateOfReturning() {
		return dateOfReturning;
	}

	public void setDateOfReturning(Date dateOfReturning) {
		this.dateOfReturning = dateOfReturning;
	}

	public boolean isReturned() {
		return returned;
	}

	public void setReturned(boolean returned) {
		this.returned = returned;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	@Override
	public String toString() {
		return "BookBorrowing [id=" + id + ", idMember=" + idMember + ", idBook=" + idBook + ", dateOfBorrowing="
				+ dateOfBorrowing + ", dateOfReturning=" + dateOfReturning + ", returned=" + returned + ", deleted="
				+ deleted + "]";
	}

	
	
}
