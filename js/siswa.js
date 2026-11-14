/* =====================================================================
 * siswa.js — Logika dashboard siswa (LKPD Produksi & Diseminasi Konten
 * Digital, KKA Kelas X):
 *  • Menampilkan 6 modul + progress pribadi
 *  • Praktik = isian terstruktur (angka/teks/dropdown) + kanvas interaktif
 *    (alur produksi / timeline storyboard / mock poster) — TANPA kode program
 *  • Auto-check praktik numerik/teks → nilai otomatis (0–100) → simpan ke Supabase
 *  • Kuis pilihan ganda → auto-grading → simpan ke Supabase
 * ===================================================================== */
const $ = (id) => document.getElementById(id);
const sb = initSupabase();
let user = null, profil = null;
const FINAL_ID = KUIS_AKHIR.id;   // "p-final" — id kuis akhir LKPD ini

/* ---------- STARTUP ---------- */
(async () => {
  user = await requireLogin();
  if (!user) return;
  profil = await getProfile(user.id);
  const namaBersih = bersihNama(profil?.nama || "Siswa");
  $("profil-nama").textContent = "👤 " + namaBersih;
  $("profil-kelas").textContent = "🏫 Kelas " + (profil?.kelas?.nama || "-");
  $("salam").innerHTML = `<div class="lec-panel" style="border-left:4px solid var(--aqua)">
    <h4>Selamat datang, ${escapeHTML(namaBersih)}! 👋</h4>
    <p class="muted">Selesaikan ${MODUL.length} modul di bawah. Setiap modul berisi: <b>materi → contoh langkah → praktik isian terstruktur (dinilai otomatis) → kuis</b>.
    Gunakan tombol <b>👁️ Lihat Visual</b> untuk melihat rancanganmu pada kanvas (alur produksi, timeline storyboard, atau mock poster). Nilainya langsung masuk ke dashboard guru.</p></div>`;
  await muatProgres();
  renderModul();
})();

$("btn-logout").onclick = doLogout;
$("btn-tutup").onclick = tutupModal;

/* ---------- PROGRES NILAI ---------- */
let nilaiSaya = {};          // { g1: { praktik, kuis }, ... }
let langkahSaya = {};        // { g1: [l0,l1,..], ... }

async function muatProgres() {
  nilaiSaya = {}; langkahSaya = {};
  const [subs, quis, prog] = await Promise.all([
    sb.from("submissions").select("module_id, nilai, created_at").eq("student_id", user.id),
    sb.from("quiz_results").select("module_id, nilai, benar, total, created_at").eq("student_id", user.id),
    sb.from("progress").select("module_id, step_id").eq("student_id", user.id),
  ]);
  (subs.data || []).forEach(s => {
    if (!nilaiSaya[s.module_id]) nilaiSaya[s.module_id] = {};
    // simpan nilai praktik terbaik
    const sekarang = nilaiSaya[s.module_id].praktik ?? -1;
    nilaiSaya[s.module_id].praktik = Math.max(sekarang, s.nilai);
  });
  (quis.data || []).forEach(q => {
    if (!nilaiSaya[q.module_id]) nilaiSaya[q.module_id] = {};
    nilaiSaya[q.module_id].kuis = Math.max(nilaiSaya[q.module_id].kuis ?? -1, q.nilai);
  });
  (prog.data || []).forEach(p => {
    (langkahSaya[p.module_id] = langkahSaya[p.module_id] || []).push(p.step_id);
  });
}

async function simpanLangkah(moduleId, stepId) {
  const sudah = (langkahSaya[moduleId] || []).includes(stepId);
  if (sudah) return;
  await sb.from("progress").upsert({
    student_id: user.id, module_id: moduleId, step_id: stepId, status: "selesai"
  }, { onConflict: "student_id,module_id,step_id" });
  (langkahSaya[moduleId] = langkahSaya[moduleId] || []).push(stepId);
  renderModul();
}

/* ---------- LIST MODUL ---------- */
function nilaiModul(m) {
  const n = nilaiSaya[m.id] || {};
  const praktik = n.praktik, kuis = n.kuis;
  const p = (praktik ?? 0) * 0.5 + (kuis ?? 0) * 0.5; // bobot 50:50
  return { praktik, kuis, akhir: Math.round(p) };
}

/* ---------- GERBANG MODUL BERANTAI ----------
   Modul 1 selalu terbuka; modul N hanya terbuka setelah modul N-1
   selesai (praktik & kuis terkirim). Kuis Akhir butuh kelima modul. */
function modulSelesai(m) {
  const n = nilaiSaya[m.id] || {};
  return n.praktik !== undefined && n.kuis !== undefined;
}
function modulTerbuka(m) {
  const idx = MODUL.findIndex(x => x.id === m.id);
  if (idx === 0) return true;
  return modulSelesai(MODUL[idx - 1]);
}
function modulPrasyarat(m) {
  const idx = MODUL.findIndex(x => x.id === m.id);
  return MODUL[idx - (idx === 0 ? 0 : 1)] || m;   // modul sebelumnya
}

function renderModul() {
  $("daftar-modul").innerHTML = MODUL.map(m => {
    const terbuka = modulTerbuka(m);
    const steps = m.langkah.length;
    const dilakukan = (langkahSaya[m.id] || []).filter(s => s.startsWith("l")).length;
    const n = nilaiModul(m);
    const banyak = steps + 2; // semua langkah + praktik + kuis
    const kerjakan = dilakukan + ((langkahSaya[m.id] || []).includes("p") ? 1 : 0)
                   + ((langkahSaya[m.id] || []).includes("k") ? 1 : 0);
    const pct = Math.round(kerjakan / banyak * 100);
    const p = modulPrasyarat(m);
    return `<div class="modul-card" onclick="bukaModul('${m.id}')" style="${terbuka ? "" : "opacity:.55;cursor:not-allowed"}">
      <span class="modul-num">${terbuka ? `MODUL ${m.nomor}` : `🔒 MODUL ${m.nomor} — terbuka setelah Modul ${p.nomor} selesai`}</span>
      <h3>${m.ikon} ${m.judul}</h3>
      <p class="muted" style="font-size:.85rem">${terbuka ? m.ringkas : "Selesaikan <b>praktik &amp; kuis</b> Modul " + p.nomor + " terlebih dahulu." }</p>
      <div class="progress-bar"><div style="width:${terbuka ? pct : 0}%"></div></div>
      <span class="nilai-badge">
        📚 ${terbuka ? `${kerjakan}/${banyak} selesai` : "terkunci"} &nbsp;|&nbsp;
        🧪 praktik ${n.praktik === undefined ? "–" : n.praktik} &nbsp;|&nbsp;
        📝 kuis ${n.kuis === undefined ? "–" : n.kuis} &nbsp;|&nbsp; ⭐ ${n.akhir}
      </span></div>`;
  }).join("") + renderKartuFinal();
}

