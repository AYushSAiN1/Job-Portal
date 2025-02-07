import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '../utils/constant.js'
import { useDispatch } from 'react-redux';
import { setAppliedJobs } from '@/redux/jobSlice';
import { useEffect } from 'react';

function useGetAppliedJobs() {

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAppliedJobs(res.data.applications))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllJobs()
    }, [dispatch])
}
export default useGetAppliedJobs;