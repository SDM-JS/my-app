import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export async function requireRole(role:string){
    const {orgRole, userId}=await auth()
    if(!userId){
        redirect("/not-authorized")
    }
    if(!role || orgRole!==`org:${role}`){
       redirect("/not-allowed")
    }
    return {userId, role}
}