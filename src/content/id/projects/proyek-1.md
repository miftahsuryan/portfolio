---
title: "Optimasi Portofolio Saham IDX30 dengan Algoritma Genetika (AGA)"
order: 1
status: "selesai"
role: "Machine Learning (Proyek Skripsi)"
period: "2025 - 2026"
summary: "Eksplorasi optimasi bobot portofolio saham IDX30 menggunakan Adaptive Genetic Algorithm (AGA) dan validasi Walk-Forward berbasis Python & Streamlit."
problem: "Metode Mean-Variance statis rentan optimum lokal, konsentrasi risiko ekstrem, dan mengabaikan friksi biaya transaksi riil."
approach: "Mesin AGA berpenalti diversifikasi HHI dan batas alokasi 20%, diuji via 4 fase Walk-Forward dan dideploy ke terminal riset Streamlit bertaraf institusional."
outcome: "Total Return 46,51% (vs IDX30 13,48%), Sharpe Ratio 2,1036 (vs 0,3767), Max Drawdown -15,74%, dan terbukti signifikan secara statistik (p < 0,001)."
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
coverAlt: "Dasbor terminal riset kuantitatif optimasi portofolio saham IDX30 berbasis Streamlit dan Plotly"
gallery:
  - image: "src/assets/projects/AGA/streamlit_dashboard_preview.png"
    alt: "Antarmuka terminal riset kuantitatif dan web dashboard interaktif Streamlit untuk simulasi alokasi portofolio saham IDX30"
    caption: "Terminal Riset & Investasi Kuantitatif Streamlit: Desain institusional FactSet/Bloomberg, simulasi real-time, dan kalkulator alokasi lot saham BEI"
  - image: "src/assets/projects/AGA/wfo_cumulative_equity_drawdown.png"
    alt: "Grafik perbandingan kurva pertumbuhan modal (equity curve) dan drawdown out-of-sample strategi AGA terhadap benchmark"
    caption: "Kinerja Out-of-Sample: Return kumulatif 46,51% mengungguli Standard GA (33,90%), Equal Weight (38,51%), dan Indeks IDX30 (13,48%)"
  - image: "src/assets/projects/AGA/wfo_comparative_metrics_bar.png"
    alt: "Diagram batang komparatif 6 metrik kinerja finansial out-of-sample strategi AGA terhadap seluruh benchmark"
    caption: "Perbandingan Komprehensif 6 Metrik: Outperformance konsisten pada Total Return, Sharpe Ratio, dan perlindungan Max Drawdown"
  - image: "src/assets/projects/AGA/weights_allocation_aga_4phases.png"
    alt: "Diagram alokasi bobot portofolio saham IDX30 sepanjang 4 fase rolling Walk-Forward"
    caption: "Dinamika Alokasi Bobot: Pembatasan konsentrasi aset maksimum 20% melalui mekanisme perbaikan proporsional (repair mechanism)"
  - image: "src/assets/projects/AGA/convergence_sga_vs_aga.png"
    alt: "Grafik konvergensi nilai fitness fungsi objektif membandingkan Adaptive GA dengan Standard GA"
    caption: "Validasi Algoritma: Operator adaptif (AGA) mempertahankan diversitas gen dan mencegah konvergensi prematur ke optimum lokal"
---

## Konteks & Latar Belakang Riset
Proyek ini merupakan penelitian tugas akhir (*Skripsi*) S1 Informatika yang berfokus pada ranah **Quantitative Finance** dan **Evolutionary Machine Learning**. Penelitian ini memecahkan tantangan alokasi aset dinamis pada **22 saham konstituen konsisten indeks IDX30** (saham *blue-chip* terlikuid di Bursa Efek Indonesia) periode 2022–2026.

