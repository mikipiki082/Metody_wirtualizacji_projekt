INSERT INTO vehicles
    (type, brand, model, category, year, description, price_per_day, available, image_url, specs, ratings)
VALUES
(
    'car', 'Nissan', 'GT-R R35', 'Tuning', 2022,
    'Legenda JDM po tuningu: obniżone zawieszenie, karbonowy body kit i ponad 700 KM na czterech kołach.',
    1690, TRUE, '/uploads/nissan-gt-r--czarny.webp',
    '[{"label": "Silnik", "value": "3.8 V6 twin-turbo"}, {"label": "Moc", "value": "720 KM"},
      {"label": "0-100 km/h", "value": "2,8 s"}, {"label": "Prędkość maks.", "value": "320 km/h"},
      {"label": "Napęd", "value": "AWD"}, {"label": "Skrzynia biegów", "value": "Automat, 6 biegów"}]',
    '[{"label": "Osiągi", "value": 9.6}, {"label": "Prowadzenie", "value": 9.0},
      {"label": "Komfort", "value": 6.2}, {"label": "Unikatowość", "value": 9.4}]'
),
(
    'car', 'Porsche', '911 GT3 RS', 'Supersamochód', 2024,
    'Wyścigówka z homologacją drogową. Wolnossący bokser, aktywna aerodynamika i ogromny tylny spojler.',
    2490, TRUE, '/uploads/porsche-911-gt3-rs--czarny.webp',
    '[{"label": "Silnik", "value": "4.0 bokser"}, {"label": "Moc", "value": "525 KM"},
      {"label": "0-100 km/h", "value": "3,2 s"}, {"label": "Prędkość maks.", "value": "296 km/h"},
      {"label": "Napęd", "value": "RWD"}, {"label": "Skrzynia biegów", "value": "PDK, 7 biegów"}]',
    '[{"label": "Osiągi", "value": 9.4}, {"label": "Prowadzenie", "value": 9.9},
      {"label": "Komfort", "value": 5.1}, {"label": "Unikatowość", "value": 9.0}]'
),
(
    'car', 'Toyota', 'GR Supra', 'Tuning', 2023,
    'Szerokie nadkola, obniżenie i podniesiona moc. Supra w wersji, która nie przechodzi niezauważona.',
    990, TRUE, '/uploads/toyota-gr-supra--czerwony.webp',
    '[{"label": "Silnik", "value": "3.0 R6 turbo"}, {"label": "Moc", "value": "540 KM"},
      {"label": "0-100 km/h", "value": "3,6 s"}, {"label": "Prędkość maks.", "value": "290 km/h"},
      {"label": "Napęd", "value": "RWD"}, {"label": "Skrzynia biegów", "value": "Automat, 8 biegów"}]',
    '[{"label": "Osiągi", "value": 8.7}, {"label": "Prowadzenie", "value": 8.8},
      {"label": "Komfort", "value": 6.8}, {"label": "Unikatowość", "value": 8.2}]'
),
(
    'car', 'BMW', 'M4 Competition', 'Tuning', 2024,
    'M4 w torowej wersji widebody: karbonowy pakiet aero, wielkie skrzydło, rzędowa szóstka i napęd xDrive.',
    1290, TRUE, '/uploads/bmw-m4-competition--grafitowy.webp',
    '[{"label": "Silnik", "value": "3.0 R6 twin-turbo"}, {"label": "Moc", "value": "530 KM"},
      {"label": "0-100 km/h", "value": "3,5 s"}, {"label": "Prędkość maks.", "value": "290 km/h"},
      {"label": "Napęd", "value": "AWD"}, {"label": "Skrzynia biegów", "value": "Automat, 8 biegów"}]',
    '[{"label": "Osiągi", "value": 8.9}, {"label": "Prowadzenie", "value": 8.6},
      {"label": "Komfort", "value": 7.8}, {"label": "Unikatowość", "value": 6.5}]'
),
(
    'car', 'Audi', 'RS 6 Avant', 'Kombi', 2024,
    'Kombi, które zawstydza supersamochody. Miejsce dla rodziny i 630 KM pod maską.',
    1490, FALSE, '/uploads/audi-rs6-avant--szary.webp',
    '[{"label": "Silnik", "value": "4.0 V8 biturbo"}, {"label": "Moc", "value": "630 KM"},
      {"label": "0-100 km/h", "value": "3,4 s"}, {"label": "Prędkość maks.", "value": "305 km/h"},
      {"label": "Napęd", "value": "AWD"}, {"label": "Skrzynia biegów", "value": "Automat, 8 biegów"}]',
    '[{"label": "Osiągi", "value": 9.1}, {"label": "Prowadzenie", "value": 8.3},
      {"label": "Komfort", "value": 9.0}, {"label": "Unikatowość", "value": 7.4}]'
),
(
    'bike', 'Specialized', 'S-Works Tarmac SL8', 'Rower szosowy', 2024,
    'Wyczynowa szosa z karbonu, na której ścigają się zawodowcy. Lekka, sztywna i bardzo szybka.',
    290, TRUE, '/uploads/specialized-tarmac-sl8--czarny.webp',
    '[{"label": "Rama", "value": "Karbon FACT 12r"}, {"label": "Waga", "value": "6,8 kg"},
      {"label": "Napęd", "value": "SRAM Red AXS, 2x12"}, {"label": "Koła", "value": "28 cali"},
      {"label": "Hamulce", "value": "Tarczowe"}, {"label": "Rozmiary", "value": "52-58"}]',
    '[{"label": "Lekkość", "value": 9.8}, {"label": "Szybkość", "value": 9.6},
      {"label": "Komfort", "value": 7.0}, {"label": "Teren", "value": 2.0}]'
),
(
    'bike', 'Santa Cruz', 'Nomad', 'Rower enduro', 2024,
    'Pełne zawieszenie o dużym skoku na zjazdy w górach. Stabilny i pewny na kamieniach.',
    250, TRUE, '/uploads/santa-cruz-nomad--czarny.webp',
    '[{"label": "Rama", "value": "Karbon CC"}, {"label": "Waga", "value": "15,5 kg"},
      {"label": "Skok", "value": "170 / 170 mm"}, {"label": "Koła", "value": "29 / 27,5 cala"},
      {"label": "Napęd", "value": "SRAM X0, 1x12"}, {"label": "Rozmiary", "value": "S-XXL"}]',
    '[{"label": "Lekkość", "value": 6.4}, {"label": "Szybkość", "value": 7.2},
      {"label": "Komfort", "value": 8.6}, {"label": "Teren", "value": 9.7}]'
),
(
    'bike', 'Specialized', 'Turbo Levo', 'Elektryczny rower górski', 2024,
    'Elektryczny rower górski, z którym podjazdy przestają być problemem. Duży zasięg i mocny silnik.',
    320, FALSE, '/uploads/specialized-turbo-levo--czarny.webp',
    '[{"label": "Silnik", "value": "Specialized 2.2, 90 Nm"}, {"label": "Bateria", "value": "700 Wh"},
      {"label": "Waga", "value": "22,5 kg"}, {"label": "Skok", "value": "160 / 150 mm"},
      {"label": "Koła", "value": "29 / 27,5 cala"}, {"label": "Zasięg", "value": "do 120 km"}]',
    '[{"label": "Lekkość", "value": 3.5}, {"label": "Szybkość", "value": 8.4},
      {"label": "Komfort", "value": 9.1}, {"label": "Teren", "value": 9.2}]'
);

