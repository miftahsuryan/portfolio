---
title: "IDX Quant Studio: Platform Analisis & Valuasi Saham Kuantitatif"
order: 2
status: "pengembangan"
role: "Pengembang Aplikasi (Full-Stack & ML)"
period: "2025 - 2026"
summary: "Aplikasi web untuk eksplorasi dan valuasi saham BEI, menggabungkan pengolahan data fundamental, model deep learning, dan dashboard analitik interaktif."
problem: "Fragmentasi data riset pasar modal Indonesia (IDX), perlunya mitigasi risiko kesalahan numerik pada analisis finansial, serta pentingnya pengujian model pada data historis secara objektif."
approach: "Pembangunan pipeline data DuckDB & Parquet yang efisien, model valuasi fundamental, deep learning untuk pergerakan harga, dan pengujian performa secara terstruktur."
outcome: "Dashboard analitik interaktif berbasis React, FastAPI, DuckDB, dan TradingView Lightweight Charts untuk eksplorasi emiten BEI secara komprehensif."
stack:
  - "Python"
  - "FastAPI"
  - "React"
  - "TypeScript"
  - "DuckDB"
  - "PyTorch"
  - "TradingView"
repoUrl: "https://github.com/miftahsuryan/stock-idx"
demoUrl: "https://github.com/miftahsuryan/stock-idx"
coverImage: "src/assets/projects/stock-idx/01_fundamental_valuation.png"
coverAlt: "Dashboard Valuasi Fundamental & Screener Ekuitas IDX Quant Studio"
gallery:
  - image: "src/assets/projects/stock-idx/01_fundamental_valuation.png"
    alt: "Dashboard Valuasi Fundamental & Screener Ekuitas IDX Quant Studio"
    caption: "Valuasi Sektoral Damodaran: Screener 970+ emiten BEI dengan model DDM perbankan, DCF manufaktur, dan kalkulasi Margin of Safety (MOS)"
  - image: "src/assets/projects/stock-idx/02_stock_terminal.png"
    alt: "TradingView Candlestick Terminal & Kronos Deep Learning Forecaster"
    caption: "Kronos K-Line AI Forecaster: Prediksi trajektori candlestick 60-bar berbasis Transformer dengan envelope volatilitas ATR-14"
  - image: "src/assets/projects/stock-idx/03_ai_synthesis.png"
    alt: "Autonomous Multi-Agent Executive AI Synthesis Hub"
    caption: "Multi-Agent AI Debate: Simulasi komite investasi (Bull vs. Bear) dengan Typed Fact Layer dan zero-hallucination auditor"
  - image: "src/assets/projects/stock-idx/04_power_map.png"
    alt: "Tycoons & Conglomerate Power Map"
    caption: "Tycoon Power Map: Pemetaan kepemilikan konglomerat, 11.400+ pemegang saham pengendali, dan registri PEP"
  - image: "src/assets/projects/stock-idx/05_portfolio_aga.png"
    alt: "Portfolio Walk-Forward Adaptive Genetic Algorithm Optimizer"
    caption: "Walk-Forward Portfolio AGA: Optimasi alokasi bobot saham multi-fase adaptif dengan kalibrasi risiko non-stasioner EWMA"
  - image: "src/assets/projects/stock-idx/06_governance_gcg.png"
    alt: "Governance Scorecard & Media Sentiment"
    caption: "Tata Kelola GCG & Sentimen Media: Penilaian kepatuhan POJK 33, konsentrasi pemegang saham KSEI, dan skor integritas"
  - image: "src/assets/projects/stock-idx/07_aga_walkforward_backtest.png"
    alt: "Walk-Forward 40:30:30 Out-of-Sample Backtest & Alpha vs. IHSG (AGA)"
    caption: "Walk-Forward 40:30:30 Backtest: Evaluasi out-of-sample 6-window expanding re-optimization dengan seleksi parameter bebas bias dan Alpha +15,68% vs IHSG"
---

## Konteks & Latar Belakang
**IDX Quant Studio** adalah platform riset dan workstation keputusan kuantitatif institusional (*production-grade financial research cockpit*) yang dirancang khusus untuk seluruh ekuitas yang terdaftar di **Bursa Efek Indonesia (BEI / IDX)**. 

Proyek ini dibangun untuk menjembatani jurang pemisah antara **keuangan kuantitatif deterministik**, **model fondasi deep learning (Kronos K-Line Foundation Model - AAAI 2026)**, dan **sintesis multi-agent Generative AI** yang tunduk pada prinsip institusional:
> *"Numbers are code-calculated. Narratives are LLM-assisted. Every output is provenance-tracked."*

## Masalah yang Diselesaikan
1. **Fragmentasi Data Finansial Pasar Modal Indonesia**: Data laporan keuangan, *foreign flow* harian, pergerakan bandarmologi, dan aksi korporasi tersebar dalam format PDF atau portal terpisah, menyulitkan penyaringan multi-faktor komprehensif atas 970+ emiten.
2. **Halusinasi Numerik pada AI Generatif**: Pemanfaatan Large Language Model (LLM) secara mentah dalam analisis keuangan berisiko tinggi memicu halusinasi angka valuasi, rasio margin, atau target harga palsu yang menyesatkan pengambil keputusan.
3. **Overfitting & Bias Data Backtest Finansial**: Backtest konvensional kerap mengalami *look-ahead bias* dan *data snooping bias* karena tidak memisahkan fase tuning parameter dari pengujian *out-of-sample* riil secara independen.

