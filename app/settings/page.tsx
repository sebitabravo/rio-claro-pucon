"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, ArrowLeft, Wifi, Database, Shield, Users, Monitor, Save, RefreshCw } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [soundAlerts, setSoundAlerts] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleBack = () => {
    router.push("/dashboard")
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleAddSensor = () => {
    alert("Agregando nuevo sensor al Río Claro...")
  }

  const handleConfigureSensor = (sensorId: string) => {
    alert(`Configurando sensor ${sensorId} del Río Claro`)
  }

  const handleCalibrateSensor = (sensorId: string) => {
    alert(`Calibrando sensor ${sensorId} del Río Claro`)
  }

  // Sensores específicos del Río Claro
  const rioClaro = {
    sensors: [
      { id: "RC001", name: "Río Claro - Nacimiento (Volcán)", status: "active", lastUpdate: "1 min" },
      { id: "RC002", name: "Río Claro - Sector Alto", status: "active", lastUpdate: "2 min" },
      { id: "RC003", name: "Río Claro - Puente Pucón", status: "warning", lastUpdate: "3 min" },
      { id: "RC004", name: "Río Claro - Balneario", status: "active", lastUpdate: "1 min" },
      { id: "RC005", name: "Río Claro - Puente Ruta", status: "active", lastUpdate: "2 min" },
      { id: "RC006", name: "Río Claro - Desembocadura", status: "active", lastUpdate: "1 min" },
      { id: "RC007", name: "Río Claro - Confluencia", status: "active", lastUpdate: "4 min" },
      { id: "RC008", name: "Río Claro - Camping", status: "maintenance", lastUpdate: "15 min" },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="outline" size="sm" onClick={handleBack}>
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Volver</span>
            </Button>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold">Configuración - Río Claro</h1>
              <p className="text-xs sm:text-sm text-gray-500">Ajustes del sistema de monitoreo</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saved} className="text-xs sm:text-sm">
            <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            {saved ? "Guardado ✓" : "Guardar Cambios"}
          </Button>
        </div>
      </header>

      <div className="p-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="sensors">Sensores Río Claro</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="security">Seguridad</TabsTrigger>
            <TabsTrigger value="system">Sistema</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            {/* Configuración de Interfaz */}
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Interfaz</CardTitle>
                <CardDescription>Personaliza la apariencia del sistema de monitoreo del Río Claro</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Actualización Automática</Label>
                    <p className="text-sm text-muted-foreground">Actualizar datos del Río Claro cada 30 segundos</p>
                  </div>
                  <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Modo Oscuro</Label>
                    <p className="text-sm text-muted-foreground">Cambiar a tema oscuro</p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Alertas Sonoras</Label>
                    <p className="text-sm text-muted-foreground">Sonido para alertas críticas del río</p>
                  </div>
                  <Switch checked={soundAlerts} onCheckedChange={setSoundAlerts} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="refresh-interval">Intervalo de Actualización</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 segundos</SelectItem>
                        <SelectItem value="30">30 segundos</SelectItem>
                        <SelectItem value="60">1 minuto</SelectItem>
                        <SelectItem value="300">5 minutos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Zona Horaria</Label>
                    <Select defaultValue="chile">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chile">Chile (UTC-3)</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Configuración del Río Claro */}
            <Card>
              <CardHeader>
                <CardTitle>Información del Río Claro</CardTitle>
                <CardDescription>Ministerio del Medio Ambiente - Configuración específica del río</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="river-name">Nombre del Río</Label>
                    <Input id="river-name" defaultValue="Río Claro - Pucón" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email de Contacto</Label>
                    <Input id="contact-email" type="email" defaultValue="rioclaro@pucon.gov.cl" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergency-phone">Teléfono de Emergencia</Label>
                    <Input id="emergency-phone" defaultValue="+56 45 244 1000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Región</Label>
                    <Input id="region" defaultValue="Región de La Araucanía" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="river-length">Longitud del Río (km)</Label>
                    <Input id="river-length" type="number" defaultValue="45" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="watershed">Cuenca</Label>
                    <Input id="watershed" defaultValue="Cuenca del Lago Villarrica" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sensors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Sensores - Río Claro</CardTitle>
                <CardDescription>
                  Configuración y estado de los 8 sensores distribuidos a lo largo del río
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rioClaro.sensors.map((sensor) => (
                    <div key={sensor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            sensor.status === "active"
                              ? "bg-green-500"
                              : sensor.status === "warning"
                                ? "bg-yellow-500"
                                : sensor.status === "maintenance"
                                  ? "bg-blue-500"
                                  : "bg-red-500"
                          }`}
                        ></div>
                        <div>
                          <p className="font-medium">{sensor.name}</p>
                          <p className="text-sm text-gray-500">
                            ID: {sensor.id} • Última actualización: {sensor.lastUpdate}
                          </p>
                          <p className="text-xs text-gray-400">
                            Estado:{" "}
                            {sensor.status === "active"
                              ? "Activo"
                              : sensor.status === "warning"
                                ? "Advertencia"
                                : sensor.status === "maintenance"
                                  ? "Mantenimiento"
                                  : "Error"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleConfigureSensor(sensor.id)}>
                          <Settings className="w-4 h-4 mr-1" />
                          Configurar
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleCalibrateSensor(sensor.id)}>
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Calibrar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full bg-transparent" onClick={handleAddSensor}>
                    <Wifi className="w-4 h-4 mr-2" />
                    Agregar Nuevo Sensor al Río Claro
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Usuarios</CardTitle>
                <CardDescription>Administrar accesos al sistema de monitoreo del Río Claro</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-600">Gestión de Usuarios</p>
                    <p className="text-sm text-gray-500">Administrar permisos y accesos al sistema</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Seguridad</CardTitle>
                <CardDescription>Ajustes de seguridad para el sistema del Río Claro</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-600">Configuración de Seguridad</p>
                    <p className="text-sm text-gray-500">Políticas de acceso y autenticación</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información del Sistema - Río Claro</CardTitle>
                <CardDescription>Estado y configuración técnica del monitoreo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Versión del Sistema:</span>
                      <span className="text-sm text-gray-600">v2.1.0 - Río Claro</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Última Actualización:</span>
                      <span className="text-sm text-gray-600">22/03/2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Tiempo de Actividad:</span>
                      <span className="text-sm text-gray-600">18 días, 12 horas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Río Monitoreado:</span>
                      <span className="text-sm text-gray-600">Río Claro - Pucón</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Base de Datos:</span>
                      <span className="text-sm text-gray-600">Conectada</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Sensores Activos:</span>
                      <span className="text-sm text-gray-600">7/8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Espacio en Disco:</span>
                      <span className="text-sm text-gray-600">65% usado</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Longitud Monitoreada:</span>
                      <span className="text-sm text-gray-600">45 km</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <Button variant="outline" className="text-xs sm:text-sm bg-transparent">
                      <Database className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Respaldar Datos del Río
                    </Button>
                    <Button variant="outline" className="text-xs sm:text-sm bg-transparent">
                      <Monitor className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Diagnóstico del Sistema
                    </Button>
                    <Button variant="outline" className="text-xs sm:text-sm bg-transparent">
                      <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Reiniciar Servicios
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
