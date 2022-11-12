import {useState,useEffect} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import _axios from "../api/axios";

export const GetUserFollowerRequest = () => {

  const reduxUser = useSelector((state: RootState) => state.user.userData);

  const [data,setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await _axios.get('/api/connection/get-follow-request-list/');

      if (data.code === 200) {
        setData(data.data);
      }
    } catch (err: any) {
      console.error('err ===>', err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if(reduxUser){
      fetchData()
    }
  },[reduxUser])

  const refreshData = ()=>{
    fetchData()
  }
  return { data,loading,error,refreshData}
}