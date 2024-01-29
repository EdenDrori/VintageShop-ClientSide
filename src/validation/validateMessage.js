import Joi from "joi";
import validation from "./validation";

const messageSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  name: Joi.string().required().min(2).max(100),
  message: Joi.string().required().min(2).max(10000),
});

const validateMessage = (inputToCheck) =>validation(messageSchema, inputToCheck);

export { validateMessage };
