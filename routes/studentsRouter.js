const router = require('express').Router()
const knex = require('knex')

const knexConfig = require('../knexfile')

const db = knex(knexConfig.development)

router.get('/', async (req, res) => {
    try {
        const students = await db('students')
        res.status(200).json(students)
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const student = await db('students')
        .where({ id })
        if (student.length > 0) {
            return res.status(200).json(student)
        } else {
            return res.status(404).json({ message: "No student with this ID exists...bad kitty" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})


module.exports = router