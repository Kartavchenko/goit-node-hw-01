const fs = require('fs/promises');
const path = require('path');
const {nanoid}  = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json"); 

async function listContacts() {
  try {
    const getContacts = await fs.readFile(contactsPath);
    return JSON.parse(getContacts)
  } catch (error) {
    console.log(error)
  }
}
async function getContactById(contactId) {
  try {
    const getId = await listContacts();
    return getId.find(item => item.id === contactId) || null;
  } catch (error) {
    console.log(error)
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.log(error)
  }
}

async function addContact({name, email, phone}) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name, 
      email,
      phone,
    }
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.table(newContact);
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};