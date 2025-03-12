import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import authService from '../../services/authService';

const SignInForm = () => {
    const navigate = useNavigate();
    const handleSignIn = async (values) => {
        try {
            const data = await authService.login(values);
            console.log('Data ~ login ~ handleSignin: ', data);
            const infoUser = await authService.verify();
            navigate('/home');
        } catch (error) {
            console.log(error);
            if(error.response?.status == 401) {
                alert('Invalid email or password');}
            else if (error.response?.status == 404) {
                alert('Email not found');
            }else if (error.response?.status == 400) {
                if(error.response.data.password) {
                    alert(error.response.data.password);
            }
        }
        }
    }
        return (
            <div>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={handleSignIn}
                    validationSchema={Yup.object({
                        email: Yup.string().email('Invalid email address').required('Required'),
                        password: Yup.string().required('Required'),
                    })}
                >
                    {() => (
                        <Form>
                            <h1 className="text-2xl font-bold text-center mb-3">Sign In</h1>
                            <div className="container-form max-w-[800px] mx-auto p-5 rounded-lg border border-gray-400">
                                {/* Email */}
                                <div className="flex flex-col gap-4 mb-4">
                                    <label htmlFor="email" className="font-medium">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="p-3 w-[300px] rounded-md bg-white border border-gray-100"
                                    />
                                    <div className="text-red-500 text-sm">
                                        <ErrorMessage name="email" />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="flex flex-col gap-4 mb-4">
                                    <label htmlFor="password" className="font-medium">Password</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className="p-3 w-[300px] rounded-md bg-white border border-gray-100"
                                    />
                                    <div className="text-red-500 text-sm">
                                        <ErrorMessage name="password" />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full p-3 mt-4 text-white bg-blue-500 rounded-md"
                                >
                                    Submit
                                </button>

                                <span
                                    className='font-bold text-sm block text-right p-2 cursor-pointer'
                                    onClick={() => navigate('/signup')}
                                >Register account</span>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    };

    export default SignInForm;
