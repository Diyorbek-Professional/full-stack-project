import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
function App() {
  const [contact, setContact] = useState({
    name: '',
    descr: '',
    number: ''
  })
  const [contacts, setContacts] = useState([{
    name: '',
    descr: '',
    number: '',
    _id: ''
  }])
  const [isUpdate, setIsUpdate] = useState(false)
  const [updateContact, setUpdateContact] = useState({
    name: '',
    number: '',
    descr: '',
    id: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setContact(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const { name, descr, number } = contact
    const newContact = {
      name,
      descr,
      number
    }
    axios.post('http://localhost:5000/newContact', newContact)
    toast.success('Contact student was added succesfully')
    setContact({
      name: '',
      descr: '',
      number: ''
    })
  }

  const deleteContact = (id) => {
    axios.delete('http://localhost:5000/delete/' + id);
    toast.error('Contact was deleted succesfully')
  }

  const updateHandler = (id) => {
    setIsUpdate(true)
    setUpdateContact(prev => {
      return{
        ...prev,
        id: id
      }
    })
  }

  const updateContactHandler = (id) => {
    axios.put('http://localhost:5000/put/' + id, updateContact)
    toast.update('Contact was updated succesfully')
  }

  const handleUpdate = (e) => {
    const { name, value } = e.target
    setUpdateContact(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  useEffect(() => {
    fetch('http://localhost:5000/contacts')
    .then(res => {
      if (res.ok) {
        return res.json()
      }
    })
    .then(result => setContacts(result))
    .catch(err => console.log(err))
  }, [contacts])
  return (
    <>
      <ToastContainer />
      <Navbar />
      <button></button>
      {!isUpdate ? (
        <form className='w-50 m-auto mb-4'>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Enter Your Name</label>
            <input onChange={handleChange} type="text" className="form-control" id="name" name='name' value={contact.name}/>
          </div>
          <div className="mb-3">
            <label htmlFor="number" className="form-label">Enter Your Number</label>
            <input onChange={handleChange} type="number" className="form-control" id="number" name='number' value={contact.number}/>
          </div>
          <label htmlFor="descr" className="form-label">Description</label>
          <div className="form-floating mb-3">
            <textarea onChange={handleChange} value={contact.descr} className="form-control" id="descr" name='descr'></textarea>
          </div>
          <button onClick={submitHandler} type="submit" className="btn btn-primary">Submit</button>
        </form>

      ) : (
        <form className='w-50 m-auto mb-4'>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Enter Your Name</label>
            <input onChange={handleUpdate} type="text" className="form-control" id="name" name='name' value={updateContact.name}/>
          </div>
          <div className="mb-3">
            <label htmlFor="number" className="form-label">Enter Your Number</label>
            <input onChange={handleUpdate} type="number" className="form-control" id="number" name='number' value={updateContact.number}/>
          </div>
          <label htmlFor="descr" className="form-label">Description</label>
          <div className="form-floating mb-3">
            <textarea onChange={handleUpdate} value={updateContact.descr} className="form-control" id="descr" name='descr'></textarea>
          </div>
          <button onClick={() => updateContactHandler(updateContact.id)} type="submit" className="btn btn-primary">Change</button>
        </form>
      )}
      
            <table className="container w-50 table-hover table-striped table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Number</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
            <tbody>
              {contacts.map((item, index) =>{
                return(
                  <tr key={item._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.number}</td>
                    <td>{item.descr}</td>
                    <td>
                      <button onClick={() => deleteContact(item._id)} className='btn btn-outline-danger mx-1'>Delete</button>
                      <button className='btn btn-outline-success' onClick={() => updateHandler(item._id)}>Update</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
    </>
  );
}

export default App;