/* ---------- KUIS AKHIR (20 soal, berwaktu) ---------- */
let soalAkhir = [], finalTimer = null, deadline = null, kuisAkhirAktif = false;

function semuaModulSelesai() {
  return MODUL.every(m => {
    const n = nilaiSaya[m.id] || {};
    return n.praktik !== undefined && n.kuis !== undefined;
  });
}

function renderKartuFinal() {
  const siap = semuaModulSelesai();
  const nf = nilaiSaya[FINAL_ID];
  const checklist = MODUL.map(m => {
    const v = nilaiSaya[m.id] || {};
    const ok = v.praktik !== undefined && v.kuis !== undefined;
    return ok ? `<span title="Modul ${m.nomor} selesai">✅ M${m.nomor}</span>` : `<span title="Modul ${m.nomor} belum selesai">⬜ M${m.nomor}</span>`;
  }).join(" ");
  return `<div class="modul-card" ${siap ? 'onclick="bukaFinal()"' : ''} style="${siap ? "border-color:var(--kuning);" : "opacity:.55;cursor:not-allowed"}">
    <span class="modul-num" style="color:var(--kuning)">🏁 KUIS AKHIR (TERBUKA JIKA SEMUA MODUL SELESAI)</span>
    <h3>🧩 Ujian Terpadu — ${KUIS_AKHIR.soal.length} Soal</h3>
    <p class="muted" style="font-size:.85rem">${siap
      ? `Terbuka! ${KUIS_AKHIR.durasiMenit} menit · urutan soal diacak · auto-kirim saat waktu habis · nilai terbaik: ${nf ? nf.kuis ?? "-" : "-"}`
      : "Selesaikan praktik + kuis di semua modul untuk membukanya. Ceklis:"}</p>
    <span class="nilai-badge" ${siap ? 'style="display:none"' : ""}>${checklist}</span>
  </div>`;
}

window.bukaFinal = () => {
  const nf = nilaiSaya[FINAL_ID];
  $("mod-judul").textContent = `🏁 ${KUIS_AKHIR.judul}`;
  $("mod-isi").innerHTML = `
  <div class="lec-panel">
    <h4>📖 Aturan Kuis Akhir</h4>
    <ul>
      <li><b>${KUIS_AKHIR.soal.length} soal</b> mencampur semua materi — konsep produksi konten, perencanaan &amp; storyboard, fitur AI untuk konten edukatif, karya kreatif &amp; inspiratif, serta etika &amp; diseminasi.</li>
      <li>Dibatasi waktu <b>${KUIS_AKHIR.durasiMenit} menit</b>; hitung mundur tampil di bagian atas.</li>
      <li><b>Urutan soal diacak</b> setiap kali memulai.</li>
      <li>Saat waktu habis, jawaban <b>otomatis dikirim</b>.</li>
      <li>Seluruh soal wajib dijawab sebelum menekan Kirim (soal kosong dianggap salah).</li>
    </ul>
    ${nf ? `<div class="info-box hijau">Nilai terbaik kamu saat ini: <span class="nilai-besar">${nf.kuis ?? "-"}</span>/100 — mengerjakan ulang boleh untuk memperbaiki (yang disimpan tetap nilai terbaik).</div>`
         : `<div class="info-box kuning">⚠️ Menutup halaman akan menghentikan timer; jawaban yang belum dikirim tidak tersimpan. Pastikan waktu &amp; jaringan cukup sebelum memulai.</div>`}
    <button class="btn btn-kuning" onclick="mulaiFinal()">🚀 Mulai Kuis Sekarang</button>
  </div>`;
  $("modal-back").classList.add("tampil");
};

function acakArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

window.mulaiFinal = () => {
  soalAkhir = acakArray(KUIS_AKHIR.soal);
  kuisAkhirAktif = true;
  deadline = Date.now() + KUIS_AKHIR.durasiMenit * 60 * 1000;

  $("mod-judul").textContent = `🏁 ${KUIS_AKHIR.judul}`;
  $("mod-isi").innerHTML = `
    <div class="timer-bar" id="timer-bar">⏱️ ${KUIS_AKHIR.durasiMenit}:00</div>
    <div id="daftar-soal-akhir">
      ${soalAkhir.map((s, i) => `
        <div class="soal">
          <p><b>${i + 1}.</b> ${s.q}</p>
          ${s.opsi.map((o, j) => `
            <label class="opsi">
              <input type="radio" name="final-${i}" value="${j}" />
              <span>${String.fromCharCode(65 + j)}. ${o}</span>
            </label>`).join("")}
        </div>`).join("")}
    </div>
    <div class="aksi-bar" style="position:sticky;bottom:10px;background:var(--bg2);padding:12px;border-radius:10px;border:1px solid var(--line)">
      <span class="muted">Jawab semua soal sebelum kirim (sisa waktu: <b id="sisa-timer">${KUIS_AKHIR.durasiMenit}:00</b>)</span>
      <button class="btn btn-kuning" onclick="kirimFinal(false)">📤 Kirim Jawaban</button>
    </div>`;

  clearInterval(finalTimer);
  finalTimer = setInterval(berjalanTimer, 1000);
  berjalanTimer();
};

/* hitung mundur kuis akhir */
function berjalanTimer() {
  const sisaMs = deadline - Date.now();
  const bar = $("timer-bar");
  if (!bar) { clearInterval(finalTimer); return; }
  if (sisaMs <= 0) { kirimFinal(true); return; }
  const m = Math.floor(sisaMs / 60000), s = Math.floor(sisaMs % 60000 / 1000);
  bar.textContent = `⏱️ ${m}:${String(s).padStart(2, "0")}`;
  bar.className = "timer-bar" + (m < 2 ? " kritikal" : m < 5 ? " peringatan" : "");
  const labelSisa = document.getElementById("sisa-timer");
  if (labelSisa) labelSisa.textContent = `${m}:${String(s).padStart(2, "0")}`;
}

