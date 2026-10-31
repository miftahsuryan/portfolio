# Portofolio Pribadi

Situs portofolio statis (Astro + CSS biasa) untuk lamaran Magang Hub. Semua teks ada di `src/content/`, jadi Anda bisa mengubah isi tanpa menyentuh kode.

> Situs ini tidak berafiliasi dengan program Magang Hub atau instansi pemerintah mana pun.

## Menjalankan

Butuh Node.js 20 atau lebih baru.

```sh
npm install
npm run dev          # pratinjau di http://localhost:4321
```

## Mengedit konten

| Yang ingin diubah | File |
| --- | --- |
| Nama, peran, kalimat nilai, ketersediaan, lokasi, tentang saya, pendidikan, sertifikat, kontak, URL situs | `src/content/id/profile.yaml` |
| Skill (setiap skill harus ditautkan ke proyek) | `src/content/id/skills.yaml` |
| Proyek (satu file per proyek) | `src/content/id/projects/*.md` |

Aturan penting:

- Nilai yang belum diisi ditulis dengan awalan `TODO:`. **Build produksi akan gagal selama masih ada `TODO`.** Itu disengaja, supaya tidak ada placeholder yang ikut tayang.
- Jangan mengarang. Tulis hanya yang bisa Anda buktikan.
- "Tentang saya" maksimal 120 kata.
- Status proyek harus salah satu dari `selesai`, `prototipe`, `sedang-dikerjakan`.
- Jangan isi NIK, nomor telepon, atau alamat lengkap. Lokasi cukup kota/provinsi.
- Tidak mau menampilkan IPK? Biarkan `showGpa: false`. Isi `gpa: null` bila tidak ingin menulisnya sama sekali.
- Menambah proyek: salin salah satu file di `src/content/id/projects/`, ganti nama file (nama file = slug), ubah isinya, lalu tautkan skill terkait di `skills.yaml`.

### Foto profil dan screenshot proyek

1. Taruh file di `src/assets/profile/` (foto) atau `src/assets/projects/` (screenshot, diagram).
2. Isi path-nya di konten, misal `avatar: "src/assets/profile/foto.jpg"` atau `coverImage: "src/assets/projects/proyek-1.png"`.
3. Isi teks alternatif (`avatarAlt` / `coverAlt`) yang menjelaskan isi gambar.

Gambar dioptimasi otomatis (WebP, beberapa ukuran). Selama gambar belum ada, kerangka bertanda "Slot gambar" tampil di mode dev/pratinjau dan **tidak** dirender di build produksi.

### CV

Halaman `/cv` dibuat dari data yang sama. Tombol "Cetak / Simpan PDF" memakai fitur cetak browser (pilih "Save as PDF"). Jika Anda juga punya PDF buatan sendiri, taruh di `public/cv.pdf` dan tombol "Unduh cv.pdf" muncul otomatis.

## Perintah

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Server pengembangan |
| `npm run check:content` | Cek konten (placeholder, privasi, batas kata, tautan skill-proyek) |
| `npm run build` | Cek konten lalu build produksi ke `dist/`. **Gagal bila ada `TODO`.** |
| `npm run build:preview` | Build untuk melihat tampilan saat konten belum lengkap. **Jangan di-deploy.** |
| `npm run preview` | Menjalankan hasil build secara lokal |
| `npm run verify` | Screenshot 360/768/1280 px (terang + gelap), cek error console, overflow, link mati, toggle tema. Jalankan setelah build. Butuh `npx playwright install chromium` sekali. |

## Deploy (Vercel atau Netlify)

Output adalah situs statis di folder `dist/`, tanpa konfigurasi khusus.

1. Pastikan semua `TODO` sudah terisi dan `siteUrl` di `profile.yaml` berisi alamat situs final.
2. Push repo ke GitHub.
3. **Vercel**: Add New Project, pilih repo. Framework Astro terdeteksi otomatis (build `npm run build`, output `dist`).
   **Netlify**: Add new site, Import from Git. Build command `npm run build`, publish directory `dist`.
4. Setiap push ke `main` akan memicu deploy otomatis. Bila build gagal karena `TODO`, log akan menyebutkan file dan barisnya.

Situs ini juga bisa di-host di mana saja: salin isi `dist/` ke static hosting atau server Anda.

## Struktur

```
src/content/id/   semua teks (profil, skill, proyek)
src/components/   potongan tampilan
src/pages/        halaman (/ dan /cv)
src/styles/       design tokens, gaya dasar, gaya cetak
src/assets/       foto dan screenshot Anda
scripts/          pengecekan konten dan verifikasi browser
```

Warna, font, dan spasi didefinisikan sebagai CSS variables di `src/styles/tokens.css`.

## Lisensi aset

Lihat [CREDITS.md](CREDITS.md).

