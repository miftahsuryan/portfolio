---
title: "WisataPas: Sistem Rekomendasi Destinasi Wisata Hybrid & AI Generatif"
order: 2
status: "selesai"
role: "Machine Learning Engineer (Tim 6 Orang: 3 ML, 3 FEBE)"
period: "2025 · Capstone Coding Camp powered by DBS Foundation (CC25-CF197)"
summary: "Platform rekomendasi destinasi wisata Indonesia berbasis Hybrid Filtering (Content-Based TF-IDF & Collaborative Filtering RecommenderNet) dilengkapi ringkasan otomatis model generatif T5."
problem: "Wisatawan domestik kerap kesulitan merencanakan perjalanan karena informasi rute dan estimasi biaya tersebar luas. Selain itu, sistem rekomendasi konvensional sering gagal mempersonalisasi saran dan rentan masalah cold-start."
approach: "Membangun sistem Hybrid Filtering yang menggabungkan Content-Based (TF-IDF) dan Collaborative Filtering RecommenderNet (TensorFlow Keras) pada 16.299 rating. Menambahkan fine-tuning model T5-small untuk ringkasan destinasi otomatis."
outcome: "Mencapai Validation RMSE 0,3679 pada RecommenderNet dengan rekomendasi hybrid yang presisi untuk pencarian teks bebas. Pipeline API dideploy menggunakan FastAPI di Hugging Face Spaces dan frontend di Netlify."
stack:
  - "Python"
  - "TensorFlow & Keras"
  - "Scikit-learn (TF-IDF)"
  - "Transformers (T5)"
  - "PyTorch"
  - "Pandas & NumPy"
  - "FastAPI"
  - "Netlify"
repoUrl: "https://github.com/WisataPas/WisataPas_ML"
demoUrl: "https://wisatapas.netlify.app"
videoUrl: "https://drive.google.com/file/d/1vIXrm37aLaXNmvuFVmE5akL1sUwTz5FC/view?usp=drive_link"
coverImage: "src/assets/projects/WisataPas/wisatapas_web_preview.png"
coverAlt: "Antarmuka platform web rekomendasi wisata cerdas WisataPas dan arsitektur Machine Learning"
gallery:
  - image: "src/assets/projects/WisataPas/wisatapas_web_preview.png"
    alt: "Antarmuka aplikasi web WisataPas yang menampilkan peta interaktif dan rekomendasi destinasi"
    caption: "Antarmuka Web: Platform WisataPas dengan peta interaktif dan rekomendasi destinasi personal"
  - videoEmbedUrl: "https://drive.google.com/file/d/1vIXrm37aLaXNmvuFVmE5akL1sUwTz5FC/preview"
    alt: "Video demonstrasi aplikasi dan alur kerja sistem rekomendasi WisataPas"
    caption: "Video Demo Aplikasi: Demonstrasi fitur personalisasi rekomendasi dan pencarian kueri"
  - image: "src/assets/projects/WisataPas/rmse_collaborative_filtering.png"
    alt: "Grafik kurva penurunan RMSE pelatihan dan validasi model RecommenderNet"
    caption: "Evaluasi Model: Kurva pelatihan RecommenderNet konvergen pada Validation RMSE 0,3679"
  - image: "src/assets/projects/WisataPas/cbf_recommendation_output.png"
    alt: "Tabel hasil inferensi model Content-Based Filtering menggunakan kemiripan Cosine Similarity"
    caption: "Inferensi Content-Based: Rekomendasi destinasi relevan berdasarkan kesamaan atribut lokasi"
  - image: "src/assets/projects/WisataPas/model_evaluation_detail.png"
    alt: "Hasil prediksi rekomendasi destinasi wisata untuk pengguna berdasarkan riwayat interaksi"
    caption: "Hasil Rekomendasi Personal: Daftar destinasi rekomendasi teratas untuk pengguna spesifik"
---

## Konteks & Latar Belakang Proyek
Proyek **WisataPas** dikembangkan sebagai proyek akhir (*Capstone Project*) pada program **Coding Camp powered by DBS Foundation 2025** oleh tim **CC25-CF197**. Proyek ini mempertemukan alur keahlian *Machine Learning* dan *Front-End & Back-End (FEBE)* untuk membangun solusi nyata dalam memajukan pariwisata Indonesia yang berkelanjutan dan inklusif.

## Masalah Pariwisata Domestik
Pada tahun 2024, Indonesia mencatatkan lebih dari 1 miliar pergerakan wisatawan domestik. Namun, wisatawan kerap mengalami kendala saat merencanakan perjalanan:
1. **Penyebaran Informasi yang Tidak Merata**: Rute, estimasi biaya tiket, fasilitas, dan jam operasional destinasi wisata di luar kota besar sulit ditemukan dalam satu tempat.
2. **Keterbatasan Rekomendasi Konvensional**: Sebagian besar platform perjalanan hanya menampilkan destinasi populer (*trending*) tanpa mempertimbangkan kecocokan preferensi minat, kategori, atau keterbatasan anggaran pengguna.
3. **Kendala Cold-Start Pengguna Baru**: Pengguna yang belum memiliki riwayat rating sering kali tidak mendapatkan rekomendasi yang kontekstual.