window.kirimFinal = async (otomatis) => {
  const jawaban = [], kosong = [];
  soalAkhir.forEach((s, i) => {
    const dipilih = document.querySelector(`input[name="final-${i}"]:checked`);
    jawaban.push(dipilih ? +dipilih.value : null);
    if (!dipilih) kosong.push(i + 1);
  });

  // waktu belum habis tetapi ada soal kosong → konfirmasi kirim
  if (!otomatis && kosong.length && deadline > Date.now()) {
    if (!confirm(`Masih ada ${kosong.length} soal kosong (no. ${kosong.join(", ")}). Kirim sekarang? Soal kosong dianggap salah.`)) {
      clearInterval(finalTimer);
      finalTimer = setInterval(berjalanTimer, 1000);   // lanjutkan waktu
      return;
    }
  }
  clearInterval(finalTimer);
  kuisAkhirAktif = false;
  let benar = 0;
  soalAkhir.forEach((s, i) => { if (jawaban[i] === s.kunci) benar++; });
  const nilai = Math.round(benar / soalAkhir.length * 100);

  // tandai benar/salah untuk review
  soalAkhir.forEach((s, i) => {
    const wrap = document.querySelectorAll("#daftar-soal-akhir .soal")[i];
    if (!wrap) return;
    wrap.querySelectorAll(".opsi").forEach((o) => {
      const j = +o.querySelector("input").value;
      if (j === s.kunci) o.classList.add("benar");
      else if (o.querySelector("input").checked) o.classList.add("salah");
      o.style.pointerEvents = "none";
    });
  });

  $("mod-isi").innerHTML = `
    <div class="lec-panel">
      <h4>${otomatis ? "⏰ Waktu habis — jawaban dikirim otomatis" : "✅ Jawaban terkirim"}</h4>
      <div class="info-box ${nilai >= 70 ? "hijau" : "merah"}">
        🏁 Nilai kuis akhir: <span class="nilai-besar">${nilai}</span>/100 — <b>${benar} dari ${soalAkhir.length}</b> benar.
        ${nilai >= 70 ? "Luar biasa! 🎉" : "Ayo belajar ulang modul yang masih lemah 💪"}
      </div>
      <p class="muted">Scroll di bawah untuk melihat kunci per soal (hijau = kunci, merah = pilihanmu salah).</p>
      <div id="daftar-soal-akhir">${$("daftar-soal-akhir")?.innerHTML || ""}</div>
      <div class="aksi-bar" style="margin-top:12px">
        <button class="btn btn-primary" onclick="bukaFinal()">↺ Kembali ke Halaman Kuis Akhir</button>
      </div>
    </div>`;

  // simpan ke Supabase: nilai terBAIK yang dipakai di dashboard
  const { error } = await sb.from("quiz_results").insert([
    { student_id: user.id, module_id: FINAL_ID, answers: jawaban, benar, total: soalAkhir.length, nilai }
  ]);
  if (error) console.error("Simpan kuis akhir gagal:", error.message);
  await simpanLangkah(FINAL_ID, "k");
  await muatProgres(); renderModul();
};

/* ---------- MODAL MODUL ---------- */
window.bukaModul = (id) => {
  const m = MODUL.find(x => x.id === id);
  if (!modulTerbuka(m)) {
    const p = modulPrasyarat(m);
    alert(`🔒 Modul ${m.nomor} masih terkunci.\nSelesaikan praktik & kuis Modul ${p.nomor} ("${p.judul}") terlebih dahulu.`);
    return;
  }
  $("mod-judul").textContent = `Modul ${m.nomor}: ${m.judul}`;
  $("mod-isi").innerHTML = isiModul(m);
  $("modal-back").classList.add("tampil");
};
function tutupModal() {
  // sedang mengerjakan kuis akhir? tawarkan peringatan sebelum keluar
  if (kuisAkhirAktif) {
    if (!confirm("⚠️ Kuis akhir masih BERJALAN. Menutup sekarang akan MENGHILANGKAN jawaban dan waktu tetap berjalan berakhir. Tutup?\n(OK = ya, tanggung sendiri)")) return;
    kuisAkhirAktif = false;
  }
  clearInterval(finalTimer);
  $("modal-back").classList.remove("tampil");
}

