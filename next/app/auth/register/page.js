"use client"
import { register } from "@/actions/auth"
import SubmitButton from "@/components/SubmitButton";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from 'react';
import { toast } from "react-toastify";
export default function Register(){
    const router = useRouter()
    const [state,formAction] = useActionState(register,{})
    useEffect(()=>{
          if(state?.error){
        toast.error(state?.error)
    }else if(state?.success){ 
    toast.success(state?.success)
    router.push("/auth/login")
    } 
    },[state])
    
    return (
        
         <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-4">
                    <form action={formAction}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input name="name" type="text" className="form-control" id="name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input name="email" type="email" className="form-control" id="email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input name="password" type="password" className="form-control" id="password" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input name="confirmPassword" type="password" className="form-control" id="confirmPassword" />
                        </div>
                     <SubmitButton title="register"/>
                    </form>
                </div>
            </div>
        </div>
    )
}