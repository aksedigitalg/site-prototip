export const MOCK_PLACES = {
  pharmacy: [
    { id: 1, name: 'Güneş Eczanesi',     address: 'Bağcılar Cad. No:12',   distance: '120 m',  phone: '0212 111 22 33' },
    { id: 2, name: 'Yıldız Eczanesi',    address: 'Atatürk Sok. No:5',     distance: '340 m',  phone: '0212 222 33 44' },
    { id: 3, name: 'Çelik Eczanesi',     address: 'İnönü Cad. No:88',      distance: '510 m',  phone: '0212 333 44 55' },
    { id: 4, name: 'Hayat Eczanesi',     address: 'Cumhuriyet Mah. No:3',  distance: '780 m',  phone: '0212 444 55 66' },
    { id: 5, name: 'Sağlık Eczanesi',    address: 'Fatih Sok. No:21',      distance: '1.1 km', phone: '0212 555 66 77' },
    { id: 6, name: 'Merkez Eczanesi',    address: 'Mimar Sinan Cad. No:7', distance: '1.4 km', phone: '0212 666 77 88' },
  ],

  atm: [
    { id: 1, name: 'Ziraat Bankası ATM', address: 'Bağcılar Cad. No:44',   distance: '90 m',   bank: 'Ziraat Bankası' },
    { id: 2, name: 'İş Bankası ATM',     address: 'Atatürk Sok. No:12',    distance: '210 m',  bank: 'İş Bankası' },
    { id: 3, name: 'Garanti BBVA ATM',   address: 'İnönü Cad. No:3',       distance: '450 m',  bank: 'Garanti BBVA' },
    { id: 4, name: 'Yapı Kredi ATM',     address: 'Cumhuriyet Mah. No:9',  distance: '620 m',  bank: 'Yapı Kredi' },
    { id: 5, name: 'Halkbank ATM',       address: 'Fatih Sok. No:34',      distance: '880 m',  bank: 'Halkbank' },
    { id: 6, name: 'Vakıfbank ATM',      address: 'Mimar Sinan Cad. No:2', distance: '1.2 km', bank: 'Vakıfbank' },
    { id: 7, name: 'QNB Finansbank ATM', address: 'Barbaros Blv. No:17',   distance: '1.5 km', bank: 'QNB Finansbank' },
    { id: 8, name: 'Denizbank ATM',      address: 'Süleyman Demirel Cad.', distance: '1.8 km', bank: 'Denizbank' },
  ],

  fuel: [
    { id: 1, name: 'Shell',   address: 'Bağcılar Cad. No:101',  distance: '200 m',  brand: 'Shell' },
    { id: 2, name: 'BP',      address: 'Atatürk Blv. No:55',    distance: '480 m',  brand: 'BP' },
    { id: 3, name: 'Opet',    address: 'İnönü Cad. No:200',     distance: '730 m',  brand: 'Opet' },
    { id: 4, name: 'Total',   address: 'Cumhuriyet Mah. No:14', distance: '1.0 km', brand: 'Total' },
    { id: 5, name: 'Petrol Ofisi', address: 'Fatih Sok. No:70', distance: '1.3 km', brand: 'Petrol Ofisi' },
  ],

  hospital: [
    { id: 1, name: 'Devlet Hastanesi',        address: 'Bağcılar Cad. No:1',   distance: '650 m'  },
    { id: 2, name: 'Özel Medipol Hastanesi',  address: 'Atatürk Blv. No:120',  distance: '1.1 km' },
    { id: 3, name: 'Acıbadem Hastanesi',       address: 'İnönü Cad. No:300',    distance: '2.2 km' },
  ],

  supermarket: [
    { id: 1, name: 'Migros',   address: 'Bağcılar Cad. No:30',  distance: '150 m'  },
    { id: 2, name: 'BİM',      address: 'Atatürk Sok. No:8',    distance: '280 m'  },
    { id: 3, name: 'A101',     address: 'İnönü Cad. No:45',     distance: '420 m'  },
    { id: 4, name: 'Carrefour',address: 'AVM Girişi No:1',      distance: '900 m'  },
  ],

  charging: [
    { id: 1, name: 'Eşarj İstasyonu',     address: 'Bağcılar Cad. No:15',   distance: '300 m'  },
    { id: 2, name: 'ZES Şarj Noktası',    address: 'AVM Otoparkı Kat:-1',   distance: '550 m'  },
    { id: 3, name: 'Beefull İstasyon',    address: 'Atatürk Blv. No:78',    distance: '900 m'  },
    { id: 4, name: 'Trugo Şarj',          address: 'İnönü Cad. No:120',     distance: '1.2 km' },
    { id: 5, name: 'Tesla Supercharger',  address: 'Cumhuriyet Mah. No:5',  distance: '1.8 km' },
  ],

  parking: [
    { id: 1, name: 'İSPARK Otopark',   address: 'Bağcılar Cad. altı',    distance: '80 m'   },
    { id: 2, name: 'AVM Otoparkı',     address: 'Alışveriş Merkezi',     distance: '350 m'  },
    { id: 3, name: 'Belediye Otoparkı',address: 'Cumhuriyet Meydanı',    distance: '600 m'  },
  ],
}

export const PLACE_LABELS = {
  pharmacy:    'Nöbetçi Eczane',
  atm:         'En Yakın ATM',
  fuel:        'Benzinlik',
  hospital:    'Hastane',
  supermarket: 'Market',
  parking:     'Otopark',
  charging:    'Şarj İstasyonu',
}
