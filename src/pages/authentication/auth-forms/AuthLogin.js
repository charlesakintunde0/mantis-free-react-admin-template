import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


import { useDispatch } from 'react-redux';


// utils 
import { reloadPage } from 'Helper/Utils';

// material-ui
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast, Zoom } from 'react-toastify';

// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// reducers
import { setToken } from 'store/reducers/auth';
import { setUser } from 'store/reducers/user';

// api import
import { useUserLoginMutation, useUserLogOutMutation } from 'api/userApi';

// componenets
import { Notification } from 'components/Notifications/Notification';

toast.configure()
// ============================|| FIREBASE - LOGIN ||============================ //



const AuthLogin = ({ }) => {
    const [checked, setChecked] = React.useState(false);
    const [userLogin] = useUserLoginMutation();
    const [userLogOut] = useUserLogOutMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialValues = {
        email: '',
        password: ''
    };




    // console.log(data);
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    try {
                        const response = await userLogin({
                            UEmail: values.email,
                            UPassword: values.password

                        })





                        resetForm({ values: initialValues });

                        if (response.data) {
                            // dispatch(setToken(response.data.jwt));
                            dispatch(setUser(response.data));
                            localStorage.setItem('user', JSON.stringify(response.data));

                            setTimeout(() => {
                                userLogOut();
                                localStorage.removeItem('user');
                            }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds  


                            Notification('success', 'Operation successful', 'Login successful');
                            navigate('/', { replace: true }); // navigate to home page

                            window.location.reload()

                        } else {
                            setStatus({ success: false });
                            setErrors({ submit: "Your password or username is incorrect" });
                            setSubmitting(false);
                        }




                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-login">Email Address</InputLabel>
                                    <OutlinedInput
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="-password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="Enter password"
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sx={{ mt: -1 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={(event) => setChecked(event.target.checked)}
                                                name="checked"
                                                color="primary"
                                                size="small"
                                            />
                                        }
                                        label={<Typography variant="h6">Keep me sign in</Typography>}
                                    />
                                    <Link variant="h6" component={RouterLink} to="" color="text.primary">
                                        Forgot Password?
                                    </Link>
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Login
                                    </Button>
                                </AnimateButton>
                            </Grid>

                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;
