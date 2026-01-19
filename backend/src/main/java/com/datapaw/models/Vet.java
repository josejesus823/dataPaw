package com.datapaw.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "vets")
public class Vet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String specialty;
    private String licenseNumber;
    private String email;

    // OPCIONAL: Relación inversa para ver qué registros ha hecho este veterinario
    @OneToMany(mappedBy = "vet")
    private List<MedicalRecord> records;

    public Vet() {}

    public Vet(Integer id, String name, String specialty, String licenseNumber, String email) {
        this.id = id;
        this.name = name;
        this.specialty = specialty;
        this.licenseNumber = licenseNumber;
        this.email = email;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<MedicalRecord> getRecords() {
        return records;
    }

    public void setRecords(List<MedicalRecord> records) {
        this.records = records;
    }


    
}