INSERT INTO vehicles
    (type, brand, model, category, year, description, price_per_day, available, image_url, specs, ratings)
VALUES
(
    'car', 'Dodge', 'Challenger SRT Hellcat', 'Muscle car', 2023,
    'Muscle car w wersji widebody: karbonowe poszerzenia, splitter i ponad 800 KM z doładowanego V8. Dźwięk słychać z daleka.',
    1490, TRUE, '/uploads/dodge-challenger--czarny.webp',
    '[{"label": "Silnik", "value": "6.2 V8 kompresor"}, {"label": "Moc", "value": "818 KM"}, {"label": "0-100 km/h", "value": "3,6 s"}, {"label": "Prędkość maks.", "value": "327 km/h"}, {"label": "Napęd", "value": "RWD"}, {"label": "Skrzynia biegów", "value": "Automat, 8 biegów"}]',
    '[{"label": "Osiągi", "value": 9.2}, {"label": "Prowadzenie", "value": 7.0}, {"label": "Komfort", "value": 7.6}, {"label": "Unikatowość", "value": 8.5}]'
),
(
    'car', 'Dodge', 'Charger SRT Hellcat', 'Muscle sedan', 2023,
    'Czterodrzwiowy muscle sedan w wersji widebody. Miejsce dla czterech osób, karbonowe poszerzenia i ponad 700 KM pod maską.',
    1390, TRUE, '/uploads/dodge-charger--czarny.webp',
    '[{"label": "Silnik", "value": "6.2 V8 kompresor"}, {"label": "Moc", "value": "717 KM"}, {"label": "0-100 km/h", "value": "3,7 s"}, {"label": "Prędkość maks.", "value": "315 km/h"}, {"label": "Napęd", "value": "RWD"}, {"label": "Skrzynia biegów", "value": "Automat, 8 biegów"}]',
    '[{"label": "Osiągi", "value": 8.9}, {"label": "Prowadzenie", "value": 7.2}, {"label": "Komfort", "value": 8.4}, {"label": "Unikatowość", "value": 8.0}]'
),
(
    'car', 'Lexus', 'LC 500', 'Grand tourer', 2024,
    'Elegancki grand tourer z wolnossącym V8. Komfort na długą trasę i jeden z najpiękniejszych dźwięków wśród współczesnych aut.',
    1190, TRUE, '/uploads/lexus-lc500--bialy.webp',
    '[{"label": "Silnik", "value": "5.0 V8 wolnossący"}, {"label": "Moc", "value": "477 KM"}, {"label": "0-100 km/h", "value": "4,7 s"}, {"label": "Prędkość maks.", "value": "270 km/h"}, {"label": "Napęd", "value": "RWD"}, {"label": "Skrzynia biegów", "value": "Automat, 10 biegów"}]',
    '[{"label": "Osiągi", "value": 7.8}, {"label": "Prowadzenie", "value": 8.4}, {"label": "Komfort", "value": 9.3}, {"label": "Unikatowość", "value": 8.6}]'
),
(
    'car', 'Nissan', '370Z Nismo', 'Coupé', 2020,
    'Lekkie, tylnonapędowe coupé z manualną skrzynią. Czysta frajda z jazdy bez elektronicznych pośredników.',
    690, TRUE, '/uploads/nissan-370z--bialy.webp',
    '[{"label": "Silnik", "value": "3.7 V6"}, {"label": "Moc", "value": "344 KM"}, {"label": "0-100 km/h", "value": "5,2 s"}, {"label": "Prędkość maks.", "value": "250 km/h"}, {"label": "Napęd", "value": "RWD"}, {"label": "Skrzynia biegów", "value": "Manualna, 6 biegów"}]',
    '[{"label": "Osiągi", "value": 7.1}, {"label": "Prowadzenie", "value": 8.5}, {"label": "Komfort", "value": 6.0}, {"label": "Unikatowość", "value": 6.8}]'
),
(
    'bike', 'Canyon', 'Grizl CF SLX', 'Rower gravelowy', 2024,
    'Gravel na asfalt, szuter i leśne drogi. Szerokie opony i karbonowa rama na całodniowe wyprawy.',
    220, TRUE, '/uploads/canyon-grizl--czarny.webp',
    '[{"label": "Rama", "value": "Karbon CF SLX"}, {"label": "Waga", "value": "8,6 kg"}, {"label": "Napęd", "value": "SRAM Rival XPLR AXS, 1x12"}, {"label": "Koła", "value": "28 cali"}, {"label": "Opony", "value": "50 mm"}, {"label": "Rozmiary", "value": "XS-2XL"}]',
    '[{"label": "Lekkość", "value": 8.6}, {"label": "Szybkość", "value": 8.4}, {"label": "Komfort", "value": 8.0}, {"label": "Teren", "value": 6.5}]'
),
(
    'bike', 'Santa Cruz', 'V10', 'Rower zjazdowy', 2024,
    'Rower zjazdowy z ogromnym skokiem zawieszenia. Stworzony do bike parków i najbardziej stromych tras.',
    300, TRUE, '/uploads/santa-cruz-v10--czarny.webp',
    '[{"label": "Rama", "value": "Karbon CC"}, {"label": "Waga", "value": "16,8 kg"}, {"label": "Skok", "value": "215 / 203 mm"}, {"label": "Koła", "value": "29 / 27,5 cala"}, {"label": "Napęd", "value": "SRAM X0 DH, 1x7"}, {"label": "Rozmiary", "value": "S-XL"}]',
    '[{"label": "Lekkość", "value": 5.0}, {"label": "Szybkość", "value": 8.8}, {"label": "Komfort", "value": 8.8}, {"label": "Teren", "value": 9.9}]'
);

