"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Clock, RefreshCw, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function TokenPage() {
  const [token, setToken] = useState("847293")
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [isVerified, setIsVerified] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleRegenerate = () => {
    const newToken = Math.floor(100000 + Math.random() * 900000).toString()
    setToken(newToken)
    setTimeLeft(300)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/student/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al Dashboard
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Token de Acceso</h1>
          <p className="text-muted-foreground">Muestra este código al guardia de seguridad</p>
        </div>

        <Card className="border-2 border-emerald-500/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-emerald-500/10 rounded-2xl">
                <Shield className="h-12 w-12 text-emerald-500" />
              </div>
            </div>
            <CardTitle className="text-6xl font-bold tracking-wider mb-4 font-mono">{token}</CardTitle>
            <CardDescription className="flex items-center justify-center gap-2 text-base">
              <Clock className="h-4 w-4" />
              Expira en: <span className="font-semibold text-foreground">{formatTime(timeLeft)}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Estado:</span>
                <Badge variant={timeLeft > 0 ? "default" : "destructive"} className="bg-emerald-600">
                  {timeLeft > 0 ? "Activo" : "Expirado"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Blockchain:</span>
                {isVerified ? (
                  <div className="flex items-center gap-1 text-emerald-500">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Verificado ✓</span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Verificando...</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Hash:</span>
                <span className="text-xs font-mono text-muted-foreground">0x7a8f...3d2e</span>
              </div>
            </div>

            <Button
              onClick={handleRegenerate}
              variant="outline"
              className="w-full bg-transparent"
              disabled={timeLeft > 240}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerar Token
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Puedes regenerar el token cuando queden menos de 1 minuto
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
