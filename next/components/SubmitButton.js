"use client";

import { useFormStatus } from 'react-dom'

export default function SubmitButton({ title }) {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} type="submit" className="btn btn-primary">
            {title}
            {pending && <div className="spinner-border spinner-border-sm ms-2"></div>}
        </button>
    )
}