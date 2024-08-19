import { Router } from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import validateBody from "../decorators/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateContactSchemaFavorite,
} from "../schemas/contactsSchemas.js";

import isValidId from "../middlewares/isValidId.js";

const addMiddleware = validateBody(createContactSchema);
const updateMiddleware = validateBody(updateContactSchema);
const updateMiddlewareFavorite = validateBody(updateContactSchemaFavorite);

const contactsRouter = Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsControllers.getOneContact);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteContact);

contactsRouter.post("/", addMiddleware, contactsControllers.createContact);

contactsRouter.put(
  "/:id",
  isValidId,
  updateMiddleware,
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  updateMiddlewareFavorite,
  contactsControllers.updateStatusContactFavorite
);

export default contactsRouter;
