"use client"
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"

const AdminDashboard = () => {
    const {session}=useSession()
    const router=useRouter()





    useEffect(() => {
        if (session?.status === 'unauthenticated') {
           router.push('/register') 
        }
    })
 
  return (
    <div>
        admin here



    </div>
  )
}

export default AdminDashboard