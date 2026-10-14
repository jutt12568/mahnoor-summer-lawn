import { Product } from '../types';

export const PAKISTANI_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Mardan',
  'Wah Cantt',
  'Sheikhupura',
  'Mirpur (AJK)',
  'Muzaffarabad'
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    sku: 'MN-L26-01',
    name: 'Nur Jahan · Luxury Schiffli Lawn',
    collection: 'Summer Festive ’26',
    category: 'festive',
    categoryLabel: 'Luxury Schiffli',
    pricePKR: 11450,
    originalPricePKR: 13500,
    image: '/src/assets/images/lawn_schiffli_ivory_1791388312679.jpg',
    description: 'An ethereal pearl-ivory ensemble showcasing intricate Schiffli eyelet work with floral borer embroidery. Paired with a delicate scalloped organza dupatta with tilla thread accents and dyed cambric trousers.',
    fabric: {
      shirt: '3.0m Embroidered Schiffli Lawn (80/80 Combed Cotton)',
      dupatta: '2.5m Embroidered Organza Border with Zari Sheen',
      trouser: '2.25m Solid Dyed Luxury Cambric',
      technique: 'Schiffli Borer Embroidery & Resham Floral Threadwork',
      lawnCount: 'Super-Fine 80s Pima Combed Lawn'
    },
    colorName: 'Pearl Ivory',
    colorHex: '#F6F4EE',
    stitchOptions: ['Unstitched', 'Stitched'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    isBestseller: true,
    tag: 'Festive Edition',
    stockCount: 14
  },
  {
    id: 'prod-02',
    sku: 'MN-L26-02',
    name: 'Gul-e-Rana · Pastel Floral 3-Piece',
    collection: 'Gardenia Lawn Edit',
    category: 'unstitched',
    categoryLabel: 'Unstitched 3-Piece',
    pricePKR: 6850,
    originalPricePKR: 7950,
    image: '/src/assets/images/lawn_pastel_floral_peach_1791388323427.jpg',
    description: 'Bask in summer warmth with this soft peach and coral digital printed 3-piece suit. Features an intricately embroidered neckline patch on silk organza and an airy pure voile dupatta designed for Karachi and Lahore peak summer heat.',
    fabric: {
      shirt: '3.0m Digital Printed Fine Lawn with Embroidered Neck Patch',
      dupatta: '2.5m Lightweight Pure Swiss Voile Printed Dupatta',
      trouser: '2.25m Dyed Breathable Cotton Trouser',
      technique: 'High-Definition Digital Reactive Print & Organza Motifs',
      lawnCount: 'Premium 68/68 Air-Permeable Summer Lawn'
    },
    colorName: 'Blush Coral',
    colorHex: '#F4CEBC',
    stitchOptions: ['Unstitched', 'Stitched'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    tag: 'Bestseller',
    stockCount: 22
  },
  {
    id: 'prod-03',
    sku: 'MN-L26-03',
    name: 'Darya · Ready-To-Wear Summer Kurti',
    collection: 'Pret Casuals',
    category: 'pret',
    categoryLabel: 'Ready-To-Wear Pret',
    pricePKR: 5450,
    image: '/src/assets/images/lawn_azure_blue_pret_1791388333889.jpg',
    description: 'A crisp modern silhouette crafted in cooling powder blue fine lawn. Detailed with geometric ivory threadwork along the neckline, tailored cuffs, and slit hems. Ideal for university, office, or summer brunch.',
    fabric: {
      shirt: 'Stitched Relaxed-Fit Pure Cotton Lawn Kurti (42" Length)',
      dupatta: 'Matching Cotton Chiffon Wrap with Lace Borders',
      trouser: 'Dyed Cigarette Pant with Pin-Tuck Details',
      technique: 'Machine-Loomed Resham Threadwork & Lace Inserts',
      lawnCount: '100% Breathable Combed Lawn'
    },
    colorName: 'Azure Breeze',
    colorHex: '#A8C5DA',
    stitchOptions: ['Stitched'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: false,
    isBestseller: true,
    tag: 'Ready to Ship',
    stockCount: 9
  },
  {
    id: 'prod-04',
    sku: 'MN-L26-04',
    name: 'Mehtab · Sage Garden Festive 3-Piece',
    collection: 'Summer Festive ’26',
    category: 'festive',
    categoryLabel: 'Luxury Schiffli',
    pricePKR: 12950,
    originalPricePKR: 14500,
    image: '/src/assets/images/hero_summer_lawn_campaign_1791388299196.jpg',
    description: 'Our campaign signature: a regal sage-green lawn ensemble featuring heavy dori and sequence work across the front jaal. Includes a digitally printed silk dupatta and an embroidered trouser border.',
    fabric: {
      shirt: '3.0m Embroidered Lawn Front, Back & Sleeves with Organza Daman',
      dupatta: '2.5m Medium Silk Foil-Printed Dupatta',
      trouser: '2.5m Dyed Cambric with Embroidered Organza Patti',
      technique: 'Intricate Resham, Tilla & Cutwork Schiffli',
      lawnCount: 'Superfine 80s Luxury Compact Lawn'
    },
    colorName: 'Sage Flora',
    colorHex: '#B2C2B2',
    stitchOptions: ['Unstitched', 'Stitched'],
    availableSizes: ['XS', 'S', 'M', 'L'],
    isNew: true,
    tag: 'Campaign Signature',
    stockCount: 7
  },
  {
    id: 'prod-05',
    sku: 'MN-L26-05',
    name: 'Sosan · Chikankari Monochrome 3-Piece',
    collection: 'Summer Festive ’26',
    category: 'unstitched',
    categoryLabel: 'Unstitched 3-Piece',
    pricePKR: 8950,
    originalPricePKR: 9800,
    image: '/src/assets/images/lawn_schiffli_ivory_1791388312679.jpg',
    description: 'Timeless heritage Chikankari on pristine unstitched lawn. Features all-over shadow work embroidery on shirt front, adorned with laser-cut scalloped borders and a breezy jacquard net dupatta.',
    fabric: {
      shirt: '3.0m Chikankari All-Over Embroidered Pure Lawn',
      dupatta: '2.5m Self-Jacquard Summer Net Dupatta with Four-Sided Lace',
      trouser: '2.25m Pure Cambric Trouser with Embroidered Motif',
      technique: 'Pakistani Heritage Chikankari Shadow Stitch & Borer',
      lawnCount: '100% Combed Compact Lawn'
    },
    colorName: 'Antique Ecru',
    colorHex: '#EFECE6',
    stitchOptions: ['Unstitched', 'Stitched'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: false,
    tag: 'Heritage Edit',
    stockCount: 16
  },
  {
    id: 'prod-06',
    sku: 'MN-L26-06',
    name: 'Bahar · Daily Breeze 2-Piece Kurta Suit',
    collection: 'Daily Lawn',
    category: 'daily',
    categoryLabel: 'Daily Lawn 2-Piece',
    pricePKR: 4250,
    originalPricePKR: 4950,
    image: '/src/assets/images/lawn_pastel_floral_peach_1791388323427.jpg',
    description: 'Effortless everyday comfort for Pakistani summers. Breathable 2-piece unstitched printed lawn shirt and dyed matching cambric shalwar, crafted for high humidity and all-day ease.',
    fabric: {
      shirt: '2.8m All-Over Botanical Printed Summer Lawn',
      dupatta: 'None (2-Piece Everyday Suit)',
      trouser: '2.25m Breathable Dyed Cotton Cambric',
      technique: 'Eco-Friendly Reactive Fast Color Printing (Non-Bleed)',
      lawnCount: 'Air-Woven Daily Combed Lawn'
    },
    colorName: 'Summer Peach',
    colorHex: '#FAD8C8',
    stitchOptions: ['Unstitched', 'Stitched'],
    availableSizes: ['S', 'M', 'L'],
    isNew: false,
    tag: 'Daily Essential',
    stockCount: 30
  }
];

export const SIZE_CHART = [
  { size: 'XS', chest: '36"', waist: '32"', hip: '38"', length: '40"', shoulder: '14.0"' },
  { size: 'S', chest: '38"', waist: '34"', hip: '40"', length: '41"', shoulder: '14.5"' },
  { size: 'M', chest: '40"', waist: '36"', hip: '43"', length: '42"', shoulder: '15.0"' },
  { size: 'L', chest: '43"', waist: '39"', hip: '46"', length: '43"', shoulder: '15.5"' },
  { size: 'XL', chest: '46"', waist: '42"', hip: '49"', length: '44"', shoulder: '16.0"' }
];

export const REVIEWS = [
  {
    id: 'rev-01',
    author: 'Ayesha K.',
    city: 'DHA Phase 5, Lahore',
    productName: 'Nur Jahan · Luxury Schiffli Lawn',
    rating: 5,
    date: '2 days ago',
    comment: 'The Schiffli borer embroidery is breathtaking! The fabric is so cooling in Lahore’s 42°C heat. Truly high-end designer quality at a fraction of mall prices.'
  },
  {
    id: 'rev-02',
    author: 'Fatima Rizvi',
    city: 'Clifton, Karachi',
    productName: 'Gul-e-Rana · Pastel Floral 3-Piece',
    rating: 5,
    date: '5 days ago',
    comment: 'Got my order in Karachi within 48 hours via TCS. Cash on Delivery was seamless, and the Swiss voile dupatta is so light and soft. Will definitely order again!'
  },
  {
    id: 'rev-03',
    author: 'Maham Zubair',
    city: 'F-7/2, Islamabad',
    productName: 'Darya · Ready-To-Wear Summer Kurti',
    rating: 5,
    date: '1 week ago',
    comment: 'The stitching in size Medium was spot-on tailored! Clean finishing on the slit hems and armholes. Love the powder blue shade for work wear.'
  }
];
