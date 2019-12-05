package org.unibl.etf.dr.dto;

import java.io.Serializable;
import java.util.Date;

public class Member implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int id;
	private String numberOfMembershipCard;
	private String name;
	private String surname;
	private String address;
	private String email;
	private String telephone;
	private Date dateOfMembership;
	private boolean deleted;
	
	public Member() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNumberOfMembershipCard() {
		return numberOfMembershipCard;
	}

	public void setNumberOfMembershipCard(String numberOfMembershipCard) {
		this.numberOfMembershipCard = numberOfMembershipCard;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public Date getDateOfMembership() {
		return dateOfMembership;
	}

	public void setDateOfMembership(Date dateOfMembership) {
		this.dateOfMembership = dateOfMembership;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	@Override
	public String toString() {
		return "Member [id=" + id + ", numberOfMembershipCard=" + numberOfMembershipCard + ", name=" + name
				+ ", surname=" + surname + ", address=" + address + ", email=" + email + ", telephone=" + telephone
				+ ", dateOfMembership=" + dateOfMembership + ", deleted=" + deleted + "]";
	}


}
