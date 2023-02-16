import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom'

// material-ui
import {
    Box,
    Button,
    Divider,
    FormControl,
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
import { Flip, Slide, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Config from "../../../config";




// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
toast.configure()

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);
    const [navigate, setNavigate] = useState(false);
    const handleClickConfirmShowPassword = () => {
        setConfirmShowPassword(!showConfirmPassword);
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    }

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('');
    }, []);


    if (navigate) // REDIRECT TO LOGIN PAGE AFTER BEING SUCCESSFULLY REGISTERED
    {
        return <Navigate to="/login" />
    }
    return (
        <>
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    firstname: Yup.string().max(255).required('First Name is required'),
                    lastname: Yup.string().max(255).required('Last Name is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Confirm Password is Required'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const res = await fetch(Config.REGISTRATION, {
                            method: 'POST',
                            headers: { "Content-Type": 'application/json;charset=UTF-8' },
                            body: JSON.stringify({
                                firstname: values.firstname,
                                lastname: values.lastname,
                                email: values.email,
                                password: values.password
                            })
                        });
                        const content = await res.json();

                        if (res.status === 400) // If the email is already taken 
                        {
                            toast.error(content.message, {
                                position: toast.POSITION.TOP_CENTER,
                                hideProgressBar: true,
                                transition: Zoom,
                                autoClose: true,
                            });
                        }
                        else if (res.status === 200) // SUCCESSFULLY REGISTERED
                        {
                            toast.success(content.message, {
                                position: toast.POSITION.TOP_CENTER,
                                hideProgressBar: true,
                                transition: Zoom,
                                autoClose: true,
                            });

                            setNavigate(true);
                        }
                        setStatus({ success: false });
                        setSubmitting(false);
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                                    <OutlinedInput
                                        id="firstname-login"
                                        type="firstname"
                                        value={values.firstname}
                                        name="firstname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="John"
                                        fullWidth
                                        error={Boolean(touched.firstname && errors.firstname)}
                                    />
                                    {touched.firstname && errors.firstname && (
                                        <FormHelperText error id="helper-text-firstname-signup">
                                            {errors.firstname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.lastname && errors.lastname)}
                                        id="lastname-signup"
                                        type="lastname"
                                        value={values.lastname}
                                        name="lastname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        inputProps={{}}
                                    />
                                    {touched.lastname && errors.lastname && (
                                        <FormHelperText error id="helper-text-lastname-signup">
                                            {errors.lastname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="demo@company.com"
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="helper-text-email-signup">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-signup">Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-signup"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
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
                                        placeholder="******"
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>

                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="confirmPassword-signup">Confirm Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                        id="confirmPassword-signup"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={values.confirmPassword}
                                        name="confirmPassword"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickConfirmShowPassword}
                                                    onMouseDown={handleMouseDownConfirmPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="******"
                                        inputProps={{}}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.confirmPassword}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                        </Grid>



                        <Grid item xs={12}>
                            <Typography variant="body2">
                                By Signing up, you agree to our &nbsp;
                                <Link variant="subtitle2" component={RouterLink} to="#">
                                    Terms of Service
                                </Link>
                                &nbsp; and &nbsp;
                                <Link variant="subtitle2" component={RouterLink} to="#">
                                    Privacy Policy
                                </Link>
                            </Typography>
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
                                    Create Account
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider>
                                <Typography variant="caption">Sign up with</Typography>
                            </Divider>
                        </Grid>
                        <Grid item xs={12}>
                            <FirebaseSocial />
                        </Grid>

                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthRegister;
