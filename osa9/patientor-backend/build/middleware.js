"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.newPatientParser = void 0;
const utils_1 = require("./utils");
const zod_1 = require("zod");
const newPatientParser = (req, _res, next) => {
    try {
        utils_1.newPatientSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.newPatientParser = newPatientParser;
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
exports.errorMiddleware = errorMiddleware;
