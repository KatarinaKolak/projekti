db.producers.insert([
    {"name":"Nadalina",
    "year":"1990",
    "country":"Split",
    "description":"Nema opisa jos... ",
    "logo":"http://www.nadalina.hr/wp-content/uploads/2016/06/NAD-15-01-Web-Logo.png",
    },
    {"name":"Taman",
    "year":"2015",
    "country":"Zagreb",
    "description":"Za gourmet čokolade i praline koristimo čokolade (bez dodanih biljnih i hidrogeniziranih ulja) koje su pomno odabrane iz asortimana vrhunskih proizvođača, a osim njih, u proizvodnji koristimo i druge, isključivo visokokvalitetne namirnice kao što su: nerafinirani smeđi šećeri iz ekološkog uzgoja, čista prirodna eterična ulja, ekološki uzgojene začini, prehrambene boje dobivene iz prirodnih izvora i sl..",
    "logo":"https://tamanchocolates.com/wp-content/uploads/2021/09/taman-logo.png",
    },
    {"name":"Kras",
    "year":"1991",
    "country":"Zagreb",
    "description":"Uživajući višegodišnje povjerenje zajednice, tradicijom, kvalitetom i znanjem naših radnika stvaramo nezaboravne slatke trenutke zadovoljstva.",
    "logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsg57yQA9fJyriW536KPrLwRACGYzEHZE1xbIHdWD0BiWWwgaqeOYjDHrvacpQfTDCRAQ&usqp=CAU",
    },
    {"name":"Milka",
    "year":"1901",
    "country":"Svicarska",
    "description":"Kakao koji koristimo za proizvodnju naše Milka čokolade od alpskog mlijeka potječe od plodova stabla kakaovca. Stabla kakaovca rastu u području ekvatorijalnog pojasa.",
    "logo":"https://www.milka.hr/o-milki/-/media/Project/Brands/Milka/hr/About-Milka/auw-milka-geschichte/1972.png",
    }
    ])

db.types.insert([
    {
        "name": "organska"
    },
    {
        "name": "obicna"
    },
    {
        "name": "tamna"
    },
    {
        "name": "bijela"
    },
    {
        "name": "mlijecna"
    }
])

