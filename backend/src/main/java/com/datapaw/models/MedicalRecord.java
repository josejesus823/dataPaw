package com.datapaw.models;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "medical_records")
public class MedicalRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recordId;

    // Relación con la Mascota
    @ManyToOne
    @JoinColumn(name = "pet_id") // Nombre de la columna en la DB
    private Pet pet;

    // Relación con el Veterinario
    @ManyToOne
    @JoinColumn(name = "vet_id") // Nombre de la columna en la DB
    private Vet vet;

    @Temporal(TemporalType.DATE)
    private Date recordDate;
    
    private String recordType;
    
    @Column(columnDefinition = "TEXT") // Permite descripciones largas
    private String description;
    
    private String severity; 
    private String clinicName;
    private String attachmentsUrl;

    public MedicalRecord() {}

    // Constructor actualizado
    public MedicalRecord(Integer recordId, Pet pet, Vet vet, Date recordDate, String recordType,
            String description, String severity, String clinicName, String attachmentsUrl) {
        this.recordId = recordId;
        this.pet = pet;
        this.vet = vet;
        this.recordDate = recordDate;
        this.recordType = recordType;
        this.description = description;
        this.severity = severity;
        this.clinicName = clinicName;
        this.attachmentsUrl = attachmentsUrl;
    }

    public Integer getRecordId() {
        return recordId;
    }

    public void setRecordId(Integer recordId) {
        this.recordId = recordId;
    }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }

    public Vet getVet() {
        return vet;
    }

    public void setVet(Vet vet) {
        this.vet = vet;
    }

    public Date getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(Date recordDate) {
        this.recordDate = recordDate;
    }

    public String getRecordType() {
        return recordType;
    }

    public void setRecordType(String recordType) {
        this.recordType = recordType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getClinicName() {
        return clinicName;
    }

    public void setClinicName(String clinicName) {
        this.clinicName = clinicName;
    }

    public String getAttachmentsUrl() {
        return attachmentsUrl;
    }

    public void setAttachmentsUrl(String attachmentsUrl) {
        this.attachmentsUrl = attachmentsUrl;
    }

    

}