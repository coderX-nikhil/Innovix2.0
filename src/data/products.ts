import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    category: 'iPhones',
    subcategory: 'Pro',
    price: 119990,
    discountPrice: 105990,
    description: 'The most powerful iPhone ever with A17 Pro chip, titanium design, and advanced camera system.',
    features: [
      'A17 Pro chip for unprecedented performance',
      'Titanium design, lighter and stronger',
      '48MP main camera with 5x optical zoom',
      'Action button for quick access to favorite features',
      'All-day battery life and USB-C connectivity'
    ],
    specifications: {
      display: '6.7-inch Super Retina XDR display with ProMotion',
      chip: 'A17 Pro chip with 6-core CPU and 5-core GPU',
      camera: 'Pro camera system: 48MP main, 12MP ultra wide, 12MP telephoto',
      frontCamera: '12MP TrueDepth front camera',
      battery: 'Up to 29 hours video playback',
      storage: '256GB, 512GB, 1TB',
      colors: 'Natural Titanium, Blue Titanium, White Titanium, Black Titanium'
    },
    images: [
      'https://images.unsplash.com/photo-1703133431079-8477009d42b2?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1718223483120-8131e57f948b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1697284959152-32ef13855932?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    stock: 50,
    rating: 4.8,
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'John Doe',
        rating: 5,
        comment: 'Best iPhone I\'ve ever owned. The camera is incredible!',
        date: '2023-10-15'
      },
      {
        id: 'r2',
        userId: 'u2',
        userName: 'Jane Smith',
        rating: 4.5,
        comment: 'Love the titanium design and the performance is amazing.',
        date: '2023-10-20'
      }
    ],
    isFeatured: true,
    isNewArrival: true,
    createdAt: '2023-09-22T00:00:00Z',
    updatedAt: '2023-10-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'MacBook Pro 16"',
    category: 'Mac',
    subcategory: 'MacBook Pro',
    price: 369900,
    discountPrice: 311900,
    description: 'Supercharged by M3 Pro and M3 Max chips for groundbreaking performance and amazing battery life.',
    features: [
      'M3 Pro or M3 Max chip for extraordinary performance',
      'Up to 36-core GPU for graphics-intensive apps',
      'Up to 96GB unified memory for demanding workflows',
      'Stunning 16-inch Liquid Retina XDR display',
      'Up to 22 hours of battery life'
    ],
    specifications: {
      display: '16-inch Liquid Retina XDR display',
      chip: 'M3 Pro or M3 Max chip',
      memory: 'Up to 96GB unified memory',
      storage: 'Up to 8TB SSD storage',
      battery: 'Up to 22 hours of battery life',
      camera: '1080p FaceTime HD camera',
      ports: 'Three Thunderbolt 4 ports, HDMI port, SDXC card slot, MagSafe 3 port'
    },
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2026&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=2070&auto=format&fit=crop'
    ],
    stock: 30,
    rating: 4.9,
    reviews: [
      {
        id: 'r3',
        userId: 'u3',
        userName: 'Michael Johnson',
        rating: 5,
        comment: 'The performance is unbelievable. Perfect for video editing and 3D rendering.',
        date: '2023-11-05'
      }
    ],
    isFeatured: true,
    isNewArrival: true,
    createdAt: '2023-10-30T00:00:00Z',
    updatedAt: '2023-11-10T00:00:00Z'
  },
  {
    id: '3',
    name: 'iPad Pro 12.9"',
    category: 'iPad',
    subcategory: 'iPad Pro',
    price: 59990,
    discountPrice: 52990,
    description: 'The ultimate iPad experience with the M2 chip, Liquid Retina XDR display, and Apple Pencil hover.',
    features: [
      'M2 chip delivers next-level performance',
      'Stunning 12.9-inch Liquid Retina XDR display',
      'Apple Pencil hover for unprecedented precision',
      'Pro cameras with LiDAR Scanner',
      'All-day battery life'
    ],
    specifications: {
      display: '12.9-inch Liquid Retina XDR display',
      chip: 'M2 chip with 8-core CPU and 10-core GPU',
      camera: '12MP Wide camera, 10MP Ultra Wide camera, LiDAR Scanner',
      frontCamera: '12MP Ultra Wide front camera with Center Stage',
      battery: 'Up to 10 hours of battery life',
      storage: '128GB, 256GB, 512GB, 1TB, 2TB',
      connectivity: 'Wi-Fi 6E and 5G cellular options'
    },
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2033&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589739900243-4b52cd9dd8df?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592434134753-a70baf7979d5?q=80&w=1974&auto=format&fit=crop'
    ],
    stock: 40,
    rating: 4.7,
    reviews: [
      {
        id: 'r4',
        userId: 'u4',
        userName: 'Emily Wilson',
        rating: 4.5,
        comment: 'Perfect for digital art and productivity. The display is gorgeous!',
        date: '2023-09-28'
      }
    ],
    isFeatured: true,
    createdAt: '2023-08-15T00:00:00Z',
    updatedAt: '2023-09-20T00:00:00Z'
  },
  {
    id: '4',
    name: 'Apple Watch Series 8',
    category: 'Watch',
    subcategory: 'Series 9',
    price: 58990,
    discountPrice: 53980,
    description: 'The most powerful Apple Watch yet with the new S9 chip, brighter display, and carbon neutral options.',
    features: [
      'S9 chip for faster performance',
      'Brighter Always-On Retina display',
      'Double tap gesture for one-handed control',
      'Advanced health sensors and features',
      'Available in carbon neutral options'
    ],
    specifications: {
      display: 'Always-On Retina LTPO OLED display',
      chip: 'S9 SiP with 64-bit dual-core processor',
      case: 'Aluminum or stainless steel, 41mm or 45mm',
      battery: 'Up to 18 hours of battery life',
      health: 'Blood Oxygen app, ECG app, temperature sensing',
      connectivity: 'GPS and GPS + Cellular models',
      water: 'Water resistant 50 meters'
    },
    images: [
      'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=2065&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=1970&auto=format&fit=crop'
    ],
    stock: 60,
    rating: 4.6,
    reviews: [
      {
        id: 'r5',
        userId: 'u5',
        userName: 'Robert Brown',
        rating: 4.5,
        comment: 'The double tap feature is a game changer. Love the new display too!',
        date: '2023-10-10'
      }
    ],
    isFeatured: true,
    isNewArrival: true,
    createdAt: '2023-09-18T00:00:00Z',
    updatedAt: '2023-10-05T00:00:00Z'
  },
  {
    id: '5',
    name: 'AirPods Pro (2nd generation)',
    category: 'AirPods',
    subcategory: 'Pro',
    price: 20990,
    discountPrice: 17890,
    description: 'Next-level Active Noise Cancellation and Transparency mode, with Personalized Spatial Audio.',
    features: [
      'H2 chip for smarter noise cancellation',
      'Adaptive Transparency mode',
      'Personalized Spatial Audio with dynamic head tracking',
      'Up to 6 hours of listening time with ANC',
      'USB-C charging case with Find My'
    ],
    specifications: {
      chip: 'H2 chip',
      audio: 'Active Noise Cancellation, Adaptive Transparency, Personalized Spatial Audio',
      sweatAndWater: 'Sweat and water resistant (IPX4)',
      battery: 'Up to 6 hours of listening time with ANC, 30 hours total with case',
      charging: 'USB-C charging case, MagSafe charging, Apple Watch charging',
      sensors: 'Force sensor, skin-detect sensor, motion-detecting accelerometer, speech-detecting accelerometer'
    },
    images: [
      'https://images.unsplash.com/photo-1606741965509-717b9fdd6549?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?q=80&w=1943&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=2070&auto=format&fit=crop'
    ],
    stock: 75,
    rating: 4.8,
    reviews: [
      {
        id: 'r6',
        userId: 'u6',
        userName: 'Sarah Miller',
        rating: 5,
        comment: 'The noise cancellation is incredible. Best earbuds I\'ve ever owned.',
        date: '2023-11-15'
      }
    ],
    isFeatured: true,
    createdAt: '2023-09-05T00:00:00Z',
    updatedAt: '2023-11-01T00:00:00Z'
  },

  {
    "id": "16e",
    "name": "iPhone 16e",
    "category": "iPhones",
    "subcategory": "iPhone 16e ",
    "price": 59990,
    "description": "Revolutionary spatial computer that seamlessly blends digital content with your physical space.",
    "features": [
      "M2 and R1 chips for unprecedented spatial computing",
      "Ultra-high-resolution Micro-OLED display system with 23 million pixels",
      "Advanced eye tracking, hand tracking, and room mapping",
      "Spatial Audio with dynamic head tracking",
      "All-day battery life with external battery pack"
    ],
    "specifications": {
      "display": "Micro-OLED display system with 23 million pixels",
      "chip": "M2 and R1 chips",
      "audio": "Spatial Audio with dynamic head tracking",
      "tracking": "Advanced eye tracking, hand tracking, and room mapping",
      "battery": "External battery pack with all-day battery life",
    
    },
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0wAqS9rULz3nV4YNWDhO3mn95nQHEt2Ajqv--RNgwKTGT-feqcwnZL61MZRcdK2_b5VI&usqp=CAU",
      "https://feeds.abplive.com/onecms/images/uploaded-images/2025/02/20/ceff4e3e3269cab5e7f254562e2dae281740021800519402_original.jpg?impolicy=abp_cdn&imwidth=1200",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXVZK4J3lrUobDuuCp0_dIAbXBSb_fy66P0yBI8rFfui-8BzxkEwrE_KXxptbE_OO6OQg&usqp=CAU"
    ],
    "stock": 15,
    "rating": 4.9,
    "reviews": [
      {
        "id": "r7",
        "userId": "u7",
        "userName": "David Chen",
        "rating": 5,
        "comment": "Mind-blowing technology. The future is here!",
        "date": "2023-12-20"
      }
    ],
    "isFeatured": true,
    "isNewArrival": true,
    "createdAt": "2023-12-01T00:00:00Z",
    "updatedAt": "2023-12-15T00:00:00Z"
  },
  {
    id: '6',
    name: 'iPhone 15',
    category: 'iPhones',
    subcategory: 'iPhone 15 Series',
    price: 129990,
    discountPrice: 115990,
    description: 'The next-generation iPhone with A18 Pro chip, aerospace-grade titanium, and revolutionary AI-powered camera system.',
    features: [
      'A18 Pro chip for unmatched speed and efficiency',
      'Aerospace-grade titanium for a premium feel',
      '50MP main camera with 6x optical zoom',
      'AI-powered computational photography',
      'ProMotion 120Hz display for ultra-smooth visuals',
      'USB-C fast charging and all-day battery life'
    ],
    specifications: {
      display: '6.9-inch Super Retina XDR display with ProMotion',
      chip: 'A18 Pro chip with 8-core CPU and 6-core GPU',
      camera: 'Pro camera system: 50MP main, 12MP ultra-wide, 12MP periscope telephoto',
      frontCamera: '14MP TrueDepth front camera with AI enhancements',
      battery: 'Up to 32 hours video playback',
      storage: '256GB, 512GB, 1TB, 2TB',
      colors: 'Titanium Black, Titanium Blue, Titanium Silver, Titanium Gold'
    },
    images: [
      'https://www.apple.com/in/iphone-16-pro/images/overview/product-stories/design/display__f5509jfp9nyq_large_2x.jpg',
      'https://images.unsplash.com/photo-1718223483120-8131e57f948b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1697284959152-32ef13855932?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1703133431079-8477009d42b2?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      
    ],
    stock: 40,
    rating: 4.9,
    reviews: [
      {
        id: 'r3',
        userId: 'u3',
        userName: 'Alice Johnson',
        rating: 5,
        comment: 'Absolutely love the AI camera and the titanium finish!',
        date: '2024-10-05'
      },
      {
        id: 'r4',
        userId: 'u4',
        userName: 'Michael Lee',
        rating: 4.8,
        comment: 'The A18 Pro chip is incredibly fast. Worth the upgrade!',
        date: '2024-10-10'
      }
    ],
    isFeatured: true,
    isNewArrival: true,
    createdAt: '2024-09-10T00:00:00Z',
    updatedAt: '2024-10-05T00:00:00Z'
  }

];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNewArrival);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getProductsBySubcategory = (category: string, subcategory: string): Product[] => {
  return products.filter(product => 
    product.category === category && product.subcategory === subcategory
  );
};

export const getProductsByPriceRange = (min: number, max: number): Product[] => {
  return products.filter(product => {
    const price = product.discountPrice || product.price;
    return price >= min && price <= max;
  });
};

export const getSimilarProducts = (productId: string, limit: number = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit);
};