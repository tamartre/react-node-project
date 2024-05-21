import react, { useEffect, useRef, useState } from "react"
import { useRegisterMutation } from "./authApiSlice"
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from "react-router-dom"
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';


const Register = () => {
    const [registerFunc, { isError, isSuccess, isLoading, data, error }] = useRegisterMutation()
    const navigate = useNavigate()


    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState(0)
    const [address, setAddress] = useState("")


    const [visible, setVisible] = useState(true);
    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };


    useEffect(() => {
        if (isSuccess)
            navigate("/Login")
    }, [isSuccess])
    const cancal=()=>{
        navigate("/")
    }

    const toast = useRef(null);


    const formik = useFormik({

        initialValues: {
            password: "",
            userName: "",
            name: "",
            email: "",
            address: "",
            phone: ""

        },
        validate: (data) => {
            let errors = {};

            if (!data.name) {
                errors.name = 'Name - name is required.';
            }
            if (!data.userName)
                errors.userName = 'UserName - userName is required.';

            if (!data.password)
                errors.password = 'Password - password is required.';

            if (Number(data.phone) != data.phone)
                errors.phone = 'Phone - phone must be number.';

            return errors;
        },
        onSubmit: async (data) => {


        const a= await registerFunc(data)
            if(a.error.data)
                alert(a.error.data.message);
            formik.resetForm();
            setVisible(false)
        }
    })



    return (
        <div className="card flex justify-content-center">

           
            <Dialog
                visible={visible}
                modal
                onHide={() => setVisible(false)}
                content={({ hide }) => (
                    <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">

                        <span className="p-float-label">
                            <Toast ref={toast} />
                            <InputText
                                id="userName"
                                name="userName"
                                value={formik.values.userName}
                                onChange={(e) => {
                                    formik.setFieldValue('userName', e.target.value);
                                }}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('userName') })}
                            />
                            <label htmlFor="input_value">UserName</label>
                        </span>
                        {getFormErrorMessage('userName')}

                        <span className="p-float-label">
                            <Toast ref={toast} />
                            <InputText
                                id="password"
                                name="password"
                                value={formik.values.password}
                                onChange={(e) => {
                                    formik.setFieldValue('password', e.target.value);
                                }}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('password') })}
                            />
                            <label htmlFor="input_value">Password</label>
                        </span>
                        {getFormErrorMessage('password')}

                        <span className="p-float-label">
                            <Toast ref={toast} />
                            <InputText
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={(e) => {
                                    formik.setFieldValue('name', e.target.value);
                                }}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('name') })}
                            />
                            <label htmlFor="input_value">Name</label>
                        </span>
                        {getFormErrorMessage('name')}


                       

                        <span className="p-float-label">
                            <Toast ref={toast} />
                            <InputText
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={(e) => {
                                    formik.setFieldValue('email', e.target.value);
                                }}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('email') })}
                            />
                            <label htmlFor="input_value">Email</label>
                        </span>
                        {getFormErrorMessage('email')}


                        <span className="p-float-label">
                            <Toast ref={toast} />
                            <InputText
                                id="phone"
                                name="phone"
                                value={formik.values.phone}
                                onChange={(e) => {
                                    formik.setFieldValue('phone', e.target.value);
                                }}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('phone') })}
                            />
                            <label htmlFor="input_value">Phone</label>
                        </span>
                        {getFormErrorMessage('phone')}

                        <span className="p-float-label">
                            <Toast ref={toast} />
                            <InputText
                                id="address"
                                name="address"
                                value={formik.values.address}
                                onChange={(e) => {
                                    formik.setFieldValue('address', e.target.value);
                                }}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('address') })}
                            />
                            <label htmlFor="input_value">Address</label>
                        </span>
                        {getFormErrorMessage('address')}


                        <Button type="submit" label="Register" />
                        <Button type="submit" onClick={cancal}label="Cancal" />
                    </form>
                )}
            ></Dialog>
        </div>

    )
}

export default Register