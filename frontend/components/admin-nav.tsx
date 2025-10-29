"use client"

import { Button } from "@/components/ui/button"
import { Shield, LogOut, Settings, Users, UserCheck, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function AdminNav() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Shield className="h-6 w-6 text-purple-500" />
          <span className="font-semibold">Panel de Administración</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/admin/students">
            <Button variant="ghost" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Alumnos
            </Button>
          </Link>
          <Link href="/admin/guards">
            <Button variant="ghost" size="sm">
              <UserCheck className="h-4 w-4 mr-2" />
              Guardias
            </Button>
          </Link>
          <Link href="/admin/reports">
            <Button variant="ghost" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Reportes
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Salir
          </Button>
        </div>
      </div>
    </header>
  )
}
