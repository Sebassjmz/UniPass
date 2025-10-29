"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Shield, Save, Upload } from "lucide-react"
import { StudentNav } from "@/components/student-nav"

export default function StudentProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <StudentNav />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
          <p className="text-muted-foreground">Administra tu información personal</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Foto de Perfil</CardTitle>
              <CardDescription>Actualiza tu foto de identificación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Cambiar Foto
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG o GIF. Máximo 2MB.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Datos registrados en blockchain</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre(s)</Label>
                  <Input id="nombre" defaultValue="Juan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellidos">Apellidos</Label>
                  <Input id="apellidos" defaultValue="Pérez Domínguez" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="matricula">Matrícula</Label>
                <Input id="matricula" defaultValue="2024-0123" disabled />
                <p className="text-xs text-muted-foreground">La matrícula no puede ser modificada</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="juan.perez@universidad.edu" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="carrera">Carrera</Label>
                <Input id="carrera" defaultValue="Ingeniería en Sistemas Computacionales" disabled />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información Blockchain</CardTitle>
              <CardDescription>Datos de verificación en blockchain</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wallet">Dirección de Wallet</Label>
                <Input id="wallet" defaultValue="0x7a8f9c2e1b4d6f3a5e8c9d2f1a4b7e3c6d9f2a5b" disabled />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Estado de Verificación</p>
                  <p className="text-xs text-muted-foreground">Última verificación hace 2 horas</p>
                </div>
                <Badge variant="outline" className="border-emerald-500 text-emerald-500">
                  <Shield className="h-3 w-3 mr-1" />
                  Verificado
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancelar</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
