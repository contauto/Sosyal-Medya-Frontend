import React from 'react'

export default function Input(props) {
    const {label,error,name,onChange}=props
    const className=error ? "form-control is-invalid" : "form-control"
  return (
    <div className="form-group mt-2">
    <label>{label}</label>
    <input
      className={className}
      name={name}
      onChange={onChange}
    />
    <div className="invalid-feedback">{error}</div>
  </div>
  )
}
