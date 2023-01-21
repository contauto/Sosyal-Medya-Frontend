import React from 'react'

export default function SosView(props) {
    const {sos}=props
  return (
    <div className='card p-1 mb-1'>{sos.content}</div>
  )
}
