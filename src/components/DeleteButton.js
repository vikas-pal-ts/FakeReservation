import React from 'react'
import Api from '../utils/Api'
import AppButton from './AppButton'

const DeleteButton = ({ title, id, apiEndPoint, callback }) => {
    const handleOnClick = async () => {
        await Api.delete(`${apiEndPoint}/${id}`);
        callback()
    }
    return (
        <AppButton title={title} bgColor={'red'} onClick={handleOnClick} className="" />
    )
}

DeleteButton.defaultProps = {
    title: 'Delete',
    callback: () => { }
}

export default DeleteButton
