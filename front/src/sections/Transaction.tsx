import { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Wallet, DollarSign } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Styles/Navbar';
import Footer from '../sections/Styles/Footer';

interface SellerInfo {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  location: string;
}

function Transaction() {
  const navigate = useNavigate();
  const location = useLocation();
  const [seller, setSeller] = useState<SellerInfo | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [selectedWallet, setSelectedWallet] = useState<string>('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [walletDetails, setWalletDetails] = useState({
    accountName: '',
    accountNumber: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Get seller information from location state
    if (location.state && location.state.seller) {
      setSeller(location.state.seller);
    }
  }, [location]);

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    setSelectedWallet('');
  };

  const handleWalletSelect = (wallet: string) => {
    setSelectedWallet(wallet);
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWalletInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWalletDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  const goBack = () => {
    navigate(-1);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-white/90 text-black">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-[#161617] rounded-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
            <p className="text-gray-400 mb-8">Your transaction has been completed successfully.</p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white/90 text-black">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <button
          onClick={goBack}
          className="flex items-center text-gray-700 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </button>

        <div className="bg-gray-200/70 rounded-2xl p-8">
          <h1 className="text-2xl font-bold mb-8 text-gray-700">Complete Your Transaction</h1>

          {seller ? (
            <div className="mb-8 p-6 bg-gray-300/50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Seller Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700">Name</p>
                  <p className="text-gray-800 font-medium">{seller.name}</p>
                </div>
                <div>
                  <p className="text-gray-700">Location</p>
                  <p className="text-gray-800 font-medium">{seller.location}</p>
                </div>
                <div>
                  <p className="text-gray-700">Rating</p>
                  <p className="text-yellow-500">{'★'.repeat(seller.rating)}{'☆'.repeat(5 - seller.rating)}</p>
                </div>
                <div>
                  <p className="text-gray-700">Reviews</p>
                  <p className="text-gray-800 font-medium">{seller.reviews} reviews</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-8 p-6 bg-[#232324] rounded-lg text-center">
              <p className="text-gray-400">No seller information available</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Payment Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'credit' ? 'border-sky-300 bg-sky-500/10' : 'border-gray-400 hover:border-gray-500'}`}
                onClick={() => handlePaymentMethodChange('credit')}
              >
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 mr-3 text-gray-400" />
                  <span className='text-gray-700'>Credit Card</span>
                </div>
              </div>
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'wallet' ? 'border-sky-300 bg-sky-500/10' : 'border-gray-400 hover:border-gray-500'}`}
                onClick={() => handlePaymentMethodChange('wallet')}
              >
                <div className="flex items-center">
                  <Wallet className="h-6 w-6 mr-3 text-gray-400" />
                  <span>Digital Wallet</span>
                </div>
              </div>
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-sky-300 bg-sky-500/10' : 'border-gray-400 hover:border-gray-500'}`}
                onClick={() => handlePaymentMethodChange('cash')}
              >
                <div className="flex items-center">
                  <DollarSign className="h-6 w-6 mr-3 text-gray-400" />
                  <span>Cash on Delivery</span>
                </div>
              </div>
            </div>

            {paymentMethod === 'credit' && (
              <div className="bg-gray-300/50 p-6 rounded-lg mb-8 animate-fadeIn">
                <h3 className="text-lg font-medium mb-4 text-gray-700">Credit Card Details</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={handleCardInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 bg-gray-200 border border-gray-400 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cardHolder" className="block text-sm text-gray-400 mb-1">Card Holder Name</label>
                    <input
                      type="text"
                      id="cardHolder"
                      name="cardHolder"
                      value={cardDetails.cardHolder}
                      onChange={handleCardInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-gray-200 border border-gray-400 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm text-gray-400 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={cardDetails.expiryDate}
                        onChange={handleCardInputChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-gray-200 border border-gray-400 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm text-gray-400 mb-1">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardInputChange}
                        placeholder="123"
                       className="w-full px-4 py-3 bg-gray-200 border border-gray-400 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'wallet' && (
              <div className="bg-gray-300/50 p-6 rounded-lg mb-8 animate-fadeIn">
                <h3 className="text-lg font-medium mb-4">Digital Wallet</h3>
                <p className="text-gray-700 mb-4">Choose your preferred digital wallet:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div
                    className={`p-4 border rounded-lg text-center cursor-pointer transition-all ${selectedWallet === 'PayPal' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-400 hover:border-gray-500 text-gray-800'}`}
                    onClick={() => handleWalletSelect('PayPal')}
                  >
                    <p>PayPal</p>
                  </div>
                  <div
                    className={`p-4 border rounded-lg text-center cursor-pointer transition-all ${selectedWallet === 'GCash' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-400 hover:border-gray-500 text-gray-800'}`}
                    onClick={() => handleWalletSelect('GCash')}
                  >
                    <p>GCash</p>
                  </div>
                  <div
                    className={`p-4 border rounded-lg text-center cursor-pointer transition-all ${selectedWallet === 'Maya' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-400 hover:border-gray-500 text-gray-800'}`}
                    onClick={() => handleWalletSelect('Maya')}
                  >
                    <p>Maya</p>
                  </div>
                  <div
                    className={`p-4 border rounded-lg text-center cursor-pointer transition-all ${selectedWallet === 'Coins.ph' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-400 hover:border-gray-500 text-gray-800'}`}
                    onClick={() => handleWalletSelect('Coins.ph')}
                  >
                    <p>Coins.ph</p>
                  </div>
                </div>

                {selectedWallet && (
                  <div className="space-y-4 animate-fadeIn">
                    <h4 className="text-md font-medium mb-2">{selectedWallet} Details</h4>
                    <div>
                      <label htmlFor="accountName" className="block text-sm text-gray-400 mb-1">Account Name</label>
                      <input
                        type="text"
                        id="accountName"
                        name="accountName"
                        value={walletDetails.accountName}
                        onChange={handleWalletInputChange}
                        placeholder="Enter your account name"
                        className="w-full px-4 py-3 bg-[#161617] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="accountNumber" className="block text-sm text-gray-400 mb-1">Account Number</label>
                      <input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        value={walletDetails.accountNumber}
                        onChange={handleWalletInputChange}
                        placeholder="Enter your account number"
                        className="w-full px-4 py-3 bg-[#161617] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {paymentMethod === 'cash' && (
              <div className="bg-[#232324] p-6 rounded-lg mb-8 animate-fadeIn">
                <h3 className="text-lg font-medium mb-4">Cash on Delivery</h3>
                <p className="text-gray-400">Payment will be collected upon service completion.</p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!paymentMethod || (paymentMethod === 'wallet' && !selectedWallet) || isProcessing}
                className={`px-8 py-3 rounded-full font-medium transition-all ${!paymentMethod || (paymentMethod === 'wallet' && !selectedWallet) || isProcessing
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
              >
                {isProcessing ? 'Processing...' : 'Complete Payment'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Transaction;