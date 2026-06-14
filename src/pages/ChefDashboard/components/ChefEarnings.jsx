import React, { useState } from 'react';
import {
  Wallet,
  TrendingUp,
  Download,
  Calendar,
  ArrowUpRight,
  DollarSign,
  PieChart,
  ShieldCheck,
  Check,
  Loader2,
  CreditCard,
  Building2,
  Plus,
  X,
  Trash2
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { useGetChefEarningsQuery } from '../../../redux/api/paymentApi';

const ChefEarnings = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [isAddingMethod, setIsAddingMethod] = useState(false);
  const [newMethodType, setNewMethodType] = useState('bank'); // 'bank' or 'card'

  const [payoutMethods, setPayoutMethods] = useState([
    { id: 1, type: 'bank', name: 'Chase Bank Business', details: '•••• 8829', isPrimary: true },
    { id: 2, type: 'card', name: 'Visa Debit Card', details: '•••• 4412', isPrimary: false },
  ]);

  const { data: earningsData, isLoading } = useGetChefEarningsQuery({});
  
  const paymentsList = earningsData?.data?.payments || [];
  const totalEarnings = earningsData?.data?.totalEarnings || 0;
  
  const lastPayoutDate = earningsData?.data?.lastPayoutDate 
    ? new Date(earningsData.data.lastPayoutDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'No payouts yet';
  const thisMonthEarnings = earningsData?.data?.thisMonthEarnings || 0;
  const growth = earningsData?.data?.growth || 0;

  const transactions = paymentsList.map(p => ({
    id: p._id,
    type: "Booking Payout", 
    client: p.userId?.name || p.userId?.userName || "Unknown Client",
    date: new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: p.status === 'SUCCESS' ? 'Completed' : p.status === 'HOLD' ? 'Escrow' : 'Processing',
    amount: `+$${(p.influencer_amount || p.amount || 0).toFixed(2)}`
  }));

  const handleExport = () => {
    setIsExporting(true);
    
    try {
      if (transactions.length === 0) {
        alert("No transactions to export");
        setIsExporting(false);
        return;
      }

      let csvContent = "Transaction Type,Client,Date,Status,Amount\\n";
      
      transactions.forEach(row => {
        const client = `"${row.client.replace(/"/g, '""')}"`;
        const amount = `"${row.amount}"`;
        csvContent += `"${row.type}",${client},"${row.date}","${row.status}",${amount}\\n`;
      });
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Elena_Chef_Earnings_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to generate report", error);
      setIsExporting(false);
    }
  };

  const handleAddMethod = () => {
    const newMethod = {
      id: Date.now(),
      type: newMethodType,
      name: newMethodType === 'bank' ? 'New Bank Account' : 'New Credit Card',
      details: '•••• 0000',
      isPrimary: false
    };
    setPayoutMethods(prev => [...prev, newMethod]);
    setIsAddingMethod(false);
  };

  const handleDeleteMethod = (id) => {
    const method = payoutMethods.find(m => m.id === id);
    if (method.isPrimary) {
      alert("You cannot delete your primary payout method. Please set another method as primary first.");
      return;
    }
    if (window.confirm("Are you sure you want to remove this payout method?")) {
      setPayoutMethods(prev => prev.filter(m => m.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      {/* Payout Method Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6">
          <div className="absolute inset-0 bg-primary-900/60 backdrop-blur-md animate-in fade-in duration-500" onClick={() => { setShowPayoutModal(false); setIsAddingMethod(false); }} />
          <Card className="relative w-full max-w-lg bg-white p-6 md:p-10 rounded-t-[40px] md:rounded-[40px] shadow-2xl animate-in slide-in-from-bottom md:zoom-in-95 duration-300">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-serif text-primary-900 italic">
                    {isAddingMethod ? 'Add Payout Method' : 'Payout Methods'}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">
                    {isAddingMethod ? 'Enter your financial details securely.' : 'Manage how you receive your earnings.'}
                  </p>
                </div>
                <button
                  onClick={() => { setShowPayoutModal(false); setIsAddingMethod(false); }}
                  className="p-2 hover:bg-gray-50 rounded-full text-gray-400 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {!isAddingMethod ? (
                <div className="flex flex-col gap-4">
                  {payoutMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`relative p-6 rounded-3xl flex items-center justify-between group transition-all ${method.isPrimary ? 'bg-primary-900 text-white shadow-xl' : 'border border-gray-100 bg-white text-primary-900 hover:border-accent/30'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${method.isPrimary ? 'bg-white/10' : 'bg-gray-50'}`}>
                          {method.type === 'bank' ? (
                            <Building2 size={24} className={method.isPrimary ? 'text-accent' : 'text-gray-400'} />
                          ) : (
                            <CreditCard size={24} className={method.isPrimary ? 'text-accent' : 'text-gray-400'} />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold">{method.name}</span>
                          <span className={`text-[10px] font-medium tracking-widest ${method.isPrimary ? 'text-white/40' : 'text-gray-400'}`}>{method.details}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {method.isPrimary ? (
                          <Badge className="bg-accent text-primary-900 font-black px-2 py-0.5 text-[8px] uppercase">Primary</Badge>
                        ) : (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteMethod(method.id); }}
                            className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => setIsAddingMethod(true)}
                    className="p-6 border-2 border-dashed border-gray-100 rounded-3xl flex items-center justify-center gap-2 text-gray-400 hover:border-accent hover:text-accent hover:bg-accent/5 transition-all group"
                  >
                    <Plus size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Add New Method</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="flex p-1 bg-gray-50 rounded-2xl">
                    <button
                      onClick={() => setNewMethodType('bank')}
                      className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${newMethodType === 'bank' ? 'bg-white text-primary-900 shadow-sm' : 'text-gray-400'}`}
                    >
                      Bank Account
                    </button>
                    <button
                      onClick={() => setNewMethodType('card')}
                      className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${newMethodType === 'card' ? 'bg-white text-primary-900 shadow-sm' : 'text-gray-400'}`}
                    >
                      Debit Card
                    </button>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-primary-900 uppercase tracking-widest">Account Holder</label>
                      <input type="text" placeholder="Chef Julian" className="h-12 bg-gray-50 border-transparent rounded-xl px-4 text-xs font-bold focus:ring-accent" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-primary-900 uppercase tracking-widest">{newMethodType === 'bank' ? 'Account Number' : 'Card Number'}</label>
                      <input type="text" placeholder={newMethodType === 'bank' ? '0000 0000 0000' : '0000 0000 0000 0000'} className="h-12 bg-gray-50 border-transparent rounded-xl px-4 text-xs font-bold focus:ring-accent" />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" onClick={() => setIsAddingMethod(false)} className="flex-1 rounded-full text-[10px] font-black uppercase tracking-widest">Back</Button>
                    <Button onClick={handleAddMethod} className="flex-2 bg-primary-900 text-white rounded-full h-12 px-8 text-[10px] font-black uppercase tracking-widest">Add Method</Button>
                  </div>
                </div>
              )}

              {!isAddingMethod && (
                <Button onClick={() => setShowPayoutModal(false)} className="w-full bg-primary-900 text-white hover:bg-black rounded-full h-14 text-[10px] font-black uppercase tracking-widest shadow-lg">Save Settings</Button>
              )}
            </div>
          </Card>
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-4xl font-serif text-primary-900 italic">Earnings & Analytics</h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">Track your financial performance and withdrawal status.</p>
        </div>
        <Button
          onClick={handleExport}
          disabled={isExporting || exportSuccess}
          className={`${exportSuccess ? 'bg-green-600' : 'bg-primary-900'} text-white hover:opacity-90 rounded-full px-6 md:px-8 py-4 md:py-6 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all disabled:opacity-80 w-full md:w-auto h-12 md:h-14`}
        >
          {isExporting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : exportSuccess ? (
            <Check size={16} />
          ) : (
            <Download size={16} />
          )}
          {isExporting ? 'Generating Report...' : exportSuccess ? 'Report Downloaded' : 'Export Financial Report'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <Card className="lg:col-span-2 p-6 md:p-10 !bg-primary-900 !text-white border-none rounded-[32px] md:rounded-[40px] shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col gap-6 md:gap-10">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-accent text-xs font-black uppercase tracking-widest">Available Balance</span>
                <h2 className="text-3xl md:text-5xl font-bold !text-white">${totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
              </div>
              <div className="w-16 h-16 rounded-[24px] bg-white/10 flex items-center justify-center backdrop-blur-md">
                <Wallet size={32} className="text-accent" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-6 border-t border-white/10">
              <div className="flex flex-col gap-1">
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Last Payout</span>
                <span className="text-xl font-bold !text-white">{lastPayoutDate}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">This Month</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold !text-white">${thisMonthEarnings.toLocaleString('en-US', { minimumFractionDigits: 0 })}</span>
                  {growth !== 0 && (
                    <div className={`flex items-center gap-1 text-[10px] font-bold ${growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      <TrendingUp size={10} className={growth < 0 ? 'rotate-180' : ''} /> {growth > 0 ? '+' : ''}{growth}%
                    </div>
                  )}
                </div>
              </div>
              <div className="hidden md:flex flex-col gap-1">
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Account Tier</span>
                <span className="text-xl font-bold !text-accent">Elena Elite</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setShowPayoutModal(true)}
                className="w-full border-white/20 !text-white hover:bg-white/10 rounded-full py-5 text-[10px] font-black uppercase tracking-widest"
              >
                Manage Payout Method
              </Button>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
        </Card>

        <Card className="p-8 border-gray-100 bg-white rounded-[40px] flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-bold text-primary-900 uppercase tracking-widest">Financial Summary</h4>
            <div className="grid gap-4">
              <div className="p-5 bg-gray-50 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-900 flex items-center justify-center text-white">
                    <PieChart size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Platform Fee</span>
                    <span className="text-sm font-bold text-primary-900">20%</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-[8px] font-black uppercase border-gray-200">Standard</Badge>
              </div>
              <div className="p-5 bg-gray-50 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary-900">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Billing Status</span>
                    <span className="text-sm font-bold text-primary-900">Verified</span>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[9px] text-gray-400 font-medium leading-relaxed italic">"Your financial security is our priority. All transactions are encrypted and audited daily."</span>
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="text-lg md:text-xl font-bold text-primary-900 font-serif italic">Transaction History</h3>

        {/* Mobile: Card view */}
        <div className="md:hidden flex flex-col gap-3">
          {isLoading ? (
            <div className="p-8 text-center text-gray-400">Loading transactions...</div>
          ) : transactions.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No transactions yet</div>
          ) : transactions.map((t) => (
            <div key={t.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between gap-3">
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-bold text-primary-900">{t.type}</span>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest truncate">{t.client}</span>
                <span className="text-[10px] text-gray-400 font-bold mt-0.5">{t.date}</span>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className={`text-sm font-bold ${t.amount.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{t.amount}</span>
                <Badge variant={t.status === 'Completed' ? 'success' : 'warning'} className="text-[8px] font-black uppercase px-2 py-0.5 tracking-widest border-none">
                  {t.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table view */}
        <div className="hidden md:block bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Transaction</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-8 py-10 text-center text-gray-400 font-medium">Loading transactions...</td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-8 py-10 text-center text-gray-400 font-medium">No transactions yet</td>
                </tr>
              ) : transactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-primary-900">{t.type}</span>
                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">{t.client}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-gray-600">{t.date}</td>
                  <td className="px-8 py-6">
                    <Badge variant={t.status === 'Completed' ? 'success' : 'warning'} className="text-[8px] font-black uppercase px-2 py-0.5 tracking-widest border-none">
                      {t.status}
                    </Badge>
                  </td>
                  <td className={`px-8 py-6 text-right font-bold ${t.amount.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                    {t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChefEarnings;
