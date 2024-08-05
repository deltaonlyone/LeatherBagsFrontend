import React, {useCallback, useRef, useState} from "react";
import styles from "./OrderForm.module.css";
import DropdownList from "./inputs/DropdownList";
import {estimateDeliveryPrice, loadCities, loadDepartments} from "../../../services/NovaApiService";

const pageLimit = 15;

const DeliveryInputs = ({
                            city, setCity,
                            department, setDepartment,
                            setPrice, packagePrice,
                            errors, setErrors, submitting
                        }) => {
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
                const response = await loadCities(cityName, cityPage.current, pageLimit);

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
    const checkPrice = useCallback(async (cityRef) => {
        const response = await estimateDeliveryPrice(cityRef, packagePrice);

        setPrice(response.data.data[0].Cost);
    }, [setPrice, packagePrice]);

    const handleCityChange = useCallback(async (e) => {
        if (city.title !== e.title) {
            setCity({
                title: e.title,
                value: e.value
            });
        }
        await loadCitySuggestions(e.title, true);
        if (e.value) {
            await checkPrice(e.value);
        }
    }, [loadCitySuggestions, city.title, setCity, checkPrice]);

    const handleCityScrollDown = useCallback(() => {
        loadCitySuggestions(city.title, false);
    }, [loadCitySuggestions, city.title]);

    const [departmentSuggestions, setDepartmentSuggestions] = useState([]);
    let departmentPage = useRef(1);
    let departmentHasNext = useRef(true);

    const loadDepartmentSuggestions = useCallback(async (departmentName, refresh) => {
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
                const response = await loadDepartments(city.value,
                    departmentName, departmentPage.current, pageLimit);

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
        loadDepartmentSuggestions(department.title, false)
            .then();
    }, [loadDepartmentSuggestions, department.title]);

    return (
        <div className={`column ${styles.oneColumn}  ${styles.centeredRow}`}>
            <div className={`${styles.formRow}`}>
                <h5>Деталі доставки</h5>
            </div>
            <div className={`${styles.formRow} ${styles.inputRow}`}>
                <DropdownList
                    name='place'
                    placeholder='Місто'
                    value={city}
                    editable={true}
                    options={citySuggestions}
                    onChange={handleCityChange}
                    onScrollDown={handleCityScrollDown}
                    errors={errors}
                    setErrors={setErrors}
                    submitting={submitting}
                />
            </div>
            <div className={`${styles.formRow} ${styles.inputRow}`}>
                <DropdownList
                    name='department'
                    placeholder='Відділення нової пошти'
                    value={department}
                    editable={true}
                    options={departmentSuggestions}
                    onChange={handleDepartmentChange}
                    onScrollDown={handleDepartmentScrollDown}
                    errors={errors}
                    setErrors={setErrors}
                    submitting={submitting}
                    disabled={!city.value}
                />
            </div>
        </div>
    )
}

export default DeliveryInputs