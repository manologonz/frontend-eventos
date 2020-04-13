import React from "react";
import axios from "axios"
import moment from "moment";
export const base_url = "https://eventosumgcapacitacion.herokuapp.com";

const dataTypes = {
    json: "application/json",
    multipart: "multipart/form-data"
}

export const getRequestHeaders = (type="json") => {
    const token = localStorage.getItem("token");
    const baseHeaders ={
        "Content-type": dataTypes[type]
    }
    if(!!token)
        return {
            ...baseHeaders,
            Authorization: `Token ${token}`,
        }
    return baseHeaders
}

export const requestHeaders = {
    headers: {
        "Content-Type": "application/json"
    }
};

export const monthArray = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo",
    "Junio", "Julio", "Agosto", "Septiembre",
    "Octubre", "Noviembre", "Diciembre"
]

export const getCategorias = (search) => {
    const config = {
        headers: getRequestHeaders()
    }
    return axios.get(`${base_url}/categoria/get_categorias?search=${search}`, config).then(response => {
        if (response.data) {
            return response.data
        }
        return [];
    }).catch((e) => {
        console.log(e);
    });
};

export const renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {
    let i;
    let years = [];
    for (i = moment()
        .year(); i >= moment()
        .year() - 100; i--) {
        years.push(<option value={i} key={`year-${i}`}>{i}</option>);
    }
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <div>
                <select
                    value={month.month()}
                    onChange={(e) => onMonthSelect(month, e.target.value)}
                >
                    {moment.months()
                        .map((label, value) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                </select>
            </div>
            <div>
                <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                    {years}
                </select>
            </div>
        </div>);
};

const getRandomId = (length, numbers, words,) => {

}