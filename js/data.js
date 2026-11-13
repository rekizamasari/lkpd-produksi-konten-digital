/* =====================================================================
 * data.js — LKPD Produksi & Diseminasi Konten Digital
 * (Koding dan Kecerdasan Artifisial / KKA, Kelas X)
 * 5 modul: Konsep Produksi, Perencanaan & Storyboard, Konten Edukatif
 * dengan Fitur AI, Karya Kreatif & Inspiratif, Etika & Diseminasi.
 * Praktik = aktivitas interaktif non-koding (isian angka/teks + dropdown
 * + kanvas: alur produksi, timeline storyboard, mock poster) — auto-check
 * numerik & regex, TANPA editor kode program.
 * =====================================================================
 * Format praktik.checks (LKPD non-koding):
 *   { poin, desc, type:"angka", sel:"#id-input", val: 18 }  → |isi − val| ≤ 0.01
 *   { poin, desc, type:"teks",  sel:"#id-input", val:"regex"} → pencocokan regex (i)
 * Painter kanvas (vis.jenis): "alur", "timeline", "poster" — lihat js/siswa.js.
 * ===================================================================== */
const MODUL = [

/* ================= P1: KONSEP PRODUKSI KONTEN DIGITAL ================= */
{
  id: "p1",
  nomor: 1,
  judul: "Konsep Produksi Konten Digital",
  ikon: "🎬",
  ringkas: "Tahapan produksi, jenis konten, target audiens & alokasi durasi.",
  tujuan: [
    "Menjelaskan tahapan produksi konten digital: pra-produksi, produksi, dan pasca-produksi.",
    "Mengidentifikasi jenis-jenis konten digital (video, infografis, podcast, artikel).",
    "Menentukan target audiens dan tujuan konten sebelum mulai memproduksi.",
    "Menghitung alokasi durasi tiap bagian video berdasarkan persentase.",
  ],
  teori: `
<p><b>Produksi konten digital</b> adalah proses membuat karya (video, poster, artikel, podcast) untuk disebarkan lewat internet. Proses ini <b>berurutan</b> — melompat tahap = hasil berantakan.</p>
<h4>Alur produksi 5 tahap</h4>
<pre>Ide → Perencanaan → Produksi → Pasca Produksi → Diseminasi</pre>
<pre>Ide          : menemukan topik & judul
Perencanaan  : naskah, storyboard, alat (pra-produksi)
Produksi     : merekam/mengambil gambar
Pasca Produksi: sunting (editing), tambah teks/musik
Diseminasi   : unggah ke platform + promosi</pre>
<div class="info-box hijau">💡 <b>Kunci tahap:</b> menulis naskah & storyboard terjadi di <b>Perencanaan</b> (pra-produksi); menyunting hasil rekaman terjadi di <b>Pasca Produksi</b> — jangan tertukar!</div>
<h4>Jenis konten digital</h4>
<pre>Video pendek  → tutorial, tips (TikTok/Reels/Shorts)
Infografis    → data/fakta yang mudah dipindai mata
Podcast       → diskusi mendalam, mendengar sambil beraktivitas
Artikel/blog  → penjelasan panjang + gambar</pre>
<div class="info-box kuning">⚠️ <b>Pilih jenis konten sesuai tujuan & audiens.</b> Konten lucu tanpa pesan tidak cocok untuk tujuan edukasi; konten edukatif harus punya <b>pesan yang jelas</b>.</div>
<h4>Target audiens &amp; tujuan</h4>
<p>Sebelum menulis satu kalimat pun, jawab dulu: <b>untuk siapa</b> konten ini dan <b>apa yang berubah</b> setelah mereka menonton? (lebih paham? bisa praktik? tergerak berbuat baik?)</p>
<h4>Alokasi durasi video edukasi pendek</h4>
<pre>durasi bagian = durasi total × persentase bagian</pre>
<pre>Video 180 detik (3 menit):
pembuka (hook) 10% : 180 × 10% = 18 detik
inti     70%       : 180 × 70% = 126 detik
penutup  20%       : 180 × 20% = 36 detik
Cek: 10% + 70% + 20% = 100% ✓</pre>
<div class="info-box kuning">🌍 <b>Studi kasus nyata:</b> kreator edukasi (mis. kanal belajar) menulis dulu naskah penuh, baru merekam. Video 3 menit biasanya butuh ±400–500 kata naskah — karena orang bicara ±120 kata per menit (dipelajari di Modul 3!).</div>`,
  langkah: [
    { judul: "Menemukan ide besar → judul", penjelasan: "Ide diubah jadi judul yang spesifik dan menarik.", kode:
"Ide    : belajar merangkum cepat\nJudul  : 3 Langkah Merangkum Materi Ujian\n        (spesifik: berapa langkah, untuk apa)" },
    { judul: "Menentukan target audiens", penjelasan: "Bahasa, contoh, dan kecepatan bicara menyesuaikan audiens.", kode:
"Konten : tips merangkum materi ujian\nAudiens: siswa SMP/SMA yang mau ujian\nBahasa : santai, contoh dari pelajaran sekolah" },
    { judul: "Menghitung alokasi durasi", penjelasan: "durasi bagian = durasi total × persentase bagian.", kode:
"Total 180 detik, pembuka 10%:\n180 × 10/100 = 18 detik\nInti 70%   : 180 × 70/100 = 126 detik\nPenutup 20%: 180 × 20/100 = 36 detik\nCek: 18 + 126 + 36 = 180 ✓" },
    { judul: "Memilih jenis konten", penjelasan: "Cocokkan jenis konten dengan tujuan dan audiens.", kode:
"Tujuan  : mengajarkan langkah praktis\nJenis   : video pendek tutorial\nAlasan  : bisa contoh langsung, mudah dipahami" },
    { judul: "Checklist pra-produksi", penjelasan: "Semua disiapkan SEBELUM produksi supaya rekaman tidak diulang.", kode:
"[✓] naskah            [✓] storyboard\n[✓] HP/kamera + tripod [✓] lokasi & pencahayaan\n[✓] alat rekam suara" },
  ],
  praktik: {
    deskripsi: `<b>Misi praktik:</b> kamu merencanakan video edukasi berdurasi <b>3 menit (180 detik)</b> berjudul besar "Belajar Merangkum Materi dengan Bantuan AI" untuk audiens <b>siswa kelas X</b>.
<div class="info-box hijau">💡 Pembagian waktu: pembuka (hook) <b>10%</b>, inti <b>70%</b>, penutup <b>20%</b>. Kerjakan hitungan durasinya (dalam <b>detik</b>) lalu isi kolom di bawah — kanvas akan menampilkan alur produksi dan menyorot tahap yang kamu pilih.</div>
Lanjutkan: tulis <b>judul final</b> yang memuat kata kunci edukatif, pilih <b>jenis konten</b> yang paling cocok, dan pilih tahap yang dilakukan <b>setelah</b> pengambilan gambar selesai. 📤 <b>Kirim</b> saat semua terisi.`,
    inputs: `
  <div class="input-row">
    <label>Durasi pembuka (hook) = <input id="p1-dur-pembuka" type="number" step="any" style="width:90px" /> detik</label>
    <label>Durasi inti = <input id="p1-dur-inti" type="number" step="any" style="width:90px" /> detik</label>
  </div>
  <div class="input-row">
    <label>Durasi penutup = <input id="p1-dur-penutup" type="number" step="any" style="width:90px" /> detik</label>
    <label>Judul final: <input id="p1-judul" type="text" placeholder="contoh: 3 Langkah Merangkum Materi" style="min-width:260px" /></label>
  </div>
  <div class="input-row">
    <label>Jenis konten paling cocok:
      <select id="p1-jenis"><option value="">— pilih —</option><option>Video pendek edukasi</option><option>Meme lucu tanpa pesan</option><option>Teks panjang tanpa gambar</option><option>Musik instrumental saja</option></select></label>
    <label>Tahap SETELAH pengambilan gambar selesai:
      <select id="p1-tahap"><option value="">— pilih —</option><option>Ide</option><option>Perencanaan</option><option>Produksi</option><option>Pasca Produksi</option><option>Diseminasi</option></select></label>
  </div>`,
    visual: {
      jenis: "alur",
      tinggiKanvas: 280,
      judulKanvas: "🗺️ Kanvas Alur Produksi — tahap yang kamu pilih akan tersorot",
      tahap: ["Ide", "Perencanaan", "Produksi", "Pasca Produksi", "Diseminasi"],
      sorotSel: "#p1-tahap",
    },
    checks: [
      { poin: 15, desc: "Durasi pembuka 10% × 180 = 18 detik",                  type: "angka", sel: "#p1-dur-pembuka", val: 18 },
      { poin: 15, desc: "Durasi inti 70% × 180 = 126 detik",                    type: "angka", sel: "#p1-dur-inti", val: 126 },
      { poin: 15, desc: "Durasi penutup 20% × 180 = 36 detik",                  type: "angka", sel: "#p1-dur-penutup", val: 36 },
      { poin: 15, desc: "Judul memuat kata kunci edukatif (cara/langkah/belajar/merangkum/tips)", type: "teks", sel: "#p1-judul", val: "cara|langkah|belajar|merangkum|tips" },
      { poin: 20, desc: "Jenis konten tepat: video pendek edukasi",             type: "teks",  sel: "#p1-jenis", val: "video\\s*pendek\\s*edukasi" },
      { poin: 20, desc: "Tahap pasca-produksi tepat",                           type: "teks",  sel: "#p1-tahap", val: "pasca\\s*produksi" },
    ],
  },
  kuis: [
    { q: "Urutan tahap produksi konten digital yang benar adalah…", opsi: ["Ide → Perencanaan → Produksi → Pasca Produksi → Diseminasi", "Produksi → Ide → Diseminasi → Perencanaan", "Ide → Produksi → Perencanaan → Diseminasi", "Diseminasi → Ide → Produksi → Pasca Produksi"], kunci: 0 },
    { q: "Membuat naskah dan storyboard termasuk tahap…", opsi: ["pasca produksi", "pra-produksi (perencanaan)", "diseminasi", "promosi"], kunci: 1 },
    { q: "Contoh konten digital yang tepat untuk tujuan edukasi adalah…", opsi: ["video tutorial langkah demi langkah", "meme tanpa pesan", "gossip tanpa sumber", "spam di komentar"], kunci: 0 },
    { q: "Hal yang harus ditentukan SEBELUM menulis naskah adalah…", opsi: ["target audiens &amp; tujuan konten", "warna thumbnail", "jam upload", "jumlah like yang diharapkan"], kunci: 0 },
    { q: "Video berdurasi 200 detik dengan bagian inti 70% → durasi inti adalah…", opsi: ["70 detik", "140 detik", "120 detik", "150 detik"], kunci: 1 },
    { q: "Tujuan utama tahap <b>diseminasi</b> adalah…", opsi: ["menyebarkan konten ke audiens yang tepat", "memperbesar ukuran file", "menghapus komentar negatif", "memperpanjang durasi video"], kunci: 0 },
  ],
},

/* ================= P2: PERENCANAAN & STORYBOARD ================= */
{
  id: "p2",
  nomor: 2,
  judul: "Perencanaan & Storyboard",
  ikon: "📝",
  ringkas: "Naskah pembuka–inti–penutup, storyboard, dan durasi tiap adegan.",
  tujuan: [
    "Menyusun naskah sederhana dengan struktur pembuka–inti–penutup.",
    "Membuat storyboard 4 adegan beserta isi dan durasinya.",
    "Menghitung durasi tiap adegan dari persentase terhadap durasi total.",
    "Menuliskan kalimat ajakan (call to action) pada bagian penutup.",
  ],
  teori: `
<p><b>Naskah (script)</b> adalah teks lengkap yang akan diucapkan/ditampilkan. <b>Storyboard</b> adalah peta visual per adegan — seperti komik kasar yang merangkum videomu.</p>
<h4>Struktur naskah</h4>
<pre>Pembuka (hook)  : menarik perhatian dalam ±3 detik pertama
Inti            : isi/penjelasan utama, ada contoh
Penutup         : rangkuman + ajakan (call to action)</pre>
<div class="info-box kuning">⚠️ <b>3 detik pertama menentukan!</b> Penonton bergeser (scroll) sangat cepat — jika hook-nya membosankan, video bagus pun tak ditonton.</div>
<h4>Tabel storyboard</h4>
<pre>Adegan | Visual                    | Teks/Narasi              | Durasi
   1   | judul besar + wajah       | "Rapatkah catatanmu?"    | 30 s
   2   | langkah 1-2-3 di papan    | penjelasan inti          | 42 s
   3   | contoh hasil ringkasan    | "seperti ini hasilnya"   | 30 s
   4   | ajakan + subscribe        | "Yuk coba sekarang!"     | 18 s</pre>
<div class="info-box hijau">💡 <b>Total persentase semua adegan harus 100%</b> — kalau tidak, hitungan durasimu pasti ada yang salah.</div>
<h4>Menghitung durasi tiap adegan</h4>
<pre>durasi adegan = durasi total × persentase adegan</pre>
<pre>Video 120 detik (2 menit), 4 adegan:
Adegan 1 (25%) : 120 × 25% = 30 detik
Adegan 2 (35%) : 120 × 35% = 42 detik
Adegan 3 (25%) : 120 × 25% = 30 detik
Adegan 4 (15%) : 120 × 15% = 18 detik
Cek: 30 + 42 + 30 + 18 = 120 ✓</pre>
<div class="info-box kuning">🌍 <b>Studi kasus nyata:</b> YouTuber &amp; kreator Reels selalu menulis baris "visual" di storyboard untuk setiap kalimat naskah — supaya saat merekam tahu harus menampilkan apa dan berapa lama.</div>`,
  langkah: [
    { judul: "Menulis hook 3 detik pertama", penjelasan: "Pertanyaan/masalah yang bikin penonton berhenti scroll.", kode:
"Hook : \"Catatanmu berantakan?\n       Rangkumannya butuh 1 jam?\"\n→ penonton: \"itu gue banget\" → lanjut nonton" },
    { judul: "Menulis naskah pembuka–inti–penutup", penjelasan: "Runtut, satu ide per bagian, bahasa sesuai audiens.", kode:
"Pembuka: hook + janji isi video\nInti   : 3 langkah merangkum, masing2 contoh\nPenutup: rangkum 3 langkah + ajakan" },
    { judul: "Membuat tabel storyboard", penjelasan: "Satu baris = satu adegan: visual, teks, durasi.", kode:
"Adegan | Visual        | Narasi        | Durasi\n  1    | judul besar   | hook          | 30 s\n  2    | papan langkah | inti          | 42 s\n  3    | hasil contoh  | demonstrasi   | 30 s\n  4    | ajakan        | call to action| 18 s" },
    { judul: "Menghitung durasi adegan", penjelasan: "durasi adegan = total × persentase; jumlahkan untuk cek.", kode:
"Total 120 s:\n25% : 120 × 25/100 = 30 s\n35% : 120 × 35/100 = 42 s\n25% : 120 × 25/100 = 30 s\n15% : 120 × 15/100 = 18 s\nCek: 30+42+30+18 = 120 ✓" },
    { judul: "Kalimat ajakan (call to action)", penjelasan: "Penutup bukan basa-basi: ajak penonton melakukan sesuatu.", kode:
"\"Yuk, coba rangkum 1 halaman\n bukumu sekarang — kirim hasilnya\n di komentar!\"" },
  ],
  praktik: {
    deskripsi: `<b>Misi praktik:</b> kamu membuat storyboard video <b>2 menit (120 detik)</b> "Merangkum Materi dengan AI" dengan <b>4 adegan</b> berpersentase: adegan 1 <b>25%</b>, adegan 2 <b>35%</b>, adegan 3 <b>25%</b>, adegan 4 <b>15%</b>.
<div class="info-box hijau">💡 Hitung durasi tiap adegan (dalam <b>detik</b>) — kanvas menampilkan <b>timeline</b> proporsional dari isianmu; perhatikan totalnya kembali 120 detik!</div>
Lanjutkan: tulis <b>kalimat ajakan</b> untuk narasi adegan 4 (harus memuat kata ajakan seperti "yuk/ayo/coba"), jawab pertanyaan tentang <b>hook</b> dan <b>struktur naskah</b>. 📤 <b>Kirim</b> saat semua terisi.`,
    inputs: `
  <div class="input-row">
    <label>Durasi adegan 1 = <input id="p2-adegan1" type="number" step="any" style="width:80px" /> detik</label>
    <label>Durasi adegan 2 = <input id="p2-adegan2" type="number" step="any" style="width:80px" /> detik</label>
  </div>
  <div class="input-row">
    <label>Durasi adegan 3 = <input id="p2-adegan3" type="number" step="any" style="width:80px" /> detik</label>
    <label>Durasi adegan 4 = <input id="p2-adegan4" type="number" step="any" style="width:80px" /> detik</label>
  </div>
  <div class="input-row">
    <label>Narasi adegan 4 (kalimat ajakan): <input id="p2-narasi" type="text" placeholder="contoh: Yuk coba rangkum sekarang!" style="min-width:260px" /></label>
  </div>
  <div class="input-row">
    <label>Bagian yang memancing perhatian dalam 3 detik pertama:
      <select id="p2-hook"><option value="">— pilih —</option><option>Adegan 1</option><option>Adegan 2</option><option>Adegan 3</option><option>Adegan 4</option></select></label>
    <label>Struktur naskah yang benar:
      <select id="p2-struktur"><option value="">— pilih —</option><option>Inti → Pembuka → Penutup</option><option>Pembuka → Penutup → Inti</option><option>Pembuka → Inti → Penutup</option><option>Penutup → Pembuka → Inti</option></select></label>
  </div>`,
    visual: {
      jenis: "timeline",
      tinggiKanvas: 300,
      judulKanvas: "🗺️ Kanvas Timeline Storyboard — lebar tiap segmen mengikuti isian durasimu",
      satuan: "detik",
      totalCek: 120,
      barSel: [
        { sel: "#p2-adegan1", label: "Adegan 1", warna: "#fb923c" },
        { sel: "#p2-adegan2", label: "Adegan 2", warna: "#22d3ee" },
        { sel: "#p2-adegan3", label: "Adegan 3", warna: "#a78bfa" },
        { sel: "#p2-adegan4", label: "Adegan 4", warna: "#4ade80" },
      ],
    },
    checks: [
      { poin: 15, desc: "Durasi adegan 1: 25% × 120 = 30 detik",              type: "angka", sel: "#p2-adegan1", val: 30 },
      { poin: 15, desc: "Durasi adegan 2: 35% × 120 = 42 detik",              type: "angka", sel: "#p2-adegan2", val: 42 },
      { poin: 15, desc: "Durasi adegan 3: 25% × 120 = 30 detik",              type: "angka", sel: "#p2-adegan3", val: 30 },
      { poin: 15, desc: "Durasi adegan 4: 15% × 120 = 18 detik",              type: "angka", sel: "#p2-adegan4", val: 18 },
      { poin: 20, desc: "Narasi adegan 4 memuat kata ajakan (yuk/ayo/coba/ikuti/praktikkan)", type: "teks", sel: "#p2-narasi", val: "yuk|ayo|coba|ikuti|praktikkan" },
      { poin: 10, desc: "Hook = adegan pertama",                              type: "teks",  sel: "#p2-hook", val: "adegan\\s*1" },
      { poin: 10, desc: "Struktur naskah: Pembuka → Inti → Penutup",          type: "teks",  sel: "#p2-struktur", val: "pembuka.*inti.*penutup" },
    ],
  },
  kuis: [
    { q: "Fungsi <b>hook</b> di awal video adalah…", opsi: ["menarik perhatian dalam 3 detik pertama", "menampilkan kredit pembuat", "menutup video", "memperpanjang durasi"], kunci: 0 },
    { q: "Struktur naskah yang benar adalah…", opsi: ["Inti → Pembuka → Penutup", "Pembuka → Penutup → Inti", "Pembuka → Inti → Penutup", "Penutup → Pembuka → Inti"], kunci: 2 },
    { q: "Storyboard memuat…", opsi: ["adegan, visual, teks/narasi, dan durasi", "harga alat rekam", "daftar follower", "tagihan listrik"], kunci: 0 },
    { q: "Video 120 detik, adegan 25% → durasi adegan itu adalah…", opsi: ["25 detik", "30 detik", "50 detik", "12 detik"], kunci: 1 },
    { q: "Ciri naskah konten edukatif yang baik adalah…", opsi: ["kata sulit tanpa penjelasan", "tanpa struktur", "semakin panjang semakin baik", "bahasa jelas &amp; runtut dengan contoh"], kunci: 3 },
    { q: "Yang <b>BUKAN</b> bagian storyboard adalah…", opsi: ["estimasi durasi adegan", "deskripsi visual adegan", "teks/narasi", "daftar belanja bulanan"], kunci: 3 },
  ],
},

/* ================= P3: KONTEN EDUKATIF DENGAN FITUR AI ================= */
{
  id: "p3",
  nomor: 3,
  judul: "Membuat Konten Edukatif dengan Fitur AI",
  ikon: "🤖",
  ringkas: "Pilih fitur AI, susun prompt berstruktur, hitung durasi & aset.",
  tujuan: [
    "Memilih fitur AI yang tepat: generator teks, teks→gambar, dan teks→suara (TTS).",
    "Menyusun prompt berstruktur: peran, tugas, konteks, format.",
    "Menghitung durasi video dari jumlah kata naskah.",
    "Menghitung jumlah aset gambar AI yang dibutuhkan.",
  ],
  teori: `
<p>AI bisa membantu <b>setiap tahap</b> produksi konten edukatif — asal kamu tahu fitur yang mana untuk keperluan yang mana, dan menulis <b>prompt</b> yang jelas.</p>
<h4>Fitur AI dan kegunaannya</h4>
<pre>Generator teks   → menyusun draf naskah
Teks → Gambar    → membuat ilustrasi/poster
Teks → Suara (TTS) → narasi suara dari naskah
Generator video  → klip pendek dari deskripsi</pre>
<h4>Prompt berstruktur: Peran → Tugas → Konteks → Format</h4>
<pre>"Kamu seorang guru IPA yang ramah.        ← PERAN
 Buat naskah 60 kata tentang fotosintesis ← TUGAS
 untuk siswa kelas X yang baru belajar.   ← KONTEKS
 Format: 3 kalimat + 1 pertanyaan."       ← FORMAT</pre>
<div class="info-box hijau">💡 <b>Prompt jelek → hasil jelek.</b> "Buatin naskah dong" hasilnya generik. Prompt dengan peran + tugas + konteks + format menghasilkan draf yang bisa langsung dipakai.</div>
<h4>Durasi video dari naskah</h4>
<pre>orang bicara ±120 kata per menit
durasi (menit) = jumlah kata ÷ 120
Naskah 360 kata → 360 ÷ 120 = 3 menit = 180 detik</pre>
<h4>Jumlah gambar AI yang dibutuhkan</h4>
<pre>aturan praktis: 1 gambar ilustrasi tiap 45 detik
jumlah gambar = durasi (detik) ÷ 45
180 detik → 180 ÷ 45 = 4 gambar</pre>
<div class="info-box merah">🔴 <b>Jebakan AI (halusinasi):</b> AI bisa mengarang fakta, angka, atau nama dengan percaya diri. <b>Selalu verifikasi</b> keluaran AI dengan buku/sumber resmi sebelum dipublikasikan — reputasi konten edukatifmu taruhannya!</div>
<div class="info-box kuning">🌍 <b>Studi kasus nyata:</b> video edukasi singkat di platform belajar banyak yang narasinya TTS, ilustrasinya teks→gambar, dan naskahnya draf generator teks — semua ditinjau ulang oleh manusia sebelum tayang.</div>`,
  langkah: [
    { judul: "Mengenali fitur AI", penjelasan: "Cocokkan kebutuhan dengan fitur yang benar.", kode:
"Butuh draf naskah   → generator teks\nButuh ilustrasi     → teks → gambar\nButuh narasi suara  → TTS\nButuh klip pendek   → generator video" },
    { judul: "Menyusun prompt berstruktur", penjelasan: "Peran dulu, lalu tugas, konteks, terakhir format.", kode:
"PERAN  : Kamu seorang guru IPA yang ramah\nTUGAS  : buat naskah 60 kata tentang\n         fotosintesis\nKONTEKS: untuk siswa kelas X pemula\nFORMAT : 3 kalimat + 1 pertanyaan penutup" },
    { judul: "Menghitung durasi dari naskah", penjelasan: "Bagi jumlah kata dengan 120 → hasil dalam menit.", kode:
"Naskah 360 kata\n360 ÷ 120 = 3 menit\n3 × 60 = 180 detik" },
    { judul: "Menghitung aset gambar AI", penjelasan: "Bagi durasi detik dengan 45 → jumlah gambar.", kode:
"180 detik ÷ 45 = 4 gambar\n(1 gambar per 45 detik)" },
    { judul: "Verifikasi keluaran AI", penjelasan: "Cek fakta satu per satu sebelum naskah dipakai.", kode:
"AI  : \"fotosintesis terjadi di mitokondria\"\nCek : SALAH — di kloroplas!\n→ koreksi sebelum direkam ✓" },
  ],
  praktik: {
    deskripsi: `<b>Misi praktik:</b> kamu membuat video edukatif "Fotosintesis untuk Pemula". Naskahmu <b>360 kata</b> dan akan dibacakan dengan kecepatan <b>120 kata/menit</b>.
<div class="info-box hijau">💡 Hitung <b>durasi video (detik)</b> dan <b>jumlah gambar AI</b> (1 gambar tiap 45 detik). Kanvas menampilkan alur kerja ber-AI — tahap yang kamu pilih akan tersorot.</div>
Lanjutkan: tulis <b>kalimat peran</b> prompt-mu (harus memuat kata "guru"/"pengajar"), tulis <b>kalimat tugas</b> (mulai dengan kata "Buat"), lalu jawab tiga pilihan ganda. 📤 <b>Kirim</b> saat semua terisi.`,
    inputs: `
  <div class="input-row">
    <label>Durasi video = <input id="p3-durasi" type="number" step="any" style="width:80px" /> detik</label>
    <label>Jumlah gambar AI = <input id="p3-gambar" type="number" step="any" style="width:80px" /> gambar</label>
  </div>
  <div class="input-row">
    <label>Kalimat peran: <input id="p3-peran" type="text" placeholder="contoh: Kamu adalah seorang guru IPA yang ramah" style="min-width:300px" /></label>
  </div>
  <div class="input-row">
    <label>Kalimat tugas (mulai dengan "Buat…"): <input id="p3-tugas" type="text" placeholder="contoh: Buat naskah 60 kata tentang fotosintesis" style="min-width:300px" /></label>
  </div>
  <div class="input-row">
    <label>Fitur AI untuk mengubah naskah jadi suara narasi:
      <select id="p3-fitur"><option value="">— pilih —</option><option>Generator Gambar</option><option>Teks ke Suara (TTS)</option><option>Video Generator</option><option>Pengedit Foto</option></select></label>
    <label>Elemen prompt yang paling pertama:
      <select id="p3-elemen"><option value="">— pilih —</option><option>Peran</option><option>Tugas</option><option>Konteks</option><option>Format</option></select></label>
  </div>
  <div class="input-row">
    <label>Tahap yang paling memanfaatkan AI secara langsung:
      <select id="p3-tahapAI"><option value="">— pilih —</option><option>Ide &amp; Riset</option><option>Susun Prompt</option><option>Generate AI</option><option>Sunting &amp; Verifikasi</option><option>Posting</option></select></label>
  </div>`,
    visual: {
      jenis: "alur",
      tinggiKanvas: 280,
      judulKanvas: "🗺️ Kanvas Alur Kerja Ber-AI — tahap yang kamu pilih akan tersorot",
      tahap: ["Ide & Riset", "Susun Prompt", "Generate AI", "Sunting & Verifikasi", "Posting"],
      sorotSel: "#p3-tahapAI",
    },
    checks: [
      { poin: 15, desc: "Durasi video: 360 ÷ 120 = 3 menit = 180 detik",        type: "angka", sel: "#p3-durasi", val: 180 },
      { poin: 15, desc: "Jumlah gambar AI: 180 ÷ 45 = 4",                       type: "angka", sel: "#p3-gambar", val: 4 },
      { poin: 20, desc: "Kalimat peran memuat kata guru/pengajar",              type: "teks",  sel: "#p3-peran", val: "guru|pengajar" },
      { poin: 15, desc: "Kalimat tugas dimulai dengan kata Buat",               type: "teks",  sel: "#p3-tugas", val: "buat" },
      { poin: 15, desc: "Fitur narasi suara: Teks ke Suara (TTS)",              type: "teks",  sel: "#p3-fitur", val: "teks\\s*ke\\s*suara|\\btts\\b" },
      { poin: 10, desc: "Elemen prompt pertama: Peran",                         type: "teks",  sel: "#p3-elemen", val: "peran" },
      { poin: 10, desc: "Tahap pemanfaatan AI langsung: Generate AI",           type: "teks",  sel: "#p3-tahapAI", val: "generate\\s*ai" },
    ],
  },
  kuis: [
    { q: "Fitur AI untuk mengubah naskah menjadi suara narasi adalah…", opsi: ["Teks ke Suara (TTS)", "Generator Gambar", "Pengedit video manual", "Kalkulator"], kunci: 0 },
    { q: "Kalimat <i>\"Kamu adalah seorang guru IPA yang ramah\"</i> pada prompt termasuk elemen…", opsi: ["format", "tugas", "peran", "konteks"], kunci: 2 },
    { q: "Naskah 240 kata dengan kecepatan bicara 120 kata/menit → durasinya…", opsi: ["1 menit", "2 menit", "4 menit", "3 menit"], kunci: 1 },
    { q: "Video 180 detik dengan 1 gambar AI tiap 45 detik membutuhkan…", opsi: ["3 gambar", "5 gambar", "4 gambar", "6 gambar"], kunci: 2 },
    { q: "Sikap yang benar terhadap keluaran AI adalah…", opsi: ["diperiksa &amp; diverifikasi kebenarannya dulu", "langsung dipakai tanpa dibaca", "diunggah segera supaya cepat viral", "diperbanyak tanpa cek"], kunci: 0 },
    { q: "Guru ingin video penjelasan fotosintesis: naskah + narasi suara + ilustrasi. Kombinasi fitur AI paling tepat adalah…", opsi: ["generator teks + TTS + teks→gambar", "kalkulator + printer", "scanner + fotokopi", "GPS + kompas"], kunci: 0 },
  ],
},

/* ================= P4: KARYA KREATIF & INSPIRATIF DENGAN AI ================= */
{
  id: "p4",
  nomor: 4,
  judul: "Membuat Karya Kreatif & Inspiratif dengan AI",
  ikon: "🎨",
  ringkas: "Poster/quote card: rasio, ukuran piksel, warna hex, tagline kuat.",
  tujuan: [
    "Membedakan konten edukatif dan konten kreatif/inspiratif.",
    "Menghitung ukuran piksel poster dari rasio aspek dan lebar tertentu.",
    "Menuliskan kode warna hex yang valid dan tagline yang kuat.",
    "Menerapkan prinsip \"satu pesan utama\" pada karya visual.",
  ],
  teori: `
<p><b>Konten kreatif/inspiratif</b> (poster quote, carousel cerita, kartu ucapan) punya tujuan berbeda dari konten edukatif: tujuannya <b>menghibur &amp; menggerakkan emosi</b> — bukan mengajarkan langkah.</p>
<h4>Rasio aspek &amp; ukuran piksel</h4>
<pre>rasio 3:4 (potret) artinya lebar : tinggi = 3 : 4
poster lebar 1200 px → tinggi = 1200 × 4 ÷ 3 = 1600 px</pre>
<div class="info-box hijau">💡 <b>Rumus:</b> tinggi = lebar × tinggi-rasio ÷ lebar-rasio. Selalu hitung dulu sebelum membuka aplikasi desain!</div>
<h4>Kode warna hex</h4>
<pre>format: #RRGGBB → tiap pasangan 00..FF (hexadesimal)
contoh: #1E3A8A (biru tua), #FACC15 (kuning), #FFFFFF (putih)</pre>
<div class="info-box merah">🔴 <b>Jebakan hex:</b> harus <b>tepat 6 karakter</b> setelah tanda #. <code>#1E3A8</code> (5 karakter) atau <code>#1E3A8AA</code> (7) bukan warna valid — aplikasi desain akan menolaknya.</div>
<h4>Prinsip karya inspiratif</h4>
<pre>1. SATU pesan utama saja — jangan 5 pesan sekaligus
2. teks SINGKAT: tagline ≤ 10 kata idealnya
3. kontras kuat: teks terang di atas latar gelap (atau sebaliknya)
4. tipografi besar &amp; mudah dibaca di layar HP</pre>
<h4>Menulis tagline yang kuat</h4>
<pre>kata kunci emosi: mimpi, impian, semangat, berani…
"Berani Bermimpi, Berani Memulai"   ← 5 kata, satu pesan
"Semua orang berhak bermimpi dan terus berusaha
 mencapainya dengan cara apa pun…"  ← terlalu panjang ✗</pre>
<div class="info-box kuning">🌍 <b>Studi kasus nyata:</b> poster-quote viral di Instagram umumnya 3:4, satu kalimat, 1–2 warna dominan, dan ilustrasi AI sebagai latar — draf prompt-nya pun berstruktur seperti Modul 3 (peran-tugas-konteks-format).</div>`,
  langkah: [
    { judul: "Memilih pesan utama", penjelasan: "Satu kalimat inti yang ingin diingat pembaca.", kode:
"Pesan : \"berani bermimpi dan memulai\"\nBukan : \"berani bermimpi, rajin belajar,\n         tidur cukup, olahraga…\" → terlalu banyak" },
    { judul: "Menentukan rasio &amp; ukuran", penjelasan: "tinggi = lebar × tinggi-rasio ÷ lebar-rasio.", kode:
"Rasio 3:4, lebar 1200 px\ntinggi = 1200 × 4 ÷ 3 = 1600 px" },
    { judul: "Memilih palet warna (hex)", penjelasan: "Pilih 1 warna dominan + 1 warna teks kontras.", kode:
"Latar : #1E3A8A (biru tua)\nTeks  : #FACC15 (kuning) → kontras kuat ✓" },
    { judul: "Menulis tagline", penjelasan: "Pendek, emosional, satu pesan.", kode:
"Tagline: \"Berani Bermimpi, Berani Memulai\"\nCek    : 5 kata, satu pesan ✓" },
    { judul: "Prompt AI untuk latar", penjelasan: "Deskripsikan gaya visual, bukan teksnya.", kode:
"\"Ilustrasi minimalis langit malam berbintang,\n tone biru tua, gaya flat, tanpa tulisan\"\n( tulisan dibuat manual agar tak typo )" },
  ],
  praktik: {
    deskripsi: `<b>Misi praktik:</b> kamu merancang <b>poster quote motivasi</b> kelas X berjudul besar "Dare to Dream" untuk dipamerkan di mading digital sekolah.
<div class="info-box hijau">💡 Spesifikasi: rasio <b>3:4</b> (potret), lebar <b>1200 px</b> — hitung <b>tingginya</b>! Poster dibagi grid <b>3 kolom × 4 baris</b> — hitung jumlah kotaknya. Kanvas akan menggambar <b>mock poster</b> dari warna &amp; tagline yang kamu tulis — coba lihat sebelum mengirim!</div>
Lanjutkan: tulis <b>kode warna latar</b> (hex 6 digit, tanpa tanda #), tulis <b>tagline</b>-mu (harus memuat kata emosional: mimpi/impian/semangat/berani), dan jawab dua pilihan ganda. 📤 <b>Kirim</b> saat semua terisi.`,
    inputs: `
  <div class="input-row">
    <label>Tinggi poster = <input id="p4-tinggi" type="number" step="any" style="width:90px" /> px</label>
    <label>Jumlah kotak grid (3 × 4) = <input id="p4-kotak" type="number" step="any" style="width:80px" /> kotak</label>
  </div>
  <div class="input-row">
    <label>Kode warna latar (hex 6 digit, tanpa #): <input id="p4-warna" type="text" placeholder="contoh: 1e3a8a" style="width:140px" /></label>
    <label>Tagline poster: <input id="p4-tagline" type="text" placeholder="contoh: Berani Bermimpi, Berani Memulai" style="min-width:260px" /></label>
  </div>
  <div class="input-row">
    <label>Karya yang termasuk kreatif/inspiratif:
      <select id="p4-jenis"><option value="">— pilih —</option><option>Poster quote motivasi</option><option>Spreadsheet data penjualan</option><option>Kode program panjang</option><option>Rekap absensi</option></select></label>
    <label>Prinsip teks pada poster:
      <select id="p4-pesan"><option value="">— pilih —</option><option>Semaksimal mungkin</option><option>Satu pesan utama, singkat</option><option>Semua catatan lengkap</option><option>Perbanyak bahasa asing</option></select></label>
  </div>`,
    visual: {
      jenis: "poster",
      tinggiKanvas: 460,
      judulKanvas: "🗺️ Kanvas Mock Poster — warna & tagline mengikuti isianmu (rasio 3:4)",
      rasio: [3, 4],
      grid: [3, 4],
      warnaSel: "#p4-warna",
      teksSel: "#p4-tagline",
    },
    checks: [
      { poin: 20, desc: "Tinggi poster: 1200 × 4 ÷ 3 = 1600 px",                type: "angka", sel: "#p4-tinggi", val: 1600 },
      { poin: 10, desc: "Jumlah kotak grid: 3 × 4 = 12",                        type: "angka", sel: "#p4-kotak", val: 12 },
      { poin: 15, desc: "Kode warna hex 6 digit valid",                         type: "teks",  sel: "#p4-warna", val: "^[0-9a-f]{6}$" },
      { poin: 20, desc: "Tagline memuat kata emosional (mimpi/impian/semangat/berani/inspirasi)", type: "teks", sel: "#p4-tagline", val: "mimpi|impian|semangat|berani|inspirasi" },
      { poin: 20, desc: "Jenis karya tepat: poster quote motivasi",             type: "teks",  sel: "#p4-jenis", val: "poster\\s*quote\\s*motivasi" },
      { poin: 15, desc: "Prinsip teks: satu pesan utama, singkat",              type: "teks",  sel: "#p4-pesan", val: "satu\\s*pesan\\s*utama" },
    ],
  },
  kuis: [
    { q: "Rasio aspek <b>3:4</b> pada poster potret berarti…", opsi: ["tinggi : lebar = 3 : 4", "lebar : tinggi = 3 : 4", "lebar = tinggi", "tinggi = 3 cm"], kunci: 1 },
    { q: "Poster rasio 3:4 dengan lebar 1200 px memiliki tinggi…", opsi: ["900 px", "1200 px", "1800 px", "1600 px"], kunci: 3 },
    { q: "Kode warna hex yang <b>VALID</b> adalah…", opsi: ["1E3A8", "#1E3A8", "#1E3A8A", "merah-123"], kunci: 2 },
    { q: "Prinsip teks pada poster quote yang baik adalah…", opsi: ["teks sebanyak mungkin", "satu pesan utama, teks singkat", "10 warna bercampur", "tanpa teks sama sekali"], kunci: 1 },
    { q: "Contoh karya kreatif/inspiratif adalah…", opsi: ["poster quote motivasi", "laporan keuangan", "soal ujian rahasia", "rekap absensi"], kunci: 0 },
    { q: "Kelas X membuat poster anti-bullying rasio 3:4; jika lebar 900 px, tingginya…", opsi: ["600 px", "1200 px", "1350 px", "900 px"], kunci: 1 },
  ],
},

/* ================= P5: ETIKA, LISENSI & DISEMINASI ================= */
{
  id: "p5",
  nomor: 5,
  judul: "Etika, Lisensi & Diseminasi Konten",
  ikon: "🌍",
  ringkas: "Izin & kredit, CC BY, ukuran platform, jadwal posting, evaluasi.",
  tujuan: [
    "Menerapkan etika memakai karya orang lain: minta izin dan mencantumkan kredit.",
    "Mengenal lisensi Creative Commons (CC BY) dan fungsi watermark.",
    "Menghitung ukuran piksel konten vertikal rasio 9:16.",
    "Menghitung frekuensi posting dari rencana konten dan mengevaluasi performa.",
  ],
  teori: `
<p><b>Diseminasi</b> = menyebarkan konten ke platform yang tepat, di waktu yang tepat, dengan cara yang <b>etis</b>. Konten bagus + cara tidak etis = masalah.</p>
<h4>Etika memakai karya orang lain</h4>
<pre>1. minta IZIN dulu kepada pembuatnya
2. cantumkan KREDIT (nama pembuat / sumber)
3. JANGAN hapus watermark (tanda air) milik orang lain
4. jangan mengklaim karya orang lain sebagai milikmu</pre>
<div class="info-box merah">🔴 <b>Jebakan:</b> "cuma screenshot kok" — screenshot gambar/video orang lain lalu di-post ulang TANPA izin &amp; kredit tetap pelanggaran. Cukup bagikan tautan aslinya, atau minta izin + kredit.</div>
<h4>Lisensi Creative Commons</h4>
<pre>CC BY : karya boleh dipakai/dibagikan ASAL
        mencantumkan atribusi (kredit pembuat)</pre>
<div class="info-box hijau">💡 <b>Watermark</b> (tanda air berisi nama/logo) melindungi karyamu dari dipakai orang tanpa izin — pasang pada poster/video sebelum disebar.</div>
<h4>Ukuran konten per platform</h4>
<pre>video vertikal (TikTok/Reels/Shorts) : rasio 9:16
rasio 9:16 artinya lebar : tinggi = 9 : 16
tinggi 1280 px → lebar = 1280 × 9 ÷ 16 = 720 px</pre>
<h4>Jadwal &amp; evaluasi diseminasi</h4>
<pre>frekuensi posting = jumlah konten ÷ jumlah minggu
16 konten dalam 8 minggu → 16 ÷ 8 = 2 konten per minggu

evaluasi performa: views, jangkauan, komentar,
persentase penonton yang menonton sampai habis</pre>
<div class="info-box kuning">🌍 <b>Studi kasus nyata:</b> kreator sekolah membuat jadwal konten (content calendar) 2 posting per minggu; caption-nya selalu ada hashtag topik (#belajar #AI) supaya mudah ditemukan, dan kredit musik/ilustrasi dicantumkan di deskripsi.</div>`,
  langkah: [
    { judul: "Etika pakai karya orang lain", penjelasan: "Izin dulu, kredit selalu, watermark jangan dihapus.", kode:
"Menemukan ilustrasi bagus\n→ DM pembuat: \"boleh saya pakai?\"\n→ izin ✓ → post + kredit \"ilustrasi: @nama\" ✓" },
    { judul: "Memahami CC BY & watermark", penjelasan: "CC BY = bebas dipakai selama kredit dicantumkan.", kode:
"Gambar berlisensi CC BY\n→ boleh dipakai di poster sekolah\n→ wajib tulis \"foto: nama (CC BY)\"" },
    { judul: "Menghitung ukuran konten vertikal", penjelasan: "lebar = tinggi × lebar-rasio ÷ tinggi-rasio.", kode:
"Rasio 9:16, tinggi 1280 px\nlebar = 1280 × 9 ÷ 16 = 720 px" },
    { judul: "Menyusun jadwal posting", penjelasan: "frekuensi = jumlah konten ÷ jumlah minggu.", kode:
"16 konten ÷ 8 minggu = 2 per minggu\nmis. Selasa &amp; Sabtu, jam 19.00" },
    { judul: "Caption, hashtag & evaluasi", penjelasan: "Hashtag topik + pantau performa untuk perbaikan.", kode:
"Caption: \"Yuk belajar AI bareng! #AI #Belajar\"\nEvaluasi: views rendah? → coba jam lain\nkomentar banyak? → balas & buat konten lanjutan" },
  ],
  praktik: {
    deskripsi: `<b>Misi praktik:</b> kelas X menyiapkan <b>16 konten digital</b> untuk disebarkan selama <b>8 minggu</b>, berisi video vertikal untuk platform konten pendek.
<div class="info-box hijau">💡 Hitung: <b>lebar</b> video (rasio 9:16, tinggi 1280 px) dan <b>frekuensi posting per minggu</b>. Kanvas menampilkan alur diseminasi — tahap yang kamu pilih akan tersorot.</div>
Lanjutkan: tulis <b>caption</b> yang memuat minimal <b>1 hashtag</b>, jawab tentang <b>lisensi</b>, <b>etika izin</b>, dan tahap yang wajib <b>sebelum</b> tombol unggah ditekan. 📤 <b>Kirim</b> saat semua terisi.`,
    inputs: `
  <div class="input-row">
    <label>Lebar video = <input id="p5-lebar" type="number" step="any" style="width:80px" /> px</label>
    <label>Frekuensi posting = <input id="p5-frekuensi" type="number" step="any" style="width:80px" /> konten/minggu</label>
  </div>
  <div class="input-row">
    <label>Caption (minimal 1 hashtag): <input id="p5-caption" type="text" placeholder="contoh: Yuk belajar AI bareng! #BelajarAI" style="min-width:280px" /></label>
  </div>
  <div class="input-row">
    <label>Lisensi "boleh dipakai asal ada kredit":
      <select id="p5-lisensi"><option value="">— pilih —</option><option>CC BY (boleh pakai, wajib kredit)</option><option>Hak cipta penuh orang lain</option><option>Rahasia negara</option><option>Tidak ada lisensi</option></select></label>
    <label>Tindakan benar saat ingin memakai karya orang lain:
      <select id="p5-izin"><option value="">— pilih —</option><option>Langsung pakai tanpa bilang</option><option>Minta izin &amp; beri kredit</option><option>Hapus nama pembuat</option><option>Klaim milik sendiri</option></select></label>
  </div>
  <div class="input-row">
    <label>Tahap yang WAJIB sebelum tombol unggah ditekan:
      <select id="p5-tahap"><option value="">— pilih —</option><option>Tulis Konten</option><option>Cek Etika &amp; Kredit</option><option>Unggah</option><option>Pantau Komentar</option><option>Evaluasi Performa</option></select></label>
  </div>`,
    visual: {
      jenis: "alur",
      tinggiKanvas: 280,
      judulKanvas: "🗺️ Kanvas Alur Diseminasi — tahap yang kamu pilih akan tersorot",
      tahap: ["Tulis Konten", "Cek Etika & Kredit", "Unggah", "Pantau Komentar", "Evaluasi Performa"],
      sorotSel: "#p5-tahap",
    },
    checks: [
      { poin: 20, desc: "Lebar video: 1280 × 9 ÷ 16 = 720 px",                  type: "angka", sel: "#p5-lebar", val: 720 },
      { poin: 15, desc: "Frekuensi: 16 ÷ 8 = 2 konten per minggu",              type: "angka", sel: "#p5-frekuensi", val: 2 },
      { poin: 10, desc: "Caption memuat minimal 1 hashtag (#)",                 type: "teks",  sel: "#p5-caption", val: "#\\w+" },
      { poin: 20, desc: "Lisensi tepat: CC BY (wajib kredit)",                  type: "teks",  sel: "#p5-lisensi", val: "cc\\s*by" },
      { poin: 20, desc: "Etika: minta izin &amp; beri kredit",                     type: "teks",  sel: "#p5-izin", val: "minta\\s*izin.*kredit" },
      { poin: 15, desc: "Tahap wajib pra-unggah: Cek Etika &amp; Kredit",           type: "teks",  sel: "#p5-tahap", val: "cek\\s*etika" },
    ],
  },
  kuis: [
    { q: "Kamu menemukan gambar menarik untuk kontenmu. Tindakan yang benar adalah…", opsi: ["pakai diam-diam", "minta izin pembuat &amp; beri kredit", "hapus watermark-nya", "klaim sebagai karyamu"], kunci: 1 },
    { q: "Lisensi <b>CC BY</b> artinya…", opsi: ["dilarang keras dipakai", "boleh dijual ulang bebas", "boleh dipakai jika mencantumkan atribusi (kredit)", "tanpa aturan apa pun"], kunci: 2 },
    { q: "Rasio aspek video vertikal di TikTok/Reels/Shorts adalah…", opsi: ["9:16", "4:3", "16:9", "1:1"], kunci: 0 },
    { q: "16 konten disebar dalam 8 minggu → frekuensinya…", opsi: ["16 per minggu", "2 per minggu", "8 per minggu", "4 per minggu"], kunci: 1 },
    { q: "Fungsi <b>hashtag</b> pada caption adalah…", opsi: ["memperbesar ukuran file", "menghapus komentar", "menambah durasi video", "membantu konten ditemukan audiens"], kunci: 3 },
    { q: "Video vertikal dengan tinggi 1280 px dan rasio 9:16 memiliki lebar…", opsi: ["640 px", "720 px", "800 px", "512 px"], kunci: 1 },
  ],
},

];

