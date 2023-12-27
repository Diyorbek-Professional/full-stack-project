import mongoose from "mongoose";

const schema = mongoose.Schema

const contactSchema = new schema({
    name: String,
    descr: String,
    number: Number
})

const contact = mongoose.model('Contact', contactSchema)

export default contact;