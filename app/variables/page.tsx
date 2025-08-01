"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Plus,
  Save,
  X,
  RotateCcw,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Droplets,
  Thermometer,
  Activity,
  Zap,
} from "lucide-react"

export default function VariablesPage() {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    unidad: "",
    tipo: "",
    rangoMin: "",
    rangoMax: "",
    descripcion: "",
    categoria: "",
  })

  const handleBack = () => {
    router.push("/dashboard")
  }

  const handleSave = () => {
    if (!formData.nombre || !formData.unidad || !formData.tipo) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    setShowSuccess(true)
    setShowForm(false)
    setFormData({
      nombre: "",
      unidad: "",
      tipo: "",
      rangoMin: "",
      rangoMax: "",
      descripcion: "",
      categoria: "",
    })
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleCancel = () => {
    setShowForm(false)
    setFormData({
      nombre: "",
      unidad: "",
      tipo: "",
      rangoMin: "",
      rangoMax: "",
      descripcion: "",
      categoria: "",
    })
  }

  const handleClear = () => {
    setFormData({
      nombre: "",
      unidad: "",
      tipo: "",
      rangoMin: "",
      rangoMax: "",
      descripcion: "",
      categoria: "",
    })
  }

  const variables = [
    {
      id: 1,
      nombre: "Nivel de Agua",
      unidad: "metros (m)",
      tipo: "Numérico",
      rango: "0 - 10",
      categoria: "Hidrológica",
      descripcion: "Altura del agua en el río",
      icono: Droplets,
      color: "text-blue-600",
    },
    {
      id: 2,
      nombre: "Temperatura",
      unidad: "Celsius (°C)",
      tipo: "Numérico",
      rango: "0 - 30",
      categoria: "Ambiental",
      descripcion: "Temperatura del agua",
      icono: Thermometer,
      color: "text-green-600",
    },
    {
      id: 3,
      nombre: "Caudal",
      unidad: "m³/s",
      tipo: "Numérico",
      rango: "0 - 100",
      categoria: "Hidrológica",
      descripcion: "Volumen de agua por segundo",
      icono: Activity,
      color: "text-purple-600",
    },
    {
      id: 4,
      nombre: "Nivel de Batería",
      unidad: "Porcentaje (%)",
      tipo: "Numérico",
      rango: "0 - 100",
      categoria: "Técnica",
      descripcion: "Carga de batería del sensor",
      icono: Zap,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="outline" size="sm" onClick={handleBack}>
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Volver</span>
            </Button>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold">Registro de Variables - Río Claro</h1>
              <p className="text-xs sm:text-sm text-gray-500">Ministerio del Medio Ambiente</p>
            </div>
          </div>
          <Button onClick={() => setShowForm(true)} className="text-xs sm:text-sm">
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Nueva</span> Variable
          </Button>
        </div>
      </header>

      {/* Success/Error Messages */}
      {showSuccess && (
        <div className="mx-3 sm:mx-6 mt-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          <span className="text-sm sm:text-base text-green-800">Variable registrada exitosamente</span>
        </div>
      )}

      {showError && (
        <div className="mx-3 sm:mx-6 mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
          <span className="text-sm sm:text-base text-red-800">Por favor complete todos los campos obligatorios</span>
        </div>
      )}

      <div className="p-3 sm:p-6">
        <Tabs defaultValue="list" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Variables Existentes</TabsTrigger>
            <TabsTrigger value="form">Registrar Nueva</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            {/* Lista de Variables */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Variables del Sistema - Río Claro</CardTitle>
                <CardDescription className="text-sm">Variables monitoreadas en el río</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                  {variables.map((variable) => {
                    const IconComponent = variable.icono
                    return (
                      <div key={variable.id} className="p-3 sm:p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${variable.color}`} />
                            <div>
                              <h4 className="font-medium text-sm sm:text-base">{variable.nombre}</h4>
                              <p className="text-xs sm:text-sm text-gray-500">{variable.unidad}</p>
                            </div>
                          </div>
                          <div className="flex gap-1 sm:gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {variable.tipo}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {variable.categoria}
                            </Badge>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600">{variable.descripcion}</p>
                          <p className="text-xs text-gray-500">Rango: {variable.rango}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="form">
            {/* Formulario de Registro */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Registrar Nueva Variable</CardTitle>
                <CardDescription className="text-sm">
                  Complete la información de la nueva variable para el Río Claro
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-sm font-medium">
                        Nombre de Variable *
                      </Label>
                      <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Ej: Nivel de Agua"
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unidad" className="text-sm font-medium">
                        Unidad de Medida *
                      </Label>
                      <Input
                        id="unidad"
                        value={formData.unidad}
                        onChange={(e) => setFormData({ ...formData, unidad: e.target.value })}
                        placeholder="Ej: metros (m)"
                        className="text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="tipo" className="text-sm font-medium">
                        Tipo de Variable *
                      </Label>
                      <Select
                        value={formData.tipo}
                        onValueChange={(value) => setFormData({ ...formData, tipo: value })}
                      >
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="numerico">Numérico</SelectItem>
                          <SelectItem value="texto">Texto</SelectItem>
                          <SelectItem value="booleano">Booleano</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="categoria" className="text-sm font-medium">
                        Categoría
                      </Label>
                      <Select
                        value={formData.categoria}
                        onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                      >
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hidrologica">Hidrológica</SelectItem>
                          <SelectItem value="ambiental">Ambiental</SelectItem>
                          <SelectItem value="tecnica">Técnica</SelectItem>
                          <SelectItem value="meteorologica">Meteorológica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="rangoMin" className="text-sm font-medium">
                        Rango Mínimo
                      </Label>
                      <Input
                        id="rangoMin"
                        type="number"
                        value={formData.rangoMin}
                        onChange={(e) => setFormData({ ...formData, rangoMin: e.target.value })}
                        placeholder="0"
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rangoMax" className="text-sm font-medium">
                        Rango Máximo
                      </Label>
                      <Input
                        id="rangoMax"
                        type="number"
                        value={formData.rangoMax}
                        onChange={(e) => setFormData({ ...formData, rangoMax: e.target.value })}
                        placeholder="100"
                        className="text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descripcion" className="text-sm font-medium">
                      Descripción
                    </Label>
                    <Textarea
                      id="descripcion"
                      value={formData.descripcion}
                      onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                      placeholder="Descripción detallada de la variable..."
                      rows={3}
                      className="text-sm"
                    />
                  </div>

                  {/* Botones de Acción */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-4 border-t">
                    <Button onClick={handleSave} className="flex-1 sm:flex-none text-sm">
                      <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Guardar Variable
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleClear}
                      className="flex-1 sm:flex-none text-sm bg-transparent"
                    >
                      <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Limpiar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="flex-1 sm:flex-none text-sm bg-transparent"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