db.chocolates.insert([
    {
        "name":"Peru",
        "image":"https://www.biobio.hr/upload/catalog/product/24466/thumb/14539_310x320r.webp",
        "cacao":"72%",
        "type":"",
        "price":"14,90",
        "color":"crna",
        "producer_id": ""
    },
    {
        "name":"Honey",
        "image":"https://www.nadalina.hr/wp-content/uploads/2016/07/CategoryBigBars-267x300.jpg",
        "cacao":"73%",
        "type":"",
        "price":"14,90",
        "color":"crna",
        "producer_id": ""
    },
    {
        "name":"Lavander",
        "image":"https://www.nadalina.hr/wp-content/uploads/Lavender.jpg",
        "cacao":"70%",
        "type":"",
        "price":"14,90",
        "color":"crna",
        "producer_id": ""
    },
    {
        "name":"Carob",
        "image":"https://www.nadalina.hr/wp-content/uploads/Carob.jpg",
        "cacao":"71%",
        "type":"",
        "price":"14,90",
        "color":"crna",
        "producer_id": ""
    },
    {
        "name":"Almond",
        "image":"https://www.nadalina.hr/wp-content/uploads/Almond.jpg",
        "cacao":"75%",
        "type":"",
        "price":"14,90",
        "color":"crna",
        "producer_id": ""
    },
    {
        "name":"Peceni sezam i curry",
        "image":"https://tamanchocolates.com/wp-content/uploads/2021/09/816-mlijecna41-aoc.jpg",
        "cacao":"41%",
        "type":"",
        "price":"38,20",
        "color":"smeda",
        "producer_id": ""
    },
    {
        "name":"Kokos, limun, limunska trava",
        "image":"https://tamanchocolates.com/wp-content/uploads/2021/09/807-mlijecna35-aoc.jpg",
        "cacao":"35%",
        "type":"",
        "price":"34,10",
        "color":"smeda",
        "producer_id": ""
    },
    {
        "name":"Naranca, papar, timijan",
        "image":"https://tamanchocolates.com/wp-content/uploads/2021/09/820-tamna62-aoc.jpg",
        "cacao":"62%",
        "type":"",
        "price":"33,90",
        "color":"crna",
        "producer_id": ""
    },
    {
        "name":"Kava i kardamom",
        "image":"https://tamanchocolates.com/wp-content/uploads/2021/09/821-tamna60-aoc.jpg",
        "cacao":"60%",
        "type":"",
        "price":"34,60",
        "color":"crna",
        "producer_id": ""
    },
    {
        "name":"Maline, kajenski papar",
        "image":"https://tamanchocolates.com/wp-content/uploads/2021/09/824-tamna64.jpg",
        "cacao":"64%",
        "type":"",
        "price":"36,10",
        "color":"crna",
        "producer_id": ""
    },
    {
        "name":"Dorina badem",
        "image":"https://www.kras.hr/datastore/imagestore/800x800/800x800_1630581109Dorina-Badem-tostirani-cijeli.png?v=1630581109",
        "cacao":"50%",
        "type":"",
        "price":"16,90",
        "color":"smeda",
        "producer_id": ""
    },
    {
        "name":"Coksa kakao",
        "image":"https://www.kras.hr/datastore/imagestore/800x800/800x800_1505380872Yoksa-kakao-67g.png?v=1505380873",
        "cacao":"80%",
        "type":"",
        "price":"10,20",
        "color":"smeda",
        "producer_id": ""
    },
    {
        "name":"Naranca",
        "image":"https://www.kras.hr/datastore/imagestore/600x600/600x600_1620379648Kras-Selection-naran%C4%8Da-100g.png?v=1620384323",
        "cacao":"60%",
        "type":"",
        "price":"15,90",
        "color":"crna",
        "producer_id": ""
    },
    {
        "name":"Kakao",
        "image":"https://www.kras.hr/datastore/imagestore/800x800/800x800_1620379645Kras-Selection-60-kakao-100g.png?v=1620379645",
        "cacao":"60%",
        "type":"",
        "price":"15,60",
        "color":"crna",
        "producer_id": ""
    },
    {
        "name":"Kava i kokos",
        "image":"https://www.kras.hr/datastore/imagestore/800x800/800x800_1620379646Kras-Selection-kava-kokos-100g.png?v=1620379647",
        "cacao":"60%",
        "type":"",
        "price":"15,60",
        "color":"crna",
        "producer_id": ""
    },
    {
        "name":"Oreo",
        "image":"https://www.milka.hr/~/media/Project/Brands/Milka/hr/All-Products/milka-oreo-100g/Product-Details/pdp-hd--1.png",
        "cacao":"70%",
        "type":"",
        "price":"15,90",
        "color":"smeda",
        "producer_id": ""
    },
    {
        "name":"Tuc",
        "image":"https://www.milka.hr/~/media/Project/Brands/Milka/hr/All-Products/milka-tuc-87g/Thumbnails/pl-hd.png",
        "cacao":"60%",
        "type":"",
        "price":"15,20",
        "color":"smeda",
        "producer_id": ""
    },
    {
        "name":"Triple",
        "image":"https://www.milka.hr/~/media/Project/Brands/Milka/hr/All-Products/milka-triple-choco-90g/Thumbnails/pl-hd.png",
        "cacao":"70%",
        "type":"",
        "price":"15,90",
        "color":"smeda",
        "producer_id": ""
    },
    {
        "name":"Raspberry",
        "image":"https://www.milka.hr/~/media/Project/Brands/Milka/hr/All-Products/milka-dark-milk-raspberry-85g/Thumbnails/pl-hd.png",
        "cacao":"60%",
        "type":"",
        "price":"15,60",
        "color":"crna",
        "producer_id": ""
    },
    {
        "name":"Almond Caramel",
        "image":"https://www.milka.hr/~/media/Project/Brands/Milka/hr/All-Products/milka-almond-caramel-300g/Thumbnails/pl-hd.png",
        "cacao":"75%",
        "type":"",
        "price":"25,60",
        "color":"smeda",
        "producer_id": ""
    }
])