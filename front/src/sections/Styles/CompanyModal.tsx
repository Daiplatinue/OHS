"use client"

import { useState } from "react"
import {
  MapPin,
  X,
  Star,
  Phone,
  Mail,
  Globe,
  Calendar,
  Clock,
  Users,
  Award,
  Building,
  FileText,
  MessageSquare,
  Flag,
  ChevronRight,
} from "lucide-react"
import image1 from "../../assets/No_Image_Available.jpg"
import type { CompanyDetails } from "./company-data"
import "./company-modal.css" // We'll create this file next

interface CompanyModalProps {
  isOpen: boolean
  onClose: () => void
  company: CompanyDetails | null
}

const CompanyModal = ({ isOpen, onClose, company }: CompanyModalProps) => {
  const [activeTab, setActiveTab] = useState("about")

  if (!isOpen || !company) return null

  const renderTabContent = () => {
    const content =
      activeTab === "about" ? (
        <div className="space-y-6 animate-fadeIn">
          {/* Company Description */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h3 className="text-xl font-extralight mb-4 mt-[-45px]">About {company.name}</h3>
            <p className="text-gray-600">{company.longDescription || company.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Founded</h4>
                <p className="text-gray-900 flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  {company.founded}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Team Size</h4>
                <p className="text-gray-900 flex items-center">
                  <Users className="h-4 w-4 text-gray-400 mr-2" />
                  {company.employees} employees
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Address</h4>
                <p className="text-gray-900 flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  {company.address}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Operating Hours</h4>
                <div className="space-y-1">
                  {company.operatingHours.map((hours, index) => (
                    <p key={index} className="text-gray-900 flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      {hours.days}: {hours.hours}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h3 className="text-xl font-extralight mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center mr-3">
                  <Phone className="h-5 w-5 text-sky-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                  <p className="text-gray-900">{company.phone}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center mr-3">
                  <Mail className="h-5 w-5 text-sky-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p className="text-gray-900">{company.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center mr-3">
                  <Globe className="h-5 w-5 text-sky-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Website</h4>
                  <p className="text-gray-900">{company.website}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h3 className="text-xl font-extralight mb-4">Certifications & Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {company.certifications.map((cert, index) => (
                <div key={index} className="flex items-center bg-gray-50 p-3 rounded-xl">
                  <Award className="h-5 w-5 text-amber-500 mr-3" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h3 className="text-xl font-extralight mb-4">Our Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {company.teamMembers.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 bg-gray-100">
                    <img src={member.image || image1} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-medium">{member.name}</h4>
                  <p className="text-gray-500 text-sm">{member.position}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === "services" ? (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-sm ">
            <h3 className="text-xl font-extralight mb-4 mt-[-20px]">Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {company.services.map((service) => (
                <div
                  key={service.id}
                  className="group cursor-pointer bg-gray-200/70 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col h-[450px]"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={service.image || image1}
                      alt={service.name}
                      className="w-full h-64 object-cover transform transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-black">{service.name}</h3>
                  <p className="text-sm text-gray-600 mb-16 line-clamp-3">{service.description}</p>
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                    <span className="text-lg font-medium text-black">₱{service.price.toLocaleString()}</span>
                    <button className="text-sky-500 flex items-center transition-all duration-300 hover:text-blue-600 hover:translate-x-1">
                      See More <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          {/* Rating Summary */}
          <div className="bg-white rounded-3xl shadow-sm p-6 mt-[-50px]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-extralight">Customer Reviews</h3>
                <p className="text-gray-500">See what our customers are saying about us</p>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  <div className="text-3xl font-bold text-gray-900 mr-2">{company.rating.toFixed(1)}</div>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < Math.floor(company.rating) ? "fill-current" : ""}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-500 text-sm">{company.reviews.toLocaleString()} reviews</p>
              </div>
            </div>

            <div className="space-y-1">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = company.customerReviews.filter((r) => Math.floor(r.rating) === rating).length
                const percentage = (count / company.customerReviews.length) * 100

                return (
                  <div key={rating} className="flex items-center">
                    <div className="flex items-center w-16">
                      <span className="text-sm text-gray-600 mr-1">{rating}</span>
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div className="h-2 bg-yellow-400 rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <div className="w-12 text-right text-sm text-gray-600">{percentage.toFixed(0)}%</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-4">
            {company.customerReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-3xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-100">
                      <img
                        src={review.customerImage || image1}
                        alt={review.customerName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{review.customerName}</h4>
                      <p className="text-gray-500 text-sm">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(review.rating) ? "fill-current" : ""}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )

    return content
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif]">
      <div className="bg-gray-50 rounded-3xl w-full max-w-5xl h-[95vh] overflow-hidden flex flex-col shadow-2xl transition-all duration-300 ease-in-out">
        {/* Cover Photo */}
        <div className="relative h-64 overflow-hidden">
          <img src={company.coverPhoto || image1} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/20 backdrop-blur-xl p-2 rounded-full hover:bg-black/30 transition-all duration-200 text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="relative px-8 pb-4">
          <div className="absolute -top-16 left-8 flex items-end">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                <img src={company.logo || image1} alt={company.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="ml-4 mb-4">
              <h1 className="text-2xl font-semibold text-gray-700 mt-20">{company.name}</h1>
              <div className="flex items-center gap-2 mt-1 text-gray-700">
                <MapPin className="h-4 w-4" />
                <span>{company.address}</span>
              </div>
            </div>
          </div>

          <div className="pt-20">
            {/* Stats Section */}
            <div className="flex gap-6 mb-4 mt-3">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(company.rating) ? "fill-current" : ""}`} />
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  {company.rating.toFixed(1)} ({company.reviews.toLocaleString()} reviews)
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-500" />
                <div className="text-sm text-gray-600">Since {company.founded}</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3 mb-6">
              <button className="flex items-center gap-1 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                <MessageSquare className="h-4 w-4" />
                <span>Chat</span>
              </button>
              <button className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                <Star className="h-4 w-4" />
                <span>Review</span>
              </button>
              <button className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                <Flag className="h-4 w-4" />
                <span>Report</span>
              </button>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px overflow-x-auto">
                <button
                  onClick={() => setActiveTab("about")}
                  className={`py-4 px-6 font-medium text-sm border-b-2 flex items-center gap-2 ${
                    activeTab === "about"
                      ? "border-sky-500 text-sky-500"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Building className="h-4 w-4" />
                  About
                </button>
                <button
                  onClick={() => setActiveTab("services")}
                  className={`py-4 px-6 font-medium text-sm border-b-2 flex items-center gap-2 ${
                    activeTab === "services"
                      ? "border-sky-500 text-sky-500"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Services
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`py-4 px-6 font-medium text-sm border-b-2 flex items-center gap-2 ${
                    activeTab === "reviews"
                      ? "border-sky-500 text-sky-500"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Star className="h-4 w-4" />
                  Reviews
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Content Section - Scrollable */}
        <div className="overflow-y-auto flex-grow p-8 h-[calc(85vh-400px)] transition-all duration-300 ease-in-out">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 mt-auto bg-white">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyModal
