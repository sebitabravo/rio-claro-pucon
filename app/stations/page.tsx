"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  Save,
  X,
  RotateCcw,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  MapPin,
  Settings,
  Map,
} from "lucide-react"

export default function StationsPage() {
  const router = useRouter()
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState({ lat: -39.2706, lng: -71.9756 })
  const [formData, setFormData] = useState({
    nombre: "",
    codigo: "",
    latitud: "",
    longitud: "",
    responsable: "",
    telefono: "",
    email: "",
    descripcion: "",
    variables: [] as string[],
  })

  const handleBack = () => {
    router.push("/dashboard")
  }

  const handleSave = () => {
    if (!formData.nombre || !formData.codigo || !formData.latitud || !formData.longitud || !formData.responsable) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    setShowSuccess(true)
    setFormData({
      nombre: "",
      codigo: "",
      latitud: "",
      longitud: "",
      responsable: "",
      telefono: "",
      email: "",
      descripcion: "",
      variables: [],
    })
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleCancel = () => {
    setFormData({
      nombre: "",
      codigo: "",
      latitud: "",
      longitud: "",
      responsable: "",
      telefono: "",
      email: "",
      descripcion: "",
      variables: [],
    })
  }

  const handleClear = () => {
    setFormData({
      nombre: "",
      codigo: "",
      latitud: "",
      longitud: "",
      responsable: "",
      telefono: "",
      email: "",
      descripcion: "",
      variables: [],
    })
  }

  const handleLocationSelect = () => {
    setFormData({
      ...formData,
      latitud: selectedLocation.lat.toString(),
      longitud: selectedLocation.lng.toString(),
    })
  }

  const handleVariableChange = (variableId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        variables: [...formData.variables, variableId],
      })
    } else {
      setFormData({
        ...formData,
        variables: formData.variables.filter((id) => id !== variableId),
      })
    }
  }

  const availableVariables = [
    { id: "nivel", name: "Nivel de Agua", unit: "m" },
    { id: "temperatura", name: "Temperatura", unit: "°C" },
    { id: "caudal", name: "Caudal", unit: "m³/s" },
    { id: "bateria", name: "Nivel de Batería", unit: "%" },
    { id: "ph", name: "pH del Agua", unit: "pH" },
    { id: "turbidez", name: "Turbidez", unit: "NTU" },
  ]

  const stations = [
    {
      id: "RC001",
      nombre: "Río Claro - Nacimiento",
      codigo: "RC001",
      ubicacion: "Volcán Villarrica",
      coordenadas: "-39.2706, -71.9756",
      responsable: "Dr. Carlos Mendoza",
      telefono: "+56 9 8765 4321",
      email: "c.mendoza@pucon.cl",
      variables: ["Nivel de Agua", "Temperatura", "Caudal"],
      estado: "Activa",
    },
    {
      id: "RC002",
      nombre: "Río Claro - Sector Alto",
      codigo: "RC002",
      ubicacion: "Cordillera",
      coordenadas: "-39.2500, -71.9800",
      responsable: "Ing. María González",
      telefono: "+56 9 7654 3210",
      email: "m.gonzalez@pucon.cl",
      variables: ["Nivel de Agua", "Temperatura", "pH"],
      estado: "Activa",
    },
    {
      id: "RC003",
      nombre: "Río Claro - Puente Pucón",
      codigo: "RC003",
      ubicacion: "Centro Pucón",
      coordenadas: "-39.2833, -71.9500",
      responsable: "Tec. Juan Pérez",
      telefono: "+56 9 6543 2109",
      email: "j.perez@pucon.cl",
      variables: ["Nivel de Agua", "Temperatura", "Caudal", "Turbidez"],
      estado: "Mantenimiento",
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
              <h1 className="text-lg sm:text-xl font-semibold">Registro de Estaciones - Río Claro</h1>
              <p className="text-xs sm:text-sm text-gray-500">Ministerio del Medio Ambiente</p>
            </div>
          </div>
        </div>
      </header>

      {/* Success/Error Messages */}
      {showSuccess && (
        <div className="mx-3 sm:mx-6 mt-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          <span className="text-sm sm:text-base text-green-800">Estación registrada exitosamente</span>
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
            <TabsTrigger value="list">Estaciones Existentes</TabsTrigger>
            <TabsTrigger value="form">Registrar Nueva</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            {/* Lista de Estaciones */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Estaciones del Río Claro</CardTitle>
                <CardDescription className="text-sm">Puntos de monitoreo distribuidos en el río</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {stations.map((station) => (
                    <div key={station.id} className="p-3 sm:p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <h4 className="font-medium text-sm sm:text-base">{station.nombre}</h4>
                            <Badge variant={station.estado === "Activa" ? "default" : "secondary"} className="text-xs">
                              {station.estado}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600">
                            <div>
                              <p>
                                <strong>Código:</strong> {station.codigo}
                              </p>
                              <p>
                                <strong>Ubicación:</strong> {station.ubicacion}
                              </p>
                              <p>
                                <strong>Coordenadas:</strong> {station.coordenadas}
                              </p>
                            </div>
                            <div>
                              <p>
                                <strong>Responsable:</strong> {station.responsable}
                              </p>
                              <p>
                                <strong>Teléfono:</strong> {station.telefono}
                              </p>
                              <p>
                                <strong>Email:</strong> {station.email}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-xs sm:text-sm text-gray-600 mb-1">
                              <strong>Variables:</strong>
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {station.variables.map((variable, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {variable}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1 sm:gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="form">
            {/* Formulario de Registro */}
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Información General</CardTitle>
                  <CardDescription className="text-sm">Datos básicos de la estación</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nombre" className="text-sm font-medium">
                          Nombre de Estación *
                        </Label>
                        <Input
                          id="nombre"
                          value={formData.nombre}
                          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                          placeholder="Ej: Río Claro - Sector Norte"
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="codigo" className="text-sm font-medium">
                          Código de Estación *
                        </Label>
                        <Input
                          id="codigo"
                          value={formData.codigo}
                          onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                          placeholder="Ej: RC009"
                          className="text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Ubicación Geográfica *</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="latitud" className="text-xs text-gray-600">
                            Latitud
                          </Label>
                          <Input
                            id="latitud"
                            value={formData.latitud}
                            onChange={(e) => setFormData({ ...formData, latitud: e.target.value })}
                            placeholder="-39.2706"
                            className="text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="longitud" className="text-xs text-gray-600">
                            Longitud
                          </Label>
                          <Input
                            id="longitud"
                            value={formData.longitud}
                            onChange={(e) => setFormData({ ...formData, longitud: e.target.value })}
                            placeholder="-71.9756"
                            className="text-sm"
                          />
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={handleLocationSelect}
                        className="w-full sm:w-auto text-sm bg-transparent"
                      >
                        <Map className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Seleccionar en Mapa
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="descripcion" className="text-sm font-medium">
                        Descripción
                      </Label>
                      <Textarea
                        id="descripcion"
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        placeholder="Descripción de la ubicación y características..."
                        rows={3}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Responsable de Estación</CardTitle>
                  <CardDescription className="text-sm">Información del encargado</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="responsable" className="text-sm font-medium">
                          Nombre Completo *
                        </Label>
                        <Input
                          id="responsable"
                          value={formData.responsable}
                          onChange={(e) => setFormData({ ...formData, responsable: e.target.value })}
                          placeholder="Ej: Dr. Ana Silva"
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefono" className="text-sm font-medium">
                          Teléfono
                        </Label>
                        <Input
                          id="telefono"
                          value={formData.telefono}
                          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                          placeholder="+56 9 1234 5678"
                          className="text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Correo Electrónico
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="responsable@pucon.cl"
                        className="text-sm"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Variables Asociadas</CardTitle>
                  <CardDescription className="text-sm">
                    Seleccione las variables que monitoreará esta estación
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {availableVariables.map((variable) => (
                      <div key={variable.id} className="flex items-center space-x-2 p-2 border rounded">
                        <Checkbox
                          id={variable.id}
                          checked={formData.variables.includes(variable.id)}
                          onCheckedChange={(checked) => handleVariableChange(variable.id, checked as boolean)}
                        />
                        <Label htmlFor={variable.id} className="text-sm flex-1 cursor-pointer">
                          {variable.name} ({variable.unit})
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Botones de Acción */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <Button onClick={handleSave} className="flex-1 sm:flex-none text-sm">
                      <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Guardar Estación
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
