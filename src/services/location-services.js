import { getHeaders, URL } from './headers';

const cities =
    [
        {
            "value": 1,
            "label": "ADANA"
        },
        {
            "value": 2,
            "label": "ADIYAMAN"
        },
        {
            "value": 3,
            "label": "AFYONKARAHİSAR"
        },
        {
            "value": 4,
            "label": "AĞRI"
        },
        {
            "value": 68,
            "label": "AKSARAY"
        },
        {
            "value": 5,
            "label": "AMASYA"
        },
        {
            "value": 6,
            "label": "ANKARA"
        },
        {
            "value": 7,
            "label": "ANTALYA"
        },
        {
            "value": 75,
            "label": "ARDAHAN"
        },
        {
            "value": 8,
            "label": "ARTVİN"
        },
        {
            "value": 9,
            "label": "AYDIN"
        },
        {
            "value": 10,
            "label": "BALIKESİR"
        },
        {
            "value": 74,
            "label": "BARTIN"
        },
        {
            "value": 72,
            "label": "BATMAN"
        },
        {
            "value": 69,
            "label": "BAYBURT"
        },
        {
            "value": 11,
            "label": "BİLECİK"
        },
        {
            "value": 12,
            "label": "BİNGÖL"
        },
        {
            "value": 13,
            "label": "BİTLİS"
        },
        {
            "value": 14,
            "label": "BOLU"
        },
        {
            "value": 15,
            "label": "BURDUR"
        },
        {
            "value": 16,
            "label": "BURSA"
        },
        {
            "value": 17,
            "label": "ÇANAKKALE"
        },
        {
            "value": 18,
            "label": "ÇANKIRI"
        },
        {
            "value": 19,
            "label": "ÇORUM"
        },
        {
            "value": 20,
            "label": "DENİZLİ"
        },
        {
            "value": 21,
            "label": "DİYARBAKIR"
        },
        {
            "value": 81,
            "label": "DÜZCE"
        },
        {
            "value": 22,
            "label": "EDİRNE"
        },
        {
            "value": 23,
            "label": "ELAZIĞ"
        },
        {
            "value": 24,
            "label": "ERZİNCAN"
        },
        {
            "value": 25,
            "label": "ERZURUM"
        },
        {
            "value": 26,
            "label": "ESKİŞEHİR"
        },
        {
            "value": 27,
            "label": "GAZİANTEP"
        },
        {
            "value": 28,
            "label": "GİRESUN"
        },
        {
            "value": 29,
            "label": "GÜMÜŞHANE"
        },
        {
            "value": 30,
            "label": "HAKKARİ"
        },
        {
            "value": 31,
            "label": "HATAY"
        },
        {
            "value": 76,
            "label": "IĞDIR"
        },
        {
            "value": 32,
            "label": "ISPARTA"
        },
        {
            "value": 34,
            "label": "İSTANBUL"
        },
        {
            "value": 35,
            "label": "İZMİR"
        },
        {
            "value": 46,
            "label": "KAHRAMANMARAŞ"
        },
        {
            "value": 78,
            "label": "KARABÜK"
        },
        {
            "value": 70,
            "label": "KARAMAN"
        },
        {
            "value": 36,
            "label": "KARS"
        },
        {
            "value": 37,
            "label": "KASTAMONU"
        },
        {
            "value": 38,
            "label": "KAYSERİ"
        },
        {
            "value": 71,
            "label": "KIRIKKALE"
        },
        {
            "value": 39,
            "label": "KIRKLARELİ"
        },
        {
            "value": 40,
            "label": "KIRŞEHİR"
        },
        {
            "value": 79,
            "label": "KİLİS"
        },
        {
            "value": 41,
            "label": "KOCAELİ"
        },
        {
            "value": 42,
            "label": "KONYA"
        },
        {
            "value": 43,
            "label": "KÜTAHYA"
        },
        {
            "value": 44,
            "label": "MALATYA"
        },
        {
            "value": 45,
            "label": "MANİSA"
        },
        {
            "value": 47,
            "label": "MARDİN"
        },
        {
            "value": 33,
            "label": "MERSİN"
        },
        {
            "value": 48,
            "label": "MUĞLA"
        },
        {
            "value": 49,
            "label": "MUŞ"
        },
        {
            "value": 50,
            "label": "NEVŞEHİR"
        },
        {
            "value": 51,
            "label": "NİĞDE"
        },
        {
            "value": 52,
            "label": "ORDU"
        },
        {
            "value": 80,
            "label": "OSMANİYE"
        },
        {
            "value": 53,
            "label": "RİZE"
        },
        {
            "value": 54,
            "label": "SAKARYA"
        },
        {
            "value": 55,
            "label": "SAMSUN"
        },
        {
            "value": 56,
            "label": "SİİRT"
        },
        {
            "value": 57,
            "label": "SİNOP"
        },
        {
            "value": 58,
            "label": "SİVAS"
        },
        {
            "value": 63,
            "label": "ŞANLIURFA"
        },
        {
            "value": 73,
            "label": "ŞIRNAK"
        },
        {
            "value": 59,
            "label": "TEKİRDAĞ"
        },
        {
            "value": 60,
            "label": "TOKAT"
        },
        {
            "value": 61,
            "label": "TRABZON"
        },
        {
            "value": 62,
            "label": "TUNCELİ"
        },
        {
            "value": 64,
            "label": "UŞAK"
        },
        {
            "value": 65,
            "label": "VAN"
        },
        {
            "value": 77,
            "label": "YALOVA"
        },
        {
            "value": 66,
            "label": "YOZGAT"
        },
        {
            "value": 67,
            "label": "ZONGULDAK"
        }
    ]
function getCities() {
    return cities;
}

async function getTowns(city) {
    const url = `${URL}/locations/towns/${city}`;
    const data = getHeaders();
    data.method = 'GET';

    const res = await fetch(url, data);
    const towns = await res.json();


    let townList = [];
    if (towns) {
        for (var i = 0; i < towns.length; i++) {
            var town = towns[i];
            townList.push({ label: town.ilce_adi, value: town.ilce_id });
        }
    }
    return townList;
}

// FIXME.
// save localy used stuff from api.

async function getDistricts(town) {
    const url = `${URL}/locations/districts/${town}`;
    const data = getHeaders();
    data.method = 'GET';


    const res = await fetch(url, data)
    const districts = await res.json();


    let districtList = [];
    if (districts) {
        for (var i = 0; i < districts.length; i++) {
            var district = districts[i];
            districtList.push({ label: district.mahalle_adi, value: district.mahalle_id });
        }
    }
    return districtList;
}

async function getStreets(district) {
    const url = `${URL}/locations/streets/${district}`;
    const data = getHeaders();
    data.method = 'GET';


    const res = await fetch(url, data);
    const streets = await res.json();

    let streetList = [];
    if (streets) {
        for (var i = 0; i < streets.length; i++) {
            var street = streets[i];
            streetList.push({ label: street.sokak_adi, value: street.sokak_id });
        }
    }
    return streetList;
}



module.exports = {
    getCities,
    getTowns,
    getDistricts,
    getStreets
};