import React from 'react'

const Title = ({Title,subTitle,align,font}) => {
  return (
    <div>
      <h1 className={`${font || "font-playfair"}`}>
    {Title}
      </h1>
      <p>
    {subTitle}
      </p>
    </div>
  )
}

export default Title
