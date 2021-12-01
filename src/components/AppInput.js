import React from 'react'
import AppInputLabel from './AppInputLabel'
const AppInput = ({ type, placeholder, label, className, inputsData, value, name, errorText, width, ...props }) => {
    return (
        <>
            <AppInputLabel title={label} className={'block'} />
            <input {...props} defaultValue={inputsData ? inputsData[label] : value} name={name ? name : label} type={type} placeholder={placeholder} className={`lg:w-${width} w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white ${className}`} />
            {errorText && (
                <AppInputLabel title={errorText} className={'text-red-700'} size={'xs'} />
            )}

        </>
    )
}

AppInput.defaultProps = {
    type: 'text',
    placeholder: '',
    label: '',
    width: 'full'
}

export default AppInput
