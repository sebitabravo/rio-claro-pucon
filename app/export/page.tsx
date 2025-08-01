"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  ArrowLeft,
  Download,
  FileText,
  FileSpreadsheet,
  CalendarIcon,
  CheckCircle,
  AlertCircle,
  Filter,
  Database,
  Clock,
  MapPin,
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function ExportPage() {
  const router = useRouter()
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [exportData, setExportData] = useState({
    formato: "",
    estaciones: [] as string[],
    variables: [] as string[],
    incluirAlertas: false,
    incluirEstadisticas: false,
  })

  const handleBack = () => {
    router.push("/dashboard")
  }

  const handleExport = async () => {
    if (!exportData.formato || !startDate || !endDate || exportData.estaciones.length === 0) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    setIsExporting(true)

    // Simular exportación
    setTimeout(() => {
      setIsExporting(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)

      // Simular descarga
      const filename = `rio_claro_${format(startDate, "yyyy-MM-dd")}_${format(endDate, "yyyy-MM-dd")}.${exportData.formato}`
      alert(`Descargando archivo: ${filename}`)
    }, 2000)
  }

  const handleStationChange = (stationId: string, checked: boolean) => {
    if (checked) {
      setExportData({
        ...exportData,
        estaciones: [...exportData.estaciones, stationId],
      })
    } else {
      setExportData({
        ...exportData,
        estaciones: exportData.estaciones.filter((id) => id !== stationId),
      })
    }
  }

  const handleVariableChange = (variableId: string, checked: boolean) => {
    if (checked) {
      setExportData({
        ...exportData,
        variables: [...exportData.variables, variableId],
      })
    } else {
      setExportData({
        ...exportData,
        variables: exportData.variables.filter((id) => id !== variableId),
      })
    }
  }

  const availableStations = [
    { id: "RC001", name: "Río Claro - Nacimiento", location: "Volcán Villarrica" },
    { id: "RC002", name: "Río Claro - Sector Alto", location: "Cordillera" },
    { id: "RC003", name: "Río Claro - Puente Pucón", location: "Centro Pucón" },
    { id: "RC004", name: "Río Claro - Balneario", location: "Zona Recreativa" },
    { id: "RC005", name: "Río Claro - Puente Ruta", location: "Ruta 199" },
    { id: "RC006", name: "Río Claro - Desembocadura", location: "Lago Villarrica" },
  ]

  const availableVariables = [
    { id: "nivel", name: "Nivel de Agua", unit: "m" },
    { id: "temperatura", name: "Temperatura", unit: "°C" },
    { id: "caudal", name: "Caudal", unit: "m³/s" },
    { id: "bateria", name: "Nivel de Batería", unit: "%" },
    { id: "ph", name: "pH del Agua", unit: "pH" },
    { id: "turbidez", name: "Turbidez", unit: "NTU" },
  ]

  const recentExports = [
    {
      id: 1,
      nombre: "Datos Río Claro - Marzo 2024",
      formato: "CSV",
      fecha: "22/03/2024 14:30",
      estaciones: 6,
      variables: 4,
      tamaño: "2.3 MB",
    },
    {
      id: 2,
      nombre: "Reporte Semanal - Alertas",
      formato: "PDF",
      fecha: "20/03/2024 09:15",
      estaciones: 8,
      variables: 6,
      tamaño: "1.8 MB",
    },
    {
      id: 3,
      nombre: "Estadísticas Mensuales",
      formato: "Excel",
      fecha: "18/03/2024 16:45",
      estaciones: 8,
      variables: 6,
      tamaño: "4.1 MB",
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
              <h1 className="text-lg sm:text-xl font-semibold">Exportación de Datos - Río Claro</h1>
              <p className="text-xs sm:text-sm text-gray-500">Ministerio del Medio Ambiente</p>
            </div>
          </div>
          <Badge variant="outline" className="flex items-center gap-1 text-xs">
            <Database className="w-3 h-3" />
            Sistema Activo
          </Badge>
        </div>
      </header>

      {/* Success/Error Messages */}
      {showSuccess && (
        <div className="mx-3 sm:mx-6 mt-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          <span className="text-sm sm:text-base text-green-800">Exportación completada exitosamente</span>
        </div>
      )}

      {showError && (
        <div className="mx-3 sm:mx-6 mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
          <span className="text-sm sm:text-base text-red-800">Por favor complete todos los campos obligatorios</span>
        </div>
      )}

      <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Configuración de Exportación */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
                  Configuración de Exportación
                </CardTitle>
                <CardDescription className="text-sm">
                  Configure los parámetros para exportar datos del Río Claro
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {/* Formato de Exportación */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Formato de Exportación *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                    <Button
                      variant={exportData.formato === "csv" ? "default" : "outline"}
                      onClick={() => setExportData({ ...exportData, formato: "csv" })}
                      className="flex items-center gap-2 text-sm"
                    >
                      <FileText className="w-4 h-4" />
                      CSV
                    </Button>
                    <Button
                      variant={exportData.formato === "xlsx" ? "default" : "outline"}
                      onClick={() => setExportData({ ...exportData, formato: "xlsx" })}
                      className="flex items-center gap-2 text-sm"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      Excel
                    </Button>
                    <Button
                      variant={exportData.formato === "pdf" ? "default" : "outline"}
                      onClick={() => setExportData({ ...exportData, formato: "pdf" })}
                      className="flex items-center gap-2 text-sm"
                    >
                      <FileText className="w-4 h-4" />
                      PDF
                    </Button>
                  </div>
                </div>

                {/* Rango de Fechas */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Rango de Fechas *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-gray-600">Fecha Inicio</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal text-sm bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                            {startDate ? format(startDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-gray-600">Fecha Fin</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal text-sm bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                            {endDate ? format(endDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>

                {/* Selección de Estaciones */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Estaciones a Exportar *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableStations.map((station) => (
                      <div key={station.id} className="flex items-center space-x-2 p-2 border rounded text-sm">
                        <Checkbox
                          id={station.id}
                          checked={exportData.estaciones.includes(station.id)}
                          onCheckedChange={(checked) => handleStationChange(station.id, checked as boolean)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={station.id} className="text-sm cursor-pointer font-medium">
                            {station.name}
                          </Label>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {station.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selección de Variables */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Variables a Incluir</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableVariables.map((variable) => (
                      <div key={variable.id} className="flex items-center space-x-2 p-2 border rounded text-sm">
                        <Checkbox
                          id={variable.id}
                          checked={exportData.variables.includes(variable.id)}
                          onCheckedChange={(checked) => handleVariableChange(variable.id, checked as boolean)}
                        />
                        <Label htmlFor={variable.id} className="text-sm flex-1 cursor-pointer">
                          {variable.name} ({variable.unit})
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Opciones Adicionales */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Opciones Adicionales</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="incluirAlertas"
                        checked={exportData.incluirAlertas}
                        onCheckedChange={(checked) =>
                          setExportData({ ...exportData, incluirAlertas: checked as boolean })
                        }
                      />
                      <Label htmlFor="incluirAlertas" className="text-sm cursor-pointer">
                        Incluir registro de alertas
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="incluirEstadisticas"
                        checked={exportData.incluirEstadisticas}
                        onCheckedChange={(checked) =>
                          setExportData({ ...exportData, incluirEstadisticas: checked as boolean })
                        }
                      />
                      <Label htmlFor="incluirEstadisticas" className="text-sm cursor-pointer">
                        Incluir estadísticas resumidas
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Botón de Exportación */}
                <div className="pt-4 border-t">
                  <Button onClick={handleExport} disabled={isExporting} className="w-full sm:w-auto text-sm" size="lg">
                    {isExporting ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Exportando...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Exportar Datos del Río Claro
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Historial de Exportaciones */}
          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Exportaciones Recientes</CardTitle>
                <CardDescription className="text-sm">Historial de descargas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentExports.map((export_item) => (
                    <div key={export_item.id} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{export_item.nombre}</h4>
                        <Badge variant="outline" className="text-xs">
                          {export_item.formato}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {export_item.fecha}
                        </p>
                        <p>
                          {export_item.estaciones} estaciones • {export_item.variables} variables
                        </p>
                        <p>Tamaño: {export_item.tamaño}</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-2 text-xs bg-transparent">
                        <Download className="w-3 h-3 mr-1" />
                        Descargar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Información del Sistema */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Información del Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Registros totales:</span>
                    <span className="font-medium">1,247,832</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estaciones activas:</span>
                    <span className="font-medium">6/8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Última actualización:</span>
                    <span className="font-medium">hace 2 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Período disponible:</span>
                    <span className="font-medium">2023-2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
