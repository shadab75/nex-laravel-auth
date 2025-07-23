"use server";
import { cookies } from "next/headers";
function handleError(message){
    const errors = []
    Object.keys(message).map(key=>{
        message[key].map(error=>{
            errors.push(error)
        })
    })
    return errors.join()
}
async function register(state, formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (email === '' || password === '' || name === '') {
        return {
            error: "name, email and password is required"
        }
    }

    if (password !== confirmPassword) {
        return {
            error: "Passwords do not match!"
        }
    }
    const res = await fetch("http://localhost:8000/api/register",{
        cache:'no-store',
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name:name,
            email:email,
            password:password,
            c_password:confirmPassword
        })
    })
    const data = await res.json()
     
    if(res.ok){
            (await cookies()).set({
            name: 'token',
            value: data.token,
            httpOnly: true
        })
        return {
            success:"You are registered"
        }
    }else{
    return {
        error:handleError(data)
    }
    
    }
    
    
}
async function login(state, formData) {
  
    const email = formData.get('email');
    const password = formData.get('password');
   

    if (email === '' || password === '') {
        return {
            error: "email and password is required"
        }
    }

    const res = await fetch("http://localhost:8000/api/login",{
        cache:'no-store',
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:email,
            password:password
        })
    })
    const data = await res.json()
    if(res.ok){
     
              (await cookies()).set({
            name: 'token',
            value: data.token,
            httpOnly: true
        })
        return {
            success:"You are logged in",
            user:data.user
        }
    }else{
    return {
        error:handleError(data)
    }
    
    }
    
}
async function me(){
    const token =   (await cookies()).get('token')
    if(!token){
        return {
            error:"Not Authenticated"
        }
    }
    const res = await fetch('http://localhost:8000/api/me',{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${token.value}`,
            'Accept':'application/json'
        }
    }) 
    const data = await res.json()
    if(res.ok){
        return {
            user:data.user
        }
    }else{
        return {
            error:"User Forbidden"
        }
    }
    
}
async function logout(){
    const token = (await cookies()).get('token')
   
    const res = await fetch('http://localhost:8000/api/logout',{
        method:'POST',
        headers:{
            'Authorization':`Bearer ${token.value}`,
            'Accept':'application/json'
        }
    }) 
    const data = await res.json()
    if(res.ok){
        (await cookies()).delete('token')
        return {
            success:"You are logged out"
        }
    }else{
        return {
            error:"User Forbidden"
        }
    }
    
}

export { login,register,me,logout }