import React, { useState } from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'



const Login = (props) => {
  
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    errors: {}
  })


  function handleChange(e) {
    e.persist()
    setData(data => ({ ...data, [e.target.name]: e.target.value }))
    setErrors(err => ({ ...err, [e.target.name]: '' }))
  }


  function handleSubmit(e) {
    e.persist()
    e.preventDefault()
    axios.post('/api/login', data)
      .then(res => {
        Auth.setToken(res.data.token)
        Auth.setUser(res.data.user)
        // console.log(res.data.token)
        console.log(Auth.getUser())
        props.history.push('/communities')
      })
      .catch(err => setErrors({ ...errors, errors: err.data }))
  }


  return <section className="section">
    <div className="container">
      <div className="title">Login</div>
      {/* Form to complete registration */}
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        {/* We use bulma field, label and control classes for nice forms */}
        <div className="field">
          <label htmlFor="" className="label">
            Email
          </label>
          <div className="control">
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="email"
              className="input"
            />
          </div>
          {/* {this.state.errors.email && <small className="help is-danger">
            {this.state.errors.email}
          </small>} */}
        </div>
        <div className="field">
          <label htmlFor="" className="label">
            password
          </label>
          <div className="control">
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="password"
              className="input"
            />
          </div>
          {/* {this.state.errors.username && <small className="help is-danger">
            {this.state.errors.username}
          </small>} */}
        </div>
       
        <button className='button is-success'>
          Login
        </button>
      </form>
    </div>
  </section>

}



export default Login