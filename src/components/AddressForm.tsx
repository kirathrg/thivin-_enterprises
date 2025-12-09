"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Address } from "@/store/useAuthStore";

interface AddressFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (address: Omit<Address, 'id'>) => void;
    initialData?: Address;
    mode: 'add' | 'edit';
}

const AddressForm: React.FC<AddressFormProps> = ({ isOpen, onClose, onSubmit, initialData, mode }) => {
    const [formData, setFormData] = useState({
        fullName: initialData?.fullName || "",
        address: initialData?.address || "",
        city: initialData?.city || "",
        state: initialData?.state || "",
        zip: initialData?.zip || "",
        country: initialData?.country || "India",
        isDefault: initialData?.isDefault || false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.fullName || !formData.address || !formData.city || !formData.zip) {
            return;
        }

        onSubmit(formData);
        onClose();

        // Reset form
        setFormData({
            fullName: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            country: "India",
            isDefault: false,
        });
    };

    const handleChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{mode === 'add' ? 'Add New Address' : 'Edit Address'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleChange('fullName', e.target.value)}
                            placeholder="Enter full name"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Address *</Label>
                        <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                            placeholder="Street address, apartment, etc."
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">City *</Label>
                            <Input
                                id="city"
                                value={formData.city}
                                onChange={(e) => handleChange('city', e.target.value)}
                                placeholder="City"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input
                                id="state"
                                value={formData.state}
                                onChange={(e) => handleChange('state', e.target.value)}
                                placeholder="State"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="zip">ZIP Code *</Label>
                            <Input
                                id="zip"
                                value={formData.zip}
                                onChange={(e) => handleChange('zip', e.target.value)}
                                placeholder="ZIP Code"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                                id="country"
                                value={formData.country}
                                onChange={(e) => handleChange('country', e.target.value)}
                                placeholder="Country"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="isDefault"
                            checked={formData.isDefault}
                            onCheckedChange={(checked) => handleChange('isDefault', checked as boolean)}
                        />
                        <Label htmlFor="isDefault" className="text-sm font-normal cursor-pointer">
                            Set as default address
                        </Label>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1 bg-dusty-rose hover:bg-dusty-rose/90 text-white">
                            {mode === 'add' ? 'Add Address' : 'Update Address'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddressForm;
