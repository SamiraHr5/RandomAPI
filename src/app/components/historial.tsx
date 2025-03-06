import Link from "next/link"

export default function historial() {
    return(
    <main className="fixed left-0 w-full p-4 shadow-md">
        <div className="grid grid-cols-2 gap-4 justify-items-center">
    <Link href="/" className="text-black bg-white">Home</Link>
    <Link href="/Page2" className="text-black bg-white">Page 2</Link>
    </div>
    </main>
    );
} 