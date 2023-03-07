const express = require('express')
const contacts = require("../../models/contacts")
const router = express.Router()
const {HttpError} = require("../../helpers");
const Joi = require("joi");
// const emailRegexp =
//   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// const phoneRegexp = /^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try{
    const result = await contacts.listContacts();
  res.json(result);
  }
  catch(error){
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contacts.getContactById(id);
    if(!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}
catch(error) {
  next(error)
}
})

router.post('/', async(req, res, next)=> {
  try {
      const {error} = addSchema.validate(req.body);
      if(error) {
        throw HttpError(404, "missing required name field");
      }
      const result = await contacts.addContact(req.body);
      res.status(201).json(result);
  }
  catch(error) {
      next(error);
  }
})
router.delete("/:id", async(req, res, next)=> {
  try {
      const {id} = req.params;
      const result = await contacts.removeContact(id);
      if(!result) {
          throw HttpError(404, "Not found");
      }
      res.json({
          message: "contact deleted"
      })
  }
  catch(error) {
      next(error);
  }
})

router.put("/:id", async(req, res, next)=> {
  try {
      const {error} = addSchema.validate(req.body);
      if(error) {
          throw HttpError(400, "missing fields");
      }
      const {id} = req.params;
      const result = await contacts.updateContact(id, req.body);
      if(!result) {
          throw HttpError(404, "Not found");
      }
      res.json(result);
  }
  catch(error) {
      next(error);
  }
})
// router.put('/:id', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router
