"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function StudentLoginPage() {
  const router = useRouter()
  const [matricula, setMatricula] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)

  const handleWalletConnect = async () => {
    setIsConnecting(true)
    // Simulate wallet connection
    setTimeout(() => {
      router.push("/student/dashboard")
    }, 1500)
  }

  const handleMatriculaLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (matricula) {
      router.push("/student/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      <Link
        href="/"
        className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors z-10"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Volver
      </Link>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-sm">
          <Card className="border shadow-sm">
            <CardHeader className="text-center space-y-3 pb-4">
              <div className="flex justify-center">
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
                  <Wallet className="h-7 w-7 text-emerald-600 dark:text-emerald-500" />
                </div>
              </div>
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold">Acceso Alumno</CardTitle>
                <CardDescription className="text-sm">Conecta tu wallet o ingresa con matrícula</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <div className="space-y-2">
                <Button
                  onClick={handleWalletConnect}
                  disabled={isConnecting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 h-9 text-sm font-medium"
                >
                  {isConnecting ? "Conectando..." : "Conectar Wallet"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">Soporta Solana y Stellar</p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-3 text-muted-foreground/70">O</span>
                </div>
              </div>

              <form onSubmit={handleMatriculaLogin} className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="matricula" className="text-sm font-medium">
                    Matrícula
                  </Label>
                  <Input
                    id="matricula"
                    placeholder="Ingresa tu matrícula"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    className="h-9"
                  />
                </div>
                <Button type="submit" variant="outline" className="w-full h-9 text-sm font-medium bg-transparent">
                  Ingresar con Matrícula
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
