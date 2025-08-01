"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Activity } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular login
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4">
            <img
              src="/images/gobierno-logo.jpeg"
              alt="Ministerio del Medio Ambiente - Gobierno de Chile"
              className="w-32 h-auto mx-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Sistema de Monitoreo Río Claro</h1>
          <p className="text-gray-600">Ministerio del Medio Ambiente</p>
          <p className="text-sm text-gray-500 mt-1">Municipalidad de Pucón - Prevención de Desborde</p>
        </div>

        {/* Formulario de Login */}
        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>Accede al sistema de monitoreo del Río Claro</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="usuario@pucon.cl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Ingresando..." : "Ingresar al Sistema"}
              </Button>
              <div className="text-center">
                <Button variant="link" size="sm" type="button">
                  ¿Olvidaste tu contraseña?
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Información adicional */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="flex items-center gap-1">
              <Activity className="w-4 h-4 text-green-500" />
              <span>Sistema Activo</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>8 Sensores Río Claro</span>
            </div>
          </div>
          <p>Monitoreo 24/7 del Río Claro en Pucón</p>
        </div>
      </div>
    </div>
  )
}
