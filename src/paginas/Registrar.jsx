import { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

function Registrar() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Enviando formulario')

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({msg :'Hay campos vacios', error: true})
      return
    }

    if (password !== repetirPassword) {
      setAlerta({msg :'Los campos no son iguales', error: true})
      return
    }

    if (password.length < 6) {
      setAlerta({msg :'El password es muy corto', error: true})
      return
    }

    setAlerta({})

    // Crear el usuario en la api
    try {
      const url = `veterinarios`
      await clienteAxios.post(url, { nombre, email, password })
      setAlerta({
        msg:'Creado Correctamente, revisa tu email',
        error: false
      })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-4xl">
          Crea tu cuenta y Administra tus{""}
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
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu Nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Repetir Password
            </label>
            <input
              type="password"
              placeholder="Repite tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-indigo-700 w-full rounded-xl text-white font-bold uppercase py-3 p-10 mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500"
            to="/"
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/OlvidePassword"
          >
            ¿Olvide mi contraseña
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Registrar;
