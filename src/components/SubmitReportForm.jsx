import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { X, Save, MapPin } from "lucide-react";

const AccessibilityOption = ({ name, value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {name.replace('has_', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </Label>
      <RadioGroup 
        value={value} 
        onValueChange={onChange}
        className="flex gap-2"
        aria-label={`${name} accessibility status`}
      >
        <div className="flex items-center space-x-2 flex-1">
          <RadioGroupItem value="yes" id={`${name}-yes`} className="text-green-600" />
          <Label htmlFor={`${name}-yes`} className="cursor-pointer text-sm">Yes</Label>
        </div>
        <div className="flex items-center space-x-2 flex-1">
          <RadioGroupItem value="no" id={`${name}-no`} className="text-red-600" />
          <Label htmlFor={`${name}-no`} className="cursor-pointer text-sm">No</Label>
        </div>
        <div className="flex items-center space-x-2 flex-1">
          <RadioGroupItem value="unknown" id={`${name}-unknown`} className="text-gray-600" />
          <Label htmlFor={`${name}-unknown`} className="cursor-pointer text-sm">Unknown</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default function SubmitReportForm({ 
  open = true,
  location, 
  existingPlace, 
  onSubmit, 
  onCancel,
  isSubmitting 
}) {
  const [formData, setFormData] = useState({
    place_name: existingPlace?.name || "",
    address: existingPlace?.address || "",
    latitude: location?.lat || existingPlace?.latitude || 0,
    longitude: location?.lng || existingPlace?.longitude || 0,
    has_ramp: existingPlace?.has_ramp || "unknown",
    has_lift: existingPlace?.has_lift || "unknown",
    has_accessible_toilet: existingPlace?.has_accessible_toilet || "unknown",
    has_accessible_parking: existingPlace?.has_accessible_parking || "unknown",
    has_accessible_entrance: existingPlace?.has_accessible_entrance || "unknown",
    comment: "",
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateOverallRating = () => {
    const features = [
      formData.has_ramp,
      formData.has_lift,
      formData.has_accessible_toilet,
      formData.has_accessible_parking,
      formData.has_accessible_entrance
    ];

    const yesCount = features.filter(f => f === 'yes').length;
    const noCount = features.filter(f => f === 'no').length;
    const unknownCount = features.filter(f => f === 'unknown').length;

    if (yesCount >= 4) return 'accessible';
    if (noCount >= 3) return 'not_accessible';
    if (unknownCount >= 4) return 'unknown';
    return 'partially_accessible';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const reportData = {
      ...formData,
      place_id: existingPlace?.id || `custom_${Date.now()}`,
      overall_rating: calculateOverallRating(),
      confidence_score: 50,
      verified: false
    };

    onSubmit(reportData);
  };

  return (
    <Dialog open={open} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-labelledby="submit-report-title">
        <DialogHeader>
          <DialogTitle id="submit-report-title" className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {existingPlace ? 'Update' : 'Add'} Accessibility Report
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Place Information */}
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-sm text-gray-700">Place Information</h3>
            
            <div>
              <Label htmlFor="place_name">Place Name *</Label>
              <Input
                id="place_name"
                value={formData.place_name}
                onChange={(e) => handleChange('place_name', e.target.value)}
                placeholder="e.g., City Library"
                required
                disabled={!!existingPlace}
                aria-required="true"
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="e.g., 123 Main St, City"
                disabled={!!existingPlace}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => handleChange('latitude', parseFloat(e.target.value))}
                  disabled={!!existingPlace}
                  aria-label="Latitude coordinate"
                />
              </div>
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => handleChange('longitude', parseFloat(e.target.value))}
                  disabled={!!existingPlace}
                  aria-label="Longitude coordinate"
                />
              </div>
            </div>
          </div>

          {/* Accessibility Features */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-semibold text-sm text-gray-700">Accessibility Features</h3>
            
            <AccessibilityOption
              name="has_ramp"
              value={formData.has_ramp}
              onChange={(v) => handleChange('has_ramp', v)}
            />
            
            <AccessibilityOption
              name="has_lift"
              value={formData.has_lift}
              onChange={(v) => handleChange('has_lift', v)}
            />
            
            <AccessibilityOption
              name="has_accessible_toilet"
              value={formData.has_accessible_toilet}
              onChange={(v) => handleChange('has_accessible_toilet', v)}
            />
            
            <AccessibilityOption
              name="has_accessible_parking"
              value={formData.has_accessible_parking}
              onChange={(v) => handleChange('has_accessible_parking', v)}
            />
            
            <AccessibilityOption
              name="has_accessible_entrance"
              value={formData.has_accessible_entrance}
              onChange={(v) => handleChange('has_accessible_entrance', v)}
            />
          </div>

          {/* Comments */}
          <div>
            <Label htmlFor="comment">Additional Comments (Optional)</Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => handleChange('comment', e.target.value)}
              placeholder="Share any additional details about accessibility..."
              rows={3}
              aria-label="Additional comments about accessibility"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.place_name}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Saving...' : 'Submit Report'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}