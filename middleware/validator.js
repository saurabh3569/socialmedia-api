const { check, validationResult } = require('express-validator');

const validate = (paramName) => {
    return check(paramName).trim().notEmpty().withMessage(`${paramName} is required`)
};


const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}


module.exports = {
    validate,
    checkValidation
};      