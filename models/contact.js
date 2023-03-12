const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");
// const emailRegexp =
//   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// const phoneRegexp = /^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
    },
}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    addSchema,
    updateFavoriteSchema,
}

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas,
}

// const fs = require("fs").promises
// const path = require("path");
// const shortid = require('shortid');


// const contactsPath = path.join(__dirname, "./contacts.json");

// const listContacts = async () => {
//     const data = await fs.readFile(contactsPath);
//     return JSON.parse(data);
// }
  
//   const getContactById = async (id) => {
//     const contacts = await listContacts();
//     const result = contacts.find(item => item.id === id);
//     return result || null;
//   }
  
//   const removeContact = async (id) => {
//     const contacts = await listContacts();
//     const index = contacts.findIndex(item => item.id === id);
//     if(index === -1){
//         return null;
//     }
//     const [result] = contacts.splice(index, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); 
//     return result;
   
//   }
  
//   const addContact = async(data) => {
//     const contacts = await listContacts();
//     const newContact = {
//         id: shortid.generate(),
//         ...data,
//     }
//     contacts.push(newContact);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return newContact;
// }

// const updateContact = async (id, data) => {
//   const contacts = await listContacts();
//     const index = contacts.findIndex(item => item.id === id);
//     if(index === -1){
//         return null;
//     }
//     contacts[index] = {id, ...data};
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return contacts[index];
// }

// module.exports = {
//     listContacts,
//     getContactById,
//     removeContact,
//     addContact,
//     updateContact
// }