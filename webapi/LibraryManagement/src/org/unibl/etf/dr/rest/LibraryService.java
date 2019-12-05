package org.unibl.etf.dr.rest;

import java.text.SimpleDateFormat;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.JSONObject;
import org.unibl.etf.dr.dao.BookBorrowingDAO;
import org.unibl.etf.dr.dao.BookDAO;
import org.unibl.etf.dr.dao.MemberDAO;
import org.unibl.etf.dr.dto.Book;
import org.unibl.etf.dr.dto.BookBorrowing;
import org.unibl.etf.dr.dto.Member;

@Path("/libraryService")
public class LibraryService {

	//SELECT
	@GET
	@Path("/member")
	@Produces(MediaType.APPLICATION_JSON)
	public Response selectMembers() {
		return Response.ok(MemberDAO.selectMembers().toString()).build();
	}

	@GET
	@Path("/book")
	@Produces(MediaType.APPLICATION_JSON)
	public Response selectBooks() {
		return Response.ok(BookDAO.selectBooks().toString()).build();
	}

	@GET
	@Path("/book_borrowing")
	@Produces(MediaType.APPLICATION_JSON)
	public Response selectBookBorrowing() {
		return Response.ok(BookBorrowingDAO.selectAllBookBorrowing().toString()).build();
	}

	@GET
	@Path("/member/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response selectMemberWithId(@PathParam("id") int id) {
		return Response.ok(MemberDAO.selectMemberWithId(id).toString()).build();
	}

	@GET
	@Path("/book/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response selectBookWithId(@PathParam("id") int id) {
		return Response.ok(BookDAO.selectBookWithId(id).toString()).build();
	}

	@GET
	@Path("/book_borrowing/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response selectBookBorrowingWithId(@PathParam("id") int id) {
		return Response.ok(BookBorrowingDAO.selectBookBorrowingWithId(id).toString()).build();
	}

