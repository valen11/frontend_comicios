import React, { useState } from 'react';

export default function App() {
  // Estados principales
  const [provincias, setProvincias] = useState([
    "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos",
    "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones",
    "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz",
    "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán"
  ]);
  const [listas, setListas] = useState([]);
  const [candidatos, setCandidatos] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [seccionActiva, setSeccionActiva] = useState('panel');

  // Estados para formularios
  const [formProvincia, setFormProvincia] = useState('');
  const [formLista, setFormLista] = useState({
    provincia: '',
    cargo: '',
    nombre: '',
    alianza: ''
  });
  const [formCandidato, setFormCandidato] = useState({
    provincia: '',
    cargo: '',
    lista: '',
    nombre: '',
    orden: ''
  });
  const [formMesa, setFormMesa] = useState({
    provincia: '',
    circuito: '',
    establecimiento: '',
    electores: '',
    votos: ''
  });

  // Funciones para provincias
  const agregarProvincia = () => {
    if (!formProvincia.trim()) {
      alert("Escribí un nombre de provincia.");
      return;
    }
    setProvincias([...provincias, formProvincia.trim()]);
    setFormProvincia('');
  };

  // Funciones para listas
  const agregarLista = () => {
    const { provincia, cargo, nombre, alianza } = formLista;
    if (!provincia || !cargo || !nombre) {
      alert("Completá todos los campos obligatorios.");
      return;
    }
    setListas([...listas, { provincia, cargo, nombre, alianza }]);
    setFormLista({ provincia: '', cargo: '', nombre: '', alianza: '' });
  };

  // Funciones para candidatos
  const agregarCandidato = () => {
    const { provincia, cargo, lista, nombre, orden } = formCandidato;
    if (!provincia || !cargo || !lista || !nombre) {
      alert("Completá todos los campos.");
      return;
    }
    setCandidatos([...candidatos, { provincia, cargo, lista, nombre, orden }]);
    setFormCandidato({ provincia: '', cargo: '', lista: '', nombre: '', orden: '' });
  };

  // Funciones para mesas
  const agregarMesa = () => {
    const { provincia, circuito, establecimiento, electores, votos } = formMesa;
    if (!provincia || !circuito || !establecimiento || !electores || !votos) {
      alert("Completá todos los campos.");
      return;
    }
    if (parseInt(votos) > parseInt(electores)) {
      alert("Los votos no pueden superar a los electores.");
      return;
    }
    setMesas([...mesas, {
      provincia,
      circuito,
      establecimiento,
      electores: parseInt(electores),
      votos: parseInt(votos)
    }]);
    setFormMesa({ provincia: '', circuito: '', establecimiento: '', electores: '', votos: '' });
  };

  // Calcular resultados
  const calcularResultados = () => {
    const totalVotos = mesas.reduce((acc, m) => acc + m.votos, 0);
    const totalElectores = mesas.reduce((acc, m) => acc + m.electores, 0);
    const participacion = totalElectores ? ((totalVotos / totalElectores) * 100).toFixed(1) : 0;
    return { totalVotos, totalElectores, participacion };
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 text-center shadow-lg">
        <h1 className="text-2xl font-bold">Sistema de Carga y Conteo de Comicios 2025</h1>
      </header>

      {/* Navegación */}
      <nav className="bg-gray-800 p-3 flex justify-center gap-2 flex-wrap shadow-md">
        {['panel', 'provincias', 'listas', 'mesas', 'resultados'].map(seccion => (
          <button
            key={seccion}
            onClick={() => setSeccionActiva(seccion)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              seccionActiva === seccion
                ? 'bg-blue-500 text-white scale-105 shadow-lg'
                : 'bg-gray-300 text-gray-800 hover:bg-blue-400 hover:text-white'
            }`}
          >
            {seccion.charAt(0).toUpperCase() + seccion.slice(1)}
          </button>
        ))}
      </nav>

      <main className="p-6 flex-1 w-full">
        {/* PANEL */}
        {seccionActiva === 'panel' && (
          <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn h-full">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Resumen General</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-lg shadow">
                <p className="text-gray-600 text-sm">Total de provincias</p>
                <p className="text-3xl font-bold text-blue-700">{provincias.length}</p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-lg shadow">
                <p className="text-gray-600 text-sm">Total de listas</p>
                <p className="text-3xl font-bold text-green-700">{listas.length}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-lg shadow">
                <p className="text-gray-600 text-sm">Total de candidatos</p>
                <p className="text-3xl font-bold text-purple-700">{candidatos.length}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-4 rounded-lg shadow">
                <p className="text-gray-600 text-sm">Total de mesas</p>
                <p className="text-3xl font-bold text-orange-700">{mesas.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* PROVINCIAS */}
        {seccionActiva === 'provincias' && (
          <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Registrar Provincia</h2>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={formProvincia}
                onChange={(e) => setFormProvincia(e.target.value)}
                placeholder="Nombre de provincia"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={agregarProvincia}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all"
              >
                Agregar
              </button>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Provincias registradas</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {provincias.map((p, i) => (
                    <tr key={i} className="border-b hover:bg-blue-50 transition-colors">
                      <td className="p-3">{i + 1}</td>
                      <td className="p-3">{p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* LISTAS Y CANDIDATOS */}
        {seccionActiva === 'listas' && (
          <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn space-y-8">
            {/* Agregar Lista */}
            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Agregar Lista</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
                <select
                  value={formLista.provincia}
                  onChange={(e) => setFormLista({ ...formLista, provincia: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar provincia</option>
                  {provincias.map((p, i) => (
                    <option key={i} value={p}>{p}</option>
                  ))}
                </select>
                <select
                  value={formLista.cargo}
                  onChange={(e) => setFormLista({ ...formLista, cargo: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar cargo</option>
                  <option value="Diputados">Diputados</option>
                  <option value="Senadores">Senadores</option>
                </select>
                <input
                  type="text"
                  value={formLista.nombre}
                  onChange={(e) => setFormLista({ ...formLista, nombre: e.target.value })}
                  placeholder="Nombre de la lista"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={formLista.alianza}
                  onChange={(e) => setFormLista({ ...formLista, alianza: e.target.value })}
                  placeholder="Alianza"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={agregarLista}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all"
                >
                  Agregar
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      <th className="p-3">Provincia</th>
                      <th className="p-3">Cargo</th>
                      <th className="p-3">Lista</th>
                      <th className="p-3">Alianza</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listas.map((l, i) => (
                      <tr key={i} className="border-b hover:bg-blue-50 transition-colors">
                        <td className="p-3 text-center">{l.provincia}</td>
                        <td className="p-3 text-center">{l.cargo}</td>
                        <td className="p-3 text-center">{l.nombre}</td>
                        <td className="p-3 text-center">{l.alianza}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Agregar Candidato */}
            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Agregar Candidato</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mb-4">
                <select
                  value={formCandidato.provincia}
                  onChange={(e) => setFormCandidato({ ...formCandidato, provincia: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Provincia</option>
                  {provincias.map((p, i) => (
                    <option key={i} value={p}>{p}</option>
                  ))}
                </select>
                <select
                  value={formCandidato.cargo}
                  onChange={(e) => setFormCandidato({ ...formCandidato, cargo: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Cargo</option>
                  <option value="Diputados">Diputados</option>
                  <option value="Senadores">Senadores</option>
                </select>
                <input
                  type="text"
                  value={formCandidato.lista}
                  onChange={(e) => setFormCandidato({ ...formCandidato, lista: e.target.value })}
                  placeholder="Lista"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={formCandidato.nombre}
                  onChange={(e) => setFormCandidato({ ...formCandidato, nombre: e.target.value })}
                  placeholder="Nombre"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  value={formCandidato.orden}
                  onChange={(e) => setFormCandidato({ ...formCandidato, orden: e.target.value })}
                  placeholder="Orden"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={agregarCandidato}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all"
                >
                  Agregar
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      <th className="p-3">Provincia</th>
                      <th className="p-3">Cargo</th>
                      <th className="p-3">Lista</th>
                      <th className="p-3">Nombre</th>
                      <th className="p-3">Orden</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidatos.map((c, i) => (
                      <tr key={i} className="border-b hover:bg-blue-50 transition-colors">
                        <td className="p-3 text-center">{c.provincia}</td>
                        <td className="p-3 text-center">{c.cargo}</td>
                        <td className="p-3 text-center">{c.lista}</td>
                        <td className="p-3 text-center">{c.nombre}</td>
                        <td className="p-3 text-center">{c.orden}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* MESAS */}
        {seccionActiva === 'mesas' && (
          <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Registrar Mesa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
              <select
                value={formMesa.provincia}
                onChange={(e) => setFormMesa({ ...formMesa, provincia: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Provincia</option>
                {provincias.map((p, i) => (
                  <option key={i} value={p}>{p}</option>
                ))}
              </select>
              <input
                type="text"
                value={formMesa.circuito}
                onChange={(e) => setFormMesa({ ...formMesa, circuito: e.target.value })}
                placeholder="Circuito"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={formMesa.establecimiento}
                onChange={(e) => setFormMesa({ ...formMesa, establecimiento: e.target.value })}
                placeholder="Establecimiento"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={formMesa.electores}
                onChange={(e) => setFormMesa({ ...formMesa, electores: e.target.value })}
                placeholder="Electores"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={formMesa.votos}
                onChange={(e) => setFormMesa({ ...formMesa, votos: e.target.value })}
                placeholder="Votos"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={agregarMesa}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all"
              >
                Guardar
              </button>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Mesas registradas</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="p-3">Provincia</th>
                    <th className="p-3">Circuito</th>
                    <th className="p-3">Establecimiento</th>
                    <th className="p-3">Electores</th>
                    <th className="p-3">Votos</th>
                    <th className="p-3">Participación %</th>
                  </tr>
                </thead>
                <tbody>
                  {mesas.map((m, i) => {
                    const participacion = ((m.votos / m.electores) * 100).toFixed(1);
                    return (
                      <tr key={i} className="border-b hover:bg-blue-50 transition-colors">
                        <td className="p-3 text-center">{m.provincia}</td>
                        <td className="p-3 text-center">{m.circuito}</td>
                        <td className="p-3 text-center">{m.establecimiento}</td>
                        <td className="p-3 text-center">{m.electores}</td>
                        <td className="p-3 text-center">{m.votos}</td>
                        <td className="p-3 text-center">{participacion}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* RESULTADOS */}
        {seccionActiva === 'resultados' && (
          <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Resultados Generales</h2>
            {(() => {
              const { totalVotos, totalElectores, participacion } = calcularResultados();
              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg shadow">
                    <p className="text-gray-600 text-sm mb-2">Total de electores</p>
                    <p className="text-4xl font-bold text-blue-700">{totalElectores.toLocaleString()}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-lg shadow">
                    <p className="text-gray-600 text-sm mb-2">Total de votos</p>
                    <p className="text-4xl font-bold text-green-700">{totalVotos.toLocaleString()}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-lg shadow">
                    <p className="text-gray-600 text-sm mb-2">Participación promedio</p>
                    <p className="text-4xl font-bold text-purple-700">{participacion}%</p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}

