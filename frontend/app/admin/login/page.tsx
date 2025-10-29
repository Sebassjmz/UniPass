"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username && password) {
      router.push("/admin/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      <Link
        href="/"
        className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Volver
      </Link>

      <Card className="w-full max-w-sm border">
        <CardHeader className="text-center space-y-2 pb-4">
          <div className="flex justify-center">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Shield className="h-5 w-5 text-emerald-500" />
            </div>
          </div>
          <CardTitle className="text-lg">Acceso Administrador</CardTitle>
          <CardDescription className="text-xs">Panel de administración del sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <form onSubmit={handleLogin} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-xs">
                Usuario
              </Label>
              <Input
                id="username"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <Button type="submit" className="w-full h-9 text-sm bg-emerald-600 hover:bg-emerald-700">
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
