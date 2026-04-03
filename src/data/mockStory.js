// ─── Story verileri (kategori bazlı) ──────────────────────────────────────────

export const STORIES = {
  food: [
    { id: 1, kullanici: "McDonald's", emoji: '🍟', bg: '#DA291C', icerik: '🍟', baslik: "McBurger Menü %20 İndirimli!", aciklama: 'Bugün saat 23:59\'a kadar geçerli. Hemen sipariş ver!', renk: '#DA291C' },
    { id: 2, kullanici: 'Burger King', emoji: '👑', bg: '#E31837', icerik: '🍔', baslik: 'Whopper Günü Başladı!', aciklama: 'Büyük Whopper ikinci ürüne özel fiyat.', renk: '#E31837' },
    { id: 3, kullanici: 'Popeyes', emoji: '🍗', bg: '#FF6600', icerik: '🍗', baslik: 'Crispy Tavuk Sepeti Geldi', aciklama: '3 parça tavuk + iki yanda + içecek kombosunda büyük fırsat.', renk: '#FF6600' },
    { id: 4, kullanici: 'Domino\'s', emoji: '🍕', bg: '#006491', icerik: '🍕', baslik: '2 Pizza Al 1 Öde', aciklama: 'Tüm Large pizzalarda geçerli kampanya!', renk: '#006491' },
    { id: 5, kullanici: 'Starbucks', emoji: '☕', bg: '#00704A', icerik: '☕', baslik: 'Happy Hour: 14-17', aciklama: 'Seçili içeceklerde %50 indirim. Mobil uygulama ile kullan.', renk: '#00704A' },
    { id: 6, kullanici: 'Subway', emoji: '🥪', bg: '#009B3A', icerik: '🥪', baslik: 'Günün Menüsü 15 Nisan', aciklama: 'Günün sandviçi + içecek + cips combosunda özel fiyat.', renk: '#009B3A' },
  ],
  services: [
    { id: 1, kullanici: 'Temizlik Pro', emoji: '🧹', bg: '#3b82f6', icerik: '🏠', baslik: 'Ev Temizliği %30 İndirim', aciklama: 'İlk temizliğinizde geçerli. Hemen randevu al!', renk: '#3b82f6' },
    { id: 2, kullanici: 'Usta Kapıda', emoji: '🔧', bg: '#6b7280', icerik: '⚙️', baslik: 'Klima Bakımı Sezonu', aciklama: 'Yaz öncesi klima bakımında öncelikli randevu.', renk: '#374151' },
    { id: 3, kullanici: 'NailArt Studio', emoji: '💅', bg: '#ec4899', icerik: '✨', baslik: 'Yeni Sezon Tasarımları', aciklama: 'Gel&kalıcı oje + nail art kombosunda özel fiyat.', renk: '#ec4899' },
    { id: 4, kullanici: 'FitZone', emoji: '💪', bg: '#f97316', icerik: '🏋️', baslik: 'Yaz Sezonuna Hazır Ol', aciklama: 'Nisan ayı üyeliklerinde 2 ay bedava!', renk: '#f97316' },
    { id: 5, kullanici: 'Güzellik Merkezi', emoji: '💆', bg: '#8b5cf6', icerik: '🌸', baslik: 'Cilt Bakımı Paketi', aciklama: 'Bahar cilt bakım paketi, randevu al!', renk: '#8b5cf6' },
  ],
  alisveris: [
    { id: 1, kullanici: 'Nike', emoji: '✔️', bg: '#111827', icerik: '👟', baslik: 'Air Max Yeni Sezon', aciklama: 'Yeni Air Max koleksiyonu mağazada!', renk: '#111827' },
    { id: 2, kullanici: 'Zara', emoji: '🏷️', bg: '#1a1a1a', icerik: '👗', baslik: 'İlkbahar Koleksiyonu', aciklama: 'Kadın & erkek yeni sezon giyimde seçim şöleni.', renk: '#1c1c1c' },
    { id: 3, kullanici: 'Apple', emoji: '🍎', bg: '#555555', icerik: '📱', baslik: 'iPhone 16 Stokta!', aciklama: 'iPhone 16 serisi mağazada uygun taksitlerle.', renk: '#555555' },
    { id: 4, kullanici: 'Samsung', emoji: '📺', bg: '#1428A0', icerik: '📺', baslik: 'Galaxy S25 Tanıtıldı', aciklama: 'Galaxy S25 ön sipariş kampanyası başladı.', renk: '#1428A0' },
    { id: 5, kullanici: 'IKEA', emoji: '🛋️', bg: '#0058A3', icerik: '🛋️', baslik: 'Ev Dekorasyon Günleri', aciklama: '12 ay 0 faiz taksit imkânıyla ev dekorasyon.', renk: '#0058A3' },
    { id: 6, kullanici: 'Mango', emoji: '🌿', bg: '#2d2d2d', icerik: '👘', baslik: 'Kadın Yeni Sezon', aciklama: 'İlkbahar yaz koleksiyonu raflarda.', renk: '#2d2d2d' },
  ],
  etkinlikler: [
    { id: 1, kullanici: 'Konser Park', emoji: '🎵', bg: '#7c3aed', icerik: '🎤', baslik: 'Nisan Konserleri', aciklama: 'Bu ay 3 büyük konser. Biletler tükenmeden al!', renk: '#7c3aed' },
    { id: 2, kullanici: 'Tiyatro Sahnesi', emoji: '🎭', bg: '#b45309', icerik: '🎭', baslik: 'Yeni Oyun: Hamlet', aciklama: 'Bu cuma galası. Sınırlı bilet!', renk: '#b45309' },
    { id: 3, kullanici: 'Gebze Spor', emoji: '⚽', bg: '#15803d', icerik: '🏟️', baslik: 'Maç Günü Geldi!', aciklama: 'Bu hafta sonu stat dolu olacak. Yerini al.', renk: '#15803d' },
    { id: 4, kullanici: 'Festival', emoji: '🎪', bg: '#be123c', icerik: '🎡', baslik: 'Bahar Festivali 2026', aciklama: '3 gün boyunca müzik, yemek ve eğlence.', renk: '#be123c' },
    { id: 5, kullanici: 'Sergi', emoji: '🖼️', bg: '#0f172a', icerik: '🎨', baslik: 'Fotoğraf Sergisi', aciklama: '\"Şehrin Renkleri\" sergisi bu hafta sonu.', renk: '#0f172a' },
  ],
}

