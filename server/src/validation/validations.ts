import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const userValidation = [
  body("email").isEmail().withMessage("L'email doit être valide"),
  body("password").isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères"),
  body("firstName").notEmpty().withMessage("Le prénom est obligatoire"),
  body("lastName").notEmpty().withMessage("Le nom est obligatoire"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Transforme les erreurs en tableau simple de messages
      const errorMessages = errors.array().map((err) => err.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
];
