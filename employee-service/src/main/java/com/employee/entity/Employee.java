package com.employee.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import lombok.Builder;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "employee", schema = "emp")
public class Employee {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "employeeid" )
	public Integer employeeId;
	@Column(name = "name" )
	public String name;
	@Column(name = "manager" )
	public String manager;
	@Column(name = "salary" )
	public Integer salary;
	
	//Getters
	public Integer getEmployeeId() {
		return employeeId;
	}
	public String getName() {
		// TODO Auto-generated method stub
		return name;
	}
	public String getManager() {
		// TODO Auto-generated method stub
		return manager;
	}
	public Integer getSalary() {
		// TODO Auto-generated method stub
		return salary;
	}
	
	
	//Setters
	public void setName(String name2) {
		// TODO Auto-generated method stub
		name = name2;
	}
	public void setManager(String manager2) {
		// TODO Auto-generated method stub
		manager = manager2;
	}
	public void setSalary(Integer salary2) {
		// TODO Auto-generated method stub
		salary = salary2;
	}

}
