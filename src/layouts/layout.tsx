import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="w-screen bg-gray-700 h-screen bg-contain">
        <header className="bg-green-300 p-3">
            <h1 className="text-4xl font-medium">Rick and Morty</h1>
        </header>
        <main className="p-4 w-full bg-gray-700 flex justify-between items-center">
            <Outlet/>
        </main>
    </div>
  )
}
