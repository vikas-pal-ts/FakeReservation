import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import AppButton from '../components/AppButton'
import AppInput from '../components/AppInput'
import AppInputLabel from '../components/AppInputLabel'
import Sidebar from '../components/Sidebar'
import { AppContext } from '../context/AppContext'
import Api from '../utils/Api'
import UniqueId from '../utils/UniqueId'

const ErrorMessage = {
    station: 'Please select valid Station',
    journeyStartDate: 'Please select valid Journey Start date',
    journeyEndDate: 'Please select valid Journey End date',
    source: 'Please select valid Source',
    destination: 'Please select valid Destination'
}

const PlanJourney = () => {
    const [inputData, setinputData] = useState({})
    const [sourceData, setSourceData] = useState([])
    const [destinationData, setDestinationData] = useState([])
    const [stationData, setStationData] = useState([])
    const [errors, setErrors] = useState({
        station: { isValid: false, msg: ErrorMessage.station },
        journeyStartDate: { isValid: false, msg: ErrorMessage.journeyStartDate },
        journeyEndDate: { isValid: false, msg: ErrorMessage.journeyEndDate },
        source: { isValid: false, msg: ErrorMessage.source },
        destination: { isValid: false, msg: ErrorMessage.destination },
        isFormValid: false,
        errorText: ''
    });
    const { getUser } = useContext(AppContext)
    let navigate = useNavigate();

    const inputValidation = (name, value) => {
        switch (name) {
            case "station":
                errors[name] = { isValid: value.length >= 2, msg: ErrorMessage.station };
                break;
            case "journeyStartDate":
                errors[name] = { isValid: value.length >= 2, msg: ErrorMessage.journeyStartDate };
                break;
            case "journeyEndDate":
                errors[name] = { isValid: value.length >= 2, msg: ErrorMessage.journeyEndDate };
                break;
            case "source":
                errors[name] = { isValid: value.length >= 2, msg: ErrorMessage.source };
                break;
            case "destination":
                errors[name] = { isValid: value.length >= 2, msg: ErrorMessage.destination };
                break;
            default:
                break;
        }
        errors.isFormValid = errors.station.isValid && errors.journeyStartDate.isValid && errors.journeyEndDate.isValid && errors.source.isValid && errors.destination.isValid
        errors.errorText = ''
        setErrors({ ...errors })
    }

    const getSourceList = async () => {
        const data = await Api.get('/source')
        setSourceData(data?.data)
    }
    const getDestinationList = async () => {
        const data = await Api.get('/destination')
        setDestinationData(data?.data)
    }
    const getStationList = async () => {
        const data = await Api.get('/stations')
        setStationData(data?.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onChangeHandler = useCallback(
        ({ target: { name, value } }) => {
            inputValidation(name, value)
            return setinputData(state => ({ ...state, [name]: value }), [])
        }
    );
    const handleSubmit = async () => {
        const userData = {

            "id": UniqueId(),
            "source": inputData.source,
            "destination": inputData.destination,
            "journeyDate": `${inputData.journeyStartDate} - ${inputData.journeyEndDate}`,
            "userName": getUser()?.name,
            "stationName": inputData.station,
            "userId": getUser()?.id
        }
        const addData = await Api.post('/booking', userData)
        if (addData.status === 201) {
            errors.errorText = 'Entry Added Successfully!'
            setErrors({ ...errors })
            setTimeout(() => {
                navigate('/dashboard')
            }, 1500);
        }
    }

    useEffect(() => {
        getSourceList();
        getDestinationList();
        getStationList();

    }, []);
    return (

        <Sidebar>
            <div className="flex flex-col justify-center items-center w-full h-full">
                <div className="lg:w-6/12 w-11/12 px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-xl">
                    <AppInputLabel title={errors.errorText} size={'base'} className={'text-green-700 text-center block mt-5'} />
                    <div className="lg:m-5 m-0 lg:w-11/12 w-full">
                        <AppInput type="text" list="Station" name="station" id="station" label="Select Station" className="bg-blue-100" onChange={onChangeHandler} errorText={!errors['station'].isValid ? errors['station'].msg : ''} />
                        <datalist id="Station">
                            {stationData.length && stationData.map((item) => {
                                return (<option key={item?.id} value={item?.stationName} />)
                            })}
                        </datalist>
                    </div>
                    <div className="container flex lg:flex-row flex-col w-full justify-center items-center">

                        <div className="m-5 lg:w-80 w-full">
                            <AppInput type="date" label="Start Journey Date" className="bg-blue-100" onChange={onChangeHandler} errorText={!errors['journeyStartDate'].isValid ? errors['journeyStartDate'].msg : ''} name="journeyStartDate" />
                        </div>
                        <div className="m-5 lg:w-80 w-full">
                            <AppInput type="date" label="End Journey Date" className="bg-blue-100" onChange={onChangeHandler} errorText={!errors['journeyEndDate'].isValid ? errors['journeyEndDate'].msg : ''} name="journeyEndDate" />
                        </div>
                    </div>
                    <div className="container flex lg:flex-row flex-col w-full justify-center items-center">
                        <div className="m-5 lg:w-80 w-full">
                            <AppInput type="text" list="Source" label="Source" className="bg-blue-100" onChange={onChangeHandler} errorText={!errors['source'].isValid ? errors['source'].msg : ''} name="source" />
                            <datalist id="Source">
                                {sourceData.length && sourceData.map((item) => {
                                    return (<option key={item?.id} value={item?.name} />)
                                })}
                            </datalist>
                        </div>
                        <div className="m-5 lg:w-80 w-full">
                            <AppInput type="text" list="Destination" label="Destination" className="bg-blue-100" onChange={onChangeHandler} errorText={!errors['destination'].isValid ? errors['destination'].msg : ''} name="destination" />
                            <datalist id="Destination">
                                {destinationData.length && destinationData.map((item, index) => {
                                    return (<option key={item?.id} value={item?.name} />)
                                })}
                            </datalist>
                        </div>

                    </div>
                    <AppButton title={'Book This Journey'} disabled={!errors.isFormValid} onClick={handleSubmit} className="mt-4" />
                </div>
            </div>

        </Sidebar>


    )
}

export default PlanJourney
