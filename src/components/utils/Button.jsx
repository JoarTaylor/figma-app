import React from 'react'

export default function Button({callback, children, disabled}) {
  return (
    <button
          onClick={callback}
          className="rounded bg-green-400 p-2 text-white hover:bg-green-600 w-20 text-center"
        >{children}
        </button>
  )
}
