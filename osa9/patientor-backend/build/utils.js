"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPatientSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("./types/types");
exports.newPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().date(),
    ssn: zod_1.z.string(),
    gender: zod_1.z.nativeEnum(types_1.Gender),
    occupation: zod_1.z.string(),
});
