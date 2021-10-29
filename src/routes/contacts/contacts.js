const express = require("express");
const router = express.Router();
const {
  validateContact,
  validateUpdateContact,
  validateStatusContact,
  validateId,
} = require("./validationContact");

const {
  getContacts,
  getContact,
  addContact,
  updateContact,
  updateStatusContact,
  deleteContact,
} = require("../../controllers/contacts");
const guard = require("../../../helpers/guard");
const wrapError = require("../../../helpers/errorHandler");

router.get("/", guard, wrapError(getContacts));

router.get("/:contactId", guard, validateId, wrapError(getContact));

router.post("/", guard, validateContact, wrapError(addContact));

router.put(
  "/:contactId",
  guard,
  [(validateId, validateContact)],
  wrapError(updateContact)
);

router.delete("/:contactId", guard, validateId, wrapError(deleteContact));

router.patch(
  "/:contactId",
  guard,
  [(validateId, validateUpdateContact)],
  wrapError(updateContact)
);

router.patch(
  "/:contactId/favorite",
  guard,
  [(validateId, validateStatusContact)],
  wrapError(updateStatusContact)
);

module.exports = router;
