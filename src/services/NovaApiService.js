import axios from "axios";

export async function loadCities(cityName, cityPage, pageLimit) {
    return await axios.post('https://api.novaposhta.ua/v2.0/json/', {
        apiKey: 'ad9f19d77f0329680046910f08946c8f',
        modelName: 'AddressGeneral',
        calledMethod: 'searchSettlements',
        methodProperties: {
            CityName: cityName,
            Limit: pageLimit,
            Page: cityPage
        }
    });
}

export async function estimateDeliveryPrice(cityRef, price) {
    return await axios.post('https://api.novaposhta.ua/v2.0/json/', {
        apiKey: 'ad9f19d77f0329680046910f08946c8f',
        modelName: "InternetDocumentGeneral",
        calledMethod: "getDocumentPrice",
        methodProperties: {
            CitySender: "e71abb60-4b33-11e4-ab6d-005056801329",
            CityRecipient: cityRef,
            Weight: "1",
            ServiceType: "WarehouseWarehouse",
            Cost: price,
            CargoType: "Cargo",
            SeatsAmount: "1"
        }
    });
}

export async function loadDepartments(cityRef, departmentName,
                                      departmentPage, pageLimit) {
    const properties = {
        Page: departmentPage,
        Limit: pageLimit,
        CityRef: cityRef,
        Language: 'UA'
    }
    if (departmentName) {
        properties.FindByString = departmentName;
    }

    return await axios.post('https://api.novaposhta.ua/v2.0/json/', {
        apiKey: 'ad9f19d77f0329680046910f08946c8f',
        modelName: 'AddressGeneral',
        calledMethod: 'getWarehouses',
        methodProperties: properties
    });
}