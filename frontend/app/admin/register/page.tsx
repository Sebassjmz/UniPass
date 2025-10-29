"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

export default function AdminRegisterPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate blockchain registration
    setTimeout(() => {
      router.push("/admin/confirmation")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <Shield className="h-8 w-8 text-emerald-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Registro de Alumno</h1>
          <p className="text-muted-foreground">Registra un nuevo alumno en la blockchain</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Datos del Alumno</CardTitle>
            <CardDescription>Completa todos los campos para crear la identidad blockchain</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre(s)</Label>
                  <Input id="nombre" placeholder="Juan" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellidos">Apellidos</Label>
                  <Input id="apellidos" placeholder="Pérez Domínguez" required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="matricula">Matrícula</Label>
                  <Input id="matricula" placeholder="2024-0123" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="alumno@universidad.edu" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="carrera">Carrera</Label>
                <Input id="carrera" placeholder="Ingeniería en Sistemas Computacionales" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wallet">Dirección de Wallet (Opcional)</Label>
                <Input id="wallet" placeholder="0x..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="foto">Foto del Alumno</Label>
                <div className="flex items-center gap-2">
                  <Input id="foto" type="file" accept="image/*" />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
                  {isSubmitting ? "Registrando en Blockchain..." : "Registrar en Blockchain"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
