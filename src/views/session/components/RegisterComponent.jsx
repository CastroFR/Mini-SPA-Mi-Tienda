
/* => FORMA DE MANIPULAR FORMULARIO CON - react-hook-form */
import { useForm } from "react-hook-form"; // npm install react-hook-form
import * as yuup from 'yup' // le decimos que use "yup" para importar toda la ñibreria de yup
import { yupResolver } from '@hookform/resolvers/yup' // npm install @hookform/resolvers
import { createUserWithEmailAndPassword } from "firebase/auth"; // importar variable de crear usuario
import { auth } from "../../../repositories/firebase/config"; // importar auth desde repositories
//import {yupResolver} from '@hookform/resolvers'

const schema = yuup.object({
    // este objeto recibe todos los valores a manipular con el registro
    email: yuup.string().email("Please enter a correct format: email@email.com").required(),
    password: yuup.string().required().min(8, "Please enter a min 8 char")
        .matches(/[A-Z]/, 'Please enter a 1 char in Mayus')
        .matches(/[a-z]/, 'Please enter a 1 char in Minus')
        .matches(/[0-9]/, 'Please enter a 1 Number')
        .matches(/[!@%$*?_:<>-]/, 'Please enter a 1 special char'), // el - guion medio no se coloca al medio de los caracteres, por que no lo tomará
    confirm_password: yuup.string().oneOf([yuup.ref("password"), null], 'Check our password') // el oneOf indica que se referencie con lo que esta dentro de las comillas

})

export const RegisterComponent = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema) // asi activamos la vaidacion con el yupResolver

    })


    const onSubmitForm = (data) => {
        console.log(data);

        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);

                alert('User registration successful')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode);
                console.log(errorMessage);


                // ..
            });

    }

    return (
        <section className="row justify-content-center">
            <div className="col-6">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title text-center">Register</h3>
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <label className="form-label" >Email: </label>
                            <input type="email" className="form-control" name="input_email" {...register('email')} />
                            <p className='text-danger'>{errors.email && errors.email.message}</p>
                            <label className="form-label">Password: </label>
                            <input type="password" className="form-control" name="input_password" {...register('password')} />
                            <p className='text-danger'>{errors.password && errors.password.message}</p>
                            <label className="form-label">Confirm Password: </label>
                            <input type="password" className="form-control" {...register('confirm_password')} />
                            <p className='text-danger'>{errors.confirm_password && errors.confirm_password.message}</p>
                            <button type="submit" className='btn btn-success'>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
