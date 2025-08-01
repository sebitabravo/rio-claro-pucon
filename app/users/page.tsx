"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Users,
  Shield,
  Mail,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react"

export default function UsersPage() {
  const router = useRouter()
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    rol: "",
    password: "",
    confirmPassword: "",
    estaciones: [] as string[],
    activo: true,
  })

  const handleBack = () => {
    router.push("/dashboard")
  }

  const handleSave = () => {
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.rol || !formData.password) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    setShowSuccess(true)
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      rol: "",
      password: "",
      confirmPassword: "",
      estaciones: [],
      activo: true,
    })
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleCancel = () => {
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      rol: "",
      password: "",
      confirmPassword: "",
      estaciones: [],
      activo: true,
    })
  }

  const handleClear = () => {
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      rol: "",
      password: "",
      confirmPassword: "",
      estaciones: [],
      activo: true,
    })
  }

  const handleStationChange = (stationId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        estaciones: [...formData.estaciones, stationId],
      })
    } else {
      setFormData({
        ...formData,
        estaciones: formData.estaciones.filter((id) => id !== stationId),
      })
    }
  }

  const availableStations = [
    { id: "RC001", name: "Río Claro - Nacimiento" },
    { id: "RC002", name: "Río Claro - Sector Alto" },
    { id: "RC003", name: "Río Claro - Puente Pucón" },
    { id: "RC004", name: "Río Claro - Balneario" },
    { id: "RC005", name: "Río Claro - Puente Ruta" },
    { id: "RC006", name: "Río Claro - Desembocadura" },
  ]

  const users = [
    {
      id: 1,
      nombre: "Carlos Mendoza",
      email: "c.mendoza@pucon.cl",
      telefono: "+56 9 8765 4321",
      rol: "Administrador",
      estaciones: ["RC001", "RC002"],
      activo: true,
      ultimoAcceso: "22/03/2024 14:30",
    },
    {
      id: 2,
      nombre: "María González",
      email: "m.gonzalez@pucon.cl",
      telefono: "+56 9 7654 3210",
      rol: "Operador",
      estaciones: ["RC003", "RC004"],
      activo: true,
      ultimoAcceso: "22/03/2024 13:45",
    },
    {
      id: 3,
      nombre: "Juan Pérez",
      email: "j.perez@pucon.cl",
      telefono: "+56 9 6543 2109",
      rol: "Visualizador",
      estaciones: ["RC005", "RC006"],
      activo: false,
      ultimoAcceso: "20/03/2024 09:15",
    },
  ]

  const getRoleBadge = (rol: string) => {
    switch (rol) {
      case "Administrador":
        return (
          <Badge variant="destructive" className="text-xs">
            Admin
          </Badge>
        )
      case "Operador":
        return (
          <Badge variant="default" className="text-xs">
            Operador
          </Badge>
        )
      case "Visualizador":
        return (
          <Badge variant="secondary" className="text-xs">
            Visualizador
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-xs">
            {rol}
          </Badge>
        )
    }
  }

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
              <h1 className="text-lg sm:text-xl font-semibold">Gestión de Usuarios - Río Claro</h1>
              <p className="text-xs sm:text-sm text-gray-500">Ministerio del Medio Ambiente - Control de accesos</p>
            </div>
          </div>
        </div>
      </header>

      {/* Success/Error Messages */}
      {showSuccess && (
        <div className="mx-3 sm:mx-6 mt-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          <span className="text-sm sm:text-base text-green-800">Usuario registrado exitosamente</span>
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
            <TabsTrigger value="list">Usuarios Existentes</TabsTrigger>
            <TabsTrigger value="form">Registrar Nuevo</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            {/* Lista de Usuarios */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Usuarios del Sistema - Río Claro</CardTitle>
                <CardDescription className="text-sm">Personal autorizado para el monitoreo del río</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="p-3 sm:p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-blue-600" />
                            <h4 className="font-medium text-sm sm:text-base">{user.nombre}</h4>
                            {getRoleBadge(user.rol)}
                            <Badge variant={user.activo ? "default" : "secondary"} className="text-xs">
                              {user.activo ? "Activo" : "Inactivo"}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600">
                            <div>
                              <p className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {user.email}
                              </p>
                              <p className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {user.telefono}
                              </p>
                            </div>
                            <div>
                              <p>
                                <strong>Último acceso:</strong> {user.ultimoAcceso}
                              </p>
                              <p>
                                <strong>Estaciones:</strong> {user.estaciones.length}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-xs sm:text-sm text-gray-600 mb-1">
                              <strong>Estaciones asignadas:</strong>
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {user.estaciones.map((stationId, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {stationId}
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
                            <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
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
                  <CardTitle className="text-base sm:text-lg">Información Personal</CardTitle>
                  <CardDescription className="text-sm">Datos básicos del usuario</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nombre" className="text-sm font-medium">
                          Nombre *
                        </Label>
                        <Input
                          id="nombre"
                          value={formData.nombre}
                          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                          placeholder="Ej: Carlos"
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apellido" className="text-sm font-medium">
                          Apellido *
                        </Label>
                        <Input
                          id="apellido"
                          value={formData.apellido}
                          onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                          placeholder="Ej: Mendoza"
                          className="text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Correo Electrónico *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="usuario@pucon.cl"
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
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Rol y Permisos</CardTitle>
                  <CardDescription className="text-sm">Configuración de acceso al sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="rol" className="text-sm font-medium">
                        Rol del Usuario *
                      </Label>
                      <Select value={formData.rol} onValueChange={(value) => setFormData({ ...formData, rol: value })}>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Seleccionar rol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="administrador">Administrador - Acceso completo</SelectItem>
                          <SelectItem value="operador">Operador - Gestión de datos</SelectItem>
                          <SelectItem value="visualizador">Visualizador - Solo lectura</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Estaciones Asignadas</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {availableStations.map((station) => (
                          <div key={station.id} className="flex items-center space-x-2 p-2 border rounded">
                            <Checkbox
                              id={station.id}
                              checked={formData.estaciones.includes(station.id)}
                              onCheckedChange={(checked) => handleStationChange(station.id, checked as boolean)}
                            />
                            <Label htmlFor={station.id} className="text-sm flex-1 cursor-pointer">
                              {station.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Credenciales de Acceso</CardTitle>
                  <CardDescription className="text-sm">Configuración de contraseña</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">
                          Contraseña *
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Mínimo 8 caracteres"
                            className="text-sm pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">
                          Confirmar Contraseña *
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          placeholder="Repetir contraseña"
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Botones de Acción */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <Button onClick={handleSave} className="flex-1 sm:flex-none text-sm">
                      <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Guardar Usuario
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