## Permasalahan Kuantitatif
Model alokasi aset modern (*Markowitz Mean-Variance*) sering menghadapi kendala praktis di dunia nyata:
1. **Konvergensi Prematur**: *Standard Genetic Algorithm* (SGA) dengan parameter statis cenderung mengalami stagnasi pada optimum lokal di tahap awal evolusi, atau sebaliknya merusak gen berbobot baik di tahap akhir eksploitasi.
2. **Konsentrasi Risiko Ekstrem**: Fungsi objektif rasio Sharpe tanpa regulasi sering kali menempatkan 100% modal hanya pada 1–2 saham agresif (*corner solutions*).
3. **Asumsi Pasar Tidak Realistis**: Pengujian *backtesting* konvensional sering mengabaikan pergeseran rezim pasar (*regime shift*), pergeseran bobot harga (*price drift*), dan friksi biaya transaksi riil (biaya broker, levy bursa, dan PPh final transaksi).

## Formulasi Matematis & Inovasi Algoritma (AGA)
Untuk mengatasi kelemahan tersebut, dirancang mesin optimasi kuantitatif *end-to-end* dengan formulasi dan inovasi utama:

### 1. Formulasi Multi-Objektif Teregulasi HHI
Untuk mencegah konsentrasi modal ekstrem dan menjamin diversifikasi portofolio, fungsi objektif dirumuskan dengan menambahkan penalti *Herfindahl-Hirschman Index* (HHI) dan penalti pelanggaran kendala bobot:

> **Fungsi Objektif Multi-Tujuan:**  
> **Minimalkan Fitness F(w) = − [ (wᵀ μ) / √(wᵀ Σ w + ε) ] + λ_div · Σ (w_i)² + γ · Σ max(0, w_i − w_max)²**

**Parameter Formulasi:**
- **μ**: Vektor return ekspektasian harian 22 aset konstituen IDX30.
- **Σ**: Matriks kovariansi return historis aset.
- **λ_div = 0,05**: Parameter penalti konsentrasi HHI yang telah dituning secara empiris.
- **w_max = 0,20**: Batas keras alokasi modal maksimum 20% per aset tunggal.
- **γ = 1000,0**: Pengali penalti keras (*hard penalty multiplier*) untuk pelanggaran batas alokasi.

### 2. Operator Genetik Adaptif (Srinivas & Patnaik)
Probabilitas *crossover* (P_c) dan mutasi (P_m) diskalakan secara otomatis per individu berdasarkan sebaran varians nilai fitness populasi generasi berjalan:

> - **Probabilitas Crossover Adaptif (P_c):**
>   - Jika `f_c ≤ f_avg` → `k1 − [ (k1 − k3)(f_avg − f_c) / (f_avg − f_min) ]`
>   - Jika `f_c > f_avg` → `k2`
>
> - **Probabilitas Mutasi Adaptif (P_m):**
>   - Jika `f_i ≤ f_avg` → `k4 − [ (k4 − k6)(f_avg − f_i) / (f_avg − f_min) ]`
>   - Jika `f_i > f_avg` → `k5`

**Hyperparameter Optimal:**
- `k1 = 0,9`, `k2 = 0,9`, `k3 = 0,1`
- `k4 = 0,9`, `k5 = 0,9`, `k6 = 0,3`
- Ukuran Populasi: `M = 500` individu, Jumlah Generasi: `G = 88`.

Mekanisme ini menjaga diversitas eksplorasi kromosom pada generasi awal dan mempercepat konvergensi presisi pada generasi akhir tanpa terjebak di optimum lokal.

### 3. Mekanisme Perbaikan Bobot (*Repair Mechanism*)
Menerapkan batas alokasi (`w_i ≤ 20%`) dan normalisasi total bobot (`Σ w_i = 1`) melalui algoritma redistribusi proporsional berbasis kelebihan bobot (*excess redistribution*). Kelebihan bobot dari aset yang melebihi batas didistribusikan secara proporsional ke aset lain yang belum mencapai batas, diulang secara iteratif hingga seluruh batasan terpenuhi.

### 4. Engine Konversi Lot Saham Riil BEI
Hasil bobot kontinu dikonversi secara presisi menjadi jumlah **Lot Saham Riil (1 Lot = 100 lembar)** berdasarkan nominal modal investasi (Rupiah) dan harga penutupan pasar:

