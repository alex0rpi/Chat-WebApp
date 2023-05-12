import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  userName: Yup.string().max(50, 'Too Long!').required('Required'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password is too short - should be 5 chars minimum.'),
});
