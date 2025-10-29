import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserCheck, TrendingUp, Clock, AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { GuardNav } from "@/components/guard-nav"

export default function GuardDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <GuardNav />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard de Guardia</h1>
          <p className="text-muted-foreground">Roberto Sánchez - Turno Matutino (07:00 - 15:00)</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Accesos Hoy</CardDescription>
              <CardTitle className="text-3xl">87</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-emerald-500">
                <TrendingUp className="h-4 w-4" />
                <span>+12 vs ayer</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Verificaciones</CardDescription>
              <CardTitle className="text-3xl">145</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Esta semana</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Tokens Activos</CardDescription>
              <CardTitle className="text-3xl">8</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="border-emerald-500 text-emerald-500">
                En tiempo real
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Tasa de Éxito</CardDescription>
              <CardTitle className="text-3xl">99.2%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-emerald-500">Excelente</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 border-amber-500/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <CardTitle>Alertas del Sistema</CardTitle>
            </div>
            <CardDescription>Notificaciones importantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-amber-500/10 rounded-lg">
                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Token expirado detectado</p>
                  <p className="text-xs text-muted-foreground">
                    Ana Martínez intentó acceder con token vencido - Hace 12 min
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg">
                <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Cambio de turno próximo</p>
                  <p className="text-xs text-muted-foreground">Tu turno termina en 2 horas - 15:00</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>Operaciones frecuentes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/guard/verify">
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Verificar Token
                </Button>
              </Link>
              <Link href="/guard/history">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Clock className="h-4 w-4 mr-2" />
                  Ver Historial Completo
                </Button>
              </Link>
              <Link href="/guard/profile">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Mi Perfil y Estadísticas
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Actividad Reciente</CardTitle>
                <Link href="/guard/history">
                  <Button variant="ghost" size="sm">
                    Ver Todo
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <CardDescription>Últimas verificaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Juan Pérez", type: "Entrada", time: "Hace 5 min", status: "success" },
                  { name: "María García", type: "Salida", time: "Hace 12 min", status: "success" },
                  { name: "Carlos López", type: "Entrada", time: "Hace 18 min", status: "success" },
                  { name: "Ana Martínez", type: "Token expirado", time: "Hace 25 min", status: "error" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className={`text-xs ${item.status === "error" ? "text-red-500" : "text-muted-foreground"}`}>
                        {item.type}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Estadísticas de la Semana</CardTitle>
            <CardDescription>Distribución de accesos por día</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { day: "Lunes", count: 142, percentage: 85 },
                { day: "Martes", count: 156, percentage: 93 },
                { day: "Miércoles", count: 138, percentage: 82 },
                { day: "Jueves", count: 145, percentage: 87 },
                { day: "Viernes", count: 134, percentage: 80 },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{item.day}</span>
                    <span className="font-semibold">{item.count} accesos</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all" style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
