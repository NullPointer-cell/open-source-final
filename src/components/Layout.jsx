import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Map, Info, Settings, Accessibility, Search, X, Check, AlertCircle, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar.jsx";
import PlacesList from "./PlacesList.jsx";
import FilterPanel from "./FilterPanel.jsx";
import AccessibilityBadge from "./AccessibilityBadge.jsx";
import SubmitReportForm from "./SubmitReportForm.jsx";

const navigationItems = [
  {
    title: "Accessibility Map",
    url: createPageUrl("Map"),
    icon: Map,
  },
];

const FeatureStatus = ({ status, label, icon: Icon }) => {
  const getStatusColor = () => {
    switch(status) {
      case 'yes': return 'bg-green-50 border-green-200';
      case 'no': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch(status) {
      case 'yes': return <Check className="w-5 h-5 text-green-600" />;
      case 'no': return <X className="w-5 h-5 text-red-600" />;
      default: return <HelpCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${getStatusColor()}`}>
      {getStatusIcon()}
      <span className="text-sm font-medium text-gray-900">{label}</span>
    </div>
  );
};

export default function Layout({ children, currentPageName, places = [], selectedPlace = null, onPlaceSelect = null, onPlaceClose = null, userLocation = null, onAddReport = null }) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    ramp: false,
    lift: false,
    toilet: false,
    parking: false,
    userVerified: false,
  });
  const [reportOpen, setReportOpen] = useState(false);

  const filteredPlaces = places.filter(place => {
    const matchesSearch = !searchQuery || 
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters = 
      (!filters.ramp || place.has_ramp === 'yes') &&
      (!filters.lift || place.has_lift === 'yes') &&
      (!filters.toilet || place.has_accessible_toilet === 'yes') &&
      (!filters.parking || place.has_accessible_parking === 'yes') &&
      (!filters.userVerified || place.verified);

    return matchesSearch && matchesFilters;
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200 w-80 flex-shrink-0 hidden md:flex flex-col overflow-hidden">
          <SidebarHeader className="border-b border-gray-200 p-4 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Accessibility className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">AccessMap</h2>
                <p className="text-xs text-gray-500">Public Space Accessibility</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="flex flex-col overflow-hidden flex-1 p-0">
            {selectedPlace ? (
              // Place Detail View
              <div className="flex flex-col h-full overflow-y-auto bg-white">
                {/* Place Header */}
                <div className="flex items-start justify-between p-4 border-b border-gray-200 flex-shrink-0">
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-900 mb-1">{selectedPlace.name}</h2>
                    <p className="text-sm text-gray-600 flex items-start gap-1">
                      <span className="text-lg mt-0">📍</span>
                      {selectedPlace.address}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onPlaceClose && onPlaceClose()}
                    className="flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Overall Rating */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Overall Accessibility</h3>
                    <AccessibilityBadge rating={selectedPlace.overall_rating} showLabel />
                  </div>

                  {/* Accessibility Features */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Accessibility Features</h3>
                    <div className="space-y-2">
                      <FeatureStatus
                        status={selectedPlace.has_ramp}
                        label="Ramp"
                      />
                      <FeatureStatus
                        status={selectedPlace.has_lift}
                        label="Lift/Elevator"
                      />
                      <FeatureStatus
                        status={selectedPlace.has_accessible_toilet}
                        label="Accessible Toilet"
                      />
                      <FeatureStatus
                        status={selectedPlace.has_accessible_parking}
                        label="Accessible Parking"
                      />
                      <FeatureStatus
                        status={selectedPlace.has_accessible_entrance}
                        label="Accessible Entrance"
                      />
                    </div>
                  </div>

                  {/* User Reports */}
                  {selectedPlace.reportCount > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        👥 User Reports ({selectedPlace.reportCount})
                      </h3>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-700 mb-2">
                          Ground floor is fully accessible, but upper floors require stairs. No elevator available.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>📅 Nov 14, 2025</span>
                          <span>by jayantmcom</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Confidence Badge */}
                  {selectedPlace.confidence_score && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-900">Confidence Score</span>
                        <span className="text-sm font-semibold text-blue-600">{selectedPlace.confidence_score}%</span>
                      </div>
                      <p className="text-xs text-blue-700 mt-1">
                        Based on {selectedPlace.reportCount || 0} user report{selectedPlace.reportCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                  )}
                  {/* Action Buttons */}
                  <div className="p-4 border-t bg-gray-50 flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => setReportOpen(true)}>
                      Add/Update Report
                    </Button>
                    <Button variant="ghost" onClick={() => onPlaceClose && onPlaceClose()}>
                      Close
                    </Button>
                  </div>
                </div>
                {/* Submit Report Modal */}
                <SubmitReportForm
                  open={reportOpen}
                  location={userLocation}
                  existingPlace={selectedPlace}
                  onCancel={() => setReportOpen(false)}
                  onSubmit={(data) => {
                    if (onAddReport) onAddReport(data);
                    setReportOpen(false);
                  }}
                  isSubmitting={false}
                />
              </div>
            ) : (
              // Search and Filter View
              <>
                {/* Search Bar */}
                <div className="p-3 border-b border-gray-200 flex-shrink-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search places..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white"
                      aria-label="Search for accessible places"
                    />
                  </div>
                </div>

                {/* Filter Panel */}
                <div className="border-b border-gray-200 overflow-y-auto flex-shrink-0">
                  <FilterPanel filters={filters} onFiltersChange={setFilters} />
                </div>

                {/* Places List */}
                <div className="flex-1 overflow-hidden">
                  <PlacesList 
                    places={filteredPlaces} 
                    onPlaceSelect={onPlaceSelect} 
                    isLoading={false} 
                  />
                </div>

                {/* Navigation */}
                <SidebarGroup className="flex-shrink-0 border-t border-gray-200">
                  <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 py-2">
                    Navigation
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {navigationItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton 
                            asChild 
                            className={`hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 rounded-lg mb-1 ${
                              location.pathname === item.url ? 'bg-blue-50 text-blue-700' : ''
                            }`}
                          >
                            <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
                              <item.icon className="w-5 h-5" />
                              <span className="font-medium text-sm">{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                {/* About */}
                <SidebarGroup className="flex-shrink-0 border-t border-gray-200">
                  <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 py-2">
                    About
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <div className="px-4 py-3 text-sm text-gray-600 space-y-2">
                      <p className="flex items-start gap-2">
                        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Mapping accessible public spaces for everyone</span>
                      </p>
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs font-medium text-blue-900">Legend</p>
                        <div className="mt-2 space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span>Accessible</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <span>Partially Accessible</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span>Not Accessible</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                            <span>Unknown</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            )}
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-4 py-3 lg:px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-lg lg:text-xl font-bold text-gray-900">
                {currentPageName === "Map" ? "Accessibility Map" : currentPageName}
              </h1>
            </div>
          </header>

          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}