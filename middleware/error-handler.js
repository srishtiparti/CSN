//const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        // set default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later'
    }

    // if (err instanceof CustomAPIError) {
    //     return res.status(err.statusCode).json({ msg: err.message })
    // }

    // Validation Error
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map((item) => item.message).join(', ')
        customError.statusCode = 400
    }

    // Cast Error
    if (err.code && err.code === 'CastError') {
        customError.msg = `Duplicate value entered for id:${err.value}`
        customError.statusCode = 404
    }

    // Duplicate Errors
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate  value entered for ${Object.keys(err.keyValue)} field, please choose another vale`
        customError.statusCode = 400
    }
    return res.status(customError.statusCode).json({ msg: customError.msg })

}

module.exports = errorHandlerMiddleware