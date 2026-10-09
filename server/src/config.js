const PORT = +process.env.PORT || 3005;

const VALID_CATEGORY_OPTIONS = [
  "all",
  "rings",
  "jewelry_cords",
  "earrings",
  "chains",
  "necklaces",
  "bracelets",
  "pendants",
  "brooches",
  "watches",
  "cufflinks",
  "tie_clips",
  "crosses",
  "table_silver",
  "gift_certificates",
  "icons",
];

const STANDART_FILTERS = [
  "name",
  "type",
  "style",
  "material",
  "color_material",
  "for_whom",
  "inlay",
  "num_of_stones",
  "who_to_gift",
  "sale",
  "exclusive"
];

export { PORT, VALID_CATEGORY_OPTIONS, STANDART_FILTERS };