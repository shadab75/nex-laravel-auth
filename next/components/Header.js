"use client"

import { logout } from "@/actions/auth";
import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Header() {
    const { user,logoutContext } = useContext(AuthContext);
    const router = useRouter()
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link href="/" className="navbar-brand">
                    webprog.io
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link href="/" className="nav-link active">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/posts" className="nav-link">
                                Posts
                            </Link>
                        </li>
                    </ul>

                    <div className="d-flex">
                        {user ? (
                            <>
                                <span className='me-3'>{user.name}</span>
                                <button
                                onClick={async()=>{
                                    await logout()
                                    logoutContext()
                                    router.push("/")
                                }}
                                className="btn btn-sm btn-dark me-2">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/login" className="btn btn-sm btn-outline-secondary me-2">
                                    Login
                                </Link>
                                <Link href="/auth/register" className="btn btn-sm btn-dark">
                                    register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}