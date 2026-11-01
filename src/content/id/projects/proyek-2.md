---
title: "Alat Komunikasi IoT Berbasis Machine Learning untuk Tunarungu"
order: 2
status: "prototipe"
role: "Feature Developer & Technical Documentation (Tim 3 Orang)"
period: "2023 - 2024 · Samsung Innovation Campus Batch 5"
summary: "Perangkat Speech-to-Text berbasis ESP32 dan AI untuk menampilkan teks pengumuman suara di ruang publik secara real-time bagi teman tunarungu."
problem: "Penyandang disabilitas pendengaran dan tunarungu kesulitan menangkap informasi penting yang disampaikan melalui pengeras suara di tempat umum seperti stasiun atau taman bermain."
approach: "Mengintegrasikan mikrokontroler ESP32 dengan penangkapan audio dan model Speech-to-Text berbasis machine learning untuk memproses pengumuman suara secara langsung dan menampilkannya ke layar."
outcome: "Terpilih sebagai Semi Finalist Samsung Innovation Campus Batch 5 (2024), serta menghasilkan prototipe fungsional dan video demo produk."
stack:
  - "Python"
  - "ESP32 (IoT)"
  - "Speech-to-Text (AI)"
  - "Machine Learning"
  - "C/C++"
repoUrl: "https://github.com/askarhabibulloh/SIC-5-Team-28"
demoUrl: "https://youtu.be/E6jOqyUa1pk"
coverImage: "src/assets/projects/SIC/hasil_alat.jpeg"
coverAlt: "Prototipe perangkat keras Speech-to-Text berbasis ESP32 dengan modul audio dan layar display"
---

## Konteks & Latar Belakang
Program **Samsung Innovation Campus (SIC) Batch 5** diselenggarakan oleh **Samsung Indonesia** bekerja sama dengan **Skilvul** dengan fokus pada integrasi Artificial Intelligence (AI) dan Internet of Things (IoT). Melalui program ini, peserta melewati serangkaian tahapan intensif:
1. **Dasar-Dasar AI & IoT**: Pembelajaran konsep fundamental sensor, mikrokontroler, machine learning, dan pemrograman Python.
2. **Bootcamp AI & IoT**: Pelatihan teknis lanjutan, problem-solving, serta pemantapan algoritma dan struktur data.
3. **Pengembangan Proyek Akhir (Capstone Project)**: Perancangan prototipe produk teknologi untuk memecahkan masalah sosial nyata (*Tech for Good*).

## Masalah yang Diselesaikan
Di area fasilitas publik seperti stasiun kereta api, terminal, bandara, maupun ruang rekreasi publik, pengumuman penting (seperti jadwal keberangkatan, keterlambatan, atau pengumuman darurat) sering kali disampaikan semata-mata lewat pengeras suara (speaker analog). Hal ini menciptakan kesenjangan akses informasi bagi penyandang disabilitas pendengaran (tunarungu). Tanpa adanya representasi visual real-time, mereka berisiko ketinggalan informasi krusial.

## Pendekatan Teknis & Solusi
Untuk mengatasi kendala tersebut, Tim 28 mengembangkan perangkat penerjemah suara-ke-teks otomatis (*Speech-to-Text*) terintegrasi:
- **Komputasi IoT & Hardware**: Memanfaatkan mikrokontroler **ESP32** yang hemat daya, terhubung ke modul penerima audio/suara dan modul display (layar monitor/LED display).
- **Pemrosesan Machine Learning & Audio**: Mengolah masukan sinyal audio dari speaker lingkungan, menyaring derau (*noise*), dan mengonversinya menjadi teks digital menggunakan model *Speech-to-Text*.
- **Penyajian Real-Time**: Teks hasil transkripsi langsung ditransmisikan dan ditampilkan di layar antarmuka pengguna tanpa latensi tinggi, sehingga pengunjung tunarungu dapat membaca isi pengumuman seketika.

## Kolaborasi Tim & Kontribusi Saya
Proyek ini dikembangkan secara kolaboratif oleh tim 3 orang di bawah arahan mentor industri:
- **Susunan Tim**: Miftahullah Surya Nugraha, Muhammad Askar Habibulloh, dan Rizki Surya Nugroho.
- **Mentor Pembimbing**: Pratama Putra.
- **Peran & Tanggung Jawab Utama Saya**:
  1. **Brainstorming Ide & Konseptualisasi**: Menginisiasi gagasan solusi pengubah suara pengumuman publik menjadi teks visual untuk mengatasi kesenjangan aksesibilitas teman tunarungu.
  2. **Koordinasi Tim & Komunikasi Progres**: Membantu mengoordinasikan alur kerja tim 3 orang, memantau penyelesaian target dari tahap bootcamp hingga proyek akhir, serta menjembatani konsultasi berkala dengan mentor.
  3. **Dokumentasi Teknis & Pelaporan**: Bertanggung jawab menyusun dokumentasi komprehensif terkait rancangan sistem, repositori kode sumber di GitHub, dan materi demonstrasi produk.
  4. **Pengujian Fungsional & Pengembangan Fitur**: Melakukan pengujian sistem penangkapan audio secara berulang serta mendukung pengembangan logika fitur transkripsi suara-ke-teks.

## Hasil & Dampak
- Berhasil melaju hingga tahap **Semi Finalist Samsung Innovation Campus Batch 5 (2024)**.
- Prototipe berhasil dibangun dan didokumentasikan dalam format video demonstrasi produk fungsional serta repositori kode sumber.
- Membuktikan penerapan nyata perpaduan IoT dan Machine Learning untuk tujuan aksesibilitas dan kesetaraan informasi (*Tech for Good*).
