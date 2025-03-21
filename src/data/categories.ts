import { Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Mac',
    slug: 'mac',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1626&auto=format&fit=crop',
    subcategories: [
      { id: 's5', name: 'MacBook Air', slug: 'macbook-air' },
      { id: 's6', name: 'MacBook Pro', slug: 'macbook-pro' }
    
    ]
  },
  {
    id: '2',
    name: 'iPhones',
    slug: 'iphones',
    image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1780&auto=format&fit=crop',
    subcategories: [
      { id: 's6', name: 'iPhone 16e ', slug: 'iphone-16e' },
      { id: 's5', name: 'iPhone 16 Series', slug: 'iphone-16' },
      { id: 's1', name: 'iPhone 15 Series', slug: 'iphone-15' },
      { id: 's2', name: 'iPhone 14 Series', slug: 'iphone-14' },
      { id: 's3', name: 'iPhone SE Series', slug: 'iphone-se' }
    ]
  },
  {
    id: '3',
    name: 'iPad',
    slug: 'ipad',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1033&auto=format&fit=crop',
    subcategories: [
      { id: 's7', name: 'iPad Pro', slug: 'ipad-pro' },
      { id: 's8', name: 'iPad Air', slug: 'ipad-air' },
      { id: 's9', name: 'iPad', slug: 'ipad' },
      { id: 's10', name: 'iPad Mini', slug: 'ipad-mini' }
    ]
  },
  {
    id: '4',
    name: 'Watch',
    slug: 'watch',
    image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=1065&auto=format&fit=crop',
    subcategories: [
      { id: 's11', name: 'Series 9', slug: 'series-9' },
      { id: 's12', name: 'Ultra 2', slug: 'ultra-2' },
      { id: 's13', name: 'SE', slug: 'se' }
    ]
  },
  {
    id: '5',
    name: 'AirPods',
    slug: 'airpods',
    image: 'https://images.unsplash.com/photo-1675317132583-75301c0d0287?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    subcategories: [
      { id: 's14', name: 'AirPods Pro', slug: 'airpods-pro' },
      { id: 's15', name: 'AirPods', slug: 'airpods' },
      { id: 's16', name: 'AirPods Max', slug: 'airpods-max' }
    ]
  },

  {
    id: '6',
    name: 'TV & Home',
    slug: 'tv & home',
    image: 'https://images.unsplash.com/photo-1621685950846-9323d993bbf3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    subcategories: [
      { id: 's14', name: 'Apple TV', slug: 'apple-tv' },
      { id: 's15', name: 'HomePod & Audio', slug: 'homepod' },
      { id: 's16', name: 'Smart Home', slug: 'smarthome' }
    ]
  },

  {
    id: '7',
    name: 'Accessories',
    slug: 'accessories',
    image: 'https://shop.smartone.com/storefront/special/apple/accessories/en/apple_accessories_banner_M.jpg?v=2021',
    subcategories: [
      { id: 's17', name: 'Cases', slug: 'cases' },
      { id: 's18', name: 'Chargers', slug: 'chargers' },
      { id: 's19', name: 'Apple Pencil', slug: 'apple-pencil' },
      { id: 's20', name: 'Vision Pro', slug: 'vision-pro' }
    ]
  }
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};

export const getAllCategories = (): Category[] => {
  return categories;
};