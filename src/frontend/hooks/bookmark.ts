import {useState,useEffect} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import _axios from "../api/axios";
import { PostInterface } from '../interfaces/postInterface';

export const GetUserBookmark = (type:string) => {

  const reduxUser = useSelector((state: RootState) => state.user.userData);

  const [data, setData] = useState<PostInterface[]>([])
  const [loading, setLoading] = useState(false)
  const [error,setError] = useState('');

  const fetchData = async () => {
    try{
      const { data }: any = await _axios.get(`/api/user/get-user-bookmarks/?type=${type}`);
      if(data?.data?.length){
        const bookmarksData = data?.data || []
        const bookMarkedPost = bookmarksData.map((bookmarkRow: any) => {
          return bookmarkRow?.post
        })
        console.log("---bookMarkedPost",bookMarkedPost)
        setData(bookMarkedPost)
      }
    }
    catch {
      //setError(ErrorConstant.default)
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    if(reduxUser){
      fetchData()
    }
  },[reduxUser])

  const refreshData = ()=>{
    fetchData()
  }
  return { data, loading, error, refreshData, setData };
}
