import React from 'react'


export default function Loader(show) {

  if(show){
    return (
      <div className="loading"></div>
    )
  } else {
    return (
      <div className="not-loading"></div>
    )
  }

}
