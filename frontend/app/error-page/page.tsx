import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-2 border-destructive/50">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-destructive/10 rounded-2xl">
                <XCircle className="h-16 w-16 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-2xl text-destructive">Token Expirado</CardTitle>
            <CardDescription className="text-base">El token de acceso ha expirado o no es válido</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                Los tokens de acceso tienen una validez de 5 minutos por razones de seguridad. Por favor, genera un
                nuevo token para continuar.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Link href="/student/token">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generar Nuevo Token
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full bg-transparent">
                  <Home className="h-4 w-4 mr-2" />
                  Volver al Inicio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