/* =====================================================================
 * KUIS AKHIR — 20 soal (4 dari tiap modul: 3 konsep + 1 penerapan),
 * durasi 20 menit.
 * ===================================================================== */
const KUIS_AKHIR = {
  id: "p-final",
  judul: "Kuis Akhir — Produksi & Diseminasi Konten Digital",
  ikon: "🏁",
  durasiMenit: 20,
  soal: [
    { q: "Produksi — Urutan tahap produksi konten digital yang benar adalah…", opsi: ["Ide → Perencanaan → Produksi → Pasca Produksi → Diseminasi", "Produksi → Ide → Diseminasi → Perencanaan", "Ide → Produksi → Perencanaan → Diseminasi", "Diseminasi → Ide → Produksi → Pasca Produksi"], kunci: 0 },
    { q: "Produksi — Menentukan target audiens dilakukan pada tahap…", opsi: ["pasca produksi", "pengeditan", "perencanaan (pra-produksi)", "diseminasi"], kunci: 2 },
    { q: "Produksi — Video 300 detik dengan pembuka 10% → durasi pembuka adalah…", opsi: ["10 detik", "30 detik", "3 detik", "300 detik"], kunci: 1 },
    { q: "Produksi — Penerapan: video tips belajar 2 menit (120 detik) untuk adik kelas 7; durasi bagian inti 70% adalah…", opsi: ["70 detik", "60 detik", "120 detik", "84 detik"], kunci: 3 },
    { q: "Perencanaan — Fungsi <b>hook</b> di 3 detik pertama video adalah…", opsi: ["menampilkan daftar pustaka", "menghitung durasi", "menarik perhatian penonton", "menutup video"], kunci: 2 },
    { q: "Perencanaan — Storyboard memuat…", opsi: ["harga peralatan", "adegan + visual + narasi + durasi", "profil pembuat", "komentar penonton"], kunci: 1 },
    { q: "Perencanaan — Jumlah persentase seluruh adegan pada storyboard harus…", opsi: ["100%", "50%", "200%", "bebas"], kunci: 0 },
    { q: "Perencanaan — Penerapan: video 120 detik; adegan 2 mendapat 35% → durasinya…", opsi: ["35 detik", "30 detik", "42 detik", "24 detik"], kunci: 2 },
    { q: "Fitur AI — Mengubah naskah menjadi suara narasi memakai…", opsi: ["TTS (teks ke suara)", "generator spreadsheet", "alat potong video", "mesin absensi"], kunci: 0 },
    { q: "Fitur AI — Urutan elemen prompt berstruktur yang benar adalah…", opsi: ["Format → Peran → Tugas → Konteks", "Tugas → Format → Peran → Konteks", "Konteks → Peran → Format", "Peran → Tugas → Konteks → Format"], kunci: 3 },
    { q: "Fitur AI — Naskah 480 kata, kecepatan bicara 120 kata/menit → durasi videomu…", opsi: ["3 menit", "4 menit", "2 menit", "6 menit"], kunci: 1 },
    { q: "Fitur AI — Penerapan: video 180 detik dengan 1 gambar AI tiap 45 detik membutuhkan…", opsi: ["4 gambar", "5 gambar", "3 gambar", "6 gambar"], kunci: 0 },
    { q: "Kreatif — Poster rasio 3:4 dengan lebar 1200 px memiliki tinggi…", opsi: ["900 px", "1200 px", "1600 px", "2000 px"], kunci: 2 },
    { q: "Kreatif — Kode warna hex yang valid adalah…", opsi: ["#22D3EE", "22D3", "#22D3E", "biru cerah 22"], kunci: 0 },
    { q: "Kreatif — Prinsip poster quote inspiratif adalah…", opsi: ["teks memenuhi halaman", "satu pesan utama &amp; teks singkat", "warna acak 12 macam", "tanpa fokus"], kunci: 1 },
    { q: "Kreatif — Penerapan: poster rasio 3:4 lebar 900 px → tingginya…", opsi: ["1200 px", "675 px", "1350 px", "900 px"], kunci: 0 },
    { q: "Diseminasi — Tindakan etis saat memakai karya orang lain adalah…", opsi: ["minta izin &amp; cantumkan kredit", "pakai tanpa izin", "hapus watermark", "klaim sebagai karya sendiri"], kunci: 0 },
    { q: "Diseminasi — Lisensi <b>CC BY</b> berarti…", opsi: ["bebas tanpa aturan", "dilarang dipakai", "wajib mencantumkan atribusi pembuat", "wajib bayar setiap dilihat"], kunci: 2 },
    { q: "Diseminasi — Ukuran (rasio) video vertikal untuk platform konten pendek adalah…", opsi: ["9:16", "3:4", "16:9", "1:1"], kunci: 0 },
    { q: "Diseminasi — Penerapan: video vertikal tinggi 1280 px, rasio 9:16 → lebarnya…", opsi: ["640 px", "720 px", "800 px", "512 px"], kunci: 1 },
  ],
};
