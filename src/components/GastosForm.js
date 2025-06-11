import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registra los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function GastosForm() {
  const [form, setForm] = useState({
    descripcion: '',
    monto: '',
    tipo: 'gasto',
    lugar: '',
  });

  const [registros, setRegistros] = useState([]);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('registros')) || [];
    setRegistros(data);
  }, []);

  // Guardar en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('registros', JSON.stringify(registros));
  }, [registros]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = () => {
    if (!form.descripcion || !form.monto) return;

    const nuevoRegistro = {
      ...form,
      monto: parseFloat(form.monto),
      fecha: Date.now(),
    };

    setRegistros((prev) => [...prev, nuevoRegistro]);
    setForm({ descripcion: '', monto: '', tipo: 'gasto', lugar: '' });
  };

  const handleCancelar = () => {
    setForm({ descripcion: '', monto: '', tipo: 'gasto', lugar: '' });
  };

  const handleEliminar = (index) => {
    const newRegistros = registros.filter((_, i) => i !== index);
    setRegistros(newRegistros);
  };

  const calcularTotales = () => {
    let ingresos = 0;
    let gastos = 0;

    registros.forEach((r) => {
      if (r.tipo === 'ingreso') {
        ingresos += r.monto;
      } else {
        gastos += r.monto;
      }
    });

    return { ingresos, gastos, diferencia: ingresos - gastos };
  };

  const { ingresos, gastos, diferencia } = calcularTotales();

  // Configuración del gráfico de barras
  const data = {
    labels: ['Ingresos', 'Gastos'],
    datasets: [
      {
        label: 'Comparativa', 
        data: [ingresos, gastos],
        backgroundColor: ['#4CAF50', '#F44336'], // Verde para Ingresos, Rojo para Gastos
        borderColor: ['#388E3C', '#D32F2F'], // Colores más oscuros para bordes
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `$${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div className="container-fluid">
      {/* Fila 1: Formulario, Resumen y Gráfico */}
      <div className="row mb-4">




        <div className="col-md-4 p-3">
          {/* Formulario */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Registrar Gasto / Ingreso</h5>
              <div className="mb-3">
                <input
                  name="descripcion"
                  className="form-control"
                  placeholder="Descripción"
                  value={form.descripcion}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  name="monto"
                  type="number"
                  className="form-control"
                  placeholder="Monto"
                  value={form.monto}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <select name="tipo" className="form-select" value={form.tipo} onChange={handleChange}>
                  <option value="gasto">Gasto</option>
                  <option value="ingreso">Ingreso</option>
                </select>
              </div>
              <div className="mb-3">
                <input
                  name="lugar"
                  className="form-control"
                  placeholder="Lugar"
                  value={form.lugar}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={handleGuardar}>Guardar</button>
                <button className="btn btn-secondary" onClick={handleCancelar}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
                <div className="col-md-4 p-3">
          {/* Fila 1 - Gráfico de barras comparando ingresos vs gastos */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Comparativa Ingresos vs Gastos</h5>
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>

        {/* Fila 1 - Resumen de ingresos y gastos */}
        <div className="col-md-4 p-3">
          <div className="row mb-3">
            <div className="col-12 p-2">
              <div className="card bg-danger text-white">
                <div className="card-body text-center">
                  <h5 className="card-title">Gastos</h5>
                  <p className="card-text">${gastos.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="col-12 p-2">
              <div className="card bg-success text-white">
                <div className="card-body text-center">
                  <h5 className="card-title">Ingresos</h5>
                  <p className="card-text">${ingresos.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="col-12 p-2">
              <div className="card bg-info text-dark">
                <div className="card-body text-center">
                  <h5 className="card-title">Diferencia</h5>
                  <p className="card-text">${diferencia.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>


        </div>
















      </div>

      {/* Fila 2: Tabla de registros */}
      <div className="row">
        <div className="col-12 p-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Registros</h5>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {registros.map((r, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{r.descripcion}</td>
                      <td>{new Date(r.fecha).toLocaleString()}</td>
                      <td style={{ color: r.tipo === 'gasto' ? 'red' : 'green' }}>
                        {r.tipo === 'gasto' ? '-' : '+'}${Math.abs(r.monto).toFixed(2)}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleEliminar(index)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GastosForm;
