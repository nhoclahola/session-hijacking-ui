import { Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, FormikHelpers, FormikValues } from "formik"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup"
import { loginUser } from "../../redux/auth/auth.action";
import { useAppDispatch } from "../../redux/hook";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const initialValues = { email: "", password: "" };
const validationSchema = {
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
};

const Login = () => {
  const [formValue, setFormValue] = useState([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const jwt = useSelector((state: RootState) => state.auth.jwt);
  const loginError = useSelector((state: RootState) => state.auth.error);
  const handleSubmit = async (values: FormikValues) => {
    console.log("handle", values);
    await dispatch(loginUser({ data: values }))
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  return (
    <Formik
      // validationSchema={validationSchema} 
      initialValues={initialValues}
      onSubmit={handleSubmit}>
      <Form className="space-y-10 w-1/3 bg-slate-300 p-20 bg-opacity-90 rounded-lg">
      <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-md">
        Login to 
      </h1>
        <div className="space-y-5">
          <div>
            <Field as={TextField}
              name="email"
              placeholder="Email"
              type="email"
              fullWidth
              sx={{
                '& .MuiInputBase-input': {
                  color: 'black',
                },
                '& .MuiInputLabel-root': {
                  color: 'black',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black',
                  },
                  '&:hover fieldset': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                  },
                }
              }}
            />
            <ErrorMessage name="email" component={"div"} className="text-red-600"></ErrorMessage>
          </div>
          <div>
            <Field as={TextField}
              name="password"
              placeholder="Password"
              type="password"
              fullWidth
              sx={{
                '& .MuiInputBase-input': {
                  color: 'black',
                },
                '& .MuiInputLabel-root': {
                  color: 'black',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black',
                  },
                  '&:hover fieldset': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                  },
                }
              }}
            />
            <ErrorMessage name="password" component={"div"} className="text-red-600"></ErrorMessage>
          </div>
        </div>
        <div className="flex justify-center">
          <Button className="w-1/2"
            sx={{padding: ".8rem 0rem", backgroundColor: "purple", "&:hover": { backgroundColor: "darkblue" }}} 
            variant="contained"
            color="primary"
            type="submit">Login</Button>
        </div>
      </Form>
    </Formik>
  )
}

export default Login