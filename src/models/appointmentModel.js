// src/models/appointmentModel.js

class Appointment {
    constructor(id, patientId, doctorId, date, time, purpose, deletedAt) {
        this.id = id;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.date = date;
        this.time = time;
        this.purpose = purpose;
        this.deletedAt = deletedAt;
    }
}

module.exports = Appointment;