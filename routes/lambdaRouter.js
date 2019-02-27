const router = require('express').Router()
const knex = require('knex')

const knexConfig = require('../knexfile')

const db = knex(knexConfig.development)

router.get('/', async (req, res) => {
    try {
        const cohorts = await db('cohorts')
        res.status(200).json(cohorts)
    } catch(error) {
        res.status(500).json(error)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const cohort = await db('cohorts')
        .where({ id })
        if (cohort.length > 0) {
            return res.status(200).json(cohort)
        } else {
            return res.status(404).json({ message: "The provided ID does not correspond with an existing cohort" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.get('/:id/students', async (req, res) => {
    const id = req.params.id
    try {
        const cohort = await db('cohorts')
        .where({ id })
        console.log(cohort)
        if (cohort.length > 0) {
            const students = await db('students')
            .where({ 'cohort_id': id })
            res.status(200).json(students)
        } else {
            res.status(404).json({message: "No cohort with this id exists"})
        }
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const [id] = await db('cohorts').insert(req.body)
        const cohort = await db('cohorts')
            .where({ id })
            .first()
        res.status(201).json(cohort)    
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.put('/:id', async (req, res) => {
    id = req.params.id
    try {
        const updateCohort = await db('cohorts').update(req.body)
        .where({ id })
        if (updateCohort > 0) {
            const response = await db('cohorts')
            res.status(200).json(response)
        } else {
            res.status(404).json({ message: "No Cohort with this ID exists...bad dog" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.delete('/:id', async (req, res) => {
    id = req.params.id
    try {
        const deleted = await db('cohorts').where({ id }).del()
        if (deleted > 0) {
            res.status(204).end()
        } else {
            res.status(404).json({message: "No Cohort with this ID exists...bad dog"})
        }
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router