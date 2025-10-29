"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle2, XCircle, LogOut, History } from "lucide-react"
import Link from "next/link"

export default function GuardVerifyPage() {
  const [token, setToken] = useState("")
  const [verificationResult, setVerificationResult] = useState<"success" | "error" | null>(null)

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate verification
    if (token === "847293") {
      setVerificationResult("success")
    } else {
      setVerificationResult("error")
    }
  }

  const handleReset = () => {
    setToken("")
    setVerificationResult(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-blue-500" />
            <span className="font-semibold">Panel de Guardia</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/guard/history">
              <Button variant="ghost" size="sm">
                <History className="h-4 w-4 mr-2" />
                Historial
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Verificación de Token</h1>
          <p className="text-muted-foreground">Ingresa el código del alumno para verificar acceso</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Ingresar Código</CardTitle>
            <CardDescription>Código de 6 dígitos proporcionado por el alumno</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token">Token de Acceso</Label>
                <Input
                  id="token"
                  placeholder="Ej: 847293"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  maxLength={6}
                  className="text-2xl font-mono text-center tracking-wider"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Verificar
                </Button>
                <Button type="button" variant="outline" onClick={handleReset}>
                  Limpiar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {verificationResult === "success" && (
          <Card className="border-2 border-emerald-500/50 bg-emerald-500/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <CardTitle className="text-emerald-500">Token Válido ✓</CardTitle>
                  <CardDescription>Alumno verificado correctamente</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-background rounded-lg">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Juan Pérez Domínguez</h3>
                  <p className="text-sm text-muted-foreground">Matrícula: 2024-0123</p>
                  <p className="text-sm text-muted-foreground">Ingeniería en Sistemas Computacionales</p>
                </div>
                <Badge variant="outline" className="border-emerald-500 text-emerald-500">
                  Verificado
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Hora</p>
                  <p className="font-semibold">
                    {new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Blockchain</p>
                  <p className="font-semibold text-emerald-500">Verificado ✓</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">Registrar Entrada</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Registrar Salida
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {verificationResult === "error" && (
          <Card className="border-2 border-destructive/50 bg-destructive/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <XCircle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <CardTitle className="text-destructive">Token Inválido</CardTitle>
                  <CardDescription>El token ha expirado o no es válido</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Por favor, solicita al alumno que genere un nuevo token desde su aplicación.
              </p>
              <Button variant="outline" onClick={handleReset} className="w-full bg-transparent">
                Intentar Nuevamente
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
