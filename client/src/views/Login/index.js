import React from 'react'
import { withFormik, Field, ErrorMessage, Form } from 'formik'
import axios from 'axios'
import history from '../../history'
import { BASE_API_URL } from '../../config.json'

function Login(props) {
  const { isSubmitting, isValid } = props
  return (
    <Form>
      <div className="row">
        Username:
        <Field
          className="input"
          name="username"
          type="text"
          disabled={isSubmitting}
        />
        <ErrorMessage name="username">
          {(message) => <div className="error">{message}</div>}
        </ErrorMessage>
      </div>
      <div className="row">
        Password:
        <Field
          className="input"
          name="password"
          type="password"
          disabled={isSubmitting}
        />
        <ErrorMessage name="password">
          {(message) => <div className="error">{message}</div>}
        </ErrorMessage>
      </div>

      <div className="row">
        <button
          type="submit"
          className={`submit ${isSubmitting || !isValid ? 'disabled' : ''}`}
          disabled={isSubmitting || !isValid}
        >
          Submit
        </button>
      </div>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues(props) {
    return {
      username: '',
      password: '',
    }
  },
  async validate(values) {
    const errors = {}

    if (!values.username) {
      errors.username = 'Username is required'
    }

    if (!values.password) {
      errors.password = 'Password is required'
    }

    if (Object.keys(errors).length) {
      return errors
    }
  },

  async handleSubmit({ username, password }, formikBag) {
    const config = {
      auth: {
        username,
        password,
      },
    }

    await axios
      .post(`${BASE_API_URL}/login`, {}, config)
      .then((response) => {
        console.log(response)
        formikBag.setSubmitting(false)
        history.push('/profile')
      })
      .catch((error) => {
        formikBag.setSubmitting(false)
        console.error(error.response.data)
      })
  },
})(Login)
