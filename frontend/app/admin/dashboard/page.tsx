import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, UserCheck, TrendingUp, AlertCircle, ArrowRight, Activity } from "lucide-react"
import Link from "next/link"
import { AdminNav } from "@/components/admin-nav"

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard Administrativo</h1>
          <p className="text-muted-foreground">Resumen general del sistema de acceso blockchain</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Alumnos</CardDescription>
              <CardTitle className="text-3xl">1,247</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-emerald-500">
                <TrendingUp className="h-4 w-4" />
                <span>+12% este mes</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Guardias Activos</CardDescription>
              <CardTitle className="text-3xl">8</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <UserCheck className="h-4 w-4" />
                <span>6 en turno ahora</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Accesos Hoy</CardDescription>
              <CardTitle className="text-3xl">342</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-blue-500">
                <TrendingUp className="h-4 w-4" />
                <span>+8% vs ayer</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Tokens Activos</CardDescription>
              <CardTitle className="text-3xl">23</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="border-emerald-500 text-emerald-500">
                <Activity className="h-3 w-3 mr-1" />
                En tiempo real
              </Badge>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 border-purple-500/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-purple-500" />
              <CardTitle>Alertas del Sistema</CardTitle>
            </div>
            <CardDescription>Notificaciones administrativas importantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-amber-500/10 rounded-lg">
                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">3 tokens expirados detectados</p>
                  <p className="text-xs text-muted-foreground">Última hora - Revisar historial</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-emerald-500/10 rounded-lg">
                <TrendingUp className="h-4 w-4 text-emerald-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Asistencia general: 94.5%</p>
                  <p className="text-xs text-muted-foreground">+2.3% vs semana anterior</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>Gestión del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/admin/register">
                <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700">
                  <Users className="h-4 w-4 mr-2" />
                  Registrar Nuevo Alumno
                </Button>
              </Link>
              <Link href="/admin/students">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Gestionar Alumnos
                </Button>
              </Link>
              <Link href="/admin/guards">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Gestionar Guardias
                </Button>
              </Link>
              <Link href="/admin/reports">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Ver Reportes Completos
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Actividad Reciente</CardTitle>
                <Link href="/admin/reports">
                  <Button variant="ghost" size="sm">
                    Ver Todo
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <CardDescription>Últimos registros del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Juan Pérez", action: "Entrada verificada", time: "Hace 2 min", type: "success" },
                  { name: "María García", action: "Salida registrada", time: "Hace 5 min", type: "info" },
                  { name: "Carlos López", action: "Entrada verificada", time: "Hace 8 min", type: "success" },
                  { name: "Ana Martínez", action: "Token expirado", time: "Hace 12 min", type: "error" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className={`text-xs ${item.type === "error" ? "text-red-500" : "text-muted-foreground"}`}>
                        {item.action}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tendencia de Accesos</CardTitle>
              <CardDescription>Últimos 7 días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { day: "Lun", count: 312, percentage: 78 },
                  { day: "Mar", count: 345, percentage: 86 },
                  { day: "Mié", count: 298, percentage: 74 },
                  { day: "Jue", count: 334, percentage: 83 },
                  { day: "Vie", count: 289, percentage: 72 },
                  { day: "Sáb", count: 156, percentage: 39 },
                  { day: "Dom", count: 98, percentage: 24 },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground w-12">{item.day}</span>
                      <span className="font-semibold">{item.count} accesos</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 transition-all" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estado del Sistema</CardTitle>
              <CardDescription>Métricas de rendimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Blockchain Sync</p>
                    <p className="text-xs text-muted-foreground">Última sincronización</p>
                  </div>
                  <Badge variant="outline" className="border-emerald-500 text-emerald-500">
                    Activo
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Tasa de Verificación</p>
                    <p className="text-xs text-muted-foreground">Promedio del sistema</p>
                  </div>
                  <span className="text-lg font-bold text-emerald-500">98.7%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Tiempo de Respuesta</p>
                    <p className="text-xs text-muted-foreground">Promedio de verificación</p>
                  </div>
                  <span className="text-lg font-bold">1.2s</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
