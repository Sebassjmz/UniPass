import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2 } from "lucide-react"

const historyData = [
  {
    id: 1,
    alumno: "Juan Pérez Domínguez",
    matricula: "2024-0123",
    tipo: "entrada",
    hora: "08:30 AM",
    fecha: "29 Oct 2024",
    hash: "0x7a8f...3d2e",
    valido: true,
  },
  {
    id: 2,
    alumno: "María García López",
    matricula: "2024-0456",
    tipo: "salida",
    hora: "02:45 PM",
    fecha: "29 Oct 2024",
    hash: "0x9c2e...5f1a",
    valido: true,
  },
  {
    id: 3,
    alumno: "Carlos Rodríguez Sánchez",
    matricula: "2024-0789",
    tipo: "entrada",
    hora: "08:15 AM",
    fecha: "29 Oct 2024",
    hash: "0x4b7e...8c9d",
    valido: true,
  },
  {
    id: 4,
    alumno: "Ana Martínez Flores",
    matricula: "2024-0321",
    tipo: "entrada",
    hora: "09:00 AM",
    fecha: "29 Oct 2024",
    hash: "0x1a4b...2f5a",
    valido: true,
  },
  {
    id: 5,
    alumno: "Luis Hernández Torres",
    matricula: "2024-0654",
    tipo: "salida",
    hora: "01:30 PM",
    fecha: "29 Oct 2024",
    hash: "0x6d9f...4e8c",
    valido: true,
  },
]

export function AccessHistoryTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Alumno</TableHead>
            <TableHead>Matrícula</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Hash</TableHead>
            <TableHead className="text-right">Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyData.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.alumno}</TableCell>
              <TableCell>{record.matricula}</TableCell>
              <TableCell>
                <Badge
                  variant={record.tipo === "entrada" ? "default" : "secondary"}
                  className={record.tipo === "entrada" ? "bg-emerald-600" : ""}
                >
                  {record.tipo === "entrada" ? "Entrada" : "Salida"}
                </Badge>
              </TableCell>
              <TableCell>{record.hora}</TableCell>
              <TableCell>{record.fecha}</TableCell>
              <TableCell className="font-mono text-xs">{record.hash}</TableCell>
              <TableCell className="text-right">
                {record.valido && (
                  <div className="flex items-center justify-end gap-1 text-emerald-500">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-xs">Válido</span>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
