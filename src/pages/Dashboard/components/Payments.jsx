import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle,
  MoreVertical,
  Lock,
  X,
  CreditCard as CardIcon
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Input } from '../../../components/ui/Input';
import { cn } from '../../../utils/cn';

const Payments = () => {
  const navigate = useNavigate();
  const [cards, setCards] = React.useState([
    { 
      id: 1, 
      type: 'Visa', 
      last4: '4242', 
      expiry: '12/28', 
      isPrimary: true,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg'
    },
    { 
      id: 2, 
      type: 'Mastercard', 
      last4: '8841', 
      expiry: '06/27', 
      isPrimary: false,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg'
    }
  ]);

  const [showAddModal, setShowAddModal] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSetPrimary = (id) => {
    setCards(cards.map(card => ({
      ...card,
      isPrimary: card.id === id
    })));
  };

  const handleRemoveCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const handleAddCard = () => {
    setIsSuccess(true);
    setTimeout(() => {
      const newCard = {
        id: Date.now(),
        type: 'Visa',
        last4: '9012',
        expiry: '08/30',
        isPrimary: false,
        logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg'
      };
      setCards([...cards, newCard]);
      setIsSuccess(false);
      setShowAddModal(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-28 md:pb-0">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl font-serif text-primary-900 italic">Payment Methods</h1>
        <p className="text-gray-500 font-medium text-sm md:text-base">Manage your secure payment options and billing preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Main Section: Card List */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-primary-900 font-serif italic">Your Stored Cards</h3>
            <Button 
              onClick={() => setShowAddModal(true)}
              className="bg-primary-900 text-white hover:bg-black rounded-full text-[10px] font-black tracking-widest uppercase px-6 py-3 flex items-center gap-2 shadow-lg"
            >
              <Plus size={14} /> Add New Card
            </Button>
          </div>

          <div className="grid gap-4">
            {cards.map((card) => (
              <Card key={card.id} className="p-0 overflow-hidden border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className={cn(
                      "w-14 h-9 sm:w-16 sm:h-10 rounded-lg flex items-center justify-center p-2 shadow-inner transition-colors shrink-0",
                      card.isPrimary ? "bg-primary-900" : "bg-gray-50"
                    )}>
                      <img src={card.logo} alt={card.type} className={cn("h-3 sm:h-4", card.isPrimary && "brightness-0 invert")} />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-primary-900">{card.type} ending in {card.last4}</span>
                        {card.isPrimary && (
                          <Badge className="bg-accent/10 text-accent border-none text-[8px] font-black px-2 py-0.5 tracking-widest uppercase">PRIMARY</Badge>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Expires {card.expiry}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-end">
                    {!card.isPrimary && (
                      <button 
                        onClick={() => handleSetPrimary(card.id)}
                        className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-primary-900 transition-colors text-[10px] font-black uppercase tracking-widest px-3 md:px-4"
                      >
                        Set Primary
                      </button>
                    )}
                    <button 
                      onClick={() => handleRemoveCard(card.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="p-8 rounded-[32px] bg-gray-50 border border-gray-100 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-primary-900">
              <ShieldCheck size={24} />
              <h4 className="text-lg font-bold">Secure Billing</h4>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Your payment information is encrypted and securely stored with our PCI-compliant partner, Stripe. Elena does not store your full card details on our servers.
            </p>
          </div>
        </div>

        {/* Sidebar: Billing Summary / Info */}
        <div className="flex flex-col gap-6">
          <div className="p-8 border-none bg-primary-900 rounded-[32px] text-white shadow-xl overflow-hidden">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-accent">
                  <Lock size={20} />
                </div>
                <h4 className="text-xl font-serif italic text-white">Data Protection</h4>
              </div>
              <ul className="flex flex-col gap-5">
                <li className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircle2 size={16} className="text-accent" />
                  </div>
                  <span className="text-xs text-white/80 leading-relaxed font-medium">256-bit SSL Encryption for all secure transactions.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircle2 size={16} className="text-accent" />
                  </div>
                  <span className="text-xs text-white/80 leading-relaxed font-medium">Fraud detection and prevention powered by Stripe Radar.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircle2 size={16} className="text-accent" />
                  </div>
                  <span className="text-xs text-white/80 leading-relaxed font-medium">Automatic billing updates for expired or lost cards.</span>
                </li>
              </ul>
            </div>
          </div>

          <Card className="p-8 border-transparent bg-white shadow-sm rounded-[32px] flex flex-col gap-4">
            <div className="flex items-center gap-3 text-primary-900">
              <AlertCircle size={20} className="text-accent" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Billing Support</h4>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">Have a question about a charge? Our concierge team can help with billing inquiries 24/7.</p>
            <Button 
              variant="outline" 
              className="w-full border-gray-100 rounded-full text-[10px] font-black tracking-widest uppercase py-4 hover:bg-gray-50"
              onClick={() => navigate('/contact')}
            >
              Contact Billing
            </Button>
          </Card>
        </div>
      </div>

      {/* --- ADD CARD MODAL --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-primary-900/60 backdrop-blur-sm" onClick={() => !isSuccess && setShowAddModal(false)} />
          <Card className="relative w-full max-w-lg bg-white p-6 md:p-10 rounded-t-[40px] md:rounded-[40px] shadow-2xl border-transparent animate-in slide-in-from-bottom md:zoom-in-95 duration-300">
            <button onClick={() => setShowAddModal(false)} className="absolute top-8 right-8 p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400">
              <X size={20} />
            </button>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h3 className="text-3xl font-serif text-primary-900 italic">Add New Card</h3>
                <p className="text-sm text-gray-400 font-medium tracking-wide">Enter your payment details for secure storage.</p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Cardholder Name</label>
                  <Input placeholder="TANVIR AHMED" className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 font-bold" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Card Number</label>
                  <div className="relative">
                    <Input placeholder="0000 0000 0000 0000" className="h-14 bg-gray-50 border-transparent rounded-2xl pl-14 pr-6 font-bold" />
                    <CardIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Expiry Date</label>
                    <Input placeholder="MM / YY" className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 font-bold text-center" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">CVC / CVV</label>
                    <Input placeholder="•••" type="password" maxLength={3} className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 font-bold text-center" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button 
                  onClick={handleAddCard}
                  disabled={isSuccess}
                  className="w-full bg-primary-900 text-white hover:bg-black rounded-full py-5 text-[10px] font-black tracking-widest uppercase shadow-xl flex items-center justify-center gap-3 transition-all"
                >
                  {isSuccess ? (
                    <><CheckCircle2 size={18} /> Card Added Successfully</>
                  ) : (
                    "Securely Save Card"
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                <ShieldCheck size={14} className="text-accent" /> Encrypted & PCI Compliant
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Payments;
