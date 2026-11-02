---
title: "Optimasi Portofolio Saham IDX30 dengan Algoritma Genetika (AGA)"
order: 1
status: "selesai"
role: "Machine Learning (Proyek Skripsi)"
period: "2025 - 2026"
summary: "Eksplorasi optimasi bobot portofolio saham IDX30 menggunakan Adaptive Genetic Algorithm (AGA) dan validasi Walk-Forward berbasis Python & Streamlit."
problem: "Metode Mean-Variance statis rentan optimum lokal, konsentrasi risiko ekstrem, dan mengabaikan friksi biaya transaksi riil."
approach: "Mesin AGA berpenalti diversifikasi HHI dan batas alokasi tertentu, diuji via 4 fase Walk-Forward dan dideploy ke dashboard Streamlit."
outcome: "Total Return 46,49% (vs IDX30 13,48%), Sharpe Ratio 2,1025, Max Drawdown -15,74%, dan terbukti signifikan secara statistik (p < 0,05)."
stack:
  - "Python"
  - "Adaptive Genetic Algorithm (AGA)"
  - "Quantitative Finance"
  - "Streamlit"
  - "Plotly"
  - "NumPy & Pandas"
  - "SciPy (Statistical Testing)"
  - "yfinance"
repoUrl: "https://github.com/miftahsuryan/idx30-portfolio-optimization-aga"
demoUrl: "https://portfolio-optimization-aga.streamlit.app"
coverImage: "src/assets/projects/AGA/streamlit_dashboard_preview.png"
coverAlt: "Dasbor interaktif optimasi portofolio saham IDX30 berbasis Streamlit dan Plotly"
gallery:
  - image: "src/assets/projects/AGA/streamlit_dashboard_preview.png"
    alt: "Antarmuka web dashboard interaktif Streamlit untuk simulasi alokasi portofolio saham IDX30"
    caption: "Dashboard Interaktif Streamlit: Simulasi optimasi portofolio real-time & visualisasi bobot aset"
  - image: "src/assets/projects/AGA/wfo_cumulative_equity_drawdown.png"
    alt: "Grafik perbandingan kurva pertumbuhan modal (equity curve) dan drawdown out-of-sample strategi AGA terhadap benchmark"
    caption: "Kinerja Out-of-Sample: Return kumulatif 46,49% mengungguli Standard GA, Equal Weight, dan Indeks IDX30"
  - image: "src/assets/projects/AGA/weights_allocation_aga_4phases.png"
    alt: "Diagram alokasi bobot portofolio saham IDX30 sepanjang 4 fase rolling Walk-Forward"
    caption: "Dinamika Alokasi Bobot: Pembatasan konsentrasi aset maksimum 20% melalui mekanisme perbaikan proporsional"
  - image: "src/assets/projects/AGA/convergence_sga_vs_aga.png"
    alt: "Grafik konvergensi nilai fitness fungsi objektif membandingkan Adaptive GA dengan Standard GA"
    caption: "Validasi Algoritma: Operator adaptif (AGA) mempertahankan diversitas gen dan mencegah konvergensi prematur"
---

## Konteks & Latar Belakang
Proyek ini merupakan penelitian tugas akhir (*Skripsi*) S1 Informatika yang berfokus pada ranah **Quantitative Finance** dan **Evolutionary Machine Learning**. Penelitian ini memecahkan tantangan alokasi aset dinamis pada 22 saham konsisten konstituen indeks **IDX30** (saham *blue-chip* terlikuid di Bursa Efek Indonesia) periode 2022–2026.

## Permasalahan Kuantitatif
Metode alokasi aset modern (*Markowitz Mean-Variance*) sering menghadapi kendala praktis di dunia nyata:
1. **Konvergensi Prematur**: Standard Genetic Algorithm (SGA) dengan parameter statis cenderung mengalami stagnasi pada optimum lokal di tahap awal evolusi, atau sebaliknya merusak gen berbobot baik di tahap akhir.
2. **Konsentrasi Risiko Ekstrem**: Fungsi objektif rasio Sharpe tanpa regulasi sering kali menempatkan 100% modal hanya pada 1–2 saham agresif.
3. **Asumsi Pasar Tidak Realistis**: Pengujian *backtesting* konvensional sering mengabaikan pergeseran rezim pasar (*regime shift*), *weight drift*, dan friksi biaya transaksi riil (biaya broker, levy bursa, dan PPh final).

