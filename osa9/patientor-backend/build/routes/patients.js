"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.json(patientService_1.default.getNonSensitiveEntries());
});
router.post("/", (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatient = patientService_1.default.addNewPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
    });
    res.json(newPatient);
});
exports.default = router;
