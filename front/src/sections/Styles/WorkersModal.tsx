import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Seller {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  location: string;
}

interface WorkersModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  sellers: Seller[];
}

function WorkersModal({ isOpen, onClose, productName, sellers }: WorkersModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSellerSelect = (seller: Seller) => {
    // Close the modal
    onClose();
    
    // Navigate to transaction page with seller information
    navigate('/transaction', { state: { seller, productName } });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-black">Sellers for {productName}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {sellers.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No sellers available for this product</p>
          ) : (
            <div className="space-y-4">
              {sellers.map((seller) => (
                <div
                  key={seller.id}
                  className="bg-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-300 transition-colors cursor-pointer"
                  onClick={() => handleSellerSelect(seller)}
                >
                  <div>
                    <h3 className="text-black font-medium">{seller.name}</h3>
                    <p className="text-gray-700 text-sm mt-1">Location: {seller.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-500 mb-1">
                      {'★'.repeat(seller.rating)}{'☆'.repeat(5 - seller.rating)}
                    </div>
                    <p className="text-gray-700 text-sm">{seller.reviews} reviews</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-300 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkersModal;