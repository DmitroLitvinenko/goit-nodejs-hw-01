const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию

async function listContacts() {
  // ...твой код. Возвращает массив контактов.
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getContactById(contactId) {
  // ...твой код. Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.

  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contactId === contact.id);
    return contact || null;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function removeContact(contactId) {
  // ...твой код. Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.

  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contactId === contact.id);

    if (index === -1) {
      return null;
    }

    const removedContact = contacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function addContact(name, email, phone) {
  // ...твой код. Возвращает объект добавленного контакта.

  try {
    const contacts = await listContacts();
    const newContact = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
