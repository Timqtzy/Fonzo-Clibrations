import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogBody, DialogFooter } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inventoryApi, categoriesApi, suppliersApi } from '@/services/api.service';
import type { Database } from '@/types/database.types';
import toast from 'react-hot-toast';
import { Package, Tag, TrendingUp, DollarSign, MapPin, FileText, AlertCircle } from 'lucide-react';
import { notifyLowStock, notifyOutOfStock, notifyStockRestocked } from '@/helper/notificationHelper';

type InventoryItem = Database['public']['Tables']['inventory_items']['Row'];
type InventoryItemInsert = Database['public']['Tables']['inventory_items']['Insert'];
type Category = Database['public']['Tables']['categories']['Row'];
type Supplier = Database['public']['Tables']['suppliers']['Row'];

interface InventoryFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  item?: InventoryItem | null;
}

export function InventoryFormModal({ open, onOpenChange, onSuccess, item }: InventoryFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [formData, setFormData] = useState<InventoryItemInsert>({
    parts_name: '',
    category_id: null,
    supplier_id: null,
    quantity: 0,
    unit: 'pcs',
    minimum_stock: 10,
    unit_price: null,
    status: 'Active',
    location: '',
    notes: '',
  });

  useEffect(() => {
    if (open) {
      loadCategories();
      loadSuppliers();
    }
  }, [open]);

  useEffect(() => {
    if (item) {
      setFormData({
        parts_name: item.parts_name,
        category_id: item.category_id,
        supplier_id: item.supplier_id,
        quantity: item.quantity,
        unit: item.unit,
        minimum_stock: item.minimum_stock,
        unit_price: item.unit_price,
        status: item.status,
        location: item.location || '',
        notes: item.notes || '',
      });
    } else {
      setFormData({
        parts_name: '',
        category_id: null,
        supplier_id: null,
        quantity: 0,
        unit: 'pcs',
        minimum_stock: 10,
        unit_price: null,
        status: 'Active',
        location: '',
        notes: '',
      });
    }
  }, [item, open]);

  const loadCategories = async () => {
    try {
      const cats = await categoriesApi.getAll();
      setCategories(cats as Category[]);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const loadSuppliers = async () => {
    try {
      const sups = await suppliersApi.getAll();
      setSuppliers(sups);
    } catch (err) {
      console.error('Error loading suppliers:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (item) {
        await inventoryApi.update(item.id, formData);
        toast.success('Item updated successfully');

        // Check for stock-related notifications
        const oldQty = item.quantity;
        const newQty = formData.quantity || 0;
        const minStock = formData.minimum_stock || 10;

        // Notify if restocked (quantity increased significantly)
        if (newQty > oldQty && oldQty <= minStock && newQty > minStock) {
          await notifyStockRestocked(formData.parts_name, newQty - oldQty);
        }
        // Notify if now out of stock
        else if (newQty === 0 && oldQty > 0) {
          await notifyOutOfStock(formData.parts_name);
        }
        // Notify if low stock
        else if (newQty <= minStock && newQty > 0 && oldQty > minStock) {
          await notifyLowStock(formData.parts_name, newQty, minStock);
        }
      } else {
        await inventoryApi.create(formData);
        toast.success('Item created successfully');

        // Check if new item is already low or out of stock
        const qty = formData.quantity || 0;
        const minStock = formData.minimum_stock || 10;
        if (qty === 0) {
          await notifyOutOfStock(formData.parts_name);
        } else if (qty <= minStock) {
          await notifyLowStock(formData.parts_name, qty, minStock);
        }
      }
      onSuccess();
      onOpenChange(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save item';
      toast.error(message);
      console.error('Error saving item:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        title={item ? 'Edit Inventory Item' : 'Add New Inventory Item'}
        onClose={() => onOpenChange(false)}
      >
        <form onSubmit={handleSubmit}>
          <DialogBody className="max-h-[70vh] overflow-y-auto space-y-5">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Package className="h-4 w-4" />
                <span>Basic Information</span>
              </div>

              <div className="pl-6 space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parts Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.parts_name}
                    onChange={(e) => setFormData({ ...formData, parts_name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="Enter part name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Tag className="h-3.5 w-3.5 text-gray-500" />
                      Category
                    </label>
<Select value={formData.category_id || "none"} onValueChange={(value) => setFormData({ ...formData, category_id: value === "none" ? null : value })}>
                      <SelectTrigger className="w-full rounded-lg">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="none" className="rounded-lg">Select Category</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id} className="rounded-lg">
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <TrendingUp className="h-3.5 w-3.5 text-gray-500" />
                      Supplier
                    </label>
<Select value={formData.supplier_id || "none"} onValueChange={(value) => setFormData({ ...formData, supplier_id: value === "none" ? null : value })}>
                      <SelectTrigger className="w-full rounded-lg">
                        <SelectValue placeholder="Select Supplier" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="none" className="rounded-lg">Select Supplier</SelectItem>
                        {suppliers.map((sup) => (
                          <SelectItem key={sup.id} value={sup.id} className="rounded-lg">
                            {sup.supplier_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Stock Information */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <AlertCircle className="h-4 w-4" />
                <span>Stock Information</span>
              </div>

              <div className="pl-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
<Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                    <SelectTrigger className="w-full rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="pcs" className="rounded-lg">pcs (pieces)</SelectItem>
                      <SelectItem value="kg" className="rounded-lg">kg (kilograms)</SelectItem>
                      <SelectItem value="liter" className="rounded-lg">liter</SelectItem>
                      <SelectItem value="box" className="rounded-lg">box</SelectItem>
                      <SelectItem value="set" className="rounded-lg">set</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Stock <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.minimum_stock}
                    onChange={(e) => setFormData({ ...formData, minimum_stock: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Location */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <DollarSign className="h-4 w-4" />
                <span>Pricing & Location</span>
              </div>

              <div className="pl-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit Price</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.unit_price || ''}
                    onChange={(e) => setFormData({ ...formData, unit_price: parseFloat(e.target.value) || null })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="0.00"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
<Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger className="w-full rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Active" className="rounded-lg">Active</SelectItem>
                      <SelectItem value="Inactive" className="rounded-lg">Inactive</SelectItem>
                      <SelectItem value="Discontinued" className="rounded-lg">Discontinued</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-3.5 w-3.5 text-gray-500" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="e.g., Shelf A1"
                  />
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <FileText className="h-4 w-4" />
                <span>Additional Notes</span>
              </div>

              <div className="pl-6">
                <div className="group">
                  <textarea
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                    placeholder="Enter any additional notes..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </DialogBody>

          <DialogFooter>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium text-gray-700 shadow-sm hover:shadow cursor-pointer"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </span>
              ) : (
                item ? 'Update Item' : 'Add Item'
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
