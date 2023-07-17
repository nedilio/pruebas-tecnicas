﻿import React from 'react'
interface TitleProps {
  text: string
}

const Title = ({text}:TitleProps) => {
  return (
    <h1>{text}</h1>
  )
}

export default Title