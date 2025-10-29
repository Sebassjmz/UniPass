import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Shield, Clock, ArrowRight, Calendar, TrendingUp, Activity } from "lucide-react"
import Link from "next/link"
import { AccessHistory } from "@/components/access-history"
import { StudentNav } from "@/components/student-nav"

export default function StudentDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <StudentNav />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-lg">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">Juan Pérez Domínguez</h2>
                  <p className="text-muted-foreground">Matrícula: 2024-0123</p>
                  <p className="text-sm text-muted-foreground">Ingeniería en Sistemas Computacionales</p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge variant="outline" className="border-emerald-500 text-emerald-500">
                    <Shield className="h-3 w-3 mr-1" />
                    Verificado
                  </Badge>
                  <Link href="/student/profile">
                    <Button variant="ghost" size="sm">
                      Ver Perfil
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Accesos Este Mes</CardDescription>
              <CardTitle className="text-3xl">42</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-emerald-500">
                <TrendingUp className="h-4 w-4" />
                <span>+5 vs mes anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Asistencia</CardDescription>
              <CardTitle className="text-3xl">95%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-emerald-500">Excelente</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Último Acceso</CardDescription>
              <CardTitle className="text-lg">Hoy 08:30</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">Entrada</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Token Actual</CardDescription>
              <CardTitle className="text-lg">Expirado</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline">Inactivo</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-2 border-emerald-500/20">
            <CardHeader>
              <CardTitle>Token de Acceso</CardTitle>
              <CardDescription>Genera un token para entrar o salir del campus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Estado del Token</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  No tienes un token activo. Genera uno para registrar tu entrada o salida.
                </p>
              </div>
              <Link href="/student/token">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Generar Token Ahora
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumen Semanal</CardTitle>
              <CardDescription>Tus accesos de esta semana</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { day: "Lunes", entries: 2, status: "complete" },
                  { day: "Martes", entries: 2, status: "complete" },
                  { day: "Miércoles", entries: 2, status: "complete" },
                  { day: "Jueves", entries: 2, status: "complete" },
                  { day: "Viernes", entries: 1, status: "partial" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.day}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{item.entries} accesos</span>
                      <Badge
                        variant={item.status === "complete" ? "outline" : "secondary"}
                        className={item.status === "complete" ? "border-emerald-500 text-emerald-500" : ""}
                      >
                        {item.status === "complete" ? "Completo" : "Parcial"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Historial de Accesos</CardTitle>
              </div>
              <Link href="/student/history">
                <Button variant="ghost" size="sm">
                  Ver Todo
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
            <CardDescription>Últimos 5 registros de entrada/salida</CardDescription>
          </CardHeader>
          <CardContent>
            <AccessHistory />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
