/* eslint-disable linebreak-style */
const joi = require('joi');


const checkIdSchema = joi.object({
  id: joi.string().required(),
});


const payloadSchema = joi.object({
  title: joi.string().alphanum().max(200).required(),
  toDoDetail: joi.string().alphanum().max(200).required(),
});


module.exports = { checkIdSchema, payloadSchema };
