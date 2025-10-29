"use client"

import { Button } from "@/components/ui/button"
import { Shield, LogOut, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function StudentNav() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/student/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Shield className="h-6 w-6 text-emerald-500" />
          <span className="font-semibold">Sistema de Acceso</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/student/profile">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Mi Perfil
            </Button>
          </Link>
          <Link href="/student/history">
            <Button variant="ghost" size="sm">
              Historial
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
