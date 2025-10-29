"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/admin/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Shield className="h-6 w-6 text-purple-500" />
          <span className="font-semibold">Configuración del Sistema</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Configuración</h1>
          <p className="text-muted-foreground">Ajustes generales del sistema</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Tokens</CardTitle>
              <CardDescription>Ajusta el comportamiento de los tokens de acceso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token-duration">Duración del Token (minutos)</Label>
                <Input id="token-duration" type="number" defaultValue="5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="token-length">Longitud del Token (dígitos)</Label>
                <Input id="token-length" type="number" defaultValue="6" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuración de Blockchain</CardTitle>
              <CardDescription>Parámetros de la red blockchain</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="network">Red Blockchain</Label>
                <Input id="network" defaultValue="Solana Mainnet" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rpc">RPC Endpoint</Label>
                <Input id="rpc" defaultValue="https://api.mainnet-beta.solana.com" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>Configuración de alertas del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email de Notificaciones</Label>
                <Input id="email" type="email" defaultValue="admin@universidad.edu" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
