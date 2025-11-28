# Sistem Ledger Nilai Siswa (Google Sheets + Apps Script)

Sistem manajemen nilai siswa sederhana berbasis Google Sheets yang terintegrasi dengan Google Apps Script. Dilengkapi dengan sidebar UI modern untuk input data, hapus data, dan impor/ekspor template.

## 🚀 Fitur Utama
- **Sidebar UI Modern:** Tampilan responsif dengan CSS (Gradient & Material Design).
- **CRUD Siswa:** Tambah dan Hapus data siswa via sidebar.
- **Auto Ledger:** Sinkronisasi otomatis antara Data Siswa dan Ledger Nilai.
- **Import/Export:** Support upload file Excel/CSV dan download template.
- **Konfigurasi:** Pengaturan Tahun Ajaran dan Semester.

## 🛠️ Persiapan Google Sheet
Sebelum memasang script, buat Google Sheet baru dan atur struktur sheet sebagai berikut:

1. **Sheet `KONFIGURASI`**
   - A1: `Tahun Pelajaran` | B1: `2025/2026`
   - A2: `Semester` | B2: `Ganjil`
2. **Sheet `DATA_SISWA`**
   - Header (Baris 1): `NIS`, `Nama Lengkap`, `Kelas`
3. **Sheet `LEDGER`**
   - Header (Baris 1): `No`, `NIS`, `Nama`, `Kelas`, `[Mapel 1]`, `[Mapel 2]`, dst...
   - Rumus Sel C2: `=ARRAYFORMULA(IF(B2:B="", "", IFERROR(VLOOKUP(B2:B, DATA_SISWA!A:C, 2, FALSE), "")))`
   - Rumus Sel D2: `=ARRAYFORMULA(IF(B2:B="", "", IFERROR(VLOOKUP(B2:B, DATA_SISWA!A:C, 3, FALSE), "")))`

## 📦 Cara Install Script
1. Buka Google Sheet Anda.
2. Klik menu **Ekstensi** > **Apps Script**.
3. Copy isi file `Code.gs` dari repo ini ke editor `Code.gs`.
4. Buat file HTML baru bernama `Sidebar.html` dan copy isi file `Sidebar.html` dari repo ini.
5. Save dan Reload Google Sheet.
6. Menu **"🏫 Menu Sekolah"** akan muncul.

## 💻 Tech Stack
- Google Apps Script
- HTML5 & CSS3
- SheetJS (untuk parsing Excel)
- Google Material Icons

## 📄 Lisensi
Free to use for educational purpose.
