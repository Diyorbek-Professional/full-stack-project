import express from 'express';
import contact from '../models/contact.js';
const router = express.Router();

router.get('/contacts', (req, res) => {
    contact.find({})
    .then(contacts => res.json(contacts))
    .catch((err) => res.status(400).json(err))
})

router.post('/newContact', (req, res) => {
    const newContact = new contact(req.body)
    newContact.save()
    .then(contact => console.log(contact))
    .catch((err) => res.status(400).json(err));
})
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    contact.findByIdAndDelete({_id: id})
    .then(data => console.log(data))
    .catch(err => console.log(err))
})
router.put('/put/:id', (req, res) => {
    const updateContact = {
        name: req.body.name,
        descr: req.body.descr,
        number: req.body.number
    }

    contact.findByIdAndUpdate({_id: req.params.id}, {$set: updateContact})

    .then(data => console.log(data))
    .catch(err => console.log(err))
})
export default router