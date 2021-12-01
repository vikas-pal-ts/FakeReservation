import React, { useCallback, useContext, useState } from 'react'
import AppButton from '../components/AppButton'
import AppInput from '../components/AppInput'
import AppLink from '../components/AppLink'
import { useNavigate } from 'react-router-dom'
import Api from '../utils/Api'
import { AppContext } from '../context/AppContext'
import AppInputLabel from '../components/AppInputLabel'

const ErrorMessage = {
    Email: 'Email Not Valid',
    Password: 'Please enter atleast 6 digit password'
}

const Login = () => {
    let navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({
        Email: { isValid: false, msg: '' },
        Password: { isValid: false, msg: '' },
        isFormValid: false,
        errorText: 'All fields are required'
    });
    const { setUser } = useContext(AppContext);
    const apiEndPoint = '/users'

    const inputValidation = (name, value) => {
        switch (name) {
            case "Email":
                let pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                errors[name] = { isValid: pattern.test(value), msg: ErrorMessage.Email };
                break;
            case "Password":
                errors[name] = { isValid: value.length >= 5, msg: ErrorMessage.Password };
                break;
            default:
                break;
        }
        errors.isFormValid = errors.Email.isValid && errors.Password.isValid
        errors.errorText = ''
        setErrors({ ...errors })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onChangeHandler = useCallback(
        ({ target: { name, value } }) => {
            inputValidation(name, value)
            return setInputs(state => ({ ...state, [name]: value }), [])
        }
    );

    const handleLogin = async () => {
        try {
            const { data } = await Api.get(`${apiEndPoint}?email=${inputs?.Email}&password=${inputs?.Password}`);
            if (data.length >= 1) {
                setUser(data[0])
                navigate('/dashboard')
            } else {
                errors.errorText = 'No User Found!'
            }

        } catch (error) {
            errors.errorText = error.message
        }
        setErrors({ ...errors })

    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">Login to your account</h3>
                <AppInputLabel title={errors.errorText} size={'base'} className={'text-red-700 text-center block mt-5'} />
                <form autoComplete="random-string">
                    <div className="mt-4">
                        <div className="">
                            <AppInput type="email" placeholder="Email" label="Email" onChange={onChangeHandler} inputsData={inputs} errorText={!errors['Email'].isValid ? errors['Email'].msg : ''} />
                        </div>
                        <div className="mt-4">
                            <AppInput type="password" placeholder="Password" label="Password" onChange={onChangeHandler} inputsData={inputs} errorText={!errors['Password'].isValid ? errors['Password'].msg : ''} />
                        </div>
                        <div className="flex items-baseline justify-between">
                            <AppButton disabled={!errors.isFormValid} title={'Login'} onClick={handleLogin} className="mt-4" />
                            <AppLink title={'Not registered?'} href='/register' />
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login
