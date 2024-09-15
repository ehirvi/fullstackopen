"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const getNonSensitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const getFullPatientData = (id) => {
    return patients_1.default.find((p) => p.id === id);
};
const addNewPatient = (patientEntry) => {
    const newPatient = Object.assign(Object.assign({ id: (0, uuid_1.v1)() }, patientEntry), { entries: [] });
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = { getNonSensitiveEntries, getFullPatientData, addNewPatient };
