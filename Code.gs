/**
 * ==========================================
 * SISTEM LEDGER NILAI OTOMATIS
 * Author: [Nama Anda]
 * ==========================================
 */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🏫 Menu Sekolah')
    .addItem('Buka Sidebar Admin', 'showSidebar')
    .addToUi();
}

function showSidebar() {
  var html = HtmlService.createTemplateFromFile('Sidebar')
      .evaluate()
      .setTitle('Sistem Ledger SMK')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showSidebar(html);
}

// --- FUNGSI CRUD SISWA ---

function tambahSiswa(data) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DATA_SISWA');
    const textFinder = sheet.getRange("A:A").createTextFinder(data.nis).matchEntireCell(true).findNext();
    
    if (textFinder) {
      return { success: false, message: "NIS sudah terdaftar!" };
    }
    
    sheet.appendRow([data.nis, data.nama, data.kelas]);
    refreshLedger(); 
    return { success: true, message: "Siswa berhasil ditambahkan." };
  } catch (e) {
    return { success: false, message: e.toString() };
  }
}

function hapusSiswa(nis) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DATA_SISWA');
    const textFinder = sheet.getRange("A:A").createTextFinder(nis.toString()).matchEntireCell(true).findNext();
    
    if (!textFinder) {
      return { success: false, message: "NIS tidak ditemukan." };
    }
    
    sheet.deleteRow(textFinder.getRow());
    refreshLedger();
    return { success: true, message: "Data siswa berhasil dihapus." };
  } catch (e) {
    return { success: false, message: e.toString() };
  }
}

// --- FUNGSI SINKRONISASI ---

function refreshLedger() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetData = ss.getSheetByName('DATA_SISWA');
  const sheetLedger = ss.getSheetByName('LEDGER');
  
  const lastRow = sheetData.getLastRow();
  if (lastRow < 2) return; 
  
  const nisValues = sheetData.getRange(2, 1, lastRow - 1, 1).getValues();
  
  const ledgerLastRow = sheetLedger.getLastRow();
  if (ledgerLastRow > 1) {
    sheetLedger.getRange(2, 2, ledgerLastRow - 1, 1).clearContent(); 
  }
  
  if (nisValues.length > 0) {
    sheetLedger.getRange(2, 2, nisValues.length, 1).setValues(nisValues);
    const noUrut = nisValues.map((_, i) => [i + 1]);
    sheetLedger.getRange(2, 1, nisValues.length, 1).setValues(noUrut);
  }
}

// --- FUNGSI UTILITAS LAINNYA ---

function simpanKonfigurasi(tahun, semester) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('KONFIGURASI');
  sheet.getRange('B1').setValue(tahun);
  sheet.getRange('B2').setValue(semester);
  return "Konfigurasi disimpan.";
}

function prosesUpload(dataSiswa) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DATA_SISWA');
  
  if (dataSiswa.length > 0) {
    sheet.getRange(sheet.getLastRow() + 1, 1, dataSiswa.length, 3).setValues(dataSiswa);
    refreshLedger();
    return "Impor data berhasil (" + dataSiswa.length + " siswa).";
  }
  return "Tidak ada data yang diimpor.";
}
