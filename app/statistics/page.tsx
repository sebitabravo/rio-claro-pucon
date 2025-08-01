"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Calendar, Download, Droplets, ArrowLeft, Activity } from "lucide-react"

export default function Statistics() {
  const router = useRouter()

  const handleBack = () => {
    router.push("/dashboard")
  }

  const handleExport = () => {
    // Simular descarga
    alert("Exportando datos del Río Claro...")
  }

  // Datos específicos del Río Claro
  const rioClaro = {
    maxLevel: 92,
    avgLevel: 68,
    totalAlerts: 23,
    uptime: 99.8,
    sectors: [
      { name: "Nacimiento (Volcán)", level: 92, alerts: 8 },
      { name: "Sector Alto", level: 85, alerts: 5 },
      { name: "Puente Pucón", level: 78, alerts: 4 },
      { name: "Balneario", level: 72, alerts: 3 },
      { name: "Puente Ruta", level: 68, alerts: 2 },
      { name: "Desembocadura", level: 65, alerts: 1 },
      { name: "Confluencia", level: 58, alerts: 0 },
      { name: "Camping", level: 45, alerts: 0 },
    ],
  }

  const recentEvents = [
    {
      time: "14:30",
      date: "22/03/2024",
      sector: "Río Claro - Nacimiento",
      event: "Nivel crítico por deshielo",
      severity: "critical",
    },
    {
      time: "11:15",
      date: "22/03/2024",
      sector: "Río Claro - Sector Alto",
      event: "Incremento rápido de caudal",
      severity: "warning",
    },
    {
      time: "08:45",
      date: "21/03/2024",
      sector: "Río Claro - Puente Pucón",
      event: "Normalización después de lluvia",
      severity: "normal",
    },
    {
      time: "16:20",
      date: "20/03/2024",
      sector: "Río Claro - Balneario",
      event: "Advertencia por actividad turística",
      severity: "warning",
    },
  ]

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
              <h1 className="text-xl font-semibold">Estadísticas del Río Claro</h1>
              <p className="text-sm text-gray-500">Ministerio del Medio Ambiente - Análisis histórico</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="7days">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Últimas 24h</SelectItem>
                <SelectItem value="7days">Últimos 7 días</SelectItem>
                <SelectItem value="30days">Últimos 30 días</SelectItem>
                <SelectItem value="3months">Últimos 3 meses</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Resumen Río Claro</TabsTrigger>
            <TabsTrigger value="sectors">Por Sectores</TabsTrigger>
            <TabsTrigger value="alerts">Historial de Alertas</TabsTrigger>
            <TabsTrigger value="reports">Reportes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Métricas del Río Claro */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Nivel Máximo</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{rioClaro.maxLevel}%</div>
                  <p className="text-xs text-muted-foreground">Nacimiento - Volcán Villarrica</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Promedio Semanal</CardTitle>
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{rioClaro.avgLevel}%</div>
                  <p className="text-xs text-muted-foreground">+8% vs semana anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Alertas</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{rioClaro.totalAlerts}</div>
                  <p className="text-xs text-muted-foreground">8 críticas, 15 advertencias</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tiempo Activo</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{rioClaro.uptime}%</div>
                  <p className="text-xs text-muted-foreground">Disponibilidad sensores</p>
                </CardContent>
              </Card>
            </div>

            {/* Gráficos del Río Claro */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Niveles por Sector - Río Claro</CardTitle>
                  <CardDescription>Distribución de niveles a lo largo del río</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center relative">
                    {/* Simulación de gráfico de barras */}
                    <div className="absolute inset-4 flex items-end justify-around">
                      {rioClaro.sectors.map((sector, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="w-8 bg-blue-500 rounded-t" style={{ height: `${sector.level * 2}px` }}></div>
                          <span className="text-xs mt-1 transform -rotate-45 origin-left">
                            {sector.name.split(" ")[0]}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="text-center z-10">
                      <BarChart3 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-700">Niveles por Sector</p>
                      <p className="text-sm text-gray-500">Río Claro - 8 puntos de medición</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alertas por Sector</CardTitle>
                  <CardDescription>Distribución de alertas en el Río Claro</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-gradient-to-br from-red-50 to-yellow-50 rounded-lg flex items-center justify-center relative">
                    {/* Simulación de gráfico circular */}
                    <div className="absolute inset-8">
                      <svg className="w-full h-full" viewBox="0 0 200 200">
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#EF4444"
                          strokeWidth="20"
                          strokeDasharray="50 251"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#F59E0B"
                          strokeWidth="20"
                          strokeDasharray="40 261"
                          strokeDashoffset="-50"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="20"
                          strokeDasharray="30 271"
                          strokeDashoffset="-90"
                        />
                      </svg>
                    </div>

                    <div className="text-center z-10">
                      <Activity className="w-16 h-16 text-red-600 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-700">Distribución de Alertas</p>
                      <p className="text-sm text-gray-500">Por sector del Río Claro</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Eventos Recientes del Río Claro */}
            <Card>
              <CardHeader>
                <CardTitle>Eventos Recientes - Río Claro</CardTitle>
                <CardDescription>Últimas alertas y cambios significativos en el río</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-500">
                          {event.time}
                          <br />
                          {event.date}
                        </div>
                        <div>
                          <p className="font-medium">{event.sector}</p>
                          <p className="text-sm text-gray-600">{event.event}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          event.severity === "critical"
                            ? "destructive"
                            : event.severity === "warning"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {event.severity === "critical" ? "CRÍTICO" : event.severity === "warning" ? "ALERTA" : "NORMAL"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sectors">
            <Card>
              <CardHeader>
                <CardTitle>Análisis por Sectores del Río Claro</CardTitle>
                <CardDescription>Rendimiento individual de cada sector monitoreado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {rioClaro.sectors.map((sector, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">{sector.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold mb-1">{sector.level}%</div>
                        <p className="text-xs text-gray-500">{sector.alerts} alertas</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className={`h-2 rounded-full ${
                              sector.level > 80 ? "bg-red-500" : sector.level > 60 ? "bg-yellow-500" : "bg-green-500"
                            }`}
                            style={{ width: `${sector.level}%` }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Alertas - Río Claro</CardTitle>
                <CardDescription>Registro completo de alertas del río</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-600">Historial Completo</p>
                    <p className="text-sm text-gray-500">Cronología de eventos del Río Claro</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reportes del Río Claro</CardTitle>
                <CardDescription>Genera reportes personalizados del río</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Download className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-600">Generador de Reportes</p>
                    <p className="text-sm text-gray-500">Exporta datos específicos del Río Claro</p>
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