function escapeHTML(s) { return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

/* Normalisasi nama: jika data tersimpan ter-URL-encode (mis. "Siti%20Amai")
   → dekode ke spasi biasa agar sapaan siswa tetap rapi. */
function bersihNama(s) {
  let t = String(s ?? "").trim();
  if (t.includes("%")) {
    try { t = decodeURIComponent(t); } catch (e) { /* biarkan */ }
    t = t.split("%20").join(" ");
  }
  return t;
}

function isiModul(m) {
  const tujuanHTML = m.tujuan.map(t => `<li>${t}</li>`).join("");
  const langkahHTML = m.langkah.map((l, i) => `
    <div class="langkah-item">
      <span class="lebel-langkah">LANGKAH ${i + 1}</span>
      <h4>${l.judul}</h4>
      <p class="muted" style="margin-bottom:8px">${l.penjelasan}</p>
      <pre class="code-editor" style="min-height:0">${escapeHTML(l.kode)}</pre>
      <button class="btn btn-primary btn-sm" onclick="simpanLangkah('${m.id}','l${i}')">✔️ Langkah ini saya pahami</button>
      <span id="ok-${m.id}-l${i}" class="muted" style="font-size:.8rem">${(langkahSaya[m.id]||[]).includes("l"+i) ? "✔ sudah ditandai" : ""}</span>
    </div>`).join('<hr style="border-color:var(--line);opacity:.3" />');

  const n = nilaiSaya[m.id] || {};

  return `
  <div class="lec-panel">
    <h4>🎯 Tujuan Pembelajaran</h4><ul>${tujuanHTML}</ul>
    <h4>📖 Materi</h4>${m.teori}
  </div>
  <div class="lec-panel langkah">
    <h4>🧭 Panduan Langkah demi Langkah</h4>
    ${langkahHTML}
  </div>
  <div class="lec-panel">
    <h4>🧪 Praktik — Dinilai Otomatis</h4>
    <p style="line-height:1.7;margin-bottom:10px">${m.praktik.deskripsi}</p>
    ${m.praktik.inputs}
    <div class="aksi-bar" style="margin-top:8px">
      <button class="btn btn-hijau" onclick="lihatVisual('${m.id}')">👁️ Lihat Visual</button>
      <button id="btn-kirim-${m.id}" class="btn btn-kuning" onclick="kirimPraktik('${m.id}')">📤 Kirim Praktik (auto-nilai)</button>
      ${n.praktik !== undefined ? `<span class="chip">Nilai praktik terbaik: <b>${n.praktik}</b></span>` : ""}
    </div>
    <div id="vis-${m.id}-p"></div>
    <div id="cek-${m.id}-p"></div>
  </div>
  <div class="lec-panel" id="kuis-${m.id}">
    <h4>📝 Kuis</h4>
    ${renderKuis(m)}
  </div>`;
}

/* ---------- AUTO-CHECK PRAKTIK (isian angka / teks) ----------
   type "angka" → | parseFloat(isi) − val | ≤ 0.01
   type "teks"  → regex (i) terhadap isi (atau sama persis bila regExp gagal) */
function cekSatu(c) {
  const el = document.querySelector(c.sel);
  if (!el) return false;
  const isi = (el.value || "").trim();
  if (c.type === "angka") {
    const v = parseFloat(isi);
    return !isNaN(v) && Math.abs(v - c.val) <= 0.01;
  }
  if (c.type === "teks") {
    if (!isi) return false;
    try { return new RegExp(c.val, "i").test(isi); } catch { return isi === c.val; }
  }
  return false;
}

function kumpulJawaban(m) {
  const j = {};
  m.praktik.checks.forEach(c => {
    const el = document.querySelector(c.sel);
    if (el) j[c.sel.replace(/^#/, "")] = el.value;
  });
  return j;
}

/* ---------- KIRIM PRAKTIK ---------- */
window.kirimPraktik = async (mid) => {
  const m = MODUL.find(x => x.id === mid);
  const cekBox = $("cek-" + mid + "-p");
  const tombol = $("btn-kirim-" + mid);
  tombol.disabled = true; tombol.textContent = "⏳ Memeriksa…";

  // pastikan visual ikut termutakhirkan
  renderVisual(mid);

  const cek = m.praktik.checks.map(c => ({ desc: c.desc, poin: c.poin, pass: cekSatu(c) }));
  const nilai = cek.reduce((a, c) => a + (c.pass ? c.poin : 0), 0);

  cekBox.innerHTML = `
    <div class="info-box hijau" style="border-left-color:${nilai >= 70 ? "var(--hijau)" : "var(--merah)"}">
      <span class="nilai-besar">${nilai}</span> / 100 ${nilai >= 70 ? "✅ Lulus" : "🔴 Perlu perbaikan"}<br/>
      ${cek.map(c => `<div class="check-line ${c.pass ? "check-ok" : "check-gagal"}">
        ${c.pass ? "✔️" : "❌"} ${c.desc} (${c.poin} poin)</div>`).join("")}
    </div>`;

  // simpan ke Supabase (kode = JSON jawaban; output = ringkasan teks)
  const jawaban = kumpulJawaban(m);
  const ringkas = Object.entries(jawaban).map(([k, v]) => k + "=" + (v || "–")).join("; ");
  const { error } = await sb.from("submissions").insert([
    { student_id: user.id, module_id: mid, kode: JSON.stringify(jawaban), output: ringkas, checks: cek, nilai }
  ]);
  if (error) console.error("Simpan praktik gagal:", error.message);
  await simpanLangkah(mid, "p");
  await muatProgres(); renderModul();
  perbaruiChipPraktik(mid);      // refresh chip nilai terbaik tanpa menutup modal
  const tb = $("btn-kirim-" + mid);
  if (tb) { tb.disabled = false; tb.textContent = "📤 Kirim Praktik (auto-nilai)"; }
};

/* perbarui chip "nilai praktik terbaik" pada panel praktik yang sedang terbuka;
   isian siswa & hasil pengecekan dipertahankan (tidak mengganti innerHTML panel) */
function perbaruiChipPraktik(mid) {
  const m = MODUL.find(x => x.id === mid);
  const n = nilaiSaya[m.id] || {};
  if (n.praktik === undefined) return;
  const panel = [...document.querySelectorAll("#mod-isi .lec-panel")].find(p => p.querySelector(`#btn-kirim-${mid}`));
  if (!panel) return;
  const chip = [...panel.querySelectorAll(".chip")].find(c => c.textContent.includes("praktik terbaik"));
  if (chip) chip.innerHTML = `Nilai praktik terbaik: <b>${n.praktik}</b>`;
  else panel.querySelector(`#btn-kirim-${mid}`)
       .insertAdjacentHTML("afterend", ` <span class="chip">Nilai praktik terbaik: <b>${n.praktik}</b></span>`);
}

/* radio styling kuis */
document.addEventListener("click", (ev) => {
  const o = ev.target.closest(".opsi");
  if (!o || !o.querySelector("input[type=radio]")) return;
  const wrap = o.closest(".soal");
  if (!wrap) return;
  wrap.querySelectorAll(".opsi").forEach(e => e.classList.remove("dipilih"));
  o.classList.add("dipilih");
  o.querySelector("input").checked = true;
});

/* =====================================================================
 * VISUAL — KANVAS KOORDINAT (rentang −8..8)
 * ===================================================================== */
window.lihatVisual = (mid) => renderVisual(mid);

function renderVisual(mid) {
  const m = MODUL.find(x => x.id === mid);
  const vis = m.praktik && m.praktik.visual;
  const visBox = $("vis-" + mid + "-p");
  if (!vis || !visBox) return;
  const judulKanvas = vis.judulKanvas || "🗺️ Kanvas Interaktif";
  const tinggi = vis.tinggiKanvas || 480;
  const legendaKurva = (vis.kurva || [])
    .map(k => `<span style="color:${k.warna || "#22d3ee"};font-weight:600">— ${k.label || k.expr}</span>`)
    .join(" &nbsp;·&nbsp; ") + (vis.kurvaBay
      ? ` ${vis.kurva.length ? "·" : ""} <span style="color:${vis.kurvaBay.warna || "#22d3ee"};font-weight:600">— garis bayangan y = m·x + c (mengikuti isianmu)</span>`
      : "");
  visBox.innerHTML = `<div class="chart-box"><h4>${judulKanvas}</h4>
    <canvas id="cv-${mid}" width="480" height="${tinggi}" style="max-width:100%;width:480px;height:auto;border-radius:12px;background:#0b1220;border:1px solid var(--line)"></canvas>
    ${legendaKurva ? `<div style="font-size:12px;margin-top:6px">${legendaKurva}</div>` : ""}</div>`;
  const cv = document.getElementById("cv-" + mid);
  const ctx = cv.getContext("2d");
  gambarKanvas(ctx, vis, cv.width);
}

/* --- util gambar --- */
function gambarKanvas(ctx, vis, S) {
  // ---- painter non-koordinat (alur / timeline / poster) ----
  if (vis.jenis === "alur")     return gambarAlur(ctx, vis);
  if (vis.jenis === "timeline") return gambarTimeline(ctx, vis);
  if (vis.jenis === "poster")   return gambarPoster(ctx, vis);

  const R = 8, u = S / (2 * R + 1);
  const px = (x) => S / 2 + x * u, py = (y) => S / 2 - y * u;

  ctx.clearRect(0, 0, S, S);

  // grid
  ctx.strokeStyle = "rgba(148,163,184,.15)"; ctx.lineWidth = 1;
  for (let i = -R; i <= R; i++) {
    ctx.beginPath(); ctx.moveTo(px(i), py(R + 0.5)); ctx.lineTo(px(i), py(-R - 0.5)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px(-R - 0.5), py(i)); ctx.lineTo(px(R + 0.5), py(i)); ctx.stroke();
  }
  // sumbu
  ctx.strokeStyle = "#64748b"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, py(0)); ctx.lineTo(S, py(0)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(px(0), 0); ctx.lineTo(px(0), S); ctx.stroke();
  // panah sumbu
  ujungPanah(ctx, S - 2, py(0), 0, "#64748b");
  ujungPanah(ctx, px(0), 2, -Math.PI / 2, "#64748b");
  // label angka tiap 2 unit
  ctx.fillStyle = "#64748b"; ctx.font = "10px Consolas"; ctx.textAlign = "center";
  for (let i = -R; i <= R; i += 2) {
    if (i === 0) continue;
    ctx.fillText(String(i), px(i), py(0) + 13);
    ctx.textAlign = "right"; ctx.fillText(String(i), px(0) - 5, py(i) + 4); ctx.textAlign = "center";
  }

  // garis-garis cermin (refleksi)
  if (vis.jenis === "refleksi" && vis.garis) {
    [...new Set(vis.garis)].forEach(g => {
      ctx.strokeStyle = "#f472b6"; ctx.lineWidth = 2.5; ctx.setLineDash([7, 5]);
      ctx.beginPath();
      if (g === "sumbuX") { ctx.moveTo(px(-R - 0.5), py(0)); ctx.lineTo(px(R + 0.5), py(0)); }
      else if (g === "sumbuY") { ctx.moveTo(px(0), py(R + 0.5)); ctx.lineTo(px(0), py(-R - 0.5)); }
      else if (g === "yx") { ctx.moveTo(px(-R), py(-R)); ctx.lineTo(px(R), py(R)); }
      else if (g === "ynegx") { ctx.moveTo(px(-R), py(R)); ctx.lineTo(px(R), py(-R)); }
      ctx.stroke(); ctx.setLineDash([]);
    });
  }

  // titik pusat (rotasi/dilatasi)
  if (vis.pusat) {
    const [cx, cy] = vis.pusat;
    ctx.strokeStyle = "#fbbf24"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(px(cx), py(cy), 9, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(px(cx) - 14, py(cy)); ctx.lineTo(px(cx) + 14, py(cy));
    ctx.moveTo(px(cx), py(cy) - 14); ctx.lineTo(px(cx), py(cy) + 14);
    ctx.stroke();
  }

  // kurva dasar (opsional) — dipakai modul dengan materi persamaan garis/kurva
  if (vis.kurva) gambarKurvaList(ctx, vis.kurva, px, py);

  switch (vis.jenis) {
    case "vektor": gambarVektor(ctx, vis, px, py, u); break;
    case "refleksi": gambarBayangan(ctx, vis, px, py); break;
    case "rotasi": gambarBayangan(ctx, vis, px, py); break;
    case "dilatasi": gambarBayangan(ctx, vis, px, py, true); break;
    case "komposisi": gambarKomposisi(ctx, vis, px, py); break;
    case "fungsi": gambarFungsi(ctx, vis, px, py, u); break;
  }

  // bayangan garis dari isian siswa: y = m·x + c (opsional, digambar teratas)
  if (vis.kurvaBay) {
    const baca = (s) => { const el = document.querySelector(s); return el ? parseFloat(el.value) : NaN; };
    const m = baca(vis.kurvaBay.m), c = baca(vis.kurvaBay.c);
    if (isFinite(m) && isFinite(c)) {
      gambarKurvaList(ctx, [{ f: (x) => m * x + c, warna: vis.kurvaBay.warna || "#22d3ee", dash: [6, 4] }], px, py);
    }
  }
}

function ujungPanah(ctx, x, y, sudut, warna) {
  ctx.fillStyle = warna;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - 10 * Math.cos(sudut - 0.35), y - 10 * Math.sin(sudut - 0.35));
  ctx.lineTo(x - 10 * Math.cos(sudut + 0.35), y - 10 * Math.sin(sudut + 0.35));
  ctx.closePath(); ctx.fill();
}

function titik(ctx, p, warna, label, arah = 1) {
  const [x, y] = p;
  ctx.fillStyle = warna;
  ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#0b1220"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.stroke();
  if (label) {
    ctx.fillStyle = warna; ctx.font = "bold 13px Consolas"; ctx.textAlign = "center";
    ctx.fillText(label, x + 2, y - 12);
  }
}

/* titik bayangan dibaca dari input; null bila belum/tidak valid */
function bacaTitik(sel) {
  const ex = document.querySelector(sel[0]), ey = document.querySelector(sel[1]);
  if (!ex || !ey) return null;
  const x = parseFloat(ex.value), y = parseFloat(ey.value);
  if (isNaN(x) || isNaN(y)) return null;
  return [x, y];
}

function garisPanahDashed(ctx, p1, p2, warna) {
  ctx.strokeStyle = warna; ctx.lineWidth = 2; ctx.setLineDash([6, 5]);
  ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke();
  ctx.setLineDash([]);
  // kepala panah
  const ang = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
  ctx.fillStyle = warna;
  ctx.beginPath();
  ctx.moveTo(p2[0], p2[1]);
  ctx.lineTo(p2[0] - 9 * Math.cos(ang - 0.4), p2[1] - 9 * Math.sin(ang - 0.4));
  ctx.lineTo(p2[0] - 9 * Math.cos(ang + 0.4), p2[1] - 9 * Math.sin(ang + 0.4));
  ctx.closePath(); ctx.fill();
}

/* --- overlay garis/kurva untuk semua jenis visual (vis.kurva / vis.kurvaBay) ---
   item: { expr:"2*x+6", warna:"#f472b6", label:"…" }  atau  { f:(x)=>…, dash:[6,4] } */
function gambarKurvaList(ctx, daftar, px, py, R = 8) {
  daftar.forEach(k => {
    try {
      const f = k.f || new Function("x", "return (" + k.expr + ")");
      ctx.save();
      ctx.strokeStyle = k.warna || "#22d3ee";
      ctx.lineWidth = 2.5;
      if (k.dash) ctx.setLineDash(k.dash);
      let baru = true;
      for (let X = -R - 0.5; X <= R + 0.5; X += 0.05) {
        const Y = f(X);
        if (!isFinite(Y) || Y < -R - 1 || Y > R + 1) { baru = true; continue; }
        if (baru) { ctx.beginPath(); ctx.moveTo(px(X), py(Y)); baru = false; }
        else ctx.lineTo(px(X), py(Y));
      }
      ctx.stroke();
      ctx.restore();
    } catch (e) { /* ekspresi tidak valid → lewati kurva ini */ }
  });
}

function gambarVektor(ctx, vis, px, py, u) {
  const W = (p) => [px(p[0]), py(p[1])];
  vis.asal.forEach((p, i) => {
    const bay = [p[0] + vis.tf[0], p[1] + vis.tf[1]];
    if (bay[0] * bay[0] + bay[1] * bay[1] > 72.25) return; // di luar kanvas −8.5..8.5 → skip
    garisPanahDashed(ctx, W(p), W(bay), "#22d3ee");
    titik(ctx, W(p), "#fb923c", vis.labelAsal[i]);
    titik(ctx, W(bay), "#22d3ee", vis.labelBay[i]);
  });
  // keterangan vektor
  ctx.fillStyle = "#22d3ee"; ctx.font = "bold 13px Consolas"; ctx.textAlign = "left";
  ctx.fillText(`T = (${vis.tf[0]}, ${vis.tf[1]})`, 10, 20);
  ctx.fillStyle = "#fb923c"; ctx.fillText("● titik asal", 10, 38);
  ctx.fillText("● bayangan", 10, 56);
}

function gambarBayangan(ctx, vis, px, py, adaRay) {
  const W = (p) => [px(p[0]), py(p[1])];
  if (vis.baySel) {
    vis.asal.forEach((p, i) => {
      const bay = bacaTitik(vis.baySel[i]);
      if (bay) {
        if (adaRay && vis.pusat) garisPanahDashed(ctx, W(vis.pusat), W(bay), "#a78bfa88");
        garisPanahDashed(ctx, W(p), W(bay), "#22d3ee55");
        titik(ctx, W(bay), "#22d3ee", vis.labelBay[i]);
      }
    });
  }
  vis.asal.forEach((p, i) => titik(ctx, W(p), "#fb923c", vis.labelAsal[i]));
  if (vis.pusat) titik(ctx, W(vis.pusat), "#fbbf24", "pusat");
  ctx.fillStyle = "#fb923c"; ctx.font = "bold 13px Consolas"; ctx.textAlign = "left";
  ctx.fillText("● titik asal", 10, 20);
  ctx.fillStyle = "#22d3ee"; ctx.fillText("● bayangan (dari isianmu)", 10, 38);
}

function gambarKomposisi(ctx, vis, px, py) {
  const W = (p) => [px(p[0]), py(p[1])];
  vis.asal.forEach((p, i) => {
    const t1 = vis.tahap1 ? vis.tahap1[i] : null;
    if (t1) {
      garisPanahDashed(ctx, W(p), W(t1), "#a78bfa"); // tahap 1
      titik(ctx, W(t1), "#a78bfa", vis.labelTahap?.[i] || "");
    }
    const bay = vis.baySel ? bacaTitik(vis.baySel[i]) : null;
    if (bay) {
      if (t1) garisPanahDashed(ctx, W(t1), W(bay), "#22d3ee");
      else garisPanahDashed(ctx, W(p), W(bay), "#22d3ee");
      titik(ctx, W(bay), "#22d3ee", vis.labelBay[i]);
    }
  });
  vis.asal.forEach((p, i) => titik(ctx, W(p), "#fb923c", vis.labelAsal[i]));
  ctx.fillStyle = "#fb923c"; ctx.font = "bold 13px Consolas"; ctx.textAlign = "left";
  ctx.fillText("● titik asal", 10, 20);
  ctx.fillStyle = "#a78bfa"; ctx.fillText("● tahap 1", 10, 38);
  ctx.fillStyle = "#22d3ee"; ctx.fillText("● hasil akhir (dari isianmu)", 10, 56);
}

/* ---------- PAINTER ALUR · PIPELINE ----------
   vis = { jenis:"alur", tahap:["Ide","Perencanaan",…], sorotSel:"#id-select" }
   Menggambar alur tahapan produksi secara horizontal; kotak tahap yang
   namanya cocok dengan pilihan siswa (dropdown) disorot kuning. */
function gambarAlur(ctx, vis) {
  const W = ctx.canvas.width, H = ctx.canvas.height;
  ctx.clearRect(0, 0, W, H);

  const tahap = vis.tahap || [];
  const n = Math.max(tahap.length, 1);
  const pad = 18, gap = 26;
  const bw = (W - pad * 2 - gap * (n - 1)) / n;
  const bh = 96, by = H / 2 - bh / 2 - 10;

  // sorotan dari dropdown siswa
  let sorot = -1, pilihan = "";
  if (vis.sorotSel) {
    const el = document.querySelector(vis.sorotSel);
    pilihan = ((el && el.value) || "").trim();
    if (pilihan) {
      const v = pilihan.toLowerCase();
      sorot = tahap.findIndex(t => t.toLowerCase() === v);
      if (sorot === -1) sorot = tahap.findIndex(t => t.toLowerCase().includes(v) || v.includes(t.toLowerCase()));
    }
  }

  tahap.forEach((t, i) => {
    const bx = pad + i * (bw + gap);
    const aktif = i === sorot;
    ctx.beginPath();
    roundRect(ctx, bx, by, bw, bh, 12);
    ctx.fillStyle = aktif ? "rgba(250,204,21,.16)" : "rgba(148,163,184,.10)";
    ctx.fill();
    ctx.lineWidth = aktif ? 3 : 1.5;
    ctx.strokeStyle = aktif ? "#facc15" : "rgba(148,163,184,.45)";
    if (aktif) ctx.stroke();
    ctx.beginPath(); roundRect(ctx, bx, by, bw, bh, 12); ctx.stroke();
    // nomor tahap
    ctx.fillStyle = aktif ? "#facc15" : "#94a3b8";
    ctx.font = "bold 11px Consolas"; ctx.textAlign = "center";
    ctx.fillText(i === sorot ? "★ pilihanmu" : `tahap ${i + 1}`, bx + bw / 2, by + 18);
    // nama tahap (bungkus jika panjang)
    ctx.fillStyle = aktif ? "#fde68a" : "#e2e8f0";
    ctx.font = "bold 13px Consolas";
    const baris = wrapTeks(ctx, t, bw - 12);
    baris.forEach((l, j) => ctx.fillText(l, bx + bw / 2, by + 42 + j * 15));
    // panah ke tahap berikutnya
    if (i < n - 1) panahKotak(ctx, bx + bw + 3, by + bh / 2, gap - 6, "#64748b");
  });

  // keterangan bawah
  ctx.textAlign = "left"; ctx.font = "12px Consolas";
  ctx.fillStyle = "#94a3b8";
  ctx.fillText("⬜ tahap alur produksi", 18, H - 16);
  ctx.fillStyle = "#facc15";
  ctx.fillText(pilihan ? (sorot === -1 ? `🟨 pilihanmu "${pilihan}" tidak ada dalam alur — periksa lagi` : "🟨 pilihanmu (tersorot)") : "🟨 pilihanmu — isi dropdown lalu tekan 👁️ lagi", 190, H - 16);
}

/* ---------- PAINTER TIMELINE · STACKED BAR ----------
   vis = { jenis:"timeline", barSel:[{sel,label,warna},…], satuan:"detik",
           totalCek:120 }
   Menggambar satu batang horizontal; lebar tiap segmen proporsional
   terhadap isian angka siswa (durasi adegan). */
function gambarTimeline(ctx, vis) {
  const W = ctx.canvas.width, H = ctx.canvas.height;
  ctx.clearRect(0, 0, W, H);

  const pad = 26, barY = H / 2 - 34, barH = 68;
  const barW = W - pad * 2;
  const items = (vis.barSel || []).map(b => {
    const el = document.querySelector(b.sel);
    const v = el ? parseFloat(el.value) : NaN;
    return { label: b.label, warna: b.warna || "#22d3ee", v };
  });
  const total = items.reduce((a, x) => a + (isFinite(x.v) && x.v > 0 ? x.v : 0), 0);
  const satuan = vis.satuan || "detik";

  // garis dasar
  ctx.strokeStyle = "rgba(148,163,184,.35)"; ctx.lineWidth = 1;
  ctx.strokeRect(pad, barY, barW, barH);

  let x = pad;
  items.forEach(it => {
    const valid = isFinite(it.v) && it.v > 0 && total > 0;
    const wSeg = valid ? barW * it.v / total : 0;
    ctx.beginPath(); roundRect(ctx, x + 1, barY + 1, Math.max(wSeg - 2, 0), barH - 2, 6);
    ctx.fillStyle = valid ? it.warna + "55" : "rgba(244,114,182,.14)";
    ctx.fill();
    ctx.strokeStyle = valid ? it.warna : "#f472b6";
    ctx.lineWidth = 1.5; ctx.stroke();
    // teks di dalam segmen
    ctx.fillStyle = valid ? "#e2e8f0" : "#f9a8d4";
    ctx.font = "bold 11px Consolas"; ctx.textAlign = "center";
    const cx = x + wSeg / 2;
    if (wSeg > 34 || !valid) {
      ctx.fillText(valid ? it.label : it.label + " ?", Math.max(cx, x + 24), barY + 28);
      ctx.font = "11px Consolas";
      ctx.fillText(valid ? `${it.v} ${satuan}` : "belum diisi", Math.max(cx, x + 24), barY + 46);
      if (valid) ctx.fillText(`${Math.round(it.v / total * 100)}%`, Math.max(cx, x + 24), barY + 62);
    }
    x += wSeg;
  });

  // cek total
  ctx.textAlign = "left"; ctx.font = "bold 13px Consolas";
  const selesai = items.every(i => isFinite(i.v) && i.v > 0);
  if (selesai) {
    const cocok = vis.totalCek ? Math.abs(total - vis.totalCek) <= 0.01 : null;
    if (cocok === null) { ctx.fillStyle = "#4ade80"; ctx.fillText(`Total: ${total} ${satuan}`, pad, barY + barH + 24); }
    else {
      ctx.fillStyle = cocok ? "#4ade80" : "#f87171";
      ctx.fillText(cocok
        ? `✔ Total ${total} ${satuan} = ${vis.totalCek} ${satuan} — cocok!`
        : `✘ Total ${total} ${satuan} ≠ ${vis.totalCek} ${satuan} — periksa lagi hitunganmu`,
        pad, barY + barH + 24);
    }
  } else {
    ctx.fillStyle = "#94a3b8";
    ctx.fillText(`Isi semua durasi (total seharusnya ${vis.totalCek ?? "?"} ${satuan}) lalu tekan 👁️ lagi.`, pad, barY + barH + 24);
  }
}

/* ---------- PAINTER POSTER · MOCK POSTER ----------
   vis = { jenis:"poster", rasio:[3,4], grid:[3,4],
           warnaSel:"#id-warna", teksSel:"#id-tagline" }
   Menggambar mock poster: rasio tetap, warna latar & teks tagline
   mengikuti isian siswa. */
function gambarPoster(ctx, vis) {
  const W = ctx.canvas.width, H = ctx.canvas.height;
  ctx.clearRect(0, 0, W, H);

  const margin = 18, [rl, rt] = vis.rasio || [3, 4];
  let bh = H - margin * 2, bw = bh * rl / rt;
  if (bw > W - margin * 2) { bw = W - margin * 2; bh = bw * rt / rl; }
  const bx = (W - bw) / 2, by = (H - bh) / 2;

  // warna latar dari isian siswa (hex 6 digit tanpa #)
  const elW = document.querySelector(vis.warnaSel);
  let hex = ((elW && elW.value) || "").replace("#", "").trim();
  const validHex = /^[0-9a-f]{6}$/i.test(hex);
  if (!validHex) hex = "1e3a8a";

  ctx.beginPath(); roundRect(ctx, bx, by, bw, bh, 14);
  ctx.fillStyle = "#" + hex; ctx.fill();
  ctx.strokeStyle = validHex ? "#4ade80" : "#f472b6"; ctx.lineWidth = 2.5; ctx.stroke();

  // grid bantu
  const [gc, gr] = vis.grid || [3, 4];
  ctx.strokeStyle = "rgba(255,255,255,.14)"; ctx.lineWidth = 1;
  for (let i = 1; i < gc; i++) {
    ctx.beginPath(); ctx.moveTo(bx + bw * i / gc, by); ctx.lineTo(bx + bw * i / gc, by + bh); ctx.stroke();
  }
  for (let i = 1; i < gr; i++) {
    ctx.beginPath(); ctx.moveTo(bx, by + bh * i / gr); ctx.lineTo(bx + bw, by + bh * i / gr); ctx.stroke();
  }

  // tagline dari isian siswa
  const elT = document.querySelector(vis.teksSel);
  const tagline = ((elT && elT.value) || "").trim() || "(tagline muncul di sini)";
  ctx.fillStyle = "#ffffff"; ctx.textAlign = "center";
  ctx.font = "bold 24px Consolas";
  const baris = wrapTeks(ctx, tagline, bw - 48, 5);
  const cy = by + bh / 2 - (baris.length - 1) * 16;
  baris.forEach((l, j) => ctx.fillText(l, bx + bw / 2, cy + j * 32));

  // label bawah poster
  ctx.font = "12px Consolas";
  ctx.fillStyle = validHex ? "#4ade80" : "#f9a8d4";
  ctx.textAlign = "left";
  ctx.fillText(validHex
    ? `✔ warna #${hex.toUpperCase()} · rasio ${rl}:${rt} · grid ${gc}×${gr} (${gc * gr} kotak)`
    : `⚠ hex "${elW && elW.value}" belum valid (harus 6 digit tanpa #) — pakai warna contoh`,
    18, H - 14);
}

/* ---------- util painter bersama ---------- */
function roundRect(ctx, x, y, w, h, r) {
  if (ctx.roundRect) { ctx.roundRect(x, y, w, h, r); return; }
  r = Math.min(r, w / 2, h / 2);
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* bungkus teks agar muat di lebar tertentu; kembalikan daftar baris */
function wrapTeks(ctx, teks, maxW, maksBaris = 3) {
  const kata = String(teks).split(/\s+/);
  const baris = [];
  let cur = "";
  kata.forEach(k => {
    const coba = cur ? cur + " " + k : k;
    if (ctx.measureText(coba).width > maxW && cur) { baris.push(cur); cur = k; }
    else cur = coba;
  });
  if (cur) baris.push(cur);
  if (baris.length > maksBaris) {
    const potong = baris.slice(0, maksBaris);
    potong[maksBaris - 1] = potong[maksBaris - 1].slice(0, Math.max(potong[maksBaris - 1].length - 3, 1)) + "…";
    return potong;
  }
  return baris;
}

/* panah kecil antar kotak alur */
function panahKotak(ctx, x, y, panjang, warna) {
  ctx.strokeStyle = warna; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + panjang, y); ctx.stroke();
  ctx.fillStyle = warna;
  ctx.beginPath();
  ctx.moveTo(x + panjang + 5, y);
  ctx.lineTo(x + panjang - 3, y - 5);
  ctx.lineTo(x + panjang - 3, y + 5);
  ctx.closePath(); ctx.fill();
}

/* ---------- PAINTER FUNGSI · CURVE ----------
   vis = {
     kurva: [ { expr:"x*x", warna:"#fb923c", label:"y = x²" }, … ],
     titik: [ { asal:[0,0], labelAsal:"puncak lama", label:"puncak baru",
                sel:["#g6-puncak-x","#g6-puncak-y"] }, … ]   (opsional)
   } */
function gambarFungsi(ctx, vis, px, py, u) {
  const x0 = -8.5, x1 = 8.5;

  // kurva-kurva (dasar & hasil transformasi)
  (vis.kurva || []).forEach(k => {
    let f = null;
    try { f = new Function("x", "return (" + k.expr + ")"); } catch { f = null; }
    if (!f) return;
    ctx.strokeStyle = k.warna; ctx.lineWidth = 2.5;
    let baru = true;
    for (let X = x0; X <= x1 + 1e-9; X += 0.04) {
      const Y = f(X);
      if (!isFinite(Y) || Y < -9 || Y > 9) { baru = true; continue; }
      const cx = px(X), cy = py(Y);
      if (baru) { ctx.beginPath(); ctx.moveTo(cx, cy); baru = false; }
      else ctx.lineTo(cx, cy);
    }
    ctx.stroke();
  });

  // legenda
  let ly = 20;
  (vis.kurva || []).forEach(k => {
    ctx.fillStyle = k.warna; ctx.font = "bold 12px Consolas"; ctx.textAlign = "left";
    ctx.fillText("—  " + (k.label || k.expr), 10, ly);
    ly += 17;
  });

  // titik acuan: asal tetap + bayangan dari isian siswa (puncak dsb.)
  (vis.titik || []).forEach(t => {
    const asalPx = [px(t.asal[0]), py(t.asal[1])];
    titik(ctx, asalPx, "#fb923c", t.labelAsal || "");
    const bay = t.sel ? bacaTitik(t.sel) : null;
    if (bay) {
      garisPanahDashed(ctx, asalPx, [px(bay[0]), py(bay[1])], "#a78bfa");
      titik(ctx, [px(bay[0]), py(bay[1])], "#a78bfa", t.label || "");
    }
  });
}

/* ---------- HASIL KUIS ---------- */
function renderKuis(m) {
  const n = nilaiSaya[m.id] || {};
  return `
    <div id="kuis-form-${m.id}">
      ${m.kuis.map((s, i) => `
        <div class="soal">
          <p><b>${i + 1}.</b> <span id="q-${m.id}-${i}">${s.q}</span></p>
          ${s.opsi.map((o, j) => `
            <label class="opsi" data-m="${m.id}" data-i="${i}" data-j="${j}">
              <input type="radio" name="soal-${m.id}-${i}" value="${j}" />
              <span>${String.fromCharCode(65 + j)}. ${o}</span>
            </label>`).join("")}
        </div>`).join("")}
      <div class="aksi-bar">
        <button class="btn btn-kuning" onclick="kirimKuis('${m.id}')">✅ Kirim Jawaban (auto-nilai)</button>
        ${n.kuis !== undefined ? `<span class="chip">Nilai kuis terbaik: <b>${n.kuis}</b></span>` : ""}
      </div>
    </div>
    <div id="kuis-hasil-${m.id}"></div>`;
}

/* ---------- KIRIM KUIS ---------- */
window.kirimKuis = async (mid) => {
  const m = MODUL.find(x => x.id === mid);
  const jawaban = [];
  let terisi = true;
  m.kuis.forEach((s, i) => {
    const dipilih = document.querySelector(`input[name="soal-${mid}-${i}"]:checked`);
    if (dipilih) jawaban[i] = +dipilih.value; else { jawaban[i] = null; terisi = false; }
  });
  if (!terisi) {
    $("kuis-hasil-" + mid).innerHTML = `<div class="info-box merah">⚠️ Semua soal harus dijawab dulu!</div>`;
    return;
  }
  // auto-grading
  let benar = 0;
  m.kuis.forEach((s, i) => { if (jawaban[i] === s.kunci) benar++; });
  const nilai = Math.round(benar / m.kuis.length * 100);
  // warna opsi: kunci hijau, pilihan salah merah
  m.kuis.forEach((s, i) => {
    const wrap = document.querySelectorAll(`#kuis-form-${mid} .soal`)[i];
    if (!wrap) return;
    wrap.querySelectorAll(".opsi").forEach((o) => {
      const j = +o.dataset.j;
      if (j === s.kunci) o.classList.add("benar");
      else if (j === jawaban[i]) o.classList.add("salah");
      o.style.pointerEvents = "none";
    });
  });
  $("kuis-hasil-" + mid).innerHTML = `
    <div class="info-box ${nilai >= 70 ? "hijau" : "merah"}">
      🎯 Nilai kuis: <span class="nilai-besar">${nilai}</span>/100 — <b>${benar} dari ${m.kuis.length}</b> benar.
      ${nilai >= 70 ? "Mantap! 🎉" : "Baca ulang materi, lalu coba lagi ya 💪"}
    </div>`;

  const { error } = await sb.from("quiz_results").insert([
    { student_id: user.id, module_id: mid, answers: jawaban, benar, total: m.kuis.length, nilai }
  ]);
  if (error) console.error("Simpan kuis gagal:", error.message);
  await simpanLangkah(mid, "k");
  await muatProgres(); renderModul();
};
