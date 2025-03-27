import { Router } from "express";
import { BlacklistValidationController } from "../../controllers/users/blacklistValidation.js";

export const blacklistValidationRouter = Router();

blacklistValidationRouter.post('/', BlacklistValidationController.validateText);