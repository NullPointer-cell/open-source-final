import React from "react";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { 
  X, 
  Check, 
  AlertCircle, 
  HelpCircle, 
  MapPin,
  Plus,
  Users,
  Calendar
} from "lucide-react";
import { format } from "date-fns";
import AccessibilityBadge from "./AccessibilityBadge.jsx";

const FeatureIcon = ({ status, label, icon: Icon }) => {
  const getStatusColor = () => {
    switch(status) {
      case 'yes': return 'text-green-600 bg-green-50';
      case 'no': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = () => {
    switch(status) {
      case 'yes': return <Check className="w-4 h-4" />;
      case 'no': return <X className="w-4 h-4" />;
      default: return <HelpCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className={`flex items-center gap-2 p-2 rounded-lg ${getStatusColor()}`}>
      {getStatusIcon()}
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default function PlaceCard({ place, onClose, onAddReport }) {
  const features = [
    { key: 'has_ramp', label: 'Ramp', icon: () => <div className="w-4 h-4">🚶</div> },
    { key: 'has_lift', label: 'Lift/Elevator', icon: () => <div className="w-4 h-4">🛗</div> },
    { key: 'has_accessible_toilet', label: 'Accessible Toilet', icon: () => <div className="w-4 h-4">🚻</div> },
    { key: 'has_accessible_parking', label: 'Accessible Parking', icon: () => <div className="w-4 h-4">🅿️</div> },
    { key: 'has_accessible_entrance', label: 'Accessible Entrance', icon: () => <div className="w-4 h-4">🚪</div> },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-start justify-between p-4 border-b">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 mb-1">{place.name}</h2>
          <p className="text-sm text-gray-600 flex items-start gap-1">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            {place.address}
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClose}
          aria-label="Close place details"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Overall Rating */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Overall Accessibility</h3>
          <AccessibilityBadge rating={place.overall_rating} showLabel />
        </div>

        {/* Features Grid */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Accessibility Features</h3>
          <div className="grid grid-cols-1 gap-2">
            {features.map((feature) => (
              <FeatureIcon
                key={feature.key}
                status={place[feature.key]}
                label={feature.label}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>

        {/* User Reports */}
        {place.reportCount > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              User Reports ({place.reportCount})
            </h3>
            {place.userReports?.slice(0, 3).map((report, idx) => (
              <Card key={idx} className="mb-2">
                <CardContent className="p-3">
                  {report.comment && (
                    <p className="text-sm text-gray-700 mb-2">{report.comment}</p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(report.created_date), "MMM d, yyyy")}
                    {report.created_by && (
                      <span className="ml-2">by {report.created_by.split('@')[0]}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Confidence Badge */}
        {place.confidence_score && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">Confidence Score</span>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                {place.confidence_score}%
              </Badge>
            </div>
            <p className="text-xs text-blue-700 mt-1">
              Based on {place.reportCount || 0} user report{place.reportCount !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t bg-gray-50">
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={onAddReport}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add/Update Report
        </Button>
      </div>
    </div>
  );
}