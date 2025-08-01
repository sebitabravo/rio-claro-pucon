"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, MapPin, Droplets, Thermometer, Activity, Zap } from "lucide-react"

export default function MapPage() {
  const router = useRouter()
  const [selectedSensor, setSelectedSensor] = useState("RC001")

  const handleBack = () => {
    router.push("/dashboard")
  }

  // Datos específicos del Río Claro con coordenadas
  const rioClaro = {
    sensors: [
      {
        id: "RC001",
        name: "Nacimiento (Volcán)",
        level: 92,
        status: "critical",
        temp: 9.8,
        flow: 62,
        x: 15,
        y: 10,
        description: "Sensor ubicado en el nacimiento del río cerca del Volcán Villarrica",
      },
      {
        id: "RC002",
        name: "Sector Alto",
        level: 85,
        status: "critical",
        temp: 10.2,
        flow: 55,
        x: 25,
        y: 20,
        description: "Monitoreo en la parte alta de la cuenca",
      },
      {
        id: "RC003",
        name: "Puente Pucón",
        level: 78,
        status: "warning",
        temp: 12.5,
        flow: 42,
        x: 45,
        y: 35,
        description: "Sensor principal en el puente de acceso a Pucón",
      },
      {
        id: "RC004",
        name: "Balneario",
        level: 72,
        status: "warning",
        temp: 12.8,
        flow: 40,
        x: 55,
        y: 45,
        description: "Monitoreo en zona recreativa y balneario",
      },
      {
        id: "RC005",
        name: "Puente Ruta",
        level: 68,
        status: "normal",
        temp: 12.0,
        flow: 36,
        x: 65,
        y: 55,
        description: "Sensor en el puente de la Ruta 199",
      },
      {
        id: "RC006",
        name: "Desembocadura",
        level: 65,
        status: "normal",
        temp: 11.8,
        flow: 38,
        x: 75,
        y: 70,
        description: "Punto de desembocadura en el Lago Villarrica",
      },
      {
        id: "RC007",
        name: "Confluencia",
        level: 58,
        status: "normal",
        temp: 13.1,
        flow: 35,
        x: 35,
        y: 65,
        description: "Confluencia con el Río Trancura",
      },
      {
        id: "RC008",
        name: "Camping",
        level: 45,
        status: "normal",
        temp: 11.5,
        flow: 28,
        x: 50,
        y: 25,
        description: "Sensor en área de camping y turismo",
      },
    ],
  }

  const selectedSensorData = rioClaro.sensors.find((s) => s.id === selectedSensor)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-500"
      case "warning":
        return "bg-yellow-500"
      case "normal":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "critical":
        return "CRÍTICO"
      case "warning":
        return "ALERTA"
      case "normal":
        return "NORMAL"
      default:
        return "DESCONOCIDO"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Mapa Interactivo - Río Claro</h1>
              <p className="text-sm text-gray-500">Ministerio del Medio Ambiente - Vista geográfica</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedSensor} onValueChange={setSelectedSensor}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {rioClaro.sensors.map((sensor) => (
                  <SelectItem key={sensor.id} value={sensor.id}>
                    {sensor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mapa Principal */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Mapa del Río Claro</CardTitle>
              <CardDescription>Distribución de sensores a lo largo de los 45 km del río</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gradient-to-br from-green-100 via-blue-50 to-blue-100 rounded-lg h-96 overflow-hidden">
                {/* Simulación del río */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  {/* Río Claro path */}
                  <path
                    d="M 15 10 Q 25 20 35 30 Q 45 35 55 45 Q 65 55 75 70"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.6"
                  />
                  {/* Confluencia branch */}
                  <path d="M 35 65 Q 40 50 45 35" stroke="#3B82F6" strokeWidth="2" fill="none" opacity="0.4" />
                </svg>

                {/* Sensores */}
                {rioClaro.sensors.map((sensor) => (
                  <div
                    key={sensor.id}
                    className={`absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-2 -translate-y-2 ${getStatusColor(
                      sensor.status,
                    )} ${sensor.status !== "normal" ? "animate-pulse" : ""} ${
                      selectedSensor === sensor.id ? "ring-4 ring-blue-300 scale-125" : ""
                    }`}
                    style={{ left: `${sensor.x}%`, top: `${sensor.y}%` }}
                    onClick={() => setSelectedSensor(sensor.id)}
                    title={`${sensor.name} - ${sensor.level}%`}
                  />
                ))}

                {/* Etiquetas geográficas */}
                <div className="absolute top-2 left-4 text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded">
                  Volcán Villarrica
                </div>
                <div className="absolute bottom-4 right-4 text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded">
                  Lago Villarrica
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded">
                  Pucón
                </div>

                {/* Leyenda */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-xs font-medium mb-2">Estado de Sensores</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs">Crítico</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs">Alerta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs">Normal</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Panel de Información del Sensor Seleccionado */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Sensor Seleccionado
              </CardTitle>
              <CardDescription>Información detallada en tiempo real</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedSensorData && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{selectedSensorData.name}</h3>
                    <Badge
                      variant={
                        selectedSensorData.status === "critical"
                          ? "destructive"
                          : selectedSensorData.status === "warning"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {getStatusText(selectedSensorData.status)}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600">{selectedSensorData.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">Nivel de Agua</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">{selectedSensorData.level}%</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">Temperatura</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">{selectedSensorData.temp}°C</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium">Caudal</span>
                      </div>
                      <span className="text-lg font-bold text-purple-600">{selectedSensorData.flow} m³/s</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium">Estado</span>
                      </div>
                      <span className="text-sm font-medium text-orange-600">Operativo</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-xs text-gray-500 mb-2">ID del Sensor: {selectedSensorData.id}</p>
                    <p className="text-xs text-gray-500">Última actualización: hace 2 minutos</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Resumen de Todos los Sensores */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Resumen de Sensores - Río Claro</CardTitle>
            <CardDescription>Vista general de todos los puntos de monitoreo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {rioClaro.sensors.map((sensor) => (
                <div
                  key={sensor.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedSensor === sensor.id ? "border-blue-500 bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedSensor(sensor.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(sensor.status)}`}></div>
                    <Badge
                      variant={
                        sensor.status === "critical"
                          ? "destructive"
                          : sensor.status === "warning"
                            ? "secondary"
                            : "default"
                      }
                      className="text-xs"
                    >
                      {getStatusText(sensor.status)}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-sm mb-1">{sensor.name}</h4>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Nivel: {sensor.level}%</p>
                    <p>Temp: {sensor.temp}°C</p>
                    <p>Caudal: {sensor.flow} m³/s</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
