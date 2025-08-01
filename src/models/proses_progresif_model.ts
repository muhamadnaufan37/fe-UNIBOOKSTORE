export interface ProsesProgresifModel {
  code: string
  success: boolean
  data: DataProsesProgresifModel[]
  message: string
  param: ParamProsesProgresifModel
}

export interface DataProsesProgresifModel {
  objek_pajak_id_objek_pajak: string
  objek_pajak_no_polisi1: string
  objek_pajak_no_polisi2: string
  objek_pajak_no_polisi3: string
  objek_pajak_kd_plat: string
  objek_pajak_warna_tnkb: string
  objek_pajak_nm_pemilik_skkp: string
  objek_pajak_al_pemilik_skkp: string
  objek_pajak_no_rangka: string
  objek_pajak_no_mesin: string
  objek_pajak_no_bpkb: string
  objek_pajak_kd_wil: string
  objek_pajak_kd_merek_kb: string
  objek_pajak_nm_merek_kb: string
  objek_pajak_nm_model_kb: string
  objek_pajak_th_buatan: number
  objek_pajak_th_rakitan: number
  objek_pajak_kd_jenis_kb: string
  objek_pajak_warna_kb: string
  objek_pajak_tg_akhir_pajak: string
  objek_pajak_tg_akhir_stnk: string
  objek_pajak_tg_kepemilikan: string
  objek_pajak_tg_faktur: any
  objek_pajak_tg_kwitansi?: string
  objek_pajak_tg_fiskal: any
  objek_pajak_tg_uben: any
  objek_pajak_tg_gntmesin: any
  objek_pajak_kd_bbm: string
  objek_pajak_isi_silinder: string
  objek_pajak_no_identitas: string
  objek_pajak_jenis_identitas: string
  objek_pajak_kd_fungsi: string
  objek_pajak_milik_ke: number
  objek_pajak_kd_kecamatan_skkp: string
  objek_pajak_kd_pos_skkp: string
  objek_pajak_kd_kabkota_skkp: string
  objek_pajak_tg_swdkllj: any
  objek_pajak_kd_trf_swdkllj?: string
  objek_pajak_no_stnkb: string
  objek_pajak_glr_dpn_skkp: any
  objek_pajak_glr_blk_skkp: any
  objek_pajak_kd_proteksi: any
  objek_pajak_kd_blokir: any
  objek_pajak_id_proteksi: any
  objek_pajak_id_blokir: any
  merekkb_kd_merek_kb: string
  merekkb_nm_merek_kb: string
  merekkb_nm_model_kb: string
  merekkb_keterangan: any
  wiluppd_induk_kd_wil: string
  wiluppd_induk_nm_wil: string
  wiluppd_induk_default_kd_kab_kota: string
  wiluppd_induk_default_no_rek: string
  wiluppd_induk_nm_kab_kota: string
  wiluppd_induk_is_single_kab_kota: string
  kab_kota_id_kab_kota: string
  kab_kota_kd_kab_kota: string
  kab_kota_nm_kab_kota: string
  kab_kota_created_at: string
  kab_kota_updated_at: any
  kab_kota_rkud: string
  req_proteksi_id_req_proteksi: any
  req_proteksi_type: any
  req_proteksi_no_polisi1: any
  req_proteksi_no_polisi2: any
  req_proteksi_no_polisi3: any
  req_proteksi_kd_plat: any
  req_proteksi_kd_wil_objek_pajak: any
  req_proteksi_id_wiluppd_proses: any
  req_proteksi_tg_proses: any
  req_proteksi_tg_invalid: any
  req_proteksi_id_user_req: any
  req_proteksi_ket1_req: any
  req_proteksi_ket2_req: any
  req_proteksi_ket3_req: any
  req_proteksi_tg_verif: any
  req_proteksi_id_user_verif: any
  req_proteksi_ket1_verif: any
  req_proteksi_ket2_verif: any
  req_proteksi_ket3_verif: any
  req_proteksi_verif_status: any
  req_proteksi_no_rangka: any
  req_proteksi_kd_proteksi: any
  progress_proteksi: boolean
  progress_proteksi_type: any
  keterangan:string
}

export interface ParamProsesProgresifModel {
  method: string
  value: Value
  show_progress_proteksi: string
  show_progress_pembayaran: string
  show_enable_bayar: string
}

interface Value {
  no_identitas: string
  jenis_identitas: string
}
