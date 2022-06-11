import {useState} from 'react'
import { Link } from "react-router-dom";
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

function OlvidePassword() {
  const [email, setEmail] = useState ('')
  const [alerta, setAlerta] = useState ({})
  const handleSubmit = async(e) => {
    e.preventDefault()

    if (email === '' || email.length < 6) {
      setAlerta({msg: 'El email es obligatorio', error: true})
      return
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email })
      setAlerta({ msg: data.msg })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta


  return (
    <>
      <div >
        <h1 className="text-indigo-600 font-black text-4xl">
          Recupera tu Acceso y no Pierdas tus{""}
          <span className="text-black"> Pacientes</span>{" "}
        </h1>
      </div>

      <div className="mt-10 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white ">

          { msg && <Alerta
            alerta={alerta}
          />}
        <form
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="text"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e =>setEmail(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Eviar Instrucciones"
            className="bg-indigo-700 w-full rounded-xl text-white font-bold uppercase py-3 p-10 mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/registrar"
          >
            ¿No tienes una cuenta? Registrate
          </Link>
        </nav>
      </div>
    </>
  );
}

export default OlvidePassword;
