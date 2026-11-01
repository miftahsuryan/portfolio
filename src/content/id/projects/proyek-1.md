---
title: "Optimasi Portofolio Saham IDX30 Menggunakan Adaptive Genetic Algorithm (AGA) dan Walk-Forward Validation"
order: 1
status: "selesai"
role: "Lead Researcher & Machine Learning Engineer (Tugas Akhir / Skripsi)"
period: "2024 - 2026"
summary: "Sistem optimasi portofolio kuantitatif berbasis Adaptive Genetic Algorithm (AGA) pada saham IDX30 dengan pengujian Walk-Forward backtesting dan validasi statistik inferensial."
problem: "Optimasi portofolio konvensional (Mean-Variance standar) rawan terjebak pada optimum lokal, mengalami konvergensi prematur pada bobot aset, dan sering gagal mengantisipasi pergeseran rezim pasar (regime shift) serta friksi biaya transaksi riil."
approach: "Merancang algoritma genetika adaptif (AGA) yang menyesuaikan laju crossover dan mutasi secara dinamis berbasis varians fitness populasi, mengintegrasikan penalti diversifikasi HHI dan batas alokasi aset (maks. 20%), menguji performa melalui 4 fase Walk-Forward Optimization (WFO) out-of-sample dengan friksi transaksi riil (beli 0,15%, jual 0,25%), serta mendeploy web dashboard interaktif Streamlit & Plotly."
outcome: "Mencapai Total Return 46,49% (vs benchmark IDX30 13,48%), Sharpe Ratio 2,1025 (vs 0,3767), Max Drawdown terkendali di -15,74%, dan keunggulan fitness konvergen terbukti signifikan secara statistik (p < 0,001) pada 80 eksperimen independen."
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
coverImage: null # Ganti dengan path screenshot jika ditaruh di src/assets/projects/
coverAlt: "Dasbor interaktif optimasi portofolio saham IDX30 berbasis Streamlit dan Plotly"
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
- **Operator Genetik Adaptif (Srinivas & Patnaik)**: Probabilitas *crossover* ($P_c$) dan mutasi ($P_m$) diskalakan secara otomatis per individu berdasarkan varians nilai fitness populasi ($k_1 \dots k_6$). Hal ini menjaga diversitas eksplorasi gen pada generasi awal dan mempercepat konvergensi presisi pada generasi akhir.
- **Formulasi Multi-Objektif Teregulasi**: Memaksimalkan Sharpe Ratio terbobot sekaligus menambahkan penalti konsentrasi berbasis *Herfindahl-Hirschman Index* (HHI, $\lambda_{\text{div}} = 0,05$) guna menjamin diversifikasi portofolio.
- **Mekanisme Perbaikan Alokasi (*Repair Mechanism*)**: Menerapkan batas keras alokasi per aset tunggal ($w_i \le 20\%$) melalui algoritma redistribusi proporsional berbasis kelebihan bobot (*excess redistribution*).

## Metodologi Pengujian: Walk-Forward Optimization (WFO)
Kinerja strategi diuji secara ketat menggunakan simulasi *out-of-sample Walk-Forward Optimization* (WFO) sepanjang 4 temporal *rolling windows*, memperhitungkan biaya transaksi riil (beli 0,15%, jual 0,25%) serta penyesuaian bobot (*rebalancing* berkala).

### Ringkasan Performa Out-of-Sample (vs Benchmark)
| Metrik Finansial | AGA (4x Rebalance) | Standard GA | Equal Weight (1/N) | IDX30 Index | Selisih AGA vs Benchmark |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Total Return (%)** | **46,49%** | 33,90% | 38,51% | 13,48% | **+33,01%** |
| **Annualized Return (%)** | **50,59%** | 36,75% | 41,82% | 14,53% | **+36,06%** |
| **Sharpe Ratio** | **2,1025** | 1,4467 | 1,5961 | 0,3767 | **+1,7258 (+458%)** |
| **Max Drawdown (%)** | **-15,74%** | -17.35% | -18,78% | -17,14% | **+1,40% (Risiko Terkendali)** |
| **Total Biaya Transaksi** | 0,43% | 0,50% | 0,15% | 0,38% | Biaya realistis |

## Validasi Statistik Inferensial
Keunggulan performa fungsi objektif AGA diuji secara ketat melalui **80 eksperimen independen** (10 *runs* $\times$ 4 fase $\times$ 2 algoritma):
- Uji normalitas **Shapiro-Wilk** membuktikan sebaran data non-normal.
- Uji non-parametrik **Wilcoxon Signed-Rank** dan **Paired t-test** dengan koreksi **Holm-Bonferroni** mengonfirmasi bahwa konvergensi fitness AGA lebih unggul secara signifikan ($p < 0,001$) dibanding Standard GA pada seluruh 4 fase pengujian.

## Deployment & Web Dashboard Interaktif
Sistem dideploy secara publik sebagai aplikasi web interaktif menggunakan **Streamlit** dan **Plotly**, menyediakan dua kapabilitas utama:
1. **Showcase Visual Hasil Skripsi**: Visualisasi kurva pertumbuhan modal (*equity curve*), perbandingan *drawdown*, dan rincian alokasi bobot per fase WFO.
2. **Simulator Optimasi Real-Time**: Memfasilitasi pengguna untuk menentukan modal investasi, batas bobot aset, dan target diversifikasi untuk menghitung alokasi portofolio saham IDX30 secara langsung.
