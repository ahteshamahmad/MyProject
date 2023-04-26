package com.projectify.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projectify.Model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
	
	@Query("from Project as pro where pro.manager.managerCode = :managerCode")
	public List<Project> findProjectByManagerCode(@Param("managerCode") String managerCode);
	
	@Query("from Project as pro where pro.id = :pId")
	public Project findProjectById(@Param("pId") int pId);
	
	//SEARCH
//	public List<Project> findByNameContainingAndUser(String keyword, User user);
//	@Query("SELECT p FROM Project p WHERE " +
//            "p.title LIKE CONCAT('%',:query, '%')" +
//            "Or p.domain LIKE CONCAT('%', :query, '%')")
//    List<Project> searchProjects(String query);
}