INSERT INTO vehicles
    (type, brand, model, category, year, description, price_per_day, available, image_url, specs, ratings)
VALUES
(
    'car', 'Citroën', 'C5 Exclusive', 'Limuzyna', 2012,
    'Sleeper na hydropneumatyce Hydractive III+: nisko, na ciemnych felgach 20 cali, z karbonowym splitterem, dyfuzorem i poczwórnym wydechem. Diesel V6 po chip tuningu do niemal 290 KM.',
    390, TRUE, '/uploads/citroen-c5--niebieski.webp',
    '[{"label": "Silnik", "value": "3.0 V6 HDi"}, {"label": "Moc", "value": "285 KM"}, {"label": "0-100 km/h", "value": "7,4 s"}, {"label": "Prędkość maks.", "value": "245 km/h"}, {"label": "Napęd", "value": "FWD"}, {"label": "Skrzynia biegów", "value": "Automat, 6 biegów"}]',
    '[{"label": "Osiągi", "value": 6.2}, {"label": "Prowadzenie", "value": 6.6}, {"label": "Komfort", "value": 9.6}, {"label": "Unikatowość", "value": 8.7}]'
),
(
    'car', 'Škoda', 'Octavia RS', 'Liftback', 2016,
    'Octavia RS w czarnym pakiecie: gwinty, czarne felgi 19 cali z czerwonymi zaciskami, karbonowy splitter, progi, dyfuzor i lotka. Pod maską 2.0 TSI po stage 1.',
    490, TRUE, '/uploads/skoda-octavia-rs--bialy.webp',
    '[{"label": "Silnik", "value": "2.0 TSI"}, {"label": "Moc", "value": "300 KM"}, {"label": "0-100 km/h", "value": "5,6 s"}, {"label": "Prędkość maks.", "value": "260 km/h"}, {"label": "Napęd", "value": "FWD"}, {"label": "Skrzynia biegów", "value": "DSG, 6 biegów"}]',
    '[{"label": "Osiągi", "value": 7.0}, {"label": "Prowadzenie", "value": 7.8}, {"label": "Komfort", "value": 8.0}, {"label": "Unikatowość", "value": 5.6}]'
),
(
    'car', 'Chevrolet', 'Camaro ZL1 1LE', 'Muscle car', 2023,
    'Camaro w najostrzejszej fabrycznej odsłonie: pakiet 1LE z karbonowym skrzydłem i splitterem, doładowane V8 po delikatnej mapie na 720 KM.',
    1290, TRUE, '/uploads/chevrolet-camaro--niebieski.webp',
    '[{"label": "Silnik", "value": "6.2 V8 kompresor"}, {"label": "Moc", "value": "720 KM"}, {"label": "0-100 km/h", "value": "3,5 s"}, {"label": "Prędkość maks.", "value": "310 km/h"}, {"label": "Napęd", "value": "RWD"}, {"label": "Skrzynia biegów", "value": "Automat, 10 biegów"}]',
    '[{"label": "Osiągi", "value": 9.1}, {"label": "Prowadzenie", "value": 8.9}, {"label": "Komfort", "value": 6.4}, {"label": "Unikatowość", "value": 7.9}]'
),
(
    'car', 'Ford', 'Mustang Shelby GT500', 'Muscle car', 2022,
    'Najmocniejszy seryjny Mustang po lekkim strojeniu: 5.2 V8 z kompresorem na 800 KM, skrzynia DCT i karbonowe dodatki z umiarem.',
    1590, TRUE, '/uploads/ford-mustang--zielony.webp',
    '[{"label": "Silnik", "value": "5.2 V8 kompresor"}, {"label": "Moc", "value": "800 KM"}, {"label": "0-100 km/h", "value": "3,4 s"}, {"label": "Prędkość maks.", "value": "290 km/h"}, {"label": "Napęd", "value": "RWD"}, {"label": "Skrzynia biegów", "value": "DCT, 7 biegów"}]',
    '[{"label": "Osiągi", "value": 9.4}, {"label": "Prowadzenie", "value": 8.4}, {"label": "Komfort", "value": 6.9}, {"label": "Unikatowość", "value": 8.4}]'
);

