/* =====================================================================
 * KONFIGURASI SUPABASE — PROYEK MANDIRI LKPD PRODUKSI KONTEN DIGITAL
 * Wajib diisi sebelum dipakai:
 *   1. Buat proyek baru di https://supabase.com (jangan pakai proyek LKPD lain)
 *   2. Settings → API → salin "Project URL" dan "anon public key"
 *   3. Tempel keduanya di dua baris di bawah, lalu jalankan sql/schema.sql
 * JANGAN PERNAH mengisi key service_role di file ini — hanya anon key!
 * ===================================================================== */
const SUPABASE_URL = "https://nuyctknyatbivyunalij.supabase.co"; // ← tempel Project URL di sini
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51eWN0a255YXRiaXZ5dW5hbGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ1NTc4ODQsImV4cCI6MjExMDEzMzg4NH0.uSC2V1_QiEyxEeh398nKRWOi-ZEKSbUcP7CfikGLM7k"; // ← tempel anon public key di sini

// ---------------------------------------------------------------------------
// Profil guru default yang dibuat via SQL (lihat README bagian 6).
// ---------------------------------------------------------------------------
const CONFIG = {
  app: {
    namaApp: "LKPD Interaktif — Produksi & Diseminasi Konten Digital",
    mapel: "Koding dan Kecerdasan Artifisial",
    kelas: "X",
    satuanPenilaian: "SPSS", // skor sementara (0-100), dipakai guru saat input rapor
  },
};

// ------------------------------------------------------------------
// Inisialisasi client (script supabasejs dimuat lewat CDN di HTML)
// ------------------------------------------------------------------
let db = null;
function initSupabase() {
  if (db) return db;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    const pesan = "Supabase belum dikonfigurasi: isi SUPABASE_URL dan SUPABASE_ANON_KEY di js/supabase-config.js, lalu jalankan sql/schema.sql di SQL Editor proyek tersebut.";
    console.error("❌ " + pesan);
    if (typeof document !== "undefined") {
      document.addEventListener("DOMContentLoaded", () => {
        const box = document.createElement("div");
        box.className = "info-box merah";
        box.style.cssText = "position:fixed;inset:auto 12px 12px 12px;z-index:9999";
        box.textContent = "⚠️ " + pesan;
        document.body && document.body.appendChild(box);
      });
    }
    throw new Error("Konfigurasi Supabase kosong");
  }
  db = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    { realtime: { params: { eventsPerSecond: 5 } } }
  );
  return db;
}
