import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router'

const Loader = () => {
  const { navigate } = useAppContext()
  const { nextUrl } = useParams()

  useEffect(() => {
    if (nextUrl) {
      const timer = setTimeout(() => {
        navigate(`/${nextUrl}`)
      }, 8000) 
      return () => clearTimeout(timer)
    }
  }, [nextUrl])

  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p className="loading-text">Redirecting, please wait...</p>
    </div>
  )
}

export default Loader
