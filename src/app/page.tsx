'use client'
import Hook from "./components/hook";
import Historial from "./components/historial";

export default function Page() {
  return (
    <main style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", padding: "20px", gap: "40px" }}>
      <div style={{ width: "300px", overflowY: "auto" }}>
        <Historial />
      </div>

      <div style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <Hook />
      </div>
    </main>
  );
}
