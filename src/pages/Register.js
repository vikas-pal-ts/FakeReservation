import React, { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import AppButton from '../components/AppButton'
import AppInput from '../components/AppInput'
import AppInputLabel from '../components/AppInputLabel'
import AppLink from '../components/AppLink'
import { AppContext } from '../context/AppContext'
import Api from '../utils/Api';
import UniqueId from '../utils/UniqueId'

const ErrorMessage = {
    Name: 'Please enter valid name',
    Phone: 'Please enter valid phone no.',
    Email: 'Please enter valid email',
    Password: 'Please enter atleast 6 digit password',
    ConfPassword: 'Password not matched'
}

const Register = () => {
    const [inputs, setInputs] = useState({});
    const { setUser } = useContext(AppContext);
    const [errors, setErrors] = useState({
        Name: { isValid: false, msg: ErrorMessage.Name },
        Phone: { isValid: false, msg: ErrorMessage.Phone },
        Email: { isValid: false, msg: ErrorMessage.Email },
        Password: { isValid: false, msg: ErrorMessage.Password },
        ConfPassword: { isValid: false, msg: ErrorMessage.ConfPassword },
        isFormValid: false,
        errorText: 'All fields are required'
    });
    let navigate = useNavigate();
    const inputValidation = (name, value) => {
        switch (name) {
            case "Name":
                errors[name] = { isValid: value.length >= 2, msg: ErrorMessage.Name };
                break;
            case "Phone":
                errors[name] = { isValid: value.length === 10, msg: ErrorMessage.Phone };
                break;
            case "Email":
                let pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                errors[name] = { isValid: pattern.test(value), msg: ErrorMessage.Email };
                break;
            case "Password":
                errors[name] = { isValid: value.length >= 5, msg: ErrorMessage.Password };
                // errors[name] = { isValid: value == inputs.Password, msg: ErrorMessage.ConfPassword };
                break;
            case "ConfPassword":
                errors[name] = { isValid: value === inputs.Password, msg: ErrorMessage.ConfPassword };
                break;
            default:
                break;
        }
        errors.isFormValid = errors.Name.isValid && errors.Phone.isValid && errors.Email.isValid && errors.Password.isValid
        errors.errorText = ''
        setErrors({ ...errors })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onChangeHandler = useCallback(
        ({ target: { name, value } }) => {
            setInputs(state => ({ ...state, [name]: value }), [])
            inputValidation(name, value)
        }
    );
    const handleSubmit = async () => {
        const userData = {
            "id": UniqueId(),
            "name": inputs.Name,
            "email": inputs.Email,
            "password": inputs.Password,
            "phoneNumber": inputs.Phone,
            "role": "user"
        }
        const addData = await Api.post('/users', userData)
        if (addData.status === 201) {
            setUser(addData?.data)
            errors.errorText = 'Registered Successfully!'
            setErrors({ ...errors })
            setTimeout(() => {
                navigate('/dashboard')
            }, 1500);

        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">Register your account</h3>
                <AppInputLabel title={errors.errorText} size={'base'} className={'text-green-700 text-center block mt-5'} />
                <div className="mt-4">
                    <div>
                        <AppInput onChange={onChangeHandler} inputsData={inputs} type="text" placeholder="Name" label="Name" errorText={!errors['Name'].isValid ? errors['Name'].msg : ''} />
                    </div>
                    <div className="mt-4">
                        <AppInput onChange={onChangeHandler} inputsData={inputs} type="number" placeholder="Phone" label="Phone No." name="Phone" errorText={!errors['Phone'].isValid ? errors['Phone'].msg : ''} />
                    </div>
                    <div className="mt-4">
                        <AppInput onChange={onChangeHandler} inputsData={inputs} type="email" placeholder="Email" label="Email" errorText={!errors['Email'].isValid ? errors['Email'].msg : ''} />
                    </div>
                    <div className="mt-4">
                        <AppInput onChange={onChangeHandler} inputsData={inputs} type="password" placeholder="Password" label="Password" errorText={!errors['Password'].isValid ? errors['Password'].msg : ''} />
                    </div>
                    <div className="mt-4">
                        <AppInput onChange={onChangeHandler} inputsData={inputs} value={inputs.confPassword} type="password" placeholder="Confirm Password" label="Confirm Password" name="ConfPassword" errorText={!errors['ConfPassword'].isValid ? errors['ConfPassword'].msg : ''} />
                        {/* <AppInputLabel title={'* Required'} className={'text-red-700'} size={'xs'} /> */}
                    </div>
                    <div className="flex items-baseline justify-between">
                        <AppButton title={'Register'} disabled={!errors.isFormValid} onClick={handleSubmit} className="disabled:opacity-100 mr-2 mt-4" />
                        <AppLink title={'Already have an account?'} href="/login" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
