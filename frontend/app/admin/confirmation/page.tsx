import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ExternalLink, Home } from "lucide-react"
import Link from "next/link"

export default function ConfirmationPage() {
  const txHash = "0x7a8f9c2e1b4d6f3a5e8c9d2f1a4b7e3c6d9f2a5b8e1c4d7f0a3b6e9c2d5f8a1b"
  const explorerUrl = `https://explorer.solana.com/tx/${txHash}`

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="border-2 border-emerald-500/50">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-emerald-500/10 rounded-2xl">
                <CheckCircle2 className="h-16 w-16 text-emerald-500" />
              </div>
            </div>
            <CardTitle className="text-3xl text-emerald-500 mb-2">¡Registro Exitoso!</CardTitle>
            <CardDescription className="text-base">
              La identidad del alumno ha sido registrada correctamente en la blockchain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Hash de Transacción</p>
                <p className="font-mono text-xs break-all">{txHash}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link href={explorerUrl} target="_blank" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver en Explorador
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-emerald-500">Próximos Pasos</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>El alumno puede ahora conectar su wallet o usar su matrícula para acceder</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>Los tokens de acceso estarán verificados en blockchain automáticamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>El historial de accesos quedará registrado de forma inmutable</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-2">
              <Link href="/admin/register" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Registrar Otro Alumno
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Home className="h-4 w-4 mr-2" />
                  Ir al Inicio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
