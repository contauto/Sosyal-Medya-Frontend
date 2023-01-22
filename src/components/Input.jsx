import React from "react";

export default function Input(props) {
  const { label, error, name, onChange, type, defaultValue, accept } = props;
  let className = "form-control is-invalid";
  if (error === undefined) {
    className = "form-control";
  }
  return (
    <div className="form-group mt-2">
      <label className="mb-1">{label}</label>
      <input
        className={className}
        name={name}
        onChange={onChange}
        type={type}
        defaultValue={defaultValue}
        accept={accept}
      />
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
}
