import React, {useCallback, useRef, useState} from "react";
import axios from "axios";
import styles from "./OrderForm.module.css";
import DropdownList from "./inputs/DropdownList";

const pageLimit = 15;

const DeliveryInputs = ({hasError, checkError, city, setCity, department, setDepartment}) => {
    const [citySuggestions, setCitySuggestions] = useState([]);
    let cityPage = useRef(1);
    let cityHasNext = useRef(true);

    const loadCitySuggestions = useCallback(async (cityName, refresh) => {
        if (refresh) {
            cityPage.current = 1;
            cityHasNext.current = true;
        } else if (cityHasNext.current) {
            cityPage.current++;
        } else {
            return;
        }
        if (cityName) {
            try {
                const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
                    apiKey: 'ad9f19d77f0329680046910f08946c8f',
                    modelName: 'AddressGeneral',
                    calledMethod: 'searchSettlements',
                    methodProperties: {
                        CityName: cityName,
                        Limit: pageLimit,
                        Page: cityPage.current,
                        Warehouse: 1
                    }
                });
                setCitySuggestions([...(refresh ? [] : citySuggestions),
                    ...response.data.data[0].Addresses.map(v => {
                        return {
                            title: v.Present,
                            value: v.DeliveryCity
                        }
                    })]);
                cityHasNext.current = response.data.data[0].TotalCount > pageLimit * cityPage.current;
            } catch (error) {
                console.error('Error fetching city data:', error);
            }
        } else {
            setCitySuggestions([]);
        }
    }, [citySuggestions]);

    const handleCityChange = useCallback(async (e) => {
        if (city.title !== e.title) {
            setCity({
                title: e.title,
                value: e.value
            });
        }
        await loadCitySuggestions(e.title, true);
    }, [loadCitySuggestions, city.title, setCity]);

    const handleCityScrollDown = useCallback(() => {
        loadCitySuggestions(city.title, false);
    }, [loadCitySuggestions, city.title]);

    const [departmentSuggestions, setDepartmentSuggestions] = useState([]);
    let departmentPage = useRef(1);
    let departmentHasNext = useRef(true);

    const loadDepartmentSuggestions = useCallback(async (departmentNum, refresh) => {
        if (refresh) {
            departmentPage.current = 1;
            departmentHasNext.current = true;
        } else if (departmentHasNext.current) {
            departmentPage.current++;
        } else {
            return;
        }

        if (city.value) {
            try {
                const properties = {
                    Page: departmentPage.current,
                    Limit: pageLimit,
                    CityRef: city.value,
                    Language: 'UA'
                };
                if (departmentNum) {
                    properties.WarehouseId = departmentNum;
                }

                const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
                    apiKey: 'ad9f19d77f0329680046910f08946c8f',
                    modelName: 'AddressGeneral',
                    calledMethod: 'getWarehouses',
                    methodProperties: properties
                });

                setDepartmentSuggestions([...(refresh ? [] : departmentSuggestions),
                    ...response.data.data.map(v => {
                        return {
                            title: v.Description,
                            value: v.Description
                        }
                    })]);
                departmentHasNext.current = response.data.info.totalCount > pageLimit * departmentPage.current;
            } catch (error) {
                console.error('Error fetching department data:', error);
            }
        } else {
            setDepartmentSuggestions([]);
        }
    }, [city.value, departmentSuggestions]);

    const handleDepartmentChange = useCallback(async (e) => {
        if (department.title !== e.title) {
            setDepartment(e);
        }
        await loadDepartmentSuggestions(e.title, true);
    }, [loadDepartmentSuggestions, department.title, setDepartment]);

    const handleDepartmentScrollDown = useCallback(() => {
        loadDepartmentSuggestions(department.title, false);
    }, [loadDepartmentSuggestions, department.title]);


    return (
        <div className={`${styles.formRow} ${styles.centeredRow}`}>
            <div className={`${styles.inputColumn} ${styles.oneColumn}`}>
                <h5>Деталі доставки</h5>
                <DropdownList
                    name='place'
                    placeholder='Місто'
                    value={city}
                    editable={true}
                    options={citySuggestions}
                    onChange={handleCityChange}
                    onScrollDown={handleCityScrollDown}
                    checkErrorTrigger={hasError}
                    setError={checkError}
                />
                <DropdownList
                    name='department'
                    placeholder='Відділення нової пошти'
                    value={department}
                    editable={true}
                    options={departmentSuggestions}
                    onChange={handleDepartmentChange}
                    onScrollDown={handleDepartmentScrollDown}
                    checkErrorTrigger={hasError}
                    setError={checkError}
                    disabled={!city.value}
                />
            </div>
        </div>
    )
}

export default DeliveryInputs