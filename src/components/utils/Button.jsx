import React from 'react'

export default function Button({callback, children, disabled}) {
  return (
    <button
          onClick={callback}
          className=" p-4 bg-teal-900 rounded-lg text-white font-bold mt-5"
        >{children}
        </button>
  )
}
