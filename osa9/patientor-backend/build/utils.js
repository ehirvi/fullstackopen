"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types/types");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (gender) => {
    return Object.values(types_1.Gender)
        .map((o) => o.toString())
        .includes(gender);
};
const parseString = (text, fieldName) => {
    if (!isString(text)) {
        throw new Error(`Incorrect or missing ${fieldName}`);
    }
    return text;
};
const parseDate = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date");
    }
    return date;
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing gender");
    }
    return gender;
};
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object) {
        const newEntry = {
            name: parseString(object.name, "name"),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn, "ssn"),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation, "occupation"),
        };
        return newEntry;
    }
    throw new Error("Error: some fields are missing");
};
exports.default = toNewPatientEntry;
