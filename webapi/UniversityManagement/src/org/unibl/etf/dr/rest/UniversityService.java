package org.unibl.etf.dr.rest;

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
import org.unibl.etf.dr.dao.SubjectOnStudyProgramDAO;
import org.unibl.etf.dr.dao.SubjectDAO;
import org.unibl.etf.dr.dao.StudyProgramDAO;
import org.unibl.etf.dr.dao.FacultyDAO;
import org.unibl.etf.dr.dto.Subject;
import org.unibl.etf.dr.dto.SubjectOnStudyProgram;
import org.unibl.etf.dr.dto.StudyProgram;
import org.unibl.etf.dr.dto.Faculty;

@Path("/universityService")
public class UniversityService {

	//SELECT
	@GET
	@Path("/faculty")
	@Produces(MediaType.APPLICATION_JSON)
	public Response selectFaculties() {
		return Response.ok(FacultyDAO.selectFaculties().toString()).build();
	}

	@GET
	@Path("/study_program")
	@Produces(MediaType.APPLICATION_JSON)
	public Response selectStudyPrograms() {
		return Response.ok(StudyProgramDAO.selectStudyPrograms().toString()).build();
	}

	@GET
	@Path("/subject")
	@Produces(MediaType.APPLICATION_JSON)
	public Response selectSubjects() {
		return Response.ok(SubjectDAO.selectSubjects().toString()).build();
	}

	@GET
	@Path("/subject_on_study_program")
	@Produces(MediaType.APPLICATION_JSON)
	public Response selectSOSP() {
		return Response.ok(SubjectOnStudyProgramDAO.selectSOSP().toString()).build();
	}

	@GET
	@Path("/faculty/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response selectFacultyWithId(@PathParam("id") int id) {
		return Response.ok(FacultyDAO.selectFacultyWithId(id).toString()).build();
	}

	@GET
	@Path("/study_program/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response selectStudyProgramWithId(@PathParam("id") int id) {
		return Response.ok(StudyProgramDAO.selectStudyProgramWithId(id).toString()).build();
	}

	@GET
	@Path("/subject/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response selectSubjectWithId(@PathParam("id") int id) {
		return Response.ok(SubjectDAO.selectSubjectWithId(id).toString()).build();
	}

