import React from 'react'
import { useNavigate } from 'react-router';
import { BackSvg } from '../svg'
import AppButton from './AppButton'

const AppPageTitle = ({ title }) => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1)
    }
    return (
        <div className="flex-row items-center justify-center lg:flex">
            <AppButton className="pl-0 pr-5 pt-0 pb-0" title={BackSvg} bgColor={'gray-10'} onClick={handleBack} />
            <span className="text-2xl font-semibold">{title}</span>
        </div>
    )
}

export default AppPageTitle
