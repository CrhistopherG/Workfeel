import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDimension } from '../../services/DimensionService'

const AgregarDimensiones = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(true)
  const [period_id, setPeriodId] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    try {
      await addDimension({ name, description, status, period_id })
      setSuccess(true)
      setTimeout(() => navigate('/Encuestas/dimensiones'), 1200)
    } catch (err) {
      setError('Error al agregar dimensión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-blue-700">Agregar Dimensión</h2>
      <div className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <p className="text-blue-800 font-medium mb-1">Indicaciones:</p>
        <ul className="list-disc list-inside text-blue-700 text-sm">
          <li>Completa todos los campos obligatorios.</li>
          <li>El nombre debe ser único y descriptivo.</li>
          <li>La descripción debe explicar claramente la dimensión.</li>
          <li>Marca "Activo" si la dimensión estará disponible inmediatamente.</li>
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Nombre <span className="text-red-500">*</span></label>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full focus:outline-blue-400"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="Ejemplo: FILOSOFÍA DEL NEGOCIO"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Descripción <span className="text-red-500">*</span></label>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full focus:outline-blue-400"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            placeholder="Describe brevemente la dimensión"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={status}
            onChange={e => setStatus(e.target.checked)}
            id="status"
            className="accent-blue-600"
          />
          <label htmlFor="status" className="text-gray-700">Activo</label>
        </div>
        {error && <div className="text-red-600 font-semibold">{error}</div>}
        {success && <div className="text-green-600 font-semibold">¡Dimensión agregada correctamente!</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold transition"
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </div>
  )
}

export default AgregarDimensiones