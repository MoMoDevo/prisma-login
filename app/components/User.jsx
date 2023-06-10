"use client"
import React from 'react'
 import { useSession } from 'next-auth/react'

const User = () => {
    const {data:session}=useSession()
  return (
    <div>
       <pre> {JSON.stringify(session)} </pre>

    </div>
  )
}

export default User