import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft } from "lucide-react"

const accessData = [
  { id: 1, type: "entrada", time: "08:30 AM", date: "29 Oct 2024", hash: "0x7a8f...3d2e" },
  { id: 2, type: "salida", time: "02:45 PM", date: "29 Oct 2024", hash: "0x9c2e...5f1a" },
  { id: 3, type: "entrada", time: "08:15 AM", date: "28 Oct 2024", hash: "0x4b7e...8c9d" },
  { id: 4, type: "salida", time: "03:00 PM", date: "28 Oct 2024", hash: "0x1a4b...2f5a" },
  { id: 5, type: "entrada", time: "08:45 AM", date: "27 Oct 2024", hash: "0x6d9f...4e8c" },
]

export function AccessHistory() {
  return (
    <div className="space-y-3">
      {accessData.map((access) => (
        <div
          key={access.id}
          className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${access.type === "entrada" ? "bg-emerald-500/10" : "bg-blue-500/10"}`}>
              {access.type === "entrada" ? (
                <ArrowRight className="h-4 w-4 text-emerald-500" />
              ) : (
                <ArrowLeft className="h-4 w-4 text-blue-500" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={access.type === "entrada" ? "default" : "secondary"}
                  className={access.type === "entrada" ? "bg-emerald-600" : ""}
                >
                  {access.type === "entrada" ? "Entrada" : "Salida"}
                </Badge>
                <span className="text-sm font-medium">{access.time}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{access.date}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-mono text-muted-foreground">{access.hash}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
