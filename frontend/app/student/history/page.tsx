import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Clock } from "lucide-react"
import { StudentNav } from "@/components/student-nav"

const historyData = [
  { date: "2025-10-29", time: "08:30 AM", type: "Entrada", status: "success", guard: "Roberto Sánchez" },
  { date: "2025-10-29", time: "02:45 PM", type: "Salida", status: "success", guard: "Laura Mendoza" },
  { date: "2025-10-28", time: "08:15 AM", type: "Entrada", status: "success", guard: "Roberto Sánchez" },
  { date: "2025-10-28", time: "03:00 PM", type: "Salida", status: "success", guard: "Miguel Torres" },
  { date: "2025-10-27", time: "08:45 AM", type: "Entrada", status: "success", guard: "Roberto Sánchez" },
  { date: "2025-10-27", time: "02:30 PM", type: "Salida", status: "success", guard: "Laura Mendoza" },
  { date: "2025-10-26", time: "08:20 AM", type: "Entrada", status: "success", guard: "Roberto Sánchez" },
  { date: "2025-10-26", time: "03:15 PM", type: "Salida", status: "success", guard: "Laura Mendoza" },
]

export default function StudentHistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <StudentNav />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Historial de Accesos</h1>
          <p className="text-muted-foreground">Registro completo de tus entradas y salidas</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total de Accesos</CardDescription>
              <CardTitle className="text-3xl">124</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Este semestre</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Promedio Semanal</CardDescription>
              <CardTitle className="text-3xl">12</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Accesos por semana</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Último Acceso</CardDescription>
              <CardTitle className="text-xl">Hoy 08:30</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="border-emerald-500 text-emerald-500">
                Entrada
              </Badge>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Registros Recientes</CardTitle>
                <CardDescription>Últimos 30 días</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {historyData.map((record, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded-lg">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{record.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.date} - {record.time}
                      </p>
                      <p className="text-xs text-muted-foreground">Verificado por: {record.guard}</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      record.type === "Entrada"
                        ? "border-emerald-500 text-emerald-500"
                        : "border-blue-500 text-blue-500"
                    }
                  >
                    {record.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
