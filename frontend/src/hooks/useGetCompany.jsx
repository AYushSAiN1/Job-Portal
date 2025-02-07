import axios from 'axios';
import { COMPANY_API_ENDPOINT } from '../utils/constant.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setSingleCompany } from '@/redux/companySlice.js';

function useGetCompany(companyId) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!companyId) return;

        const fetchCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.error("Error fetching company details:", error);
            }
        };

        fetchCompany();
    }, [companyId, dispatch]);
}

export default useGetCompany;
