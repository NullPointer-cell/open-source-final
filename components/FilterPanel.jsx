import React from "react";
import { Label } from "@/components/ui/label.jsx";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import { Separator } from "@/components/ui/separator.jsx";

const FilterOption = ({ id, label, checked, onChange, icon }) => {
  return (
    <div className="flex items-center space-x-3">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        aria-label={`Filter by ${label}`}
      />
      <Label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
      >
        {icon && <span>{icon}</span>}
        {label}
      </Label>
    </div>
  );
};

export default function FilterPanel({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="space-y-6 py-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-700">Accessibility Features</h3>
        
        <FilterOption
          id="filter-ramp"
          label="Has Wheelchair Ramp"
          icon="🚶"
          checked={filters.ramp}
          onChange={(checked) => handleFilterChange('ramp', checked)}
        />
        
        <FilterOption
          id="filter-lift"
          label="Has Lift/Elevator"
          icon="🛗"
          checked={filters.lift}
          onChange={(checked) => handleFilterChange('lift', checked)}
        />
        
        <FilterOption
          id="filter-toilet"
          label="Has Accessible Toilet"
          icon="🚻"
          checked={filters.toilet}
          onChange={(checked) => handleFilterChange('toilet', checked)}
        />
        
        <FilterOption
          id="filter-parking"
          label="Has Accessible Parking"
          icon="🅿️"
          checked={filters.parking}
          onChange={(checked) => handleFilterChange('parking', checked)}
        />
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-700">Data Source</h3>
        
        <FilterOption
          id="filter-verified"
          label="User-Verified Only"
          checked={filters.userVerified}
          onChange={(checked) => handleFilterChange('userVerified', checked)}
        />
      </div>

      <Separator />

      <div className="space-y-2">
        <p className="text-xs text-gray-500">
          Apply filters to show only places that match your accessibility requirements.
        </p>
      </div>
    </div>
  );
}
