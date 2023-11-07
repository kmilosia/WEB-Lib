import React from 'react'

function FooterAnchor(props) {
  return (
    <a href={props.path} target='_blank' className='my-1 mr-1 h-9 opacity-90 hover:opacity-100'><img className='h-full' src={props.url}></img></a>
    )
}

export default FooterAnchor