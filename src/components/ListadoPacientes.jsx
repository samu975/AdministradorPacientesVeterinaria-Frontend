import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"


function ListadoPacientes() {

  const { pacientes } = usePacientes()
  


  return (
      <>
        {!pacientes.lenght  ? 
        (
          <>
            <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>

            <p className="text-xl mg-5 mb-10 text-center">
              Administra tus{' '}
              <span className="text-indigo-600 font-bold">pacientes</span>
            </p>

            {pacientes.map( paciente => 
                <Paciente 
                  key = {paciente._id}
                  paciente ={paciente}
                />
              )}
          </>
        ) : 
        (

          <>
            <h2 className="font-black text-3xl text-center">No hay pacientes</h2>

            <p className="text-xl mt-10 mg-5 mb-10 text-center">
              Comienza agregando pacientes y {' '}
              <span className="text-indigo-600 font-bold">aparecerán en este lugar</span>
            </p>
          </>

        )}
      
      </>
  )
}

export default ListadoPacientes