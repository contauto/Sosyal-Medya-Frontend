import React, { useState } from 'react'
import "./AutoUploadImage.css"
import { useTranslation } from 'react-i18next'

export default function AutoUploadImage({image,uploading,width}) {
  const [error,setError]=useState(false)
  const {t}=useTranslation()

  const onError=event=>{
    event.target.style.display='none'
  setError(true)
  }

  return (
    <div style={{ position: 'relative' }}>
      <img  className="img-thumbnail" width={width} src={image} alt="sos-attachment"onError={onError}/>
      {error&&<>{t("Attachment")}</>}
      <div className="overlay" style={{ opacity: uploading ? 1 : 0 }}>
        <div className="d-flex justify-content-center h-100">
          <div className="spinner-border text-light m-auto">
            <span className="sr-only"></span>
          </div>
        </div>
      </div>
    </div>
  )
}
