"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const patientService_1 = __importDefault(require("../services/patientService"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.json(patientService_1.default.getNonSensitiveEntries());
});
router.get("/:id", (req, res) => {
    const patientData = patientService_1.default.getFullPatientData(req.params.id);
    if (patientData) {
        res.json(patientData);
    }
    else {
        res.sendStatus(404);
    }
});
router.post("/", middleware_1.newPatientParser, (req, res) => {
    const addedEntry = patientService_1.default.addNewPatient(req.body);
    res.json(addedEntry);
});
router.use(middleware_1.errorMiddleware);
exports.default = router;
