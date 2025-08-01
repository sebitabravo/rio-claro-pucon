"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Bell,
  Settings,
  ArrowLeft,
  Mail,
  Phone,
  MessageSquare,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function AlertsPage() {
  const router = useRouter()
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)

  const handleBack = () => {
    router.push("/dashboard")
  }

  const handleAcknowledge = (alertId: number) => {
    setActiveAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, acknowledged: true } : alert)))
  }

  const handleViewDetails = (alertId: number) => {
    alert(`Viendo detalles de la alerta ${alertId} del Río Claro`)
  }

  // Alertas específicas del Río Claro
  const [activeAlerts, setActiveAlerts] = useState([
    {
      id: 1,
      sector: "Río Claro - Nacimiento (Volcán)",
      level: "critical",
      message: "Nivel crítico por deshielo volcánico (92%)",
      time: "14:30",
      date: "22/03/2024",
      acknowledged: false,
    },
    {
      id: 2,
      sector: "Río Claro - Sector Alto",
      level: "critical",
      message: "Incremento rápido de caudal (85%)",
      time: "13:45",
      date: "22/03/2024",
      acknowledged: false,
    },
    {
      id: 3,
      sector: "Río Claro - Puente Pucón",
      level: "warning",
      message: "Nivel de advertencia por lluvia (78%)",
      time: "12:20",
      date: "22/03/2024",
      acknowledged: false,
    },
    {
      id: 4,
      sector: "Río Claro - Balneario",
      level: "warning",
      message: "Monitoreo por actividad turística (72%)",
      time: "11:15",
      date: "22/03/2024",
      acknowledged: true,
    },
  ])

  const criticalCount = activeAlerts.filter((a) => a.level === "critical" && !a.acknowledged).length
  const warningCount = activeAlerts.filter((a) => a.level === "warning" && !a.acknowledged).length
  const acknowledgedCount = activeAlerts.filter((a) => a.acknowledged).length

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
              <h1 className="text-xl font-semibold">Sistema de Alertas - Río Claro</h1>
              <p className="text-sm text-gray-500">Ministerio del Medio Ambiente - Gestión de alertas</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {criticalCount + warningCount} Alertas Activas
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configurar
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Alertas Activas</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
            <TabsTrigger value="config">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {/* Resumen de Alertas del Río Claro */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Alertas Críticas</CardTitle>
                  <XCircle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
                  <p className="text-xs text-muted-foreground">Río Claro - Atención inmediata</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Advertencias</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{warningCount}</div>
                  <p className="text-xs text-muted-foreground">Monitoreo continuo</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reconocidas</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{acknowledgedCount}</div>
                  <p className="text-xs text-muted-foreground">En proceso de resolución</p>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Alertas Activas del Río Claro */}
            <Card>
              <CardHeader>
                <CardTitle>Alertas Activas - Río Claro</CardTitle>
                <CardDescription>Alertas que requieren atención en los diferentes sectores del río</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 border rounded-lg ${
                        alert.level === "critical"
                          ? "border-red-200 bg-red-50"
                          : alert.level === "warning"
                            ? "border-yellow-200 bg-yellow-50"
                            : "border-gray-200 bg-gray-50"
                      } ${alert.acknowledged ? "opacity-60" : ""}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-1 w-3 h-3 rounded-full ${
                              alert.level === "critical"
                                ? "bg-red-500"
                                : alert.level === "warning"
                                  ? "bg-yellow-500"
                                  : "bg-gray-500"
                            } ${!alert.acknowledged && alert.level !== "normal" ? "animate-pulse" : ""}`}
                          ></div>
                          <div>
                            <h4 className="font-medium">{alert.sector}</h4>
                            <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              {alert.time} - {alert.date}
                            </p>
                            {alert.acknowledged && <p className="text-xs text-green-600 mt-1">✓ Reconocida</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              alert.level === "critical"
                                ? "destructive"
                                : alert.level === "warning"
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            {alert.level === "critical" ? "CRÍTICO" : alert.level === "warning" ? "ALERTA" : "NORMAL"}
                          </Badge>
                          {!alert.acknowledged && (
                            <Button size="sm" variant="outline" onClick={() => handleAcknowledge(alert.id)}>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Reconocer
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => handleViewDetails(alert.id)}>
                            <Eye className="w-4 h-4 mr-1" />
                            Ver Detalles
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Alertas - Río Claro</CardTitle>
                <CardDescription>Registro completo de alertas pasadas del río</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-600">Historial de Alertas</p>
                    <p className="text-sm text-gray-500">Registro cronológico del Río Claro</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            {/* Configuración General */}
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Alertas - Río Claro</CardTitle>
                <CardDescription>Ajustes específicos para el monitoreo del río</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Sistema de Alertas</Label>
                    <p className="text-sm text-muted-foreground">Activar alertas para el Río Claro</p>
                  </div>
                  <Switch checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Notificaciones por Email</Label>
                    <p className="text-sm text-muted-foreground">Recibir alertas del río por correo</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Notificaciones SMS</Label>
                    <p className="text-sm text-muted-foreground">SMS para alertas críticas del río</p>
                  </div>
                  <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>
              </CardContent>
            </Card>

            {/* Umbrales específicos del Río Claro */}
            <Card>
              <CardHeader>
                <CardTitle>Umbrales del Río Claro</CardTitle>
                <CardDescription>Configurar niveles específicos para cada sector</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="warning-level">Nivel de Advertencia (%)</Label>
                    <Input id="warning-level" type="number" defaultValue="70" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="critical-level">Nivel Crítico (%)</Label>
                    <Input id="critical-level" type="number" defaultValue="85" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="flow-warning">Caudal Advertencia (m³/s)</Label>
                    <Input id="flow-warning" type="number" defaultValue="45" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="flow-critical">Caudal Crítico (m³/s)</Label>
                    <Input id="flow-critical" type="number" defaultValue="60" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contactos de Emergencia */}
            <Card>
              <CardHeader>
                <CardTitle>Contactos de Emergencia - Río Claro</CardTitle>
                <CardDescription>Personas que recibirán alertas críticas del río</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 border rounded-lg">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <div className="flex-1">
                      <p className="font-medium">Director Emergencias Río Claro</p>
                      <p className="text-sm text-gray-500">rioclaro@pucon.cl</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 p-3 border rounded-lg">
                    <Phone className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="font-medium">Bomberos Sector Río Claro</p>
                      <p className="text-sm text-gray-500">+56 9 8765 4321</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 p-3 border rounded-lg">
                    <Phone className="w-5 h-5 text-orange-500" />
                    <div className="flex-1">
                      <p className="font-medium">ONEMI Pucón</p>
                      <p className="text-sm text-gray-500">+56 45 244 2000</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Agregar Nuevo Contacto
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
