import React from "react";

export default function ButtonWithProgress(props) {
  const { onClick, pendingApiCall, disabled, text, className } = props;

  return (
    <button
      disabled={disabled}
      className={className || "btn btn-primary mt-2"}
      onClick={onClick}
    >
      {pendingApiCall && (
        <span className="spinner-border spinner-border-sm"></span>
      )}
      {text}
    </button>
  );
}