	//INSERT
	@POST
	@Path("/member")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response insertMember(String data) {
		JSONObject receivedJson = null;
		JSONObject json = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		int generatedId = -1;
		try {
			receivedJson = new JSONObject(data);
			Member member = new Member();
			json = receivedJson.getJSONObject("dataObject");
			member.setNumberOfMembershipCard(json.getString("numberOfMembershipCard"));
			member.setName(json.getString("name"));
			member.setSurname(json.getString("surname"));
			member.setAddress(json.getString("address"));
			member.setEmail(json.getString("email"));
			member.setTelephone(json.getString("telephone"));
			member.setDateOfMembership(sdf.parse(json.getString("dateOfMembership")));
			generatedId = MemberDAO.insertMember(member);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (generatedId != -1) {
			try {
				json.put("id", generatedId);
				receivedJson.put("dataObject", json);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return Response.ok(receivedJson.toString()).build();
		} else {
			return Response.ok(null).build();
		}
	}

	@POST
	@Path("/book")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response insertBook(String data) {
		JSONObject receivedJson = null;
		JSONObject json = null;
		int generatedId = -1;
		try {
			receivedJson = new JSONObject(data);
			Book book = new Book();
			json = receivedJson.getJSONObject("dataObject");
			book.setTitle(json.getString("title"));
			book.setAuthor(json.getString("author"));
			book.setCategory(json.getString("category"));
			book.setNumberOfPages(json.getString("numberOfPages"));
			book.setIsbn(json.getString("isbn"));
			book.setPublisher(json.getString("publisher"));
			book.setYearPublication(json.getString("yearPublication"));
			book.setAbout(json.getString("about"));
			generatedId = BookDAO.insertBook(book);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (generatedId != -1) {
			try {
				json.put("id", generatedId);
				receivedJson.put("dataObject", json);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return Response.ok(receivedJson.toString()).build();
		} else {
			return Response.ok(null).build();
		}
	}

	@POST
	@Path("/book_borrowing")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response insertBookBorrowing(String data) {
		JSONObject receivedJson = null;
		JSONObject json = null;
		int generatedId = -1;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			receivedJson = new JSONObject(data);
			BookBorrowing bookBorr = new BookBorrowing();
			json = receivedJson.getJSONObject("dataObject");
			bookBorr.setIdMember(json.getInt("idMember"));
			bookBorr.setIdBook(json.getInt("idBook"));
			bookBorr.setDateOfBorrowing(sdf.parse(json.getString("dateOfBorrowing")));
			if (json.getString("dateOfReturning") != "null") {
				bookBorr.setDateOfReturning(sdf.parse(json.getString("dateOfReturning")));
			}
			bookBorr.setReturned(json.getBoolean("returned"));
			generatedId = BookBorrowingDAO.insertBookBorrowing(bookBorr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (generatedId != -1) {
			try {
				json.put("id", generatedId);
				receivedJson.put("dataObject", json);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return Response.ok(receivedJson.toString()).build();
		} else {
			return Response.ok(null).build();
		}
	}

	//UPDATE
	@PUT
	@Path("/member/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateMember(String data, @PathParam("id") int id) {
		JSONObject receivedJson = null;
		JSONObject json = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			receivedJson = new JSONObject(data);
			Member member = new Member();
			json = receivedJson.getJSONObject("dataObject");
			member.setId(id);
			member.setNumberOfMembershipCard(json.getString("numberOfMembershipCard"));
			member.setName(json.getString("name"));
			member.setSurname(json.getString("surname"));
			member.setAddress(json.getString("address"));
			member.setEmail(json.getString("email"));
			member.setTelephone(json.getString("telephone"));
			member.setDateOfMembership(sdf.parse(json.getString("dateOfMembership")));
			MemberDAO.updateMember(member);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.ok().build();
	}

	@PUT
	@Path("/book/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateBook(String data, @PathParam("id") int id) {
		JSONObject receivedJson = null;
		JSONObject json = null;
		try {
			receivedJson = new JSONObject(data);
			Book book = new Book();
			json = receivedJson.getJSONObject("dataObject");
			book.setId(json.getInt("id"));
			book.setTitle(json.getString("title"));
			book.setAuthor(json.getString("author"));
			book.setCategory(json.getString("category"));
			book.setNumberOfPages(json.getString("numberOfPages"));
			book.setIsbn(json.getString("isbn"));
			book.setPublisher(json.getString("publisher"));
			book.setYearPublication(json.getString("yearPublication"));
			book.setAbout(json.getString("about"));
			BookDAO.updateBook(book);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.ok().build();
	}

	@PUT
	@Path("/book_borrowing/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateBookBorrowing(String data, @PathParam("id") int id) {
		JSONObject receivedJson = null;
		JSONObject json = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			receivedJson = new JSONObject(data);
			BookBorrowing bookBorr = new BookBorrowing();
			json = receivedJson.getJSONObject("dataObject");
			bookBorr.setId(json.getInt("id"));
			bookBorr.setIdMember(json.getInt("idMember"));
			bookBorr.setIdBook(json.getInt("idBook"));
			bookBorr.setDateOfBorrowing(sdf.parse(json.getString("dateOfBorrowing")));
			if (json.getString("dateOfReturning") != "null") {
				bookBorr.setDateOfReturning(sdf.parse(json.getString("dateOfReturning")));
			}
			bookBorr.setReturned(json.getBoolean("returned"));
			BookBorrowingDAO.updateBookBorrowing(bookBorr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.ok().build();
	}

	//DELETE
	@DELETE
	@Path("/member/{id}")
	public Response deleteMember(@PathParam("id") int id) {
		try {
			MemberDAO.deleteMember(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.ok().build();
	}

	@DELETE
	@Path("/book/{id}")
	public Response deleteBook(@PathParam("id") int id) {
		try {
			BookDAO.deleteBook(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.ok().build();
	}

	@DELETE
	@Path("/book_borrowing/{id}")
	public Response deleteBookBorrowing(@PathParam("id") int id) {
		try {
			BookBorrowingDAO.deleteBookBorrowing(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.ok().build();
	}

}
