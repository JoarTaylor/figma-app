import React from 'react'

export default function Button({callback, children, disabled}) {
  return (
    <button
          onClick={callback}
          className=" p-2 bg-green-400 rounded-lg text-white font-bold text-sm"
        >{children}
        </button>
  )
}
