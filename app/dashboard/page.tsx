"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  AlertTriangle,
  Droplets,
  MapPin,
  TrendingUp,
  Thermometer,
  Settings,
  BarChart3,
  Bell,
  Users,
  LogOut,
} from "lucide-react"

export default function Dashboard() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedSensor, setSelectedSensor] = useState("sensor-1")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Actualizar tiempo cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Datos específicos del Río Claro
  const sensors = [
    {
      id: "sensor-1",
      name: "Río Claro - Puente Pucón",
      level: 78,
      status: "warning",
      temp: 12.5,
      flow: 42,
      location: "Sector Centro",
    },
    {
      id: "sensor-2",
      name: "Río Claro - Desembocadura",
      level: 65,
      status: "normal",
      temp: 11.8,
      flow: 38,
      location: "Lago Villarrica",
    },
    {
      id: "sensor-3",
      name: "Río Claro - Sector Alto",
      level: 85,
      status: "critical",
      temp: 10.2,
      flow: 55,
      location: "Cordillera",
    },
    {
      id: "sensor-4",
      name: "Río Claro - Confluencia",
      level: 58,
      status: "normal",
      temp: 13.1,
      flow: 35,
      location: "Río Trancura",
    },
    {
      id: "sensor-5",
      name: "Río Claro - Balneario",
      level: 72,
      status: "warning",
      temp: 12.8,
      flow: 40,
      location: "Zona Recreativa",
    },
    {
      id: "sensor-6",
      name: "Río Claro - Camping",
      level: 45,
      status: "normal",
      temp: 11.5,
      flow: 28,
      location: "Área Turística",
    },
    {
      id: "sensor-7",
      name: "Río Claro - Puente Ruta",
      level: 68,
      status: "normal",
      temp: 12.0,
      flow: 36,
      location: "Ruta 199",
    },
    {
      id: "sensor-8",
      name: "Río Claro - Nacimiento",
      level: 92,
      status: "critical",
      temp: 9.8,
      flow: 62,
      location: "Volcán Villarrica",
    },
  ]

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

  const criticalCount = sensors.filter((s) => s.status === "critical").length
  const warningCount = sensors.filter((s) => s.status === "warning").length
  const normalCount = sensors.filter((s) => s.status === "normal").length
  const avgLevel = Math.round(sensors.reduce((acc, s) => acc + s.level, 0) / sensors.length)
  const avgTemp = (sensors.reduce((acc, s) => acc + s.temp, 0) / sensors.length).toFixed(1)

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <img
              src="/images/gobierno-logo.jpeg"
              alt="Ministerio del Medio Ambiente"
              className="w-8 h-6 sm:w-10 sm:h-8 object-contain"
            />
            <div>
              <h1 className="text-lg sm:text-xl font-semibold">Sistema de Monitoreo Río Claro</h1>
              <p className="text-xs sm:text-sm text-gray-500">
                Ministerio del Medio Ambiente • {currentTime.toLocaleString("es-CL")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Badge variant="outline" className="hidden sm:flex items-center gap-1 text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Sistema Activo
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavigation("/alerts")}
              className="text-xs sm:text-sm"
            >
              <Bell className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Alertas</span> ({criticalCount + warningCount})
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="text-xs sm:text-sm bg-transparent">
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Mobile Menu Button - Improved Design */}
        <div className="lg:hidden fixed top-20 left-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="bg-white shadow-lg border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 rounded-lg p-2"
          >
            <div className="flex flex-col space-y-1">
              <div
                className={`w-5 h-0.5 bg-blue-600 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
              ></div>
              <div
                className={`w-5 h-0.5 bg-blue-600 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
              ></div>
              <div
                className={`w-5 h-0.5 bg-blue-600 transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              ></div>
            </div>
            <span className="sr-only">Abrir menú</span>
          </Button>
        </div>

        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen p-4">
          <nav className="space-y-2">
            <Button variant="default" className="w-full justify-start">
              <Activity className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigation("/map")}>
              <MapPin className="w-4 h-4 mr-2" />
              Mapa del Río Claro
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigation("/statistics")}>
              <BarChart3 className="w-4 h-4 mr-2" />
              Estadísticas
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigation("/alerts")}>
              <AlertTriangle className="w-4 h-4 mr-2" />
              Alertas ({criticalCount + warningCount})
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigation("/settings")}>
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigation("/users")}>
              <Users className="w-4 h-4 mr-2" />
              Usuarios
            </Button>
          </nav>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}>
            <aside className="w-64 bg-white h-full p-4">
              <nav className="space-y-2">
                <Button variant="default" className="w-full justify-start">
                  <Activity className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigation("/map")}>
                  <MapPin className="w-4 h-4 mr-2" />
                  Mapa del Río Claro
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation("/statistics")}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Estadísticas
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigation("/alerts")}>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Alertas ({criticalCount + warningCount})
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigation("/settings")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Configuración
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigation("/users")}>
                  <Users className="w-4 h-4 mr-2" />
                  Usuarios
                </Button>
              </nav>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-6 lg:ml-0">
          {/* Resumen General */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sensores Activos</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sensors.length}/{sensors.length}
                </div>
                <p className="text-xs text-muted-foreground">Río Claro monitoreado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nivel Promedio</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgLevel}%</div>
                <p className="text-xs text-muted-foreground">
                  {avgLevel > 75 ? "Nivel alto" : avgLevel > 50 ? "Nivel normal" : "Nivel bajo"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alertas Activas</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{criticalCount + warningCount}</div>
                <p className="text-xs text-muted-foreground">
                  {criticalCount} críticas, {warningCount} advertencias
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Temperatura Prom.</CardTitle>
                <Thermometer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgTemp}°C</div>
                <p className="text-xs text-muted-foreground">Río Claro</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Mapa del Río Claro */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Mapa del Río Claro</CardTitle>
                <CardDescription>Ubicación de sensores a lo largo del río</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                  {/* Simulación del río */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-2 bg-blue-300 transform rotate-12 opacity-60"></div>
                  </div>

                  <div className="text-center z-10">
                    <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 font-medium">Río Claro - Pucón</p>
                    <p className="text-xs text-gray-500">8 sensores distribuidos</p>
                  </div>

                  {/* Puntos de sensores específicos del Río Claro */}
                  <div
                    className="absolute top-6 left-12 w-3 h-3 bg-red-500 rounded-full animate-pulse"
                    title="Sector Alto - Crítico"
                  ></div>
                  <div
                    className="absolute top-16 left-20 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"
                    title="Puente Pucón - Alerta"
                  ></div>
                  <div
                    className="absolute bottom-20 left-32 w-3 h-3 bg-green-500 rounded-full"
                    title="Desembocadura - Normal"
                  ></div>
                  <div
                    className="absolute bottom-12 right-16 w-3 h-3 bg-green-500 rounded-full"
                    title="Confluencia - Normal"
                  ></div>
                  <div
                    className="absolute top-20 right-20 w-3 h-3 bg-red-500 rounded-full animate-pulse"
                    title="Nacimiento - Crítico"
                  ></div>
                  <div
                    className="absolute bottom-16 left-16 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"
                    title="Balneario - Alerta"
                  ></div>
                  <div
                    className="absolute top-32 right-32 w-3 h-3 bg-green-500 rounded-full"
                    title="Camping - Normal"
                  ></div>
                  <div
                    className="absolute bottom-24 right-24 w-3 h-3 bg-green-500 rounded-full"
                    title="Puente Ruta - Normal"
                  ></div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Sensores del Río Claro */}
            <Card>
              <CardHeader>
                <CardTitle>Sensores del Río Claro</CardTitle>
                <CardDescription>Estado en tiempo real de todos los puntos de monitoreo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {sensors.map((sensor) => (
                    <div
                      key={sensor.id}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedSensor === sensor.id ? "border-blue-500 bg-blue-50" : ""
                      }`}
                      onClick={() => setSelectedSensor(sensor.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${getStatusColor(sensor.status)} ${
                            sensor.status !== "normal" ? "animate-pulse" : ""
                          }`}
                        ></div>
                        <div>
                          <p className="font-medium text-sm">{sensor.name}</p>
                          <p className="text-xs text-gray-500">
                            {sensor.location} • Nivel: {sensor.level}% • {sensor.flow} m³/s
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          sensor.status === "critical"
                            ? "destructive"
                            : sensor.status === "warning"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {getStatusText(sensor.status)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de Tendencias del Río Claro */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Tendencias del Río Claro</CardTitle>
                <CardDescription>Niveles de agua en las últimas 24 horas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg flex items-center justify-center relative">
                  {/* Simulación de gráfico */}
                  <div className="absolute inset-4">
                    <svg className="w-full h-full" viewBox="0 0 400 200">
                      <polyline
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        points="0,150 50,140 100,120 150,110 200,130 250,125 300,115 350,105 400,95"
                      />
                      <polyline
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                        points="0,160 50,155 100,145 150,140 200,150 250,148 300,142 350,138 400,135"
                      />
                    </svg>
                  </div>

                  <div className="text-center z-10">
                    <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 font-medium">Gráfico de Tendencias</p>
                    <p className="text-xs text-gray-500">Azul: Nivel • Verde: Caudal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
