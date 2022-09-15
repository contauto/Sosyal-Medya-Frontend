import React from 'react'

export default function ButtonWithProgress(props) {

const {onClick,pendingApiCall,disabled,text}=props

  return (
    <button
              disabled={disabled}
              className="btn btn-primary mt-2"
              onClick={onClick}
            >
              {pendingApiCall && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              {text}
            </button>
  )
}
