import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '../utils/constant.js'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setAllApplicants } from '@/redux/applicationSlice.js';

function useGetAllApplicants(applicationId) {

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${applicationId}/applicants`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.applicants))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchApplicants()
    }, [dispatch, applicationId])
}
export default useGetAllApplicants;