package com.projectify.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projectify.Model.Manager;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, Integer> {

	@Query("select m from Manager m where m.managerCode = :managerCode")
	public Manager findByManagerCode(@Param("managerCode") String managerCode);
}
