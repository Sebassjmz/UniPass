"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, Search, Plus, Edit, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

const students = [
  {
    id: 1,
    name: "Juan Pérez Domínguez",
    matricula: "2024-0123",
    carrera: "Ingeniería en Sistemas",
    status: "active",
    wallet: "0x7a8f...3d2e",
  },
  {
    id: 2,
    name: "María García López",
    matricula: "2024-0124",
    carrera: "Ingeniería Industrial",
    status: "active",
    wallet: "0x9b2c...4f1a",
  },
  {
    id: 3,
    name: "Carlos López Ramírez",
    matricula: "2024-0125",
    carrera: "Arquitectura",
    status: "inactive",
    wallet: null,
  },
]

export default function AdminStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Shield className="h-6 w-6 text-purple-500" />
            <span className="font-semibold">Gestión de Alumnos</span>
          </div>
          <Link href="/admin/register">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Alumno
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Gestión de Alumnos</h1>
          <p className="text-muted-foreground">Administra los alumnos registrados en el sistema</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Alumnos Registrados</CardTitle>
                <CardDescription>Total: {students.length} alumnos</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o matrícula..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              {students.map((student) => (
                <Card key={student.id} className="border">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/generic-placeholder-icon.png?height=48&width=48`} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{student.name}</h3>
                          <Badge variant={student.status === "active" ? "default" : "secondary"} className="text-xs">
                            {student.status === "active" ? "Activo" : "Inactivo"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Matrícula: {student.matricula}</p>
                        <p className="text-sm text-muted-foreground">{student.carrera}</p>
                        {student.wallet && (
                          <p className="text-xs text-muted-foreground font-mono mt-1">Wallet: {student.wallet}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
