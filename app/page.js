import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import User from './components/User'

const Home = async() => {
  const session=await getServerSession(authOptions)
  return (
    <div>
      <p>im server side session!</p>
      <pre>
        {JSON.stringify(session)}


      </pre>
      <p> {session?.user.email} </p>
      <p> {session?.user.password} </p>
      <p> {session?.user.name} </p>
      <hr />
      <User/>



    </div>
    
  )
}

export default Home