> **Jumlah Lot_i = ⌊ (w_i × Modal Investasi) / (Harga_i × 100) ⌋**

## Metodologi Pengujian: Walk-Forward Optimization (WFO)
Kinerja strategi dievaluasi secara ketat menggunakan simulasi *out-of-sample Walk-Forward Optimization* (WFO) sepanjang **4 fase temporal bergulir (*rolling forward windows*)** periode 2025–2026. Evaluasi ini memperhitungkan friksi pasar riil:
- **Biaya Akuisisi (Beli)**: Komisi broker 0,15%.
- **Biaya Likuidasi (Jual)**: 0,25% (0,15% broker + 0,10% PPh Final transaksi bursa).
- **Risk-Free Rate**: 6,00% per tahun (mengacu pada benchmark BI-Rate Bank Indonesia).
- **Rebalancing Terjadwal**: Penyesuaian bobot antarfase dengan memperhitungkan pergeseran harga (*price drift*) intra-fase dan reinvestasi modal bersih.

---

## Ringkasan Performa Out-of-Sample (vs Benchmark)

| Peringkat | Strategi Investasi | Total Return (%) | Annualized Return (%) | Annualized Volatility (%) | Sharpe Ratio | Max Drawdown (%) | Biaya Transaksi Bersih (%) | Nilai Akhir Portofolio (Rp 100 Juta) |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 🥇 | **Adaptive Genetic Algorithm (AGA)** | **46,51%** | **50,61%** | **21,21%** | **2,1036** | **-15,74%** | 0,43% | **Rp 146.510.342** |
| 🥈 | **Equal Weight Benchmark (1/N)** | 38,51% | 41,82% | 22,44% | 1,5961 | -18,78% | 0,15% | Rp 138.514.890 |
| 🥉 | **Standard Genetic Algorithm (SGA)** | 33,90% | 36,75% | 21,26% | 1,4467 | -17,35% | 0,50% | Rp 133.896.110 |
| 4 | **IDX30 Market Index Benchmark** | 13,48% | 14,53% | 22,63% | 0,3767 | -17,14% | 0,38% | Rp 113.480.000 |

> **Temuan Kunci:** Strategi AGA menghasilkan **Total Return +33,03% lebih tinggi** dan **Sharpe Ratio +458% lebih tinggi** dibanding indeks pasar resmi IDX30, sekaligus menekan risiko Maximum Drawdown ke level **-15,74%** (terendah dan paling terkendali di antara seluruh strategi benchmark).

---

## Validasi Uji Hipotesis Statistik Inferensial
Untuk membuktikan bahwa keunggulan performa AGA bukan kebetulan stokastik, dilakukan pengujian inferensial ketat pada **80 eksperimen independen** (10 *runs* × 4 fase WFO × 2 algoritma):

1. **Uji Normalitas Shapiro-Wilk**: Mengevaluasi distribusi selisih metrik (Δ = Metrik_AGA − Metrik_SGA).
2. **Uji Hipotesis Terarah**: Jika Δ berdistribusi normal, diterapkan **Paired Student's t-test** dua arah; jika non-normal, diterapkan **Wilcoxon Signed-Rank test** non-parametrik dengan koreksi **Holm-Bonferroni**.

