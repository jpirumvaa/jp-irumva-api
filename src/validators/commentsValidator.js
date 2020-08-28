import Joi from '@hapi/joi'

export const commentsValidation = async (req, res, next) => {
    const schema = Joi.object({
      comment: Joi.string().required().trim().min(30).max(500)
        .messages({
          'string.base': 'Comment should be a string',
          'string.empty': 'Comment should not be empty',
          'string.required': 'Comment is require',
          'string.min': 'Comment should be above 30 characters',
          'string.max': 'Comment should be above 500 characters'
        }),
      commentingTo: Joi.string().required().trim()
        .messages({
          'string.empty': 'Id of comment being commented to should not be empty',
          'string.required': 'Id of comment being commented to is required',
        }),
        commenter: Joi.string().required().trim()
        .messages({
          'string.empty': 'Commenter should not be empty',
          'string.required': 'Commenter is required',
        }),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
  
    return next();
  };