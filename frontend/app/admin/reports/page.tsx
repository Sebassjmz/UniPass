import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Download, ArrowLeft, TrendingUp, Users, Clock } from "lucide-react"
import Link from "next/link"

export default function AdminReportsPage() {
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
            <span className="font-semibold">Reportes y Estadísticas</span>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar Todo
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Reportes y Estadísticas</h1>
          <p className="text-muted-foreground">Análisis detallado del sistema de acceso</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                <CardTitle className="text-lg">Accesos Totales</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-2">8,432</p>
              <p className="text-sm text-muted-foreground">Este mes</p>
              <div className="flex items-center gap-2 text-sm text-emerald-500 mt-2">
                <TrendingUp className="h-4 w-4" />
                <span>+15% vs mes anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-lg">Promedio Diario</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-2">342</p>
              <p className="text-sm text-muted-foreground">Accesos por día</p>
              <div className="flex items-center gap-2 text-sm text-blue-500 mt-2">
                <TrendingUp className="h-4 w-4" />
                <span>+8% esta semana</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-500" />
                <CardTitle className="text-lg">Tasa de Éxito</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-2">98.7%</p>
              <p className="text-sm text-muted-foreground">Tokens válidos</p>
              <div className="flex items-center gap-2 text-sm text-emerald-500 mt-2">
                <TrendingUp className="h-4 w-4" />
                <span>Excelente</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Accesos por Hora</CardTitle>
              <CardDescription>Distribución de accesos durante el día</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { hour: "07:00 - 09:00", count: 245, percentage: 85 },
                  { hour: "09:00 - 11:00", count: 189, percentage: 65 },
                  { hour: "11:00 - 13:00", count: 156, percentage: 54 },
                  { hour: "13:00 - 15:00", count: 198, percentage: 68 },
                  { hour: "15:00 - 17:00", count: 223, percentage: 77 },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.hour}</span>
                      <span className="font-semibold">{item.count} accesos</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Carreras</CardTitle>
              <CardDescription>Carreras con más accesos registrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { carrera: "Ingeniería en Sistemas", count: 1847, color: "bg-purple-500" },
                  { carrera: "Ingeniería Industrial", count: 1523, color: "bg-blue-500" },
                  { carrera: "Arquitectura", count: 1289, color: "bg-emerald-500" },
                  { carrera: "Administración", count: 1156, color: "bg-orange-500" },
                  { carrera: "Derecho", count: 987, color: "bg-pink-500" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm">{item.carrera}</span>
                    </div>
                    <span className="font-semibold">{item.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
