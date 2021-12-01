import React from 'react'
import { Link } from 'react-router-dom'

const AppLink = ({ title, href, ...props }) => {
    return (
        <Link to={href} {...props} className="text-sm text-blue-600 hover:underline">{title}</Link>
    )
}

AppLink.defaultProps = {
    title: '',
    href: ''
}

export default AppLink
