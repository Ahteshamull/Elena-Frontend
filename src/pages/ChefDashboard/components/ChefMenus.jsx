import React, { useState, useMemo } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  ChefHat,
  Utensils,
  Star,
  CheckCircle2,
  Search,
  Filter,
  MoreVertical,
  ChevronRight,
  Inbox,
  AlertCircle,
  X,
  Save,
  Image as ImageIcon,
  DollarSign,
  Layers
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Input } from '../../../components/ui/Input';

const ChefMenus = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);

  const [menus, setMenus] = useState([
    {
      id: 1,
      title: "French Riviera Night",
      category: "Fine Dining",
      price: "$145 / person",
      courses: 5,
      image: "https://images.unsplash.com/photo-1550966841-3ee4ad6b105a?auto=format&fit=crop&q=80&w=400",
      isPopular: true,
      status: "Active"
    },
    {
      id: 2,
      title: "Rustic Italian Feast",
      category: "Casual Dining",
      price: "$95 / person",
      courses: 3,
      image: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&q=80&w=400",
      isPopular: false,
      status: "Active"
    },
    {
      id: 3,
      title: "Mediterranean Zen",
      category: "Vegan / Health",
      price: "$120 / person",
      courses: 4,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400",
      isPopular: false,
      status: "Draft"
    }
  ]);

  const filteredMenus = useMemo(() => {
    return menus.filter(menu =>
      menu.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      menu.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [menus, searchTerm]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this menu?")) {
      setMenus(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setMenus(prev => prev.map(m =>
      m.id === id ? { ...m, status: m.status === 'Active' ? 'Draft' : 'Active' } : m
    ));
  };

  const handleEdit = (menu) => {
    setEditingMenu({ ...menu });
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleSave = () => {
    if (isCreating) {
      setMenus(prev => [...prev, { ...editingMenu, id: Date.now() }]);
    } else {
      setMenus(prev => prev.map(m => m.id === editingMenu.id ? editingMenu : m));
    }
    setIsEditing(false);
    setIsCreating(false);
    setEditingMenu(null);
  };

  const handleCreate = () => {
    setEditingMenu({
      id: null,
      title: "",
      category: "",
      price: "",
      courses: 1,
      image: "",
      isPopular: false,
      status: "Draft"
    });
    setIsCreating(true);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
    setEditingMenu(null);
  };

  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleTogglePopular = (id) => {
    setMenus(prev => prev.map(m =>
      m.id === id ? { ...m, isPopular: !m.isPopular } : m
    ));
    setActiveDropdown(null);
  };

  const handleDuplicate = (menu) => {
    const newMenu = {
      ...menu,
      id: Date.now(),
      title: `${menu.title} (Copy)`,
      isPopular: false,
      status: "Draft"
    };
    setMenus(prev => [...prev, newMenu]);
    setActiveDropdown(null);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative" onClick={() => setActiveDropdown(null)}>
      {/* Edit Form Overlay */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end">
          <div className="absolute inset-0 bg-primary-900/40 backdrop-blur-sm animate-in fade-in duration-500" onClick={(e) => { e.stopPropagation(); handleCancel(); }} />
          <div className="relative w-full h-full bg-white shadow-2xl animate-in slide-in-from-right duration-500 p-6 md:p-12 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col gap-10">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl font-serif text-primary-900 italic">{isCreating ? 'Create Menu' : 'Edit Menu'}</h2>
                  <p className="text-gray-400 text-sm font-medium">{isCreating ? 'Design your new experience.' : 'Refine your culinary experience.'}</p>
                </div>
                <button onClick={handleCancel} className="p-3 bg-gray-50 text-gray-400 hover:text-primary-900 hover:bg-gray-100 rounded-full transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black text-primary-900 uppercase tracking-widest">Menu Title</label>
                  <Input
                    value={editingMenu.title}
                    onChange={(e) => setEditingMenu({ ...editingMenu, title: e.target.value })}
                    placeholder="Enter menu title"
                    className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 text-sm font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-primary-900 uppercase tracking-widest">Category</label>
                    <Input
                      value={editingMenu.category}
                      onChange={(e) => setEditingMenu({ ...editingMenu, category: e.target.value })}
                      placeholder="e.g. Fine Dining"
                      className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 text-sm font-bold"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-primary-900 uppercase tracking-widest">Price</label>
                    <Input
                      value={editingMenu.price}
                      onChange={(e) => setEditingMenu({ ...editingMenu, price: e.target.value })}
                      placeholder="e.g. $145 / person"
                      className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 text-sm font-bold"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black text-primary-900 uppercase tracking-widest">Number of Courses</label>
                  <Input
                    type="number"
                    value={editingMenu.courses}
                    onChange={(e) => setEditingMenu({ ...editingMenu, courses: parseInt(e.target.value) })}
                    className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 text-sm font-bold"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black text-primary-900 uppercase tracking-widest">Menu Header Image</label>
                  <div
                    className="relative group/upload h-48 rounded-[32px] border-2 border-dashed border-gray-100 bg-gray-50 flex flex-col items-center justify-center gap-3 overflow-hidden hover:border-accent hover:bg-accent/5 transition-all cursor-pointer"
                    onClick={() => document.getElementById('menu-image-upload').click()}
                  >
                    {editingMenu.image ? (
                      <>
                        <img src={editingMenu.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover/upload:opacity-20 transition-opacity" />
                        <div className="relative z-10 flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-center text-primary-900">
                            <ImageIcon size={20} />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary-900">Change Image</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-300 group-hover/upload:text-accent transition-colors">
                          <Plus size={24} />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xs font-bold text-primary-900 uppercase tracking-widest">Upload Image</span>
                          <p className="text-[10px] text-gray-400 font-medium">JPG, PNG up to 5MB</p>
                        </div>
                      </>
                    )}
                    <input
                      id="menu-image-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setEditingMenu({ ...editingMenu, image: reader.result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black text-primary-900 uppercase tracking-widest">Menu Status</label>
                  <div className="flex p-1 bg-gray-50 rounded-2xl">
                    <button
                      onClick={() => setEditingMenu({ ...editingMenu, status: 'Active' })}
                      className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${editingMenu.status === 'Active' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${editingMenu.status === 'Active' ? 'bg-green-600 animate-pulse' : 'bg-gray-300'}`} />
                        Active / Published
                      </div>
                    </button>
                    <button
                      onClick={() => setEditingMenu({ ...editingMenu, status: 'Draft' })}
                      className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${editingMenu.status === 'Draft' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${editingMenu.status === 'Draft' ? 'bg-gray-900' : 'bg-gray-300'}`} />
                        Draft / Hidden
                      </div>
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium px-2">Active menus are visible to all clients in the marketplace.</p>
                </div>

                <div className="p-6 bg-accent/5 rounded-3xl border border-accent/10 flex items-start gap-4 mt-4">
                  <div className="w-10 h-10 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                    <ChefHat size={20} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-primary-900">Elite Presentation</span>
                    <p className="text-[10px] text-gray-400 leading-relaxed">Ensure your menu descriptions are as captivating as your flavors. High-quality imagery increases bookings by 40%.</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button variant="outline" onClick={handleCancel} className="flex-1 h-14 rounded-full text-[10px] font-black uppercase tracking-widest">Cancel</Button>
                  <Button onClick={handleSave} className="flex-2 bg-primary-900 text-white hover:bg-black rounded-full h-14 px-12 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl">
                    <Save size={16} /> Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-4xl font-serif text-primary-900 italic">My Menus</h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">Create and manage your signature culinary offerings.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search menus..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 w-full md:w-64 bg-white border-gray-100 rounded-xl focus:ring-accent"
            />
          </div>
          <Button
            onClick={handleCreate}
            className="bg-primary-900 text-white hover:bg-black rounded-full px-4 md:px-8 h-11 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shrink-0"
          >
            <Plus size={16} /> <span className="hidden sm:inline">Create New</span>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenus.length > 0 ? (
          filteredMenus.map((menu) => (
            <Card key={menu.id} className="p-0 overflow-hidden border-transparent bg-white shadow-sm hover:shadow-xl transition-all group rounded-[32px] animate-in zoom-in-95 duration-300">
              <div className="relative h-56 overflow-hidden">
                <img src={menu.image} alt={menu.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    {menu.isPopular && (
                      <Badge className="bg-accent/90 backdrop-blur-md text-primary-900 border-none font-black px-3 py-1 text-[8px] uppercase tracking-widest">Popular</Badge>
                    )}
                    <Badge
                      variant={menu.status === 'Active' ? 'success' : 'outline'}
                      className={`${menu.status === 'Active' ? 'bg-white/90 backdrop-blur-md text-green-700' : 'bg-black/50 backdrop-blur-md text-white border-none'} font-black px-3 py-1 text-[8px] uppercase tracking-widest cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-sm flex items-center gap-1.5`}
                      onClick={(e) => { e.stopPropagation(); handleToggleStatus(menu.id); }}
                      title="Click to toggle status"
                    >
                      <div className={`w-1 h-1 rounded-full ${menu.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-white/50'}`} />
                      {menu.status}
                    </Badge>
                  </div>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(activeDropdown === menu.id ? null : menu.id);
                      }}
                      className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {activeDropdown === menu.id && (
                      <div className="absolute right-0 top-10 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 animate-in fade-in zoom-in-95 duration-200">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDuplicate(menu); }}
                          className="w-full px-5 py-2.5 text-left text-[10px] font-bold text-gray-600 hover:text-primary-900 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                        >
                          <Layers size={14} /> Duplicate Menu
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleTogglePopular(menu.id); }}
                          className="w-full px-5 py-2.5 text-left text-[10px] font-bold text-gray-600 hover:text-primary-900 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                        >
                          <Star size={14} className={menu.isPopular ? "fill-accent text-accent" : ""} />
                          {menu.isPopular ? "Remove Popular" : "Mark as Popular"}
                        </button>
                        <div className="h-px bg-gray-50 my-2 mx-5" />
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(menu.id); }}
                          className="w-full px-5 py-2.5 text-left text-[10px] font-bold text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors"
                        >
                          <Trash2 size={14} /> Delete Menu
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-accent">
                    <Star size={12} className="fill-accent" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{menu.category}</span>
                  </div>
                  <h3 className="text-xl font-serif text-primary-900 italic leading-tight">{menu.title}</h3>
                </div>

                <div className="flex items-center justify-between py-4 border-y border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Base Price</span>
                    <span className="text-sm font-bold text-primary-900">{menu.price}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Menu Depth</span>
                    <span className="text-sm font-bold text-primary-900">{menu.courses} Courses</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => handleEdit(menu)}
                    className="flex-[2] rounded-xl border-gray-100 text-[10px] font-black uppercase tracking-widest py-4 h-12 flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-accent hover:text-accent transition-all"
                  >
                    <Edit2 size={14} /> Edit Menu
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(menu.id)}
                    className="flex-1 rounded-xl border-red-50 bg-red-50/50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all text-[9px] font-black uppercase tracking-widest h-12 flex items-center justify-center gap-2"
                  >
                    <Trash2 size={14} /> Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="lg:col-span-3 flex flex-col items-center justify-center py-32 bg-white border border-gray-100 rounded-[40px] text-center gap-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
              <Inbox size={32} />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-primary-900">No menus found</h3>
              <p className="text-sm text-gray-400 font-medium">Try a different search term or create a new menu.</p>
            </div>
          </div>
        )}

        {/* Empty State / Add Menu Card */}
        <button
          onClick={handleCreate}
          className="h-full min-h-[440px] border-2 border-dashed border-gray-100 rounded-[32px] flex flex-col items-center justify-center gap-4 hover:border-accent hover:bg-accent/5 transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-accent group-hover:text-primary-900 transition-all">
            <Plus size={32} />
          </div>
          <div className="flex flex-col gap-1 text-center px-8">
            <span className="text-sm font-bold text-primary-900">Add Signature Menu</span>
            <p className="text-xs text-gray-400 font-medium">Design a new dining experience for your clients.</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ChefMenus;
