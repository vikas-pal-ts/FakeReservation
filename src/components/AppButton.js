import React from 'react'

const AppButton = ({ title, onClick, className, bgColor, ...props }) => {
    return (
        <button {...props} type="button" className={`px-6 py-2  text-white bg-${bgColor}-600 rounded-lg hover:bg-${bgColor}-900 ${className}`} onClick={onClick}>{title}</button>
    )
}

AppButton.defaultProps = {
    bgColor: 'blue'
}

export default AppButton