## Inovasi Arsitektur Algoritma (AGA)
Untuk mengatasi kelemahan tersebut, dirancang mesin optimasi kuantitatif *end-to-end* dengan inovasi utama:
- **Operator Genetik Adaptif (Srinivas & Patnaik)**: Probabilitas *crossover* (<em>P<sub>c</sub></em>) dan mutasi (<em>P<sub>m</sub></em>) diskalakan secara otomatis per individu berdasarkan varians nilai fitness populasi (<em>k</em><sub>1</sub> … <em>k</em><sub>6</sub>). Hal ini menjaga diversitas eksplorasi gen pada generasi awal dan mempercepat konvergensi presisi pada generasi akhir.
- **Formulasi Multi-Objektif Teregulasi**: Memaksimalkan Sharpe Ratio terbobot sekaligus menambahkan penalti konsentrasi berbasis *Herfindahl-Hirschman Index* (HHI, <em>λ</em><sub>div</sub> = 0,05) guna menjamin diversifikasi portofolio.
- **Mekanisme Perbaikan Alokasi (*Repair Mechanism*)**: Menerapkan batas keras alokasi per aset tunggal (<em>w<sub>i</sub></em> ≤ 20%) melalui algoritma redistribusi proporsional berbasis kelebihan bobot (*excess redistribution*).

## Metodologi Pengujian: Walk-Forward Optimization (WFO)
Kinerja strategi diuji secara ketat menggunakan simulasi *out-of-sample Walk-Forward Optimization* (WFO) sepanjang 4 temporal *rolling windows*, memperhitungkan biaya transaksi riil (beli 0,15%, jual 0,25%) serta penyesuaian bobot (*rebalancing* berkala).

### Ringkasan Performa Out-of-Sample (vs Benchmark)
| Metrik Finansial | AGA (4x Rebalance) | Standard GA | Equal Weight (1/N) | IDX30 Index | Selisih AGA vs Benchmark |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Total Return (%)** | **46,49%** | 33,90% | 38,51% | 13,48% | **+33,01%** |
| **Annualized Return (%)** | **50,59%** | 36,75% | 41,82% | 14,53% | **+36,06%** |
| **Sharpe Ratio** | **2,1025** | 1,4467 | 1,5961 | 0,3767 | **+1,7258 (+458%)** |
| **Max Drawdown (%)** | **-15,74%** | -17,35% | -18,78% | -17,14% | **+1,40% (Risiko Terkendali)** |
| **Total Biaya Transaksi** | 0,43% | 0,50% | 0,15% | 0,38% | Biaya realistis |

## Validasi Statistik Inferensial
Keunggulan performa fungsi objektif AGA diuji secara ketat melalui **80 eksperimen independen** (10 *runs* × 4 fase × 2 algoritma):
- Uji normalitas **Shapiro-Wilk** membuktikan sebaran data non-normal.
- Uji non-parametrik **Wilcoxon Signed-Rank** dan **Paired t-test** dengan koreksi **Holm-Bonferroni** mengonfirmasi bahwa konvergensi fitness AGA lebih unggul secara signifikan (<em>p</em> &lt; 0,001) dibanding Standard GA pada seluruh 4 fase pengujian.

## Deployment & Web Dashboard Interaktif
Sistem dideploy secara publik sebagai aplikasi web interaktif menggunakan **Streamlit** dan **Plotly**, menyediakan dua kapabilitas utama:
1. **Showcase Visual Hasil Skripsi**: Visualisasi kurva pertumbuhan modal (*equity curve*), perbandingan *drawdown*, dan rincian alokasi bobot per fase WFO.
2. **Simulator Optimasi Real-Time**: Memfasilitasi pengguna untuk menentukan modal investasi, batas bobot aset, dan target diversifikasi untuk menghitung alokasi portofolio saham IDX30 secara langsung.
