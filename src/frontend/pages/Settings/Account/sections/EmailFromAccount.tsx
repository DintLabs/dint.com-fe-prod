import { useEffect,  useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Grid, Stack, Typography, FormControl } from '@mui/material';
import { FlexCol } from 'frontend/reusable/reusableStyled';
import GridWithBoxConteiner from 'frontend/reusable/GridWithBoxConteiner';
import Submenu from 'frontend/components/submenu';
import useUser from 'frontend/hooks/useUser';
import { useForm } from 'react-hook-form';
import _axios from 'frontend/api/axios';
import { toast } from 'react-toastify';
import useAuth from 'frontend/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'frontend/redux/store';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../../contexts/ThemeContext';


const EmailFromAccount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { changeEmail } = useAuth();
  const { logout } = useAuth();
  const { formState } = useForm();
  const userHook = useUser();

  const user = userHook.reduxUser;
  const { toggle } = useContext(ThemeContext);

  const [userEmail, setUserEmail] = useState(user?.email || '');
  const [userEmailVerified, setUserEmailVerified] = useState(user?.email || '');
  const [isUniqueEmail, setIsUniqueEmail] = useState(true);


  useEffect(() => {
    setUserEmail(user?.email || "")
    setUserEmailVerified(user?.email || "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  const emailChange = (e : any) => {
    setUserEmail(e.target.value)
  }

  const logoutUser = async() => {
    try {
      await logout();
      navigate('/');
      dispatch({ type: 'RESET_STORE' });
    } catch (e: any) {
      console.error('Error occurred in onLogout', e?.message);
    }
  };

  const onSubmit = async (data: any) => {
    data = { email: userEmail }
    const id = toast.loading('Loading...');
    try {
      const result = await _axios.put('api/user/update-profile-by-token/', data);
      if(result.data.code === 400){
        setIsUniqueEmail(false);
        setTimeout(() => {
          toast.update(id, {
            render: result.data.data.email[0],
            type: 'error'
          });
        }, 1000);
      } else {
          changeEmail(userEmail);
          userHook.setCurrentUser({ ...userHook.reduxUser, ...result.data.data });
          setIsUniqueEmail(true);
          setTimeout(() => {
            toast.update(id, {
              render: 'Email Updated Successful!',
              type: 'success',
              isLoading: false
            });
          }, 1000);
  
          logoutUser();
      }

      setTimeout(() => {
        toast.dismiss();
      }, 2000);
    } catch (err: any) {
      toast.dismiss();
      toast.error(err.message);
    }
  };


  return (
    <Grid container sx={{ position: 'relative' }}>
      <Submenu title="CHANGE EMAIL" username="" routes={[]} noTag md={12} />

      <GridWithBoxConteiner>
        <FlexCol w="100%" m="10px 0 0 0">
        <FormControl fullWidth>
            <TextField
              required
              id="outlined-required"
              label="Current email"
              defaultValue={userEmail}
              value={userEmail}
              onChange={emailChange}
              error={!isUniqueEmail || formState.errors?.email?.type === 'required'}
              sx={{
                '& .MuiInputBase-input': {
                  color: toggle ? 'white' : '#161C24',
                },
                '& .MuiInputBase-root': {
                  backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                },
              }}
            />
      </FormControl>
          <Typography
            className="primary-text-color"
            variant="caption"
            style={{ color: 'gray', padding: '0 0 0 10px' }}
          >
            <small>E-mail: { userEmailVerified } is verified</small>
          </Typography>
        </FlexCol>
      </GridWithBoxConteiner>

      <Stack direction="row" sx={{ width: '100%', margin: '10px' }}>
        <Button variant="outlined" sx={{ width: '100%' }}  onClick={onSubmit}>
          UPDATE EMAIL ADDRES
        </Button>
      </Stack>
    </Grid>
  );
};

export default EmailFromAccount;
