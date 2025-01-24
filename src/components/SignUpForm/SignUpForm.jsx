import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

const SignUpForm = () => {
    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
                repassword: "",
                firstName: "",
                lastName: "",
                phone: "",
                dob: "",
                address: "",
            }}
            onSubmit={(values) => {
                console.log(values);
            }}
            validationSchema={Yup.object({
                firstName: Yup.string()
                    .required("First name is required")
                    .min(1, "First name must be at least 1 character")
                    .max(20, "First name must be at most 20 characters"),
                lastName: Yup.string()
                    .required("Last name is required")
                    .min(1, "Last name must be at least 1 character")
                    .max(20, "Last name must be at most 20 characters"),
                email: Yup.string()
                    .required("Email is required")
                    .email("Invalid email address"),
                password: Yup.string()
                    .required("Password is required")
                    .min(6, "Password must be at least 6 characters"),
                repassword: Yup.string()
                    .required("Please confirm your password")
                    .oneOf([Yup.ref("password")], "Passwords must match"),
                phone: Yup.string()
                    .required("Phone number is required")
                    .matches(/^[0-9]+$/, "Phone number must contain only digits")
                    .min(10, "Phone number must be at least 10 digits")
                    .max(15, "Phone number must be at most 15 digits"),
                dob: Yup.date()
                    .required("Date of birth is required")
                    .max(new Date(), "Date of birth cannot be in the future"),
                address: Yup.string()
                    .required("Address is required")
                    .max(100, "Address must be at most 100 characters"),
            })}
        >
            <Form className="">
                <h1 className="text-2xl font-bold text-center mb-3">Sign Up</h1>
                <div className="container-form max-w-[800px] mx-auto flex p-5 gap-5 rounded-lg border border-gray-400">
                    <div className="left">
                        {/* First Name */}
                        <div className="flex flex-col gap-4 mb-4">
                            <label htmlFor="firstName" className="font-medium">First Name</label>
                            <Field
                                type="text"
                                name="firstName"
                                placeholder="Enter your first name"
                                className="p-3 w-[300px] rounded-md bg-white border border-gray-100"
                            />
                            <div className="text-red-500 text-sm">
                                <ErrorMessage name="firstName" />
                            </div>
                        </div>

                        {/* Last Name */}
                        <div className="flex flex-col gap-4 mb-4">
                            <label htmlFor="lastName" className="font-medium">Last Name</label>
                            <Field
                                type="text"
                                name="lastName"
                                placeholder="Enter your last name"
                                className="p-3 w-[300px] rounded-md bg-white border border-gray-100"
                            />
                            <div className="text-red-500 text-sm">
                                <ErrorMessage name="lastName" />
                            </div>
                        </div>

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

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-4 mb-4">
                            <label htmlFor="repassword" className="font-medium">Confirm Password</label>
                            <Field
                                type="password"
                                name="repassword"
                                placeholder="Confirm your password"
                                className="p-3 w-[300px] rounded-md bg-white border border-gray-100"
                            />
                            <div className="text-red-500 text-sm">
                                <ErrorMessage name="repassword" />
                            </div>
                        </div>


                    </div>
                    <div className="right">
                        {/* Phone */}
                        <div className="flex flex-col gap-4 mb-4">
                            <label htmlFor="phone" className="font-medium">Phone</label>
                            <Field
                                type="text"
                                name="phone"
                                placeholder="Enter your phone number"
                                className="p-3 w-[300px] rounded-md bg-white border border-gray-100"
                            />
                            <div className="text-red-500 text-sm">
                                <ErrorMessage name="phone" />
                            </div>
                        </div>

                        {/* Date of Birth */}
                        <div className="flex flex-col gap-4 mb-4">
                            <label htmlFor="dob" className="font-medium">Date of Birth</label>
                            <Field
                                type="date"
                                name="dob"
                                className="p-3 w-[300px] rounded-md bg-white border border-gray-100"
                            />
                            <div className="text-red-500 text-sm">
                                <ErrorMessage name="dob" />
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex flex-col gap-4 mb-4">
                            <label htmlFor="address" className="font-medium">Address</label>
                            <Field
                                as="textarea"
                                name="address"
                                placeholder="Enter your address"
                                className="p-3 w-[300px] rounded-md bg-white border border-gray-100"
                            />
                            <div className="text-red-500 text-sm">
                                <ErrorMessage name="address" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full p-3 mt-4 text-white bg-blue-500 rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                </div>


            </Form>
        </Formik>
    );
};

export default SignUpForm;