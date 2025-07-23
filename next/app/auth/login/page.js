"use client"
import SubmitButton from "@/components/SubmitButton";
import { useActionState, useContext, useEffect } from "react";
import { login } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AuthContext from "@/context/AuthContext";

export default function Login(){
    const [state,formAction] = useActionState(login,{})
        const router = useRouter()
        const {loginContext} = useContext(AuthContext)
        useEffect(()=>{
              if(state?.error){
            toast.error(state?.error)
        }else if(state?.success){ 
        toast.success(state?.success)
        loginContext(state?.user)
        router.push("/")
        } 
        },[state])
    
    return (
       <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-4">
                    <form action={formAction}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input name="email" type="email" className="form-control" id="email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input name="password" type="password" className="form-control" id="password" />
                        </div>
                        <SubmitButton title="login" />
                    </form>
                </div>
            </div>
        </div>
    )
}