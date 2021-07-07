const express = require("express")
const router = express.Router()
const db = require('../data/helpers/actionModel')

//Get all actions
router.get('/', (req, res, next) => {
    db.get()
        .then(response => res.json(response))
        .catch(err => next(err))
})

//Get action by ID
router.get('/:id', (req, res, next) => {
    const { id } = req.params
    db.get(id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

//Create action
router.post('/:id/post', (req, res, next) => {
    const newAction = {
        ...req.body,
        project_id: req.params.id
    }

    db.insert(newAction)
        .then(response => {
            if (response.description.length > 120){
                res.status(400).json({message: "Description must be less than 120 characters"})            
            } else {
                res.status(201).json({newAction: response})
            }})
        .catch(err => next(err))
})

//Delete an action
router.delete('/:id', (req, res, next) => {
    db.remove(req.params.id)
        .then(numRemoved => {
            if (numRemoved === 0) {
                res.status(404).json({errorMessage: "Action could not be found"})
            } else {
                res.json({message: "Action successfully removed"})
            }
        })
        .catch(err=>next(err))
})

//update an action
router.put('/:id', (req, res, next) => {
    const { id } = req.params
    const changes = req.body
    if (changes.description.length > 120){
        res.status(400).json({message: "Description must be less than 120 characters"})      
    } else if (!changes.project_id || !changes.notes){
        res.status(400).json({message: "Please provide a project Id and notes"})
    } else {
        db.update(id, changes)
            .then(response => {
                if (!id){
                    res.status(404).json({errorMessage: "Project ID does not exist"})
                } else {
                    res.json({updatedAction: response})
                }
            })
            .catch(err => next(err))
    }
})


module.exports = router