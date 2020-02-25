const express = require("express")
const router = express.Router()
const db = require("../data/helpers/projectModel")


//Get all projects
router.get('/', (req, res, next) => {
    db.get()
        .then(response => res.json(response))
        .catch(err => next(err))
})

// //Get project by ID
router.get('/:id', (req, res, next) => {
    const { id } = req.params
    db.get(id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

// //Get all actions for a project by ID
router.get('/:id/actions', (req, res, next) => {
    const { id } = req.params
    db.getProjectActions(id)
        .then(response => res.json({actions: response}))
        .catch(err => next(err))
})

//Create a new project
router.post('/post', (req, res, next) => {
    db.insert(req.body)
        .then(response => res.status(201).json({newBody: response}))
        .catch(err => next(err))
})

//Destroy a project
router.delete('/:id', (req, res, next) => {
    db.remove(req.params.id)
        .then(numRemoved => {
            if (numRemoved === 0) {
                res.status(404).json({errorMessage: "Project could not be found"})
            } else {
                res.json({message: "Project successfully removed"})
            }
        })
        .catch(err => next(err))
})

//Update a project
router.put('/:id', (req, res, next) => {
    const id  = req.params.id
    const changes = req.body
    if (!changes.name || !changes.description) {
        res.status(400).json({message: "Please provide a name and description"})
    } else {
        db.update(id, changes)
            .then(response => {
                if (response) {
                    res.json(response)
                } else {
                    res.status(404).json({errorMessage: "Project ID does not exist"})
                }
            })
            .catch(err => next(err))
    }    
})


module.exports = router