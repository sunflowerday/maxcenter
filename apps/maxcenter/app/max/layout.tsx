import { Sidebar } from "@/components/layout/sidebar"

export default function MaxLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Sidebar />
      <main className="flex-1 bg-background">
        <div className="container py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
