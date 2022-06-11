//Layout
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayouth from "./layout/AuthLayouth";
import RutaProtegida from "./layout/RutaProtegida";

//Paginas
import { Login } from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import OlvidePassword from "./paginas/OlvidePassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import NuevoPassword from "./paginas/NuevoPassword";
import AdministrarPacientes from "./paginas/AdministrarPacientes";
import EditarPerfil from "./paginas/EditarPerfil";
import CambiarPassword from "./paginas/CambiarPassword";

//Context
import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayouth />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="OlvidePassword" element={<OlvidePassword />} />
              <Route path="OlvidePassword/:token" element={<NuevoPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path="perfil" element={<EditarPerfil />}/>
              <Route path="cambiar-password" element={<CambiarPassword />}/>
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
