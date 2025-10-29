import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Wallet, UserCheck, Settings } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgb(16 185 129 / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(16 185 129 / 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />

      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-emerald-500 rounded-full" />
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 border border-emerald-500 rotate-45" />
      </div>

      <div className="relative flex items-center justify-center min-h-screen p-4 py-8">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-10 space-y-3">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-full" />
                <Shield className="relative h-10 w-10 text-emerald-600" strokeWidth={1.5} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-balance tracking-tight">
              Sistema de Acceso
              <span className="block text-emerald-600 mt-1">Blockchain</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto text-pretty">
              Control de acceso verificado en blockchain con seguridad de última generación
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="group border hover:border-emerald-500/50 hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-300 bg-card/50 backdrop-blur-sm">
              <CardHeader className="space-y-3 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                    <Wallet className="h-4 w-4 text-emerald-600" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-base">Acceso Alumno</CardTitle>
                </div>
                <CardDescription className="text-xs leading-relaxed">
                  Conecta tu wallet y genera tokens de acceso verificados en blockchain
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href="/student/login">
                  <Button className="w-full h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
                    Iniciar Sesión
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group border hover:border-emerald-500/30 hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-300 bg-card/50 backdrop-blur-sm">
              <CardHeader className="space-y-3 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-foreground/5 rounded-lg group-hover:bg-foreground/10 transition-colors">
                    <UserCheck className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-base">Acceso Guardia</CardTitle>
                </div>
                <CardDescription className="text-xs leading-relaxed">
                  Verifica tokens de acceso y registra entradas y salidas del sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href="/guard/login">
                  <Button className="w-full h-8 text-xs bg-transparent border hover:bg-foreground/5" variant="outline">
                    Acceso Guardia
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group border hover:border-emerald-500/30 hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-300 bg-card/50 backdrop-blur-sm">
              <CardHeader className="space-y-3 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-foreground/5 rounded-lg group-hover:bg-foreground/10 transition-colors">
                    <Settings className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-base">Acceso Admin</CardTitle>
                </div>
                <CardDescription className="text-xs leading-relaxed">
                  Panel de administración y gestión completa del sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href="/admin/login">
                  <Button className="w-full h-8 text-xs bg-foreground text-background hover:bg-foreground/90 shadow-sm">
                    Panel Admin
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}
