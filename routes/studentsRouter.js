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

router.post('/', async (req, res) => {
    const {name, cohort_id} = req.body
    if ( !name || !cohort_id) {
        res.send({message: "Please add name and cohort id"})
    } else {
        try {
            const [id] = await db('students').insert(req.body)
            const student = await db('students')
                .where({ id })
                .first()
            res.status(201).json(student)    
        } catch(error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const {name, cohort_id} = req.body
    if (!name || !cohort_id) {
        res.send({message: "Please add name and cohort id"})
    } else {
        try {
            const updateStudent = await db('students').update(req.body)
            .where({ id })
            if (updateStudent > 0) {
                const response = await db('students')
                res.status(200).json(response)
            } else {
                res.status(404).json({ message: "No student with this ID exists...bad kitty" })
            }
        } catch(error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await db('students').where({ id }).del()
        if (deleted > 0) {
            res.status(204).end()
        } else {
            res.status(404).json({ message: "No student with this ID exists...bad kitty" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})


module.exports = router