INSERT INTO vehicle_colors (vehicle_id, name, hex, image_url, geometry, position) VALUES
    (1, 'Czarny', '#0b0b0c', '/uploads/nissan-gt-r--czarny.webp', '{"w": 1400, "h": 535, "xl": 821, "yl": 533, "xr": 1268, "yr": 484}', 1),
    (1, 'Biały perłowy', '#eceef0', '/uploads/nissan-gt-r--bialy.webp', '{"w": 1400, "h": 535, "xl": 826, "yl": 533, "xr": 1285, "yr": 483}', 2),
    (1, 'Czerwony', '#d10a10', '/uploads/nissan-gt-r--czerwony.webp', '{"w": 1400, "h": 535, "xl": 831, "yl": 533, "xr": 1289, "yr": 484}', 3),
    (2, 'Czarny', '#0b0b0c', '/uploads/porsche-911-gt3-rs--czarny.webp', '{"w": 1346, "h": 531, "xl": 767, "yl": 529, "xr": 1179, "yr": 468}', 1),
    (2, 'Czerwony', '#d10a10', '/uploads/porsche-911-gt3-rs--czerwony.webp', '{"w": 1345, "h": 529, "xl": 768, "yl": 527, "xr": 1178, "yr": 467}', 2),
    (2, 'Biały', '#eceef0', '/uploads/porsche-911-gt3-rs--bialy.webp', '{"w": 1347, "h": 529, "xl": 767, "yl": 527, "xr": 1171, "yr": 465}', 3),
    (3, 'Czerwony', '#d10a10', '/uploads/toyota-gr-supra--czerwony.webp', '{"w": 1324, "h": 516, "xl": 776, "yl": 514, "xr": 1227, "yr": 459}', 1),
    (3, 'Czarny', '#0b0b0c', '/uploads/toyota-gr-supra--czarny.webp', '{"w": 1323, "h": 517, "xl": 776, "yl": 515, "xr": 1236, "yr": 460}', 2),
    (3, 'Biały', '#eceef0', '/uploads/toyota-gr-supra--bialy.webp', '{"w": 1323, "h": 515, "xl": 774, "yl": 513, "xr": 1229, "yr": 457}', 3),
    (4, 'Grafitowy', '#3a3d42', '/uploads/bmw-m4-competition--grafitowy.webp', '{"w": 1400, "h": 525, "xl": 773, "yl": 523, "xr": 1250, "yr": 473}', 1),
    (4, 'Czarny', '#0b0b0c', '/uploads/bmw-m4-competition--czarny.webp', '{"w": 1400, "h": 525, "xl": 767, "yl": 523, "xr": 1251, "yr": 473}', 2),
    (4, 'Biały', '#eceef0', '/uploads/bmw-m4-competition--bialy.webp', '{"w": 1400, "h": 525, "xl": 764, "yl": 523, "xr": 1251, "yr": 473}', 3),
    (5, 'Szary Nardo', '#8a8f94', '/uploads/audi-rs6-avant--szary.webp', '{"w": 1394, "h": 579, "xl": 732, "yl": 577, "xr": 1257, "yr": 526}', 1),
    (5, 'Czarny', '#0b0b0c', '/uploads/audi-rs6-avant--czarny.webp', '{"w": 1394, "h": 579, "xl": 733, "yl": 577, "xr": 1261, "yr": 526}', 2),
    (5, 'Biały', '#eceef0', '/uploads/audi-rs6-avant--bialy.webp', '{"w": 1394, "h": 578, "xl": 728, "yl": 576, "xr": 1256, "yr": 525}', 3),
    (6, 'Czarny', '#0b0b0c', '/uploads/specialized-tarmac-sl8--czarny.webp', '{"w": 858, "h": 711, "xl": 183, "yl": 710, "xr": 709, "yr": 670}', 1),
    (6, 'Biały', '#eceef0', '/uploads/specialized-tarmac-sl8--bialy.webp', '{"w": 859, "h": 712, "xl": 185, "yl": 710, "xr": 709, "yr": 670}', 2),
    (7, 'Czarny', '#0b0b0c', '/uploads/santa-cruz-nomad--czarny.webp', '{"w": 975, "h": 730, "xl": 217, "yl": 728, "xr": 821, "yr": 684}', 1),
    (7, 'Czerwony', '#d10a10', '/uploads/santa-cruz-nomad--czerwony.webp', '{"w": 974, "h": 729, "xl": 217, "yl": 728, "xr": 819, "yr": 684}', 2),
    (8, 'Czarny', '#0b0b0c', '/uploads/specialized-turbo-levo--czarny.webp', '{"w": 999, "h": 732, "xl": 220, "yl": 730, "xr": 841, "yr": 685}', 1),
    (8, 'Stalowy', '#8f979f', '/uploads/specialized-turbo-levo--stalowy.webp', '{"w": 999, "h": 731, "xl": 219, "yl": 730, "xr": 835, "yr": 685}', 2),
    (9, 'Czarny', '#0b0b0c', '/uploads/dodge-challenger--czarny.webp', '{"w": 1400, "h": 497, "xl": 779, "yl": 495, "xr": 1295, "yr": 443}', 1),
    (9, 'Czerwony', '#d10a10', '/uploads/dodge-challenger--czerwony.webp', '{"w": 1400, "h": 496, "xl": 782, "yl": 494, "xr": 1288, "yr": 445}', 2),
    (9, 'Szary', '#4a4e54', '/uploads/dodge-challenger--szary.webp', '{"w": 1400, "h": 496, "xl": 793, "yl": 494, "xr": 1297, "yr": 444}', 3),
    (10, 'Czarny', '#0b0b0c', '/uploads/dodge-charger--czarny.webp', '{"w": 1400, "h": 525, "xl": 767, "yl": 523, "xr": 1294, "yr": 468}', 1),
    (10, 'Biały', '#eceef0', '/uploads/dodge-charger--bialy.webp', '{"w": 1400, "h": 524, "xl": 774, "yl": 522, "xr": 1275, "yr": 468}', 2),
    (10, 'Czerwony', '#d10a10', '/uploads/dodge-charger--czerwony.webp', '{"w": 1400, "h": 525, "xl": 767, "yl": 523, "xr": 1273, "yr": 469}', 3),
    (11, 'Biały perłowy', '#eceef0', '/uploads/lexus-lc500--bialy.webp', '{"w": 1301, "h": 523, "xl": 730, "yl": 521, "xr": 1193, "yr": 460}', 1),
    (11, 'Czerwony', '#d10a10', '/uploads/lexus-lc500--czerwony.webp', '{"w": 1301, "h": 524, "xl": 734, "yl": 522, "xr": 1210, "yr": 461}', 2),
    (11, 'Czarny', '#0b0b0c', '/uploads/lexus-lc500--czarny.webp', '{"w": 1300, "h": 524, "xl": 729, "yl": 522, "xr": 1199, "yr": 461}', 3),
    (12, 'Biały', '#eceef0', '/uploads/nissan-370z--bialy.webp', '{"w": 1268, "h": 519, "xl": 727, "yl": 517, "xr": 1163, "yr": 462}', 1),
    (12, 'Czerwony', '#d10a10', '/uploads/nissan-370z--czerwony.webp', '{"w": 1268, "h": 520, "xl": 716, "yl": 518, "xr": 1164, "yr": 462}', 2),
    (12, 'Czarny', '#0b0b0c', '/uploads/nissan-370z--czarny.webp', '{"w": 1267, "h": 519, "xl": 723, "yl": 518, "xr": 1162, "yr": 461}', 3),
    (13, 'Czarny', '#0b0b0c', '/uploads/canyon-grizl--czarny.webp', '{"w": 986, "h": 768, "xl": 218, "yl": 767, "xr": 822, "yr": 725}', 1),
    (13, 'Stalowy', '#8f979f', '/uploads/canyon-grizl--stalowy.webp', '{"w": 986, "h": 767, "xl": 218, "yl": 765, "xr": 820, "yr": 724}', 2),
    (14, 'Czarny', '#0b0b0c', '/uploads/santa-cruz-v10--czarny.webp', '{"w": 990, "h": 737, "xl": 215, "yl": 736, "xr": 832, "yr": 692}', 1),
    (14, 'Czerwony', '#d10a10', '/uploads/santa-cruz-v10--czerwony.webp', '{"w": 989, "h": 736, "xl": 217, "yl": 734, "xr": 837, "yr": 692}', 2),
    (15, 'Niebieski', '#1e4db5', '/uploads/citroen-c5--niebieski.webp', '{"w": 1400, "h": 474, "xl": 647, "yl": 472, "xr": 1217, "yr": 438}', 1),
    (15, 'Biały perłowy', '#eceef0', '/uploads/citroen-c5--bialy.webp', '{"w": 1400, "h": 473, "xl": 642, "yl": 471, "xr": 1216, "yr": 436}', 2),
    (15, 'Czarny', '#0b0b0c', '/uploads/citroen-c5--czarny.webp', '{"w": 1400, "h": 473, "xl": 646, "yl": 471, "xr": 1233, "yr": 437}', 3),
    (16, 'Biały', '#eceef0', '/uploads/skoda-octavia-rs--bialy.webp', '{"w": 1400, "h": 537, "xl": 702, "yl": 535, "xr": 1240, "yr": 487}', 1),
    (16, 'Srebrny', '#b9bdc2', '/uploads/skoda-octavia-rs--srebrny.webp', '{"w": 1400, "h": 537, "xl": 700, "yl": 535, "xr": 1245, "yr": 486}', 2),
    (16, 'Czarny', '#0b0b0c', '/uploads/skoda-octavia-rs--czarny.webp', '{"w": 1400, "h": 537, "xl": 701, "yl": 535, "xr": 1244, "yr": 486}', 3),
    (17, 'Niebieski', '#1e7ce0', '/uploads/chevrolet-camaro--niebieski.webp', '{"w": 1400, "h": 494, "xl": 702, "yl": 492, "xr": 1235, "yr": 439}', 1),
    (17, 'Stalowy', '#9a9ea3', '/uploads/chevrolet-camaro--szary.webp', '{"w": 1400, "h": 493, "xl": 701, "yl": 491, "xr": 1230, "yr": 439}', 2),
    (17, 'Czarny', '#0b0b0c', '/uploads/chevrolet-camaro--czarny.webp', '{"w": 1400, "h": 494, "xl": 698, "yl": 492, "xr": 1226, "yr": 440}', 3),
    (18, 'Zielony', '#1d3a2a', '/uploads/ford-mustang--zielony.webp', '{"w": 1400, "h": 479, "xl": 603, "yl": 477, "xr": 1211, "yr": 449}', 1),
    (18, 'Biały perłowy', '#eceef0', '/uploads/ford-mustang--bialy.webp', '{"w": 1400, "h": 478, "xl": 603, "yl": 476, "xr": 1213, "yr": 448}', 2),
    (18, 'Czarny', '#0b0b0c', '/uploads/ford-mustang--czarny.webp', '{"w": 1400, "h": 477, "xl": 602, "yl": 475, "xr": 1212, "yr": 448}', 3);
