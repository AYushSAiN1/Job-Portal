import { setAllCompanies } from '@/redux/companySlice';
import { COMPANY_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

function useGetAllCompanies() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`${COMPANY_API_ENDPOINT}/get`, { withCredentials: true });

                if (response?.data?.success) {
                    dispatch(setAllCompanies(response.data.companies));
                }

            } catch (error) {
                console.log("Error fetching companies", error);
            }
        };
        fetchCompanies();
    }, [])
}



export default useGetAllCompanies