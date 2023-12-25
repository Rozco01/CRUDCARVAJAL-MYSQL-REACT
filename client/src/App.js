
import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'


function App() {


  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [celular, setCelular] = useState('');
  const [direccion, setDireccion] = useState('');
  const [id, setId] = useState('');

  const [update, setUpdate] = useState(false);

  const [contactosList, setContactosList] = useState([]);

  const add = () => {
    Axios.post('http://localhost:3001/create', {
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      telefono: telefono,
      celular: celular,
      direccion: direccion
    }).then(() => {
      getContactos();
      console.log("success");
      clean();
      Swal.fire({
        title: "Registro Exitoso!",
        text: "Se registro correctamente!",
        icon: "success",
        timer: 1000
      });
    });
  };

  const clean = () => {
    setNombre('');
    setApellido('');
    setCorreo('');
    setTelefono('');
    setCelular('');
    setDireccion('');
    setUpdate(false);
  }

  const updateContact = () => {
    Axios.put('http://localhost:3001/update', {
      id: id,
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      telefono: telefono,
      celular: celular,
      direccion: direccion
    }).then(() => {
      getContactos();
      clean();
      Swal.fire({
        title: "Actualizacion Exitoso!",
        text: "Se actualizo correctamente!",
        icon: "success",
        timer: 1000
      });
    });
  }


  const getContactos = () => {
    Axios.get('http://localhost:3001/contactos').then((response) => {
      setContactosList(response.data);
    });
  };

  const editarContacto = (val) => {
    setUpdate(true);
    setNombre(val.nombre);
    setApellido(val.apellido);
    setCorreo(val.correo);
    setTelefono(val.telefono);
    setCelular(val.celular);
    setDireccion(val.direccion);
    setId(val.id);
  }

  getContactos();

  const deleteContact = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      getContactos();
      clean();
      Swal.fire({
        title: "Eliminacion Exitoso!",
        text: "Se elimino correctamente!",
        icon: "success",
        timer: 1000
      })
    }).catch((function (error){
      Swal.fire({
        icon: 'error',
        title: "Error!",
        text: "No se puede eliminar!",
        footer: JSON.parse(JSON.stringify(error)).mesage
      })
    }));
  }

    return (
      <div className='container'>
        <div className="card text-center">
          <div className="card-header">
            Gestion Crud
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Nombre:</span>
              <input
                onChange={(event) => { setNombre(event.target.value) }}
                value={nombre} type="text" className="form-control" placeholder="Ingerese el nombre" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Apellido:</span>
              <input
                onChange={(event) => { setApellido(event.target.value) }}
                value={apellido} type="text" className="form-control" placeholder="Ingerese el apellido" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Correo:</span>
              <input
                onChange={(event) => { setCorreo(event.target.value) }}
                value={correo} type="text" className="form-control" placeholder="Ingerese el correo" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Telefono:</span>
              <input
                onChange={(event) => { setTelefono(event.target.value) }}
                value={telefono} type="number" className="form-control" placeholder="Ingerese el telefono" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Celular:</span>
              <input
                onChange={(event) => { setCelular(event.target.value) }}
                value={celular} type="number" className="form-control" placeholder="Ingerese el celular" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Direccion:</span>
              <input
                onChange={(event) => { setDireccion(event.target.value) }}
                value={direccion} type="text" className="form-control" placeholder="Ingerese la direccion" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="App">
              <div className="datos">
                {
                  update == true ?
                    <div>
                      <button className='btn btn-warning' onClick={updateContact}>Actualizar</button>
                      <button className='btn btn-danger' onClick={clean}>Cancelar</button>
                    </div>
                    : <button className='btn btn-success' onClick={add}>Registrar</button>
                }
              </div>
            </div>
          </div>
          <div className="card-footer text-body-secondary">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Telefono</th>
                  <th scope="col">Celular</th>
                  <th scope="col">Direccion</th>
                  <th scope='col'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  contactosList.map((val, key) => {
                    return <tr key={val.id}>
                      <th>{val.id}</th>
                      <td>{val.nombre}</td>
                      <td>{val.apellido}</td>
                      <td>{val.correo}</td>
                      <td>{val.telefono}</td>
                      <td>{val.celular}</td>
                      <td>{val.direccion}</td>
                      <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                          <button
                            onClick={() => { editarContacto(val); }}
                            type="button" className="btn btn-info">Editar</button>
                          <button type="button"
                            onClick={() => {deleteContact(val.id); }}
                            className="btn btn-danger">Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>

      </div>
    );
  }

  export default App;
