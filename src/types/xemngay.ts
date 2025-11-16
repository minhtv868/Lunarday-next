export interface Sao {
  saoId: number;
  saoName: string;
  saoDesc: string;
  saoTypeId: number;
  crUserId: number;
}


export interface XemNgayTotXauModel {
  dateView: string;
  truc: string;
  nguHanh: string;
  huongXuatHanh: string;
  tuoiXungKhac: string;
  nhanThan: string;
  thaiThan: string;
  menhNgay: string;
  gioXuatHanhTheoLyThuanPhong: string;
  ngayXuatHanhKhongMinh: string;
  banhToBachKy: string;
  lichPhat: string;
  tietKhi: string;
  srcImage: string;
  ngayHoangDao: number;
  workId: number;
  lunarDate: string;            // DateTime => string
  lunarDateStr: string;
  lunarDay: number;
  lunarMonth: number;
  lunarYear: number;
  lunarLeap: number;
  solarDate: string;            // DateTime => string
  canChiInfo: string[];
  l_GioHoangDao: string[];
  l_GioHacDao: string[];
  l_Sao: Sao[];
  l_SaoTot: Sao[];
  l_SaoXau: Sao[];

  tuples: [string, number[], string[], string, string, string][];
  tupleSolarTimes: [string, string, string][]; // city, sunrise, sunset
}
