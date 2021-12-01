import React from 'react';
import AppInput from '../components/AppInput'

const AppSearch = ({ list, updateState, searchKeys }) => {
    const filtering = (listItem, value) => {
        if (searchKeys.length) {
            const condition = searchKeys.map((key) => {
                return listItem[key].toLowerCase().search(value) !== -1
            })
            return condition
        } else {
            return [true]
        }



    }
    const onSearch = async (e) => {
        const value = e.target.value.toLowerCase()
        const newList = [...list]
        const filteredList = newList.filter((item) => {
            return filtering(item, value).find(item => item === true)
        })
        updateState(filteredList)
    }
    return (
        <div className={`flex flex-row w-full justify-end`}>
            <AppInput type="text" onChange={onSearch} placeholder="Search" className={`bg-white rounded-full`} width={'3/12'} />
        </div>
    )
}

AppSearch.defaultProps = {
    searchKeys: []
}
export default AppSearch
