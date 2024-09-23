import * as yup from 'yup';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const errorMessage = 'use lowercase, uppercase and digits';

const loginSchema = yup.object().shape({
    email: yup.string().min(5).max(30).required('email is required'),
    password: yup.string().min(3).max(25).required('password is required')
});

export default loginSchema;