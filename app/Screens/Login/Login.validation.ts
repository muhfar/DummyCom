import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('Please input email.')
    .min(3, 'Input your email atleast 3 character.')
    .max(25, 'Username cannot exceed 25 character.')
    .email('Please input valid email.'),
  password: Yup.string()
    .required('Please input your password.')
    .min(8, 'Input your password atleast 8 character.')
    .max(25, 'Password cannot exceed 25 character.'),
});

export default schema;
