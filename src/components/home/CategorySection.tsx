// import React from 'react';
// import { Link } from 'react-router-dom';
// import { categories } from '../../data/categories';

// const CategorySection: React.FC = () => {
//   return (
//     <section className="py-12 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
        
//         <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
//           {categories.map((category) => (
//             <Link 
//               key={category.id}
//               to={`/category/${category.slug}`}
//               className="group"
//             >
//               <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//                 <div className="aspect-w-1 aspect-h-1 w-full">
//                   <img 
//                     src={category.image} 
//                     alt={category.name}
//                     className="w-full h-40 object-cover object-center group-hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
//                 <div className="p-4 text-center">
//                   <h3 className="font-medium text-gray-900">{category.name}</h3>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategorySection;


import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../../data/categories";

const CategorySection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-2">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group"
            >
              <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-[1.05] hover:shadow-2xl hover:-translate-y-1 hover:rotate-1 perspective-1000">
                {/* 3D Layer Effect */}
                <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Glass effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="p-4 text-center bg-white relative z-10">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;