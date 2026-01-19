package com.datapaw.models;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "pets")
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String species; 
    private String breed;  
    
    @Temporal(TemporalType.DATE)
    private Date birthDate;
    
    private String gender;
    private String color;
    private Double weight;

    // Relación: Muchos pets pertenecen a 1 owner
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private Owner owner;

    // Relación: Una mascota tiene muchas vacunas
    @OneToMany(mappedBy = "pet", cascade = CascadeType.ALL)
    private List<PetVaccination> vaccinations;

    // NUEVA RELACIÓN: Una mascota tiene muchos registros médicos
    @OneToMany(mappedBy = "pet", cascade = CascadeType.ALL)
    private List<MedicalRecord> medicalRecords;

    // Constructor vacío (Obligatorio para JPA)
    public Pet() {}

    // Constructor completo actualizado
    public Pet(Long id, String name, String species, String breed, Date birthDate, String gender, String color,
            Double weight, Owner owner, List<PetVaccination> vaccinations, List<MedicalRecord> medicalRecords) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.birthDate = birthDate;
        this.gender = gender;
        this.color = color;
        this.weight = weight;
        this.owner = owner;
        this.vaccinations = vaccinations;
        this.medicalRecords = medicalRecords;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Owner getOwner() {
        return owner;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }

    public List<PetVaccination> getVaccinations() {
        return vaccinations;
    }

    public void setVaccinations(List<PetVaccination> vaccinations) {
        this.vaccinations = vaccinations;
    }

    public List<MedicalRecord> getMedicalRecords() {
        return medicalRecords;
    }

    public void setMedicalRecords(List<MedicalRecord> medicalRecords) {
        this.medicalRecords = medicalRecords;
    }


    
}