import React from 'react'
import AppButton from '../components/AppButton';
import { useNavigate } from 'react-router-dom'

const PermissionDenied = () => {
    const navigate = useNavigate();
    const handleGotoDashboard = () => {
        navigate('/dashboard')
    }
    return (
        <div className="flex flex-col w-full h-full items-center justify-around">
            <AppButton title={'Go to Dashboard'} onClick={handleGotoDashboard} className="mt-24" />
            <span className="block p-5">
                You dont have permission to access this page
            </span>
        </div>
    )
}

export default PermissionDenied
