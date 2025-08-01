"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Activity, MapPin, BarChart3, AlertTriangle, Settings, Users } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Activity },
    { href: "/map", label: "Mapa", icon: MapPin },
    { href: "/statistics", label: "Estadísticas", icon: BarChart3 },
    { href: "/alerts", label: "Alertas", icon: AlertTriangle },
    { href: "/settings", label: "Configuración", icon: Settings },
    { href: "/users", label: "Usuarios", icon: Users },
  ]

  return (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link key={item.href} href={item.href}>
            <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start">
              <Icon className="w-4 h-4 mr-2" />
              {item.label}
            </Button>
          </Link>
        )
      })}
    </nav>
  )
}
