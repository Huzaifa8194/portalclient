export const PRODUCT_GENDER_OPTIONS = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Kids', value: 'Kids' },
];

export const PRODUCT_CATEGORY_OPTIONS = ['Shose', 'Apparel', 'Accessories'];

export const PRODUCT_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

export const PRODUCT_COLOR_OPTIONS = [
  '#FF4842',
  '#1890FF',
  '#FFC0CB',
  '#00AB55',
  '#FFC107',
  '#7F00FF',
  '#000000',
  '#FFFFFF',
];

export const PRODUCT_COLOR_NAME_OPTIONS = [
  { value: '#FF4842', label: 'Red' },
  { value: '#1890FF', label: 'Blue' },
  { value: '#FFC0CB', label: 'Pink' },
  { value: '#00AB55', label: 'Green' },
  { value: '#FFC107', label: 'Yellow' },
  { value: '#7F00FF', label: 'Violet' },
  { value: '#000000', label: 'Black' },
  { value: '#FFFFFF', label: 'White' },
];

export const PRODUCT_SIZE_OPTIONS = [
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '8.5', label: '8.5' },
  { value: '9', label: '9' },
  { value: '9.5', label: '9.5' },
  { value: '10', label: '10' },
  { value: '10.5', label: '10.5' },
  { value: '11', label: '11' },
  { value: '11.5', label: '11.5' },
  { value: '12', label: '12' },
  { value: '13', label: '13' },
];

export const PRODUCT_STOCK_OPTIONS = [
  { value: 'in stock', label: 'In stock' },
  { value: 'low stock', label: 'Low stock' },
  { value: 'out of stock', label: 'Out of stock' },
];

export const PRODUCT_PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

export const PRODUCT_SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High - Low' },
  { value: 'priceAsc', label: 'Price: Low - High' },
];

export const PRODUCT_CATEGORY_GROUP_OPTIONS = [
  { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather', 'Accessories'] },
  { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats', 'Apparel'] },
  { group: 'Accessories', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] },
];

export const APPOINTMENT_TYPE_OPTIONS = [
  { value: 'none', label: 'Choose Option' },
  { value: 'atoffice', label: 'At Office' },
  { value: 'telephone', label: 'Telephone' },
];

export const APPOINTMENT_CATEGORY_OPTIONS = [
  { value: 'none', label: 'Choose Option' },
  { value: 'appartmentsandoffices', label: 'Appartments & Offices - Sweden' },
  { value: 'appealcases', label: 'Appeal Cases - Sweden' },
  { value: 'asylum', label: 'Asylum - Sweden' },
  { value: 'businesspermit', label: 'Business Permit' },
  { value: 'businessvisit', label: 'Business Visit - Sweden' },
  { value: 'citizenship', label: 'Citizenship - Sweden' },
  { value: 'companyregistration', label: 'Company Registration - Sweden' },
  { value: 'familyreunificationdenmark', label: 'Family Reunification - Denmark' },
  { value: 'familyreunificationsweden', label: 'Family Reunification - Sweden' },

  { value: 'parentseupermitsweden', label: 'Parents EU Permit - Sweden' },
  { value: 'permanentresidencepermit', label: 'Permanent Residence Permit - Sweden' },
  { value: 'relocatetocanda', label: 'Relocate to Canada' },
  { value: 'relocatetogreece', label: 'Relocate to Greece' },
  { value: 'relocatetoportugal', label: 'Relocate to Portugal' },
  { value: 'relocatetosweden', label: 'Relocate to Sweden' },
  { value: 'selfemployedpermitsweden', label: 'Self Employed Permit - Sweden' },
  { value: 'selfemployedstartuppermitsweden', label: 'Self Employed/Startup Permit - Denmark' },
  { value: 'studyinsweden', label: 'Study in Sweden' },
  { value: 'ukaususcanadavisa', label: 'UK-AUS-US-CANADA Visa' },
  { value: 'ukaususcanadavisitvisa', label: 'UK-AUS-US-CANADA Visit Visa' },
  { value: 'workpermitsweden', label: 'Work Permit - Sweden' },
  { value: 'workpermitdenmark', label: 'Work Permit - Denmark' },
  { value: 'other', label: 'Other' },
];

export const APPOINTMENT_COUNTRY_OPTIONS = [
  { value: 'none', label: 'Choose Option' },
  { value: 'sweden', label: 'Mon-Thu - Sweden' },
  { value: 'denmark', label: 'Fri - Denmark' },
];

export const APPOINTMENT_TIME_OPTIONS = [
  { value: 'none', label: 'Choose Option' },
  { value: '1011', label: '10:00 - 11:00' },
  { value: '1112', label: '11:00 - 12:00' },
  { value: '1213', label: '12:00 - 13:00' },
  { value: '1314', label: '13:00 - 14:00' },
  { value: '1415', label: '14:00 - 15:00' },
  { value: '1516', label: '15:00 - 16:00' },
];

export const FAMILY_CATEGORY_OPTIONS = [
  {
    group: 'Choose an Option',
    classify: [
      'Myself',
      'Father',
      'Mother',
      'Husband',
      'Wife',
      'Brother',
      'Sister',
      'Son',
      'Daughter',
      'Father in Law',
      'Mother in Law',
      'Brother in Law',
      'Sister in Law',
      'Other Extened Family',
    ],
  },
];

export const PRODUCT_CHECKOUT_STEPS = ['Cart', 'Billing & address', 'Payment'];