// ─── Marka logoları (kategori bazlı) ──────────────────────────────────────────

export const MARKALAR = {
  food: [
    { isim: "McDonald's", emoji: 'M', bg: '#DA291C', renk: '#FFC72C', logoType: 'text' },
    { isim: 'Burger King', emoji: '👑', bg: '#E31837', renk: '#fff', logoType: 'emoji' },
    { isim: 'Popeyes', emoji: '🍗', bg: '#FF6600', renk: '#fff', logoType: 'emoji' },
    { isim: "Domino's", emoji: '🍕', bg: '#006491', renk: '#fff', logoType: 'emoji' },
    { isim: 'Starbucks', emoji: '☕', bg: '#00704A', renk: '#fff', logoType: 'emoji' },
    { isim: 'Subway', emoji: '🥪', bg: '#009B3A', renk: '#fff', logoType: 'emoji' },
    { isim: 'KFC', emoji: '🍗', bg: '#E4002B', renk: '#fff', logoType: 'text', textEmoji: 'KFC' },
    { isim: 'Pizza Hut', emoji: '🍕', bg: '#E31837', renk: '#fff', logoType: 'emoji' },
  ],
  services: [
    { isim: 'Temizlik Pro', emoji: '🧹', bg: '#3b82f6', renk: '#fff', logoType: 'emoji' },
    { isim: 'Usta Kapıda', emoji: '🔧', bg: '#374151', renk: '#fff', logoType: 'emoji' },
    { isim: 'Nail Studio', emoji: '💅', bg: '#ec4899', renk: '#fff', logoType: 'emoji' },
    { isim: 'FitZone', emoji: '💪', bg: '#f97316', renk: '#fff', logoType: 'emoji' },
    { isim: 'Güzellik', emoji: '💆', bg: '#8b5cf6', renk: '#fff', logoType: 'emoji' },
    { isim: 'Boyacı Usta', emoji: '🖌️', bg: '#0891b2', renk: '#fff', logoType: 'emoji' },
  ],
  alisveris: [
    { isim: 'Nike', emoji: '✔️', bg: '#111827', renk: '#fff', logoType: 'text', textEmoji: 'NIKE' },
    { isim: 'Zara', emoji: '🏷️', bg: '#1c1c1c', renk: '#fff', logoType: 'text', textEmoji: 'ZARA' },
    { isim: 'Apple', emoji: '🍎', bg: '#555', renk: '#fff', logoType: 'emoji' },
    { isim: 'Samsung', emoji: '📺', bg: '#1428A0', renk: '#fff', logoType: 'text', textEmoji: 'SAM' },
    { isim: 'IKEA', emoji: '🛋️', bg: '#0058A3', renk: '#FFDA1A', logoType: 'text', textEmoji: 'IKEA' },
    { isim: 'Mango', emoji: '🌿', bg: '#2d2d2d', renk: '#fff', logoType: 'text', textEmoji: 'MNG' },
    { isim: 'Adidas', emoji: '👟', bg: '#000000', renk: '#fff', logoType: 'text', textEmoji: 'ADI' },
    { isim: 'H&M', emoji: '👗', bg: '#E50010', renk: '#fff', logoType: 'text', textEmoji: 'H&M' },
  ],
  etkinlikler: [
    { isim: 'Konser Park', emoji: '🎵', bg: '#7c3aed', renk: '#fff', logoType: 'emoji' },
    { isim: 'Biletix', emoji: '🎫', bg: '#1e3a5f', renk: '#fff', logoType: 'emoji' },
    { isim: 'Tiyatro', emoji: '🎭', bg: '#b45309', renk: '#fff', logoType: 'emoji' },
    { isim: 'Gebze Spor', emoji: '⚽', bg: '#15803d', renk: '#fff', logoType: 'emoji' },
    { isim: 'Festival', emoji: '🎪', bg: '#be123c', renk: '#fff', logoType: 'emoji' },
    { isim: 'Sinema', emoji: '🎬', bg: '#111827', renk: '#fff', logoType: 'emoji' },
  ],
}