	//INSERT
	@POST
	@Path("/faculty")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response insertFaculty(String data) {
		JSONObject receivedJson = null;
		JSONObject json = null;
		int generatedId = -1;
		try {
			receivedJson = new JSONObject(data);
			Faculty faculty = new Faculty();
			json = receivedJson.getJSONObject("dataObject");
			faculty.setName(json.getString("name"));
			faculty.setAddress(json.getString("address"));
			faculty.setEstablished(json.getString("established"));
			faculty.setTelephone(json.getString("telephone"));
			faculty.setWebSite(json.getString("webSite"));
			generatedId = FacultyDAO.insertFaculty(faculty);
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
	@Path("/study_program")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response insertStudyProgram(String data) {
		JSONObject receivedJson = null;
		JSONObject json = null;
		int generatedId = -1;
		try {
			receivedJson = new JSONObject(data);
			StudyProgram sp = new StudyProgram();
			json = receivedJson.getJSONObject("dataObject");
			sp.setName(json.getString("studyProgramName"));
			sp.setCode(json.getString("code"));
			sp.setCycle(json.getInt("cycle"));
			sp.setDuration(json.getString("duration"));
			if (json.getString("totalECTS") != "null") {
				sp.setTotalECTS(json.getInt("totalECTS"));
			}
			sp.setIdFaculty(json.getInt("idFaculty"));
			generatedId = StudyProgramDAO.insertStudyProgram(sp);
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
	@Path("/subject")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response insertSubject(String data) {
		JSONObject receivedJson = null;
		JSONObject json = null;
		int generatedId = -1;
		try {
			receivedJson = new JSONObject(data);
			Subject subject = new Subject();
			json = receivedJson.getJSONObject("dataObject");
			subject.setName(json.getString("subjectName"));
			subject.setCode(json.getString("code"));
			subject.setEcts(json.getInt("ects"));
			subject.setNumberOfClasses(json.getString("numberOfClasses"));
			subject.setIdFaculty(json.getInt("idFaculty"));
			generatedId = SubjectDAO.insertSubject(subject);
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
	@Path("/subject_on_study_program")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response insertSOSP(String data) {
		JSONObject receivedJson = null;
		JSONObject json = null;
		int generatedId = -1;
		try {
			receivedJson = new JSONObject(data);
			SubjectOnStudyProgram sosp = new SubjectOnStudyProgram();
			json = receivedJson.getJSONObject("dataObject");
			sosp.setIdSubject(json.getInt("idSubject"));
			sosp.setIdStudyProgram(json.getInt("idStudyProgram"));
			sosp.setTypeOfSubject(json.getString("typeOfSubject"));
			sosp.setSemester(json.getString("semester"));
			generatedId = SubjectOnStudyProgramDAO.insertSOSP(sosp);
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
	@Path("/faculty/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateFaculty(String data, @PathParam("id") int id) {
		JSONObject receivedJson = null;
		JSONObject json = null;
		try {
			receivedJson = new JSONObject(data);
			Faculty faculty = new Faculty();
			json = receivedJson.getJSONObject("dataObject");
			faculty.setId(json.getInt("id"));
			faculty.setName(json.getString("name"));
			faculty.setAddress(json.getString("address"));
			faculty.setEstablished(json.getString("established"));
			faculty.setTelephone(json.getString("telephone"));
			faculty.setWebSite(json.getString("webSite"));
			FacultyDAO.updateFaculty(faculty);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.ok().build();
	}

	@PUT
	@Path("/study_program/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateStudyProgram(String data, @PathParam("id") int id) {
		JSONObject receivedJson = null;
		JSONObject json = null;
		try {
			receivedJson = new JSONObject(data);
			StudyProgram sp = new StudyProgram();
			json = receivedJson.getJSONObject("dataObject");
			sp.setId(json.getInt("id"));
			sp.setName(json.getString("studyProgramName"));
			sp.setCode(json.getString("code"));
			sp.setCycle(json.getInt("cycle"));
			sp.setDuration(json.getString("duration"));
			if (json.getString("totalECTS") != "null") {
				sp.setTotalECTS(json.getInt("totalECTS"));
			}
			sp.setIdFaculty(json.getInt("idFaculty"));
			StudyProgramDAO.updateStudyProgram(sp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.ok().build();
	}

	@PUT
	@Path("/subject/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateSubject(String data, @PathParam("id") int id) {
		JSONObject receivedJson = null;
		JSONObject json = null;
		try {
			receivedJson = new JSONObject(data);
			Subject subject = new Subject();
			json = receivedJson.getJSONObject("dataObject");
			subject.setId(json.getInt("id"));
			subject.setName(json.getString("subjectName"));
			subject.setCode(json.getString("code"));
			subject.setEcts(json.getInt("ects"));
			subject.setNumberOfClasses(json.getString("numberOfClasses"));
			subject.setIdFaculty(json.getInt("idFaculty"));
			SubjectDAO.updateSubject(subject);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.ok().build();
	}

	//DELETE
	@DELETE
	@Path("/faculty/{id}")
	public Response deleteFaculty(@PathParam("id") int id) {
		try {
			FacultyDAO.deleteFaculty(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.ok().build();
	}

	@DELETE
	@Path("/study_program/{id}")
	public Response deleteStudyProgram(@PathParam("id") int id) {
		try {
			StudyProgramDAO.deleteStudyProgram(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.ok().build();
	}

	@DELETE
	@Path("/subject/{id}")
	public Response deleteSubject(@PathParam("id") int id) {
		try {
			SubjectDAO.deleteSubject(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.ok().build();
	}

	@DELETE
	@Path("/subject_on_study_program/{idSubject}/{idStudyProgram}")
	public Response deleteSOSP(@PathParam("idSubject") int idSubject, @PathParam("idStudyProgram") int idStudyProgram) {
		try {
			SubjectOnStudyProgramDAO.deleteSOSP(idSubject, idStudyProgram);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.ok().build();
	}
}
