# 🎬 LKPD Interaktif — Produksi & Diseminasi Konten Digital (KKA Kelas X)

LKPD non-koding untuk mata pelajaran **Koding dan Kecerdasan Artifisial (KKA) Kelas X**,
materi Bab **Produksi dan Diseminasi Konten Digital** — mencakup sub-bab
*A. Membuat Konten Edukatif dengan Fitur AI* dan *B. Membuat Karya Kreatif dan Inspiratif*.

Praktik berupa **isian terstruktur (angka/teks/dropdown) + kanvas interaktif** —
tanpa editor kode program.

## Modul

| Modul | Topik | Kanvas |
|---|---|---|
| 1 🎬 | Konsep Produksi Konten Digital — alur 5 tahap, jenis konten, alokasi durasi | alur produksi (tahap pilihanmu tersorot) |
| 2 📝 | Perencanaan & Storyboard — hook, naskah, 4 adegan | timeline proporsional dari isian durasi |
| 3 🤖 | Konten Edukatif dengan Fitur AI — prompt berstruktur, durasi & aset | alur kerja ber-AI |
| 4 🎨 | Karya Kreatif & Inspiratif dengan AI — rasio 3:4, warna hex, tagline | mock poster (warna & tagline versimu) |
| 5 🌍 | Etika, Lisensi & Diseminasi — izin & kredit, CC BY, jadwal posting | alur diseminasi |
| 6 ✂️ | Editing Video Edukatif dengan CapCut — timeline, Auto Captions, TTS, prompt AI, ekspor MP4, verifikasi & evaluasi | alur editing CapCut |

Kuis akhir: **24 soal acak (4 dari tiap modul: 3 konsep + 1 penerapan), 24 menit**
(`p-final`), terbuka setelah keenam modul tuntas (gerbang berantai).

## Setup database (guru) — proyek Supabase mandiri

Repo ini memakai **proyek Supabase sendiri** (terpisah dari LKPD lain). Skema DB ada di repo ini: `sql/schema.sql`.

1. **Buat proyek Supabase** baru di https://supabase.com (gratis). Salin **Project URL** dan **anon public key** dari *Settings → API*, lalu isi ke `js/supabase-config.js` (dua konstanta kosong di bagian atas).
2. **Nonaktifkan konfirmasi email**: *Authentication → Sign In / Providers → Email* → matikan **"Confirm email"**. (Tanpa ini siswa tidak bisa login setelah daftar.)
3. **Jalankan skema**: *SQL Editor → paste seluruh isi `sql/schema.sql` → Run*. Skrip ini idempotent (aman diulang).
   Skema juga memuat fitur **Kelola** di dashboard guru: ganti sandi guru, reset sandi siswa (RPC `guru_reset_password_siswa`), dan reset tugas siswa (policy delete untuk guru). Jalankan ulang skrip ini jika proyek dibuat sebelum fitur tersebut ada.
4. **Kelola kelas**: edit bagian `SEED` di `sql/schema.sql` sebelum dijalankan (nama kelas X kamu), atau tambah/ubah lewat *Table Editor → kelas* kapan saja (tombol ➕ Tambah Kelas di dashboard guru juga bisa).
5. **Akun guru** — daftarkan lewat Supabase Dashboard (*Authentication → Users → Add user*, Auto Confirm) dengan email + password guru, lalu di SQL Editor:
   ```sql
   update public.profiles set role='guru' where id='<UUID user tersebut>';
   ```
6. **GitHub Pages** — repo ini di-deploy sendiri; URL:
   `https://rekizamasari.github.io/lkpd-produksi-konten-digital/`

## Cara pakai siswa

- Daftar/login **tanpa email**: NISN + Nama + Kelas + Kata Sandi (tab 🎓 Siswa).
- Tiap modul: Materi → Langkah contoh → **Praktik isian** (👁️ Lihat Visual menampilkan alur/timeline/poster versi isianmu; 📤 Kirim dinilai otomatis 0–100) → **Kuis pilihan ganda berwaktu**.
- Gerbang berantai: Modul N terbuka setelah praktik+kuis Modul N−1 terkirim.

## Struktur

```
index.html        login (NISN siswa / email guru)
siswa.html        dashboard siswa
guru.html         dashboard guru (analitik, nilai, rincian, materi & kunci)
css/style.css     tema gelap (sama dengan LKPD induk)
js/supabase-config.js   URL & anon key (WAJIB diisi — proyek mandiri)
js/auth.js        login/session + mapper NISN→email
js/data.js        6 modul p1–p6 + KUIS_AKHIR (p-final)
js/siswa.js       praktik isian + kanvas (alur/timeline/poster) + gerbang + kuis berwaktu
js/guru.js        analitik, CSV, realtime, materi & kunci, kelola akun & reset sandi/tugas
sql/schema.sql    skema Supabase (jalankan 1× di SQL Editor proyek)
.opencode/skills/ skill OpenCode "buat-lkpd" (panduan & validasi)
PROMPT-TEMPLATE-LKPD-NONKODING.md   master prompt untuk LKPD non-koding baru
```

## Format praktik non-koding (penulis LKPD berikutnya)

```js
praktik: {
  deskripsi: "…",
  inputs: `<div class="input-row">…<input id="p1-dur-pembuka" type="number" />…</div>`,
  visual: {
    jenis: "alur",     // { tahap:[…], sorotSel:"#id-select" }
    // "timeline"   → { barSel:[{sel,label,warna},…], satuan, totalCek }
    // "poster"     → { rasio:[3,4], grid:[3,4], warnaSel, teksSel }
    tinggiKanvas: 280, judulKanvas: "…",
  },
  checks: [
    { poin: 20, desc: "…", type: "angka", sel: "#p1-…", val: 18 },      // |isi−val| ≤ 0.01
    { poin: 20, desc: "…", type: "teks",  sel: "#p1-…", val: "regex" }  // regex (i)
  ]
  // total poin semua checks = 100
}
```

Painter koordinat lama (vektor/refleksi/rotasi/dilatasi/komposisi/fungsi, termasuk
overlay `vis.kurva` & `vis.kurvaBay`) tetap tersedia di `js/siswa.js` untuk LKPD
lain yang berbagi fondasi ini. Kuis akhir: 4 soal per modul (awali teks soal
dengan `<JudulModul> — `).
