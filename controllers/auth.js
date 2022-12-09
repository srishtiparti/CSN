const User = require("../models/User")
const Insurer = require("../models/Insurer")
const jwt = require('jsonwebtoken')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const bcrypt = require('bcryptjs')
const { slice } = require("lodash")


const login = async(req, res) => {
    try {
        const { username, password, model, insurer } = req.body

        if (!username && !password) {
            throw new BadRequestError('Please provide username and password')
        }
        const user = await User.findOne(({ username: username }))
        if (user && password == user.password) {
            const token = jwt.sign({ id: user._id, username, model, insurer }, process.env.JWT_SECRET, { expiresIn: '20d' })
            res.status(200).json(token)
        } else {
            throw new UnauthenticatedError('Please provide valid username and password')
        }
    } catch (error) {
        res.status(500).json({ msg: error })

    }

}

const displayusers = async(req, res) => {
    try {
        const user = await User.find({})
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
const getInsurers = async(req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json('No Token provided', 401)
    }
    try {

        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { username, model, insurer } = decoded

        const licensee = await User.findOne({ username })
        const allModels = String(licensee).split('Certifications:')[1].toLowerCase()
        if (allModels.includes(model.toLowerCase())) {
            const data = await Insurer.findOne({ insurer })
            const { _id, Paint, Mechanical, Bodywork } = data
            paintPrice = parseFloat(Paint) * 1.10;
            mechanicalPrice = parseFloat(Mechanical) * 1.10;
            bodyworkPrice = parseFloat(Bodywork) * 1.10

            insuranceData = {
                _id: _id,
                Insurer: insurer,
                Paint: paintPrice,
                Mechanical: mechanicalPrice,
                Bodywork: bodyworkPrice
            }
            res.status(200).json({ insuranceData })

        } else {
            const insuranceData = await Insurer.findOne({ insurer })
            res.status(200).json({ insuranceData })
        }
    } catch (error) {
        res.status(500).json({ msg: error })

    }

}

const createInsurer = async(req, res) => {
    try {

        const insurer = await Insurer.create(req.body)
        res.status(201).json({ insurer })
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}

module.exports = { login, getInsurers }