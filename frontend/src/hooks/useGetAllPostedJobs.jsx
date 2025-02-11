import axios from 'axios'
import { JOB_API_ENDPOINT } from '../utils/constant.js'
import { useDispatch } from 'react-redux';
import { setPostedJobs } from '@/redux/jobSlice';
import { useEffect } from 'react';

function useGetAllPostedJobs() {

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchPostedJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/posted`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setPostedJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchPostedJobs()
    }, [dispatch])
}
export default useGetAllPostedJobs;