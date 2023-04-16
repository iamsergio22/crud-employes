import './App.css';
import { useState } from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';



function App() {
  // state
  const [nombre, setNombre] = useState("")
  const [edad, setEdad] = useState("")
  const [pais, setPais] = useState("")
  const [cargo, setCargo] = useState("")
  const [años, setAños] = useState("")
  const [id, setId] = useState("")
  const [employes, setEmployes] = useState([])
  const [editar, setEditar] = useState(false)
  //--functions----- 
  const AddData = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      años: años,

    }).then(() => {
      swal({
        title: "Good job!",
        text: "Empleado registrado!",
        icon: "success",
      });
      setNombre("")
      setEdad("")
      setPais("")
      setCargo("")
      setAños("")
    })
  };

  const UpdateDate = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      años: años,

    }).then(() => {
      swal({
        title: "Good job!",
        text: "Empleado " + nombre + " actualizado!",
        icon: "success",
        timer: 3000
      });
    })
  };

  const deleteDate = (id) => {
    swal({
      title: "Confirmar eliminacion!",
      text: "¿Esta seguro que desea eliminar este empleado?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          Axios.delete("http://localhost:3001/delete/" + id, {
          }).then(() => {
            swal("Empleado eliminado!", {
              icon: "success",
              timer:2000
            });
          })          
        } else {
          swal("Your imaginary file is safe!");
        }
      });

  };

  const GetData = () => {
    Axios.get("http://localhost:3001/employes").then((res) => {
      setEmployes(res.data)
    })
  };
  GetData()

  const EditEmploye = (employe) => {
    setEditar(true)
    setId(employe.id)
    setNombre(employe.nombre)
    setEdad(employe.edad)
    setPais(employe.pais)
    setCargo(employe.cargo)
    setAños(employe.años)

  }

  const cancelar = (() => {
    setEditar(false)
    setNombre("")
    setEdad("")
    setPais("")
    setCargo("")
    setAños("")
  }
  )





  //------------------------------
  return (
    <div className="container p-4">

      <div className="App">

        <div className="lista">

        </div>
      </div>
      <div className="card text-center">
        <div className="card-header">
          Gestion de empleados
        </div>
        <div className="card-body">

          <div className="datos">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Nombre</span>
              <input type="text" className="form-control" value={nombre} placeholder="Inserte su nombre" aria-label="Username" onChange={(e) => {
                setNombre(e.target.value)
              }} aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Edad</span>
              <input type="number" value={edad} className="form-control" placeholder="Inserte su edad" aria-label="Username" onChange={(e) => {
                setEdad(e.target.value)
              }} aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Pais</span>
              <input type="text" className="form-control" value={pais} placeholder="Inserte su pais" aria-label="Username" onChange={(e) => {
                setPais(e.target.value)
              }} aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Cargo</span>
              <input type="text" className="form-control" value={cargo} placeholder="Inserte su cargo" aria-label="Username" onChange={(e) => {
                setCargo(e.target.value)
              }} aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Años de Experiencia</span>
              <input type="number" className="form-control" value={años} placeholder="Inserte su años" aria-label="Username" onChange={(e) => {
                setAños(e.target.value)
              }} aria-describedby="basic-addon1" />
            </div>
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {
            editar ? <div className="btn-group" role="group" aria-label="Basic mixed styles example">
              <button type="button" className="btn btn-success"
                onClick={UpdateDate}
              >Actualizar</button>
              <button type="button" className="btn btn-warning" onClick={cancelar}>Cancelar</button>
            </div> : <button className='btn btn-primary' onClick={AddData}>Registrar</button>

          }

        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Años</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {
            employes.map((employe) => {
              return <tr>
                <th scope="row">{employe.id}</th>
                <td>{employe.nombre}</td>
                <td>{employe.edad}</td>
                <td>{employe.pais}</td>
                <td>{employe.cargo}</td>
                <td>{employe.años}</td>
                <td>
                  <div>
                    <button className='btn btn-success p-2'
                      onClick={() => {
                        EditEmploye(employe)
                      }}>Editar</button>
                    <button className='btn btn-danger p-2'
                      onClick={() => {
                        deleteDate(employe.id)
                      }}
                    >Eliminar</button>
                  </div>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