| Fase WFO | Metrik yang Diuji | Rerata SGA ± SD | Rerata AGA ± SD | Uji Normalitas | p-value Normalitas | Uji Hipotesis | Nilai Statistik | p-value | Kesimpulan (α = 0,05) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Fase 1** | Fitness Objektif | 0,0168 ± 0,0033 | **0,0111 ± 0,0009** | Shapiro-Wilk | 0,7066 | Paired t-test | t = -6,282 | **p = 0,00014** | Signifikan Statistik |
| **Fase 2** | Fitness Objektif | 0,0283 ± 0,0017 | **0,0222 ± 0,0006** | Shapiro-Wilk | 0,5009 | Paired t-test | t = -9,456 | **p < 0,00001** | Signifikan Statistik |
| **Fase 3** | Fitness Objektif | 0,0049 ± 0,0025 | **-0,0008 ± 0,0011** | Shapiro-Wilk | 0,5127 | Paired t-test | t = -8,005 | **p < 0,00001** | Signifikan Statistik |
| **Fase 4** | Fitness Objektif | -0,0020 ± 0,0016 | **-0,0072 ± 0,0009** | Shapiro-Wilk | 0,3674 | Paired t-test | t = -8,772 | **p < 0,00001** | Signifikan Statistik |
| **Fase 1** | Sharpe Ratio | 0,0410 ± 0,0046 | **0,0469 ± 0,0027** | Shapiro-Wilk | 0,4636 | Paired t-test | t = 3,114 | **p = 0,0124** | Signifikan Statistik |
| **Fase 2** | Sharpe Ratio | 0,0258 ± 0,0067 | **0,0336 ± 0,0021** | Shapiro-Wilk | 0,0386 | Wilcoxon | W = 0,000 | **p = 0,00195** | Signifikan Statistik |

> Pada seluruh 4 fase temporal, AGA membuktikan **peningkatan fitness fungsi objektif yang signifikan secara statistik (p < 0,001)** dengan standar deviasi yang jauh lebih konsisten, membuktikan bahwa kontrol parameter adaptif meningkatkan stabilitas konvergensi secara nyata.

---

