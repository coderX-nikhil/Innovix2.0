// import React from 'react';
// import { Link } from 'react-router-dom';
// import Button from '../ui/Button';

// const PromoBanner: React.FC = () => {
//   return (
//     <section className="py-12">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* First Banner */}
//           <div className="relative h-80 rounded-lg overflow-hidden">
//             <img 
//               src="https://images.unsplash.com/photo-1585790054762-36743f4b07ff?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
//               alt="iPad Pro"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
//               <div className="p-8">
//                 <h3 className="text-2xl font-bold text-white mb-2">iPad Pro</h3>
//                 <p className="text-white mb-4">Supercharged by the Apple M2 chip</p>
//                 <Link to="/category/ipads">
//                   <Button>Shop Now</Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
          
//           {/* Second Banner */}
//           <div className="relative h-80 rounded-lg overflow-hidden">
//             <img 
//               src="https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
//               alt="AirPods Pro"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
//               <div className="p-8">
//                 <h3 className="text-2xl font-bold text-white mb-2">AirPods Pro</h3>
//                 <p className="text-white mb-4">Adaptive Audio. Now playing.</p>
//                 <Link to="/category/airpods">
//                   <Button>Shop Now</Button>
//                 </Link>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PromoBanner;
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const PromoBanner: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* iPhone 16 Pro Banner */}
          <div className="relative h-80 rounded-lg overflow-hidden">
            <img 
              src="https://www.iclarified.com/images/news/94911/453964/453964-1280.avif" 
              alt="iPhone 16 Pro"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">iPhone 16 Pro</h3>
                <p className="text-white mb-4">Experience the future with the A18 Pro chip.</p>
                <Link to="/category/iphones">
                  <Button>Shop Now</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* iPhone 16E Banner */}
          <div className="relative h-80 rounded-lg overflow-hidden">
            <img 
              src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16e-finish-unselect-gallery-1-202502_GEO_EMEA?wid=5120&hei=2880&fmt=webp&qlt=70&.v=bGxrMXRYSllVRTZGbi82ZklwWis2MnJ2UHBBV3orM3VMYVQ4cFJXZmQxWGZNWmFhT21IZ3FqU1Z3N0hPMGdxUnkwdVFSV09pcktsRHViVExZS1gwS3c3b3pFWnhZZ2g0M0pRR0pEdHVSRUVldDVUeVlqTFFYeUhLNkZRMDdFd1RDV2RkS1g1R3UwZWdDNHZJSEFjckl3&traceId=1" 
              alt="iPhone 16E"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">iPhone 16E</h3>
                <p className="text-white mb-4">Affordable innovation with next-gen features.</p>
                <Link to="/category/iphones">
                  <Button>Shop Now</Button>
                </Link>
              </div>
            </div>
          </div>
          {/* iPad Pro Banner */}
          <div className="relative h-80 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1585790054762-36743f4b07ff?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="iPad Pro"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">iPad Pro</h3>
                <p className="text-white mb-4">Supercharged by the Apple M2 chip</p>
                <Link to="/category/ipads">
                  <Button>Shop Now</Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* AirPods Pro Banner */}
          <div className="relative h-80 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="AirPods Pro"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">AirPods Pro</h3>
                <p className="text-white mb-4">Adaptive Audio. Now playing.</p>
                <Link to="/category/airpods">
                  <Button>Shop Now</Button>
                </Link>
              </div>
            </div>
          </div>

          

        </div>
      </div>
    </section>
  );
};

export default PromoBanner;