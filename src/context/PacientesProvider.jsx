import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const PacienteContext = createContext();

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("Apv-token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/pacientes", config);
        setPacientes(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPacientes();
  }, []);

  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem("Apv-token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (paciente.id) {
      try {
          const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)

          const pacientesActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState )

          setPacientes(pacientesActualizado)
      } catch (error) {
          console.log(error)
      }
    } else {
      try {
        const { data } = await clienteAxios.post(
          "/pacientes",
          paciente,
          config
        );
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;

        setPacientes([pacienteAlmacenado, ...pacientes]);
      } catch (error) {}
    }
  };

  const setEdicion = (paciente) => {
    setPaciente(paciente);
  };

  const eliminarPaciente = async id => {
      const confirmar = confirm('Confirmas que deseas eliminar ?')
      if (confirmar) {
          try {
            const token = localStorage.getItem("Apv-token");
            if (!token) return;
    
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            };

            const { data } = clienteAxios.delete(`/pacientes/${id}`, config)
            
            const pacientesActualizado = pacientes.filter( pacientesState => pacientesState._id !== id)

            setPacientes(pacientesActualizado)
          } catch (error) {
              console.log(error)
          }
      }
  }

  return (
    <PacienteContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente,
      }}
    >
      {children}
    </PacienteContext.Provider>
  );
};

export default PacienteContext;
