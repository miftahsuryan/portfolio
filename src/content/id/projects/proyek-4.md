---
title: "X-Pulse: Pipeline Ekstraksi Data Media Sosial & Dashboard FastAPI"
order: 4
status: "pengembangan"
role: "Pengembang Pipeline Data (Personal Project)"
period: "2024 - 2025"
summary: "Pipeline ekstraksi data dan dashboard lokal berbasis Playwright dan FastAPI untuk kurasi serta pemantauan metrik konten media sosial."
problem: "Pengambilan data pada platform web dinamis sering menghadapi tantangan format data yang berubah-ubah, jeda jaringan, dan kebutuhan penyimpanan media yang rapi."
approach: "Menggunakan Playwright untuk navigasi browser, validasi struktur data dengan Pydantic, unduhan asinkron dengan HTTPX, dan dashboard pemantau berbasis FastAPI."
outcome: "Sistem ekstraksi data yang teruji dengan Pytest, penanganan error yang andal, dan antarmuka web lokal untuk memantau proses ekstraksi."
stack:
  - "Python"
  - "Playwright"
  - "FastAPI"
  - "Pydantic"
  - "HTTPX"
  - "Pytest"
repoUrl: "https://github.com/miftahsuryan/scraping-x-top-videos-global-indonesia"
demoUrl: "https://github.com/miftahsuryan/scraping-x-top-videos-global-indonesia"
coverImage: "src/assets/projects/scraping-x/dashboard_preview.png"
coverAlt: "Dashboard antarmuka FastAPI X-Pulse untuk pemantauan job ekstraksi data media dan metrik keterlibatan"
gallery:
  - image: "src/assets/projects/scraping-x/dashboard_preview.png"
    alt: "Dashboard web cockpit FastAPI menampilkan metrik video, status download asinkron, dan analitik engagement"
    caption: "Web Cockpit: Antarmuka FastAPI lokal untuk monitoring ekstraksi, peninjauan payload JSON, dan streaming unduhan multimedia."
  - image: "src/assets/projects/scraping-x/architecture_flow.png"
    alt: "Diagram arsitektur alur rekayasa data X-Pulse dari browser automation hingga storage dan LLM curation"
    caption: "Arsitektur Pipeline: Desain modular 4 lapis mencakup Ingestion, Schema Validation, Ephemeral Storage, dan Asynchronous Consumption."
---

## Konteks & Latar Belakang
**X-Pulse** dirancang sebagai sistem rekayasa data (*data engineering pipeline*) berskala produksi untuk memanen, memvalidasi, menyaring, dan mengkurasi tren konten multimedia dari platform media sosial dinamis (X/Twitter). Proyek ini dibangun untuk tujuan riset akademis, benchmarking rekayasa data, dan otomasi ingestion konten legal dengan mematuhi prinsip etika data (*Ethical Scraping Charter*) tanpa pengumpulan data pribadi (Zero PII).

## Tantangan Rekayasa & Masalah yang Diselesaikan
Platform modern berbasis Single-Page Application (SPA) menghadirkan tantangan signifikan bagi otomatisasi data:
1. **Rendering DOM Dinamis & Deteksi Bot**: Pengambilan data dari arsitektur SPA yang memuat elemen secara asinkron sering kali memicu pembatasan laju (*rate-limiting*) atau kegagalan selektor elemen.
2. **Inkonsistensi Format Metrik Keterlibatan**: Tampilan metrik interaksi (likes, retweets, views) disajikan dalam notasi lokal yang bervariasi (misalnya `12.5K`, `1.2M`, atau koma desimal regional), menyulitkan pemeringkatan matematis langsung.
3. **Kerapuhan Streaming Unduhan Berkas**: Unduhan media video resolusi tinggi sering terputus di tengah jalan apabila koneksi jaringan mengalami latensi tanpa mekanisme pemulihan bertahap.

## Pendekatan Teknis & Rekayasa Sistem
Sistem dibangun dengan memprioritaskan prinsip *enterprise software craftsmanship*:
- **Stealth Headless Automation (Playwright)**: Memanfaatkan sesi cookie persisten dan simulasi navigasi interaktif manusiawi untuk menjelajahi elemen dynamic scroll secara andal tanpa membebani server target.
- **Strict Data Validation & Type Coercion (Pydantic v2)**: Skema data terstruktur memvalidasi setiap payload mentah secara ketat dan melakukan parsing notasi metrik numerik menjadi integer murni untuk pemeringkatan akurat.
- **Resilient Asynchronous I/O (HTTPX)**: Implementasi streaming unduhan berkas biner dalam potongan (*chunks*) asinkron yang dilengkapi loop *exponential backoff* dan interval jeda 3 hingga 5 detik.
- **FastAPI Cockpit & Job Polling**: Dashboard web lokal mandiri untuk memicu *scraping job*, melihat laporan analitik JSON secara atomik, dan mengelola media unduhan langsung dari antarmuka browser.
- **LLM Content Curation**: Integrasi pipeline kurasi cerdas berbasis LLM untuk menghasilkan ringkasan naratif, hook editorial, dan feed berkas CSV untuk kebutuhan kreasi konten batch terstruktur.

## Hasil, Pengujian, & Jaminan Kualitas
- **Pengujian Komprehensif**: Diuji secara menyeluruh dengan **41 test cases otomatis** (Pytest) mencakup ekstraksi DOM, integritas model Pydantic, ketahanan downloader, dan kontrak API FastAPI.
- **Kepatuhan Gaya Kode & Etika**: Kode lulus linting ketat **Ruff** tanpa peringatan, dilengkapi dokumentasi etika scraping dan pemeliharaan atribusi kreator asli secara transparan.
