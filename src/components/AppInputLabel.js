import React from 'react'

const AppInputLabel = ({title, className, size}) => {
    return (
        <label className={`text-${size} ${className}`}>{title}</label>
    )
}

AppInputLabel.defaultProps = {
    size:'medium',
    title:'',
    className: ''
}

export default AppInputLabel
