import { toast } from 'react-toastify';
import { AppDispatch } from '../store';
import axios from '../../api/axios';

export const AddCreditCard = (formData: any) => async (dispatch: AppDispatch) => {
  try {
    return axios.post(`api/stripe/credit-card/`, formData).then((res: any) => {
      return res.data.data;
    });
  } catch (error) {
    console.error(error);
  }
};

export const getCreditCards = () => async (dispatch: AppDispatch) => {
  try {
    return axios.get(`/api/stripe/credit-card/`).then((res: any) => {
      return res.data;
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCreditCard = (cardId:any) => async (dispatch: AppDispatch) => {
  try {
    return axios.delete(`/api/stripe/credit-card/${cardId}`)
      .then((res: any) => {
          toast.success('Card deleted successfully');
          return res;
      }).catch((err:any)=>{
        toast.error(err.message)
      })
  } catch (error) {
    console.error(error);
  }
};