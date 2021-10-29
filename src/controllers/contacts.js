const Contacts = require("../../repository");
const { CustomError } = require("../../helpers/customError");

const getContacts = async (req, res) => {
  const userId = req.user._id;
  const data = await Contacts.listContacts(userId, req.query);
  res.json({ status: "success", code: 200, data: { ...data } });
};

const getContact = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.getContactById(req.params.contactId, userId);
  if (contact) {
    return res.status(200).json({
      status: "success",
      code: 200,
      data: { contact },
      message: `Contact with id ${req.params.contactId} found!`,
    });
  }
  throw new CustomError(404, "Not found");
};

const addContact = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.addContact({ ...req.body, owner: userId });
  res.status(201).json({
    status: "success",
    code: 201,
    data: { contact },
    message: `Contact with name ${req.body.name} added successfully!`,
  });
};

const updateContact = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId
  );
  if (contact) {
    return res.status(200).json({
      status: "success",
      code: 200,
      data: { contact },
      message: `Contact with name ${contact.name} updated!`,
    });
  }
  throw new CustomError(404, "Not found");
};

const updateStatusContact = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId
  );
  if (contact) {
    return res.status(200).json({
      status: "success",
      code: 200,
      data: { contact },
      message: `Status contact with name ${contact.name} updated!`,
    });
  }

  throw new CustomError(404, "Not found");
};

const deleteContact = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.removeContact(req.params.contactId, userId);
  if (contact) {
    return res.status(200).json({
      status: "success",
      code: 200,
      data: { contact },
      message: `Contact with id ${req.params.contactId} removed!`,
    });
  }

  throw new CustomError(404, "Not found");
};

module.exports = {
  getContacts,
  getContact,
  addContact,
  updateContact,
  updateStatusContact,
  deleteContact,
};