## Arsitektur Institutional Terminal Riset (Streamlit App)
Aplikasi dideploy secara publik sebagai **Quantitative Research & Investment Terminal** bertaraf institusional di **Streamlit Community Cloud** ([portfolio-optimization-aga.streamlit.app](https://portfolio-optimization-aga.streamlit.app)):

### 1. Desain Antarmuka Institusional (FactSet / Bloomberg Aesthetic)
- **Tipografi Finansial Modern**: Menggunakan kombinasi font *Inter* dan *JetBrains Mono* dengan skema warna monokromatik bersih dan bebas dari visual yang tidak perlu.
- **Specification Badges Institusional**:
  - `UNIVERSE: 22 IDX30 EQUITIES` — Konstituen saham blue-chip terlikuid dengan riwayat 3 tahun penuh.
  - `MODEL: MEAN-VARIANCE + HHI PENALTY` — Maksimasi Sharpe Ratio terbobot penalti diversifikasi HHI.
  - `OPERATOR CONTROL: DYNAMIC (SRINIVAS & PATNAIK)` — Kontrol probabilitas crossover ($P_c$) dan mutasi ($P_m$) adaptif.
  - `VALIDATION: 4-PHASE WALK-FORWARD (2025-2026)` — Pengujian out-of-sample expanding window realistis.
  - `BENCHMARK: IDX30 & 1/N EQUAL WEIGHT` — Tolok ukur kinerja terhadap pasar dan strategi pasif.

### 2. Panel Kontrol Lingkungan Eksekusi & Friksi Pasar (Sidebar)
- **Portfolio Sizing Dinamis**: Pengguna dapat memasukkan modal investasi awal (dalam IDR, default Rp 100.000.000). Sistem secara dinamis menghitung alokasi nominal uang dan kebutuhan lot trading riil.
- **Transparansi Friksi Pasar Nyata**:
  - *Biaya Akuisisi (Beli)*: Komisi broker 0,15%.
  - *Biaya Likuidasi (Jual)*: 0,25% (0,15% broker + 0,10% PPh Final transaksi bursa).
  - *Risk-Free Rate*: 6,00% per tahun (mengacu pada benchmark BI-Rate Bank Indonesia).
  - *Jadwal Rebalancing*: Kuartalan (*quarterly expanding window*) dengan continuous intra-phase asset price drift dan reinvestasi modal bersih.

### 3. Tiga Tab Riset Interaktif Terdedikasi
- **Tab 1 — Walk-Forward Performance (OOS)**:
  - *High-Precision KPI Scorecards*: Total Out-of-Sample Return (**46,51%**), Annualized Sharpe Ratio (**2,1036**), Annualized Return (**50,61%**), Maximum Drawdown (**-15,74%**), dan Terminal Portfolio Value (**Rp 146.510.342** dari modal Rp 100 Juta).
  - *Kurva Harian Dual-Axis Plotly*: Trajektori pertumbuhan modal nominal (IDR) dan kurva drawdown (%) dengan garis demarkasi vertikal fase rebalancing (`Rebalance: Phase 2`, `Rebalance: Phase 3`, `Rebalance: Phase 4`).
  - *Actionable IDX Lot Allocation Engine*: Mengonversi bobot kontinu $\mathbf{w}$ menjadi rekomendasi lot saham bulat riil sesuai aturan BEI (**1 Lot = 100 lembar**) dan estimasi modal terpakai:
    `Jumlah Lot_i = ⌊ (w_i × Modal Investasi) / (Harga_i × 100) ⌋`
  - *Matriks Uji Hipotesis Statistik*: Tabulasi hasil uji Shapiro-Wilk, t-test, dan Wilcoxon per fase.
- **Tab 2 — Algorithm Optimization Simulation (Live AGA vs SGA)**:
  - *Custom Universe Selector*: Memilih sub-keranjang saham khusus dari 22 konstituen IDX30.
  - *Hyperparameter & Constraint Sliders*: Kontrol real-time untuk batas alokasi maksimum (`w_max`), bobot penalti HHI (`λ_div`), ukuran populasi (`M`), dan jumlah generasi (`G`).
  - *Live Evolutionary Execution*: Menjalankan algoritma AGA dan Standard GA secara simultan dengan grafik Plotly komparasi kecepatan konvergensi fitness, diversitas populasi, dan trajektori adaptasi rate P_c & P_m.
- **Tab 3 — Asset Universe & Risk Diagnostics**:
  - *Risk-Return Efficient Frontier*: Diagram sebaran 22 aset konstituen IDX30 (Volatilitas Tahunan vs Return Tahunan) dengan visualisasi gradien warna Sharpe Ratio per saham.
  - *Heatmap Korelasi 22×22*: Matriks korelasi return harian antarsaham untuk memetakan diversifikasi pasangan aset non-korelatif.
  - *Trajektori Harga Ternormalisasi*: Visualisasi tren harga saham historis dengan basis awal 100 (*Base = 100*).

---

## Struktur Paket Kode Modular

```text
.
├── app.py                          # Terminal Riset Web Interaktif Streamlit (Dual-Mode)
├── data/
│   └── raw/                        # Data historis konstituen & harga saham BEI (2022-2026)
├── notebooks/
│   ├── 01_data_scraping.ipynb      # Pipeline otomatisasi scraping Yahoo Finance
│   └── 02_idx30_portfolio_aga.ipynb# Eksperimen skripsi lengkap & analisis inferensial
├── results/
│   ├── figures/                    # 19 grafik resolusi tinggi visualisasi skripsi (.png)
│   └── tables/                     # Ringkasan data performa kuantitatif (.csv)
└── src/                            # Package Python modular berstandar industri
    ├── backtest.py                 # Multi-phase WFO backtest engine dengan friksi trading
    ├── config.py                   # Parameter konstanta, hyperparameter, dan split waktu
    ├── data_loader.py              # Preprocessing data pasar, filter likuiditas & return
    ├── objectives.py               # Fungsi objektif Mean-Variance berpenalti HHI & repair
    ├── optimizers.py               # Implementasi algoritma SGA dan Adaptive GA (AGA)
    ├── statistics.py               # Modul uji statistik inferensial (t-test, Wilcoxon, Holm)
    └── visualization.py            # Modul plotting kurva publikasi riset
```

---

## Akses Tautan Resmi Proyek
- **Repositori Kode Sumber**: [github.com/miftahsuryan/idx30-portfolio-optimization-aga](https://github.com/miftahsuryan/idx30-portfolio-optimization-aga)
- **Live Interactive Dashboard**: [portfolio-optimization-aga.streamlit.app](https://portfolio-optimization-aga.streamlit.app)
- **Lisensi**: MIT Open-Source License
