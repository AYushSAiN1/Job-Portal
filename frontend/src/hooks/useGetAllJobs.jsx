import axios from 'axios'
import { JOB_API_ENDPOINT } from '../utils/constant.js'
import { useDispatch } from 'react-redux';
import { setAllJobs } from '@/redux/jobSlice';
import { useEffect } from 'react';

function useGetAllJobs() {

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.job))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllJobs()
    }, [dispatch])
}
export default useGetAllJobs;