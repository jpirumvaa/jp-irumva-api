import Joi from '@hapi/joi'

export const messagesValidation = async (req, res, next) => {
    const schema = Joi.object({
        message: Joi.string().required().trim().min(30).max(500)
            .messages({
                'string.base': 'Message should be a string',
                'string.required': 'Message is require',
                'string.min': 'Message should be above 30 characters',
                'string.max': 'Message should be above 500 characters'
        }),
        name: Joi.string().required().trim()
            .messages({
            'string.required': 'Message sender is required',
        }),
        email: Joi.string().required().trim()
        .messages({
          'string.required': 'Email is required',
        }),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
  
    return next();
  };