## Pendekatan Teknis: Hybrid Recommendation Engine
Untuk memberikan rekomendasi yang presisi dan relevan, tim merancang arsitektur sistem rekomendasi hibrida (*Hybrid Recommendation System*) yang menggabungkan tiga pilar teknologi AI:

### 1. Content-Based Filtering (CBF)
- **Ekstraksi Fitur Teks**: Menggabungkan fitur nama destinasi, kategori wisata, kota, dan narasi deskripsi, kemudian diekstraksi ke dalam matriks representasi numerik menggunakan `TfidfVectorizer`.
- **Pengukuran Kemiripan**: Menghitung bobot kemiripan antar-destinasi menggunakan `cosine_similarity`.
- **Pencarian Bahasa Alami (*Semantic Search*)**: Memungkinkan pengguna memasukkan kueri teks bebas (seperti *"wisata alam daerah yogyakarta"*) untuk menemukan destinasi yang paling cocok secara instan, sekaligus menjadi solusi efektif mengatasi masalah *cold-start* bagi pengunjung baru.

### 2. Collaborative Filtering (CF) – RecommenderNet
- **Arsitektur Jaringan Syaraf Tiruan**: Mengembangkan model custom `RecommenderNet` berbasis **TensorFlow & Keras** (`tf.keras.Model`).
- **User & Item Embeddings**: Mempelajari representasi vektor laten (*latent embeddings*) untuk 450 pengguna dan 608 destinasi wisata, dilengkapi inisialisasi bobot `he_normal`, regularisasi L2 (`1e-4`), dan lapisan `Dropout` untuk mencegah *overfitting*.
- **Evaluasi Kinerja**: Model dilatih menggunakan fungsi loss *Binary Crossentropy* dan dievaluasi dengan metrik *Root Mean Squared Error* (RMSE), berhasil mencapai **Validation RMSE 0,3679** (turun signifikan dari *initial baseline* di atas 0,60).

### 3. Generative AI Text Summarization (Fine-Tuned T5)
- **Ringkasan Destinasi Otomatis**: Melakukan *fine-tuning* pada model **T5-small** (`T5ForConditionalGeneration` dari Hugging Face Transformers) dengan backend **PyTorch**.
- **Penyajian Natural**: Menghasilkan kalimat ringkasan rekomendasi berbahasa Indonesia yang menarik dan komunikatif (misal: merangkum kategori, kota, dan rating menjadi satu narasi persuasif yang siap dibaca wisatawan).

## Pengembangan & Augmentasi Dataset
Dataset dasar diperoleh dari Kaggle (*Indonesia Tourism Destination*), yang kemudian diperkaya secara mandiri oleh tim:
- **Destinasi Wisata**: Diperluas dari 437 menjadi **608 destinasi** di berbagai kota Indonesia.
- **Web Scraping Citra Destinasi**: Mengumpulkan URL gambar aktual setiap destinasi secara terstruktur untuk visualisasi di aplikasi web.
- **Data Rating & Interaksi**: Ditingkatkan dari ~10.000 menjadi **16.299 penilaian** dari **450 profil pengguna** untuk memastikan distribusi matriks interaksi cukup padat bagi pelatihan model *collaborative filtering*.

## Kolaborasi Tim & Pembagian Peran
Proyek ini dikembangkan secara kolaboratif oleh 6 anggota tim:
- **Tim Machine Learning**: Miftahullah Surya Nugraha, Husnul Khatimah, dan Marsha Kamila.
- **Tim Front-End & Back-End (FEBE)**: Sofyan Farros, Muhammad Jamaluddin, dan Abdullah Ridho Laksmana.
- **Fokus Kontribusi Saya**:
  1. Terlibat aktif dalam eksplorasi data (*EDA*), pembersihan missing values, dan pengolahan data rating pengguna.
  2. Mengembangkan pipeline vektorisasi *Content-Based Filtering* dan pencarian kueri berbasis kemiripan kosinus.
  3. Menguji arsitektur dan parameter pelatihan model *RecommenderNet* untuk meminimalkan nilai Validation RMSE.
  4. Menyiapkan serialisasi artefak model (`.keras`, `.pkl`) untuk kebutuhan deployment endpoint API.

## Integrasi Sistem & Deployment
- **Model Serving**: API Machine Learning dibungkus menggunakan **FastAPI** dan dideploy di **Hugging Face Spaces**.
- **Backend & Database**: Layanan backend dibangun menggunakan **Node.js + Hapi.js** dengan basis data relasional **PostgreSQL (Supabase)**.
- **Frontend & Peta Interaktif**: Antarmuka responsif dibangun dengan **TailwindCSS**, **JavaScript modern**, dan pustaka **Leaflet.js** untuk visualisasi peta interaktif, serta dideploy secara publik di **Netlify**.
