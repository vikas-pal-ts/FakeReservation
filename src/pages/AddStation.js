import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import AppButton from '../components/AppButton'
import AppInput from '../components/AppInput'
import AppInputLabel from '../components/AppInputLabel'
import Sidebar from '../components/Sidebar'
import Api from '../utils/Api'
import UniqueId from '../utils/UniqueId'

const ErrorMessage = {
    stationName: 'Please enter valid name',
}

const AddStation = () => {
    const [data, setdata] = useState({});
    let navigate = useNavigate();
    const [errors, setErrors] = useState({
        stationName: { isValid: false, msg: ErrorMessage.stationName },
        isFormValid: false,
        errorText: ''
    });

    const inputValidation = (name, value) => {
        switch (name) {
            case "stationName":
                errors[name] = { isValid: value.length >= 2, msg: ErrorMessage.stationName };
                break;
            default:
                break;
        }
        errors.isFormValid = errors.stationName.isValid
        errors.errorText = ''
        setErrors({ ...errors })
    }

    const handleSubmit = async () => {
        const postdata = {
            "id": UniqueId(),
            "stationName": data.stationName,
        }
        const addData = await Api.post('/stations', postdata)
        if (addData.status === 201) {
            errors.errorText = 'Station Added Successfully!';
            setErrors({ ...errors })
            setTimeout(() => {
                navigate('/stations-list')
            }, 1500);
        }

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onChangeHandler = useCallback(
        ({ target: { name, value } }) => {
            inputValidation(name, value)
            return setdata(state => ({ ...state, [name]: value }), [])
        }
    )
    return (
        <Sidebar pageTitle={'Add Station'}>
            <div className="flex items-center justify-center bg-gray-100">
                <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                    <AppInputLabel title={errors.errorText} size={'base'} className={'text-green-700 text-center block mt-5'} />
                    <div className="mt-4 flex flex-row flex-wrap lg:gap-5">
                        <div className="mt-4">
                            <AppInput errorText={!errors['stationName'].isValid ? errors['stationName'].msg : ''} type="text" placeholder="Station Name" label="Station Name" onChange={onChangeHandler} name="stationName" />
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <AppButton title={'Add Station'} onClick={handleSubmit} className="mt-4" disabled={!errors.isFormValid} />
                    </div>
                </div>
            </div>
        </Sidebar>
    )
}

export default AddStation
