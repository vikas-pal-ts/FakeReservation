import React from 'react';
import AppInput from '../components/AppInput'
import AppPageTitle from './AppPageTitle';

const AppSearch = ({ list, updateState, searchKeys, pageTitle, isSearchEnable }) => {

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
        isSearchEnable ? (
            <AppInput type="text" onChange={onSearch} placeholder="Search" className={`bg-gray-100 rounded-full`} width={'3/12'} />
        ) : null
    )
}

AppSearch.defaultProps = {
    searchKeys: [],
    isSearchEnable: true
}
export default AppSearch
