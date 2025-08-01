"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, UserPlus } from "lucide-react"

export default function UsersPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push("/dashboard")
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
              <h1 className="text-xl font-semibold">Gestión de Usuarios - Río Claro</h1>
              <p className="text-sm text-gray-500">Ministerio del Medio Ambiente - Control de accesos</p>
            </div>
          </div>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Agregar Usuario
          </Button>
        </div>
      </header>

      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Usuarios del Sistema</CardTitle>
            <CardDescription>Personal autorizado para el monitoreo del Río Claro</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-600">Gestión de Usuarios</p>
                <p className="text-sm text-gray-500">Administrar permisos y accesos al sistema del Río Claro</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
