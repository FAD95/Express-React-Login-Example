import React from 'react'
import { withFormik, Field, ErrorMessage, Form } from 'formik'
import axios from 'axios'
import { BASE_API_URL } from '../../config.json'


const transformRequest = (jsonData = {}) =>
  Object.entries(jsonData)
    .map((x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    .join('&')

function Signup(props) {
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
        Email:
        <Field
          className="input"
          name="email"
          type="email"
          disabled={isSubmitting}
        />
        <ErrorMessage name="email">
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
        Confirm Password:
        <Field
          className="input"
          name="passwordConfirmation"
          type="password"
          disabled={isSubmitting}
        />
        <ErrorMessage name="passwordConfirmation">
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
      email: 'me@example.com',
      password: '',
      passwordConfirmation: '',
    }
  },
  async validate(values) {
    const errors = {}

    if (!values.username) {
      errors.username = 'Username is required'
    }

    if (!values.email) {
      errors.email = 'Email is required'
    } else if (values.email === 'me@example.com') {
      errors.email = 'Email must be different from me@example.com'
    }

    if (!values.password) {
      errors.password = 'Password is required'
    } else if (values.password.length < 8) {
      errors.password = 'Password must be longer than 8 characters'
    }

    if (!values.passwordConfirmation) {
      errors.passwordConfirmation = 'Please confirm password'
    } else if (values.password !== values.passwordConfirmation) {
      errors.passwordConfirmation = 'Passwords must be the same'
    }

    if (Object.keys(errors).length) {
      return errors
    }
  },

  async handleSubmit(
    { username, email, password, passwordConfirmation },
    formikBag
  ) {
    const requestBody = {
      password,
      passwordConfirmation,
      email,
      username,
    }

    const transformedRequest = transformRequest(requestBody)

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }

    try {
      const response = await axios.post(
        `${BASE_API_URL}/signup`,
        transformedRequest,
        config
      )
      console.log(response)
      formikBag.setSubmitting(false)
    } catch (error) {
      console.error(error)
    }
  },
})(Signup)