## Pendekatan Teknis & Arsitektur Sistem

Arsitektur IDX Quant Studio terbagi menjadi 6 pilar rekayasa end-to-end:

### 1. Ingestion Data & Master Storage Berkinerja Tinggi
- Pipeline data otomatis mengintegrasikan portal resmi BEI (*idx.co.id*) dan data historis beresolusi tinggi Yahoo Finance dengan penyesuaian otomatis aksi korporasi (*stock-split auto-refresh*).
- Penyimpanan berbasis **DuckDB** dan partisi **Apache Parquet** dengan kompresi Snappy untuk kueri analitik cepat terhadap 145.000+ *candlestick daily bars*.

### 2. Engine Keuangan Kuantitatif Deterministik
- **Valuasi Sektoral Aswath Damodaran**: Memisahkan perlakuan sektor finansial (Gordon Dividend Discount Model & Justified P/B untuk bank besar seperti BBCA, BBRI, BMRI, BBNI) dan non-finansial (Free Cash Flow to Equity / 2-Stage DCF). Mendukung normalisasi mata uang laporan berdenominasi USD (seperti MEDC, BUMI, AADI) via kurs JISDOR.
- **Forensic Accounting Matrix**: *Altman Z-Score* varian *Emerging Market* untuk prediksi kebangkrutan serta *Beneish M-Score* (8 variabel) untuk mendeteksi distorsi manipulasi laba.
- **Tycoon & Ownership Power Map**: Resolusi kepemilikan multi-hop pemegang saham pengendali (*Ultimate Beneficial Ownership*) yang mencakup 11.400+ figur konglomerat Indonesia dan registri *Politically Exposed Persons* (PEP).
- **Foreign Flow & Bandarmologi**: Pelacakan partisipasi harian modal asing (*RNTH 20D* dan akumulasi blok institusional).

### 3. Deep Learning K-Line Transformer (Kronos AAAI 2026)
- Penerapan model fondasi **Kronos** berbasis *Decoder-Only Transformer* untuk peramalan trajektori 60-bar candlestick saham.
- Divalidasi melalui pengujian *out-of-sample walk-forward* 8 kuartal dengan *envelope* volatilitas *ATR-14* untuk manajemen risiko dinamis.

### 4. Multi-Agent AI Investment Committee & Fact Auditor
- Mengorkestrasi simulasi debat otonom dua agen: **Bull Agent** (menganalisis katalis pertumbuhan) vs **Bear Agent** (menguji skenario risiko terburuk).
- Dilindungi oleh **Deterministic Narrative Auditor**: lapis pemeriksa ekspresi reguler (*regex guard*) yang memverifikasi bahwa setiap angka rupiah dan rasio yang dihasilkan agen AI sesuai secara presisi dengan fakta matematis berkode (*Typed Fact Layer*), mengeliminasi halusinasi model.

### 5. Walk-Forward 40:30:30 Out-of-Sample Backtest & Alpha vs. IHSG (AGA)
- **Metodologi 3-Fase Ketat Bebas Bias**: Pembagian data historis menjadi 40% Train (inisialisasi bobot AGA 100 hari), 30% Verifikasi OOS (W1, W2, W3 untuk seleksi parameter grid tanpa menyentuh data test selama 75 hari), dan 30% Test Riil Bebas Bias (W4, W5, W6 evaluasi spliced vs IHSG selama 76 hari bursa).
- **6-Window Expanding Re-Optimization**: Setiap window mengevaluasi data out-of-sample secara adaptif dengan mereoptimasi bobot AGA menggunakan seluruh data historis sebelumnya untuk menangkal sifat non-stasioner pasar keuangan.
- **Seleksi Grid Parameter Objektif**: Parameter grid diversifikasi ($\lambda_{div}$) dan bobot maksimal ($w_{max}$) dipilih murni berdasarkan rerata Validation Sharpe Ratio tertinggi pada 3 window verifikasi out-of-sample tanpa pernah menyentuh data test.
- **Pencapaian Alpha Teruji**: Menghasilkan excess return riil **Alpha +15,68% vs IHSG** pada pengujian test set out-of-sample independen dengan Indeks Degradasi rendah (0,372), membuktikan ketahanan model terhadap dinamika pasar riil.

### 6. Terminal Antarmuka Pengguna Modern
- Dibangun dengan **React 19**, **TypeScript**, **Vite**, dan visualisasi interaktif **TradingView Lightweight Charts™**.
- Mengusung tema identitas visual *Institutional Obsidian & Amber-Gold* dengan *theme switcher* terintegrasi (Obsidian Gold, Emerald Sovereign, Carbon Indigo).

## Hasil & Dampak
- Menghasilkan workstation analitik mandiri kelas institusional yang mampu memproses dan menyaring 973 emiten saham BEI dalam hitungan detik.
- Menghadirkan metodologi evaluasi kuantitatif Walk-Forward 40:30:30 yang membuktikan keunggulan performa nyata (+15,68% Alpha vs IHSG) bebas bias overfitting.
- Menggabungkan model AI mutakhir (Kronos Transformer) dengan audit integritas finansial deterministik nol-halusinasi.
- Repositori kode sumber publik, arsitektur modular, dan dokumentasi komprehensif dirilis di GitHub ([github.com/miftahsuryan/stock-idx](https://github.com/miftahsuryan/stock-idx)).
