'use client'
export default function Error({error,reset}){
    return (
        <div>
            <h2>Something went wrong! - {error.message}</h2>
            <button
            onClick={
                ()=>reset()
            }
            >
            Try Again    
            </button>
        </div>
    )
}