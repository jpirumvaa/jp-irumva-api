import Joi from '@hapi/joi'
import comments from '../models/comments';

export const blogsValidation = async (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().required().trim()
        .messages({
          'string.base': 'Title should be a string',
          'string.empty': 'Title should not be empty',
          'string.required': 'Title is require'
        }),
      body: Joi.string().required().trim().max(2000).min(30)
        .messages({
          'string.empty': 'Article should not be empty',
          'string.required': 'Article is required',
          'string.min': 'Article body should be above 30 characters',
          'string.max': 'Article body should be below 2000 characters'
        }),
      author: Joi.string().required().trim()
      .message({
          'string.base': 'Author should be a string',
          'string.empty': 'Author should not be empty',
          'string.required': 'Author is require'
      }),
      date: Joi.string().required().trim()
      .message({
          'string.base': 'Date should be a string',
          'string.empty': 'Date should not be empty',
          'string.required': 'Date is require'
      }),

      avatarURL: Joi.string().required().trim()
        .message({
           'string.required': 'Avatar url is require'
      }),
      dateofPublication: Joi.string().required().trim()
      .message({
          'string.required': 'Date of Publication is require'
      }),

    });
    const { error } = schema.validate(req.body);
    if (error){
      console.log(error)
      console.log(req.body)
      return res.status(400).send({ 
        error: error.details[0].message
        
       });
    } 
  
    return next();
  };