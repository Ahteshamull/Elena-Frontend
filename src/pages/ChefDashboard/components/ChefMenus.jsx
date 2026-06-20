import React, { useState, useMemo } from "react";
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
  Layers,
} from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Input } from "../../../components/ui/Input";

import {
  useGetMyMenusQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} from "../../../redux/api/menuApi";

const ChefMenus = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);

  const { data: menusRes, isLoading } = useGetMyMenusQuery();
  const [createMenu, { isLoading: isCreatingMenu }] = useCreateMenuMutation();
  const [updateMenu, { isLoading: isUpdatingMenu }] = useUpdateMenuMutation();
  const [deleteMenu] = useDeleteMenuMutation();

  const menusData = menusRes?.data || [];

  const filteredMenus = useMemo(() => {
    return menusData.filter(
      (menu) =>
        menu.menuTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        menu.menuCategory?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [menusData, searchTerm]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this menu?")) {
      try {
        await deleteMenu(id).unwrap();
      } catch (err) {
        console.error("Failed to delete menu", err);
      }
    }
  };

  const handleEdit = (menu) => {
    setEditingMenu({
      id: menu._id,
      title: menu.menuTitle,
      category: menu.menuCategory,
      courses: menu.numberOfCourse,
      imagePreview: menu.menuImage?.startsWith("http")
        ? menu.menuImage
        : `https://api.tableli.com${menu.menuImage}`,
      imageFile: null,
    });
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("menuTitle", editingMenu.title);
    formData.append("menuCategory", editingMenu.category);
    formData.append("numberOfCourse", editingMenu.courses);

    if (editingMenu.imageFile) {
      formData.append("menuImage", editingMenu.imageFile);
    }

    try {
      if (isCreating) {
        if (!editingMenu.imageFile) {
          alert("Menu image is required");
          return;
        }
        await createMenu(formData).unwrap();
      } else {
        await updateMenu({ id: editingMenu.id, formData }).unwrap();
      }
      setIsEditing(false);
      setIsCreating(false);
      setEditingMenu(null);
    } catch (err) {
      console.error("Failed to save menu", err);
    }
  };

  const handleCreate = () => {
    setEditingMenu({
      id: null,
      title: "",
      category: "",
      courses: 1,
      imagePreview: "",
      imageFile: null,
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

  return (
    <div
      className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative pb-28 md:pb-0"
      onClick={() => setActiveDropdown(null)}
    >
      {/* Edit Form Overlay */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end">
          <div
            className="absolute inset-0 bg-primary-900/40 backdrop-blur-sm animate-in fade-in duration-500"
            onClick={(e) => {
              e.stopPropagation();
              handleCancel();
            }}
          />
          <div
            className="relative w-full h-full bg-white shadow-2xl animate-in slide-in-from-right duration-500 p-6 md:p-12 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-10">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl font-serif text-primary-900 italic">
                    {isCreating ? "Create Menu" : "Edit Menu"}
                  </h2>
                  <p className="text-gray-400 text-sm font-medium">
                    {isCreating
                      ? "Design your new experience."
                      : "Refine your culinary experience."}
                  </p>
                </div>
                <button
                  onClick={handleCancel}
                  className="p-3 bg-gray-50 text-gray-400 hover:text-primary-900 hover:bg-gray-100 rounded-full transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black text-primary-900 uppercase tracking-widest">
                    Menu Title
                  </label>
                  <Input
                    value={editingMenu.title}
                    onChange={(e) =>
                      setEditingMenu({ ...editingMenu, title: e.target.value })
                    }
                    placeholder="Enter menu title"
                    className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 text-sm font-bold"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black text-primary-900 uppercase tracking-widest">
                    Category
                  </label>
                  <Input
                    value={editingMenu.category}
                    onChange={(e) =>
                      setEditingMenu({
                        ...editingMenu,
                        category: e.target.value,
                      })
                    }
                    placeholder="e.g. Fine Dining"
                    className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 text-sm font-bold"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black text-primary-900 uppercase tracking-widest">
                    Number of Courses
                  </label>
                  <Input
                    type="number"
                    value={editingMenu.courses}
                    onChange={(e) =>
                      setEditingMenu({
                        ...editingMenu,
                        courses: parseInt(e.target.value),
                      })
                    }
                    className="h-14 bg-gray-50 border-transparent rounded-2xl px-6 text-sm font-bold"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black text-primary-900 uppercase tracking-widest">
                    Menu Header Image
                  </label>
                  <div
                    className="relative group/upload h-48 rounded-[32px] border-2 border-dashed border-gray-100 bg-gray-50 flex flex-col items-center justify-center gap-3 overflow-hidden hover:border-accent hover:bg-accent/5 transition-all cursor-pointer"
                    onClick={() =>
                      document.getElementById("menu-image-upload").click()
                    }
                  >
                    {editingMenu.imagePreview ? (
                      <>
                        <img
                          src={editingMenu.imagePreview}
                          alt="Preview"
                          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover/upload:opacity-20 transition-opacity"
                        />
                        <div className="relative z-10 flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-center text-primary-900">
                            <ImageIcon size={20} />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary-900">
                            Change Image
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-300 group-hover/upload:text-accent transition-colors">
                          <Plus size={24} />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xs font-bold text-primary-900 uppercase tracking-widest">
                            Upload Image
                          </span>
                          <p className="text-[10px] text-gray-400 font-medium">
                            JPG, PNG up to 5MB
                          </p>
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
                            setEditingMenu({
                              ...editingMenu,
                              imagePreview: reader.result,
                              imageFile: file,
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="p-6 bg-accent/5 rounded-3xl border border-accent/10 flex items-start gap-4 mt-4">
                  <div className="w-10 h-10 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                    <ChefHat size={20} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-primary-900">
                      Elite Presentation
                    </span>
                    <p className="text-[10px] text-gray-400 leading-relaxed">
                      Ensure your menu descriptions are as captivating as your
                      flavors. High-quality imagery increases bookings by 40%.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1 h-14 rounded-full text-[10px] font-black uppercase tracking-widest"
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={isCreatingMenu || isUpdatingMenu}
                    onClick={handleSave}
                    className="flex-2 bg-primary-900 text-white hover:bg-black rounded-full h-14 px-12 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
                  >
                    <Save size={16} />{" "}
                    {isCreatingMenu || isUpdatingMenu
                      ? "Saving..."
                      : "Save Changes"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-4xl font-serif text-primary-900 italic">
            My Menus
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">
            Create and manage your signature culinary offerings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:flex-none">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
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
            <Plus size={16} />{" "}
            <span className="hidden sm:inline">Create New</span>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="lg:col-span-3 py-32 text-center text-gray-400 text-sm">
            Loading menus...
          </div>
        ) : filteredMenus.length > 0 ? (
          filteredMenus.map((menu) => (
            <Card
              key={menu._id}
              className="p-0 overflow-hidden border-transparent bg-white shadow-sm hover:shadow-xl transition-all group rounded-[32px] animate-in zoom-in-95 duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={
                    menu.menuImage?.startsWith("http")
                      ? menu.menuImage
                      : `https://api.tableli.com${menu.menuImage}`
                  }
                  alt={menu.menuTitle}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <Badge
                      variant="success"
                      className="bg-white/90 backdrop-blur-md text-green-700 font-black px-3 py-1 text-[8px] uppercase tracking-widest shadow-sm flex items-center gap-1.5"
                    >
                      <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                      Active
                    </Badge>
                  </div>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(
                          activeDropdown === menu._id ? null : menu._id,
                        );
                      }}
                      className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {activeDropdown === menu._id && (
                      <div className="absolute right-0 top-10 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 animate-in fade-in zoom-in-95 duration-200">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(menu._id);
                          }}
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
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {menu.menuCategory}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif text-primary-900 italic leading-tight">
                    {menu.menuTitle}
                  </h3>
                </div>

                <div className="flex items-center justify-between py-4 border-y border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                      Menu Depth
                    </span>
                    <span className="text-sm font-bold text-primary-900">
                      {menu.numberOfCourse} Courses
                    </span>
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
                    onClick={() => handleDelete(menu._id)}
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
              <h3 className="text-lg font-bold text-primary-900">
                No menus found
              </h3>
              <p className="text-sm text-gray-400 font-medium">
                Try a different search term or create a new menu.
              </p>
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
            <span className="text-sm font-bold text-primary-900">
              Add Signature Menu
            </span>
            <p className="text-xs text-gray-400 font-medium">
              Design a new dining experience for your clients.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ChefMenus;
