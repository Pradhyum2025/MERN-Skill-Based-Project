import React, { useState } from 'react';

const ReturnRequestForm = () => {
  const [formData, setFormData] = useState({
    requestAccepted: '',
    productReturnedSame: '',
    productCondition: '',
    returnReasonValid: '',
    originalPackaging: '',
    overallRating: '',
    daysToReturn: '',
    imageProof: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      imageProof: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Check if all required fields are filled
    const requiredFields = ['requestAccepted', 'productReturnedSame', 'productCondition', 'returnReasonValid', 'originalPackaging', 'overallRating', 'daysToReturn'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0 || !formData.imageProof) {
      setSubmitStatus('validation');
      setIsSubmitting(false);
      return;
    }

    try {
      const submitData = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'imageProof' && formData[key]) {
          submitData.append(key, formData[key]);
        } else if (key !== 'imageProof') {
          submitData.append(key, formData[key]);
        }
      });

      const response = await fetch('http://localhost:3001/api/sendata', {
        method: 'POST',
        body: submitData
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitStatus('success');
        console.log('Response:', result);
        
        // Reset form after successful submission
        setFormData({
          requestAccepted: '',
          productReturnedSame: '',
          productCondition: '',
          returnReasonValid: '',
          originalPackaging: '',
          overallRating: '',
          daysToReturn: '',
          imageProof: null
        });
        
        // Reset file input
        const fileInput = document.getElementById('imageProof');
        if (fileInput) fileInput.value = '';
      } else {
        throw new Error('Failed to submit form');
      }

    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Return Request Form</h1>
          <p className="text-slate-300 text-lg">Please fill out all the required information below</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="space-y-8">
            {/* Request Acceptance */}
            <div className="group">
              <label className="block text-sm font-semibold text-white/90 mb-3 group-hover:text-purple-300 transition-colors">
                Is brother's request accepted? <span className="text-red-400">*</span>
              </label>
              <select
                name="requestAccepted"
                value={formData.requestAccepted}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm hover:bg-white/10 transition-all duration-200"
              >
                <option value="" className="bg-slate-800 text-white">Select...</option>
                <option value="yes" className="bg-slate-800 text-white">Yes</option>
                <option value="no" className="bg-slate-800 text-white">No</option>
              </select>
            </div>

            {/* Product Returned Same */}
            <div className="group">
              <label className="block text-sm font-semibold text-white/90 mb-3 group-hover:text-purple-300 transition-colors">
                Was the product returned the same as delivered (correct item)? <span className="text-red-400">*</span>
              </label>
              <select
                name="productReturnedSame"
                value={formData.productReturnedSame}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm hover:bg-white/10 transition-all duration-200"
              >
                <option value="" className="bg-slate-800 text-white">Select...</option>
                <option value="yes" className="bg-slate-800 text-white">Yes</option>
                <option value="no" className="bg-slate-800 text-white">No</option>
              </select>
            </div>

            {/* Product Condition */}
            <div className="group">
              <label className="block text-sm font-semibold text-white/90 mb-3 group-hover:text-purple-300 transition-colors">
                What was the condition of the returned product? <span className="text-red-400">*</span>
              </label>
              <select
                name="productCondition"
                value={formData.productCondition}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm hover:bg-white/10 transition-all duration-200"
              >
                <option value="" className="bg-slate-800 text-white">Select...</option>
                <option value="good" className="bg-slate-800 text-white">Good</option>
                <option value="slightly_used" className="bg-slate-800 text-white">Slightly Used</option>
                <option value="heavily_used" className="bg-slate-800 text-white">Heavily Used</option>
                <option value="damaged" className="bg-slate-800 text-white">Damaged</option>
                <option value="broken" className="bg-slate-800 text-white">Broken</option>
              </select>
            </div>

            {/* Return Reason Valid */}
            <div className="group">
              <label className="block text-sm font-semibold text-white/90 mb-3 group-hover:text-purple-300 transition-colors">
                Was the return reason provided by the customer valid? <span className="text-red-400">*</span>
              </label>
              <select
                name="returnReasonValid"
                value={formData.returnReasonValid}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm hover:bg-white/10 transition-all duration-200"
              >
                <option value="" className="bg-slate-800 text-white">Select...</option>
                <option value="yes" className="bg-slate-800 text-white">Yes</option>
                <option value="partially" className="bg-slate-800 text-white">Partially</option>
                <option value="no" className="bg-slate-800 text-white">No</option>
              </select>
            </div>

            {/* Original Packaging */}
            <div className="group">
              <label className="block text-sm font-semibold text-white/90 mb-3 group-hover:text-purple-300 transition-colors">
                Was the original packaging and tags intact? <span className="text-red-400">*</span>
              </label>
              <select
                name="originalPackaging"
                value={formData.originalPackaging}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm hover:bg-white/10 transition-all duration-200"
              >
                <option value="" className="bg-slate-800 text-white">Select...</option>
                <option value="yes" className="bg-slate-800 text-white">Yes</option>
                <option value="partially" className="bg-slate-800 text-white">Partially</option>
                <option value="no" className="bg-slate-800 text-white">No</option>
              </select>
            </div>

            {/* Overall Rating */}
            <div className="group">
              <label className="block text-sm font-semibold text-white/90 mb-3 group-hover:text-purple-300 transition-colors">
                How would you rate the overall return experience with the customer? <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-5 gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, overallRating: rating.toString() }))}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      formData.overallRating === rating.toString()
                        ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                        : 'border-white/10 bg-white/5 text-white/70 hover:border-purple-400 hover:bg-purple-500/10'
                    }`}
                  >
                    <div className="text-2xl mb-1">
                      {rating === 1 ? '😞' : rating === 2 ? '😐' : rating === 3 ? '🙂' : rating === 4 ? '😊' : '🤩'}
                    </div>
                    <div className="text-xs font-medium">
                      {rating === 1 ? 'Poor' : rating === 2 ? 'Fair' : rating === 3 ? 'Good' : rating === 4 ? 'Very Good' : 'Excellent'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Days to Return */}
            <div className="group">
              <label className="block text-sm font-semibold text-white/90 mb-3 group-hover:text-purple-300 transition-colors">
                How many days did the customer take to return the product? <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {['1', '2', '3', '4', '5', '6', '7', '7+'].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, daysToReturn: days }))}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 font-medium ${
                      formData.daysToReturn === days
                        ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                        : 'border-white/10 bg-white/5 text-white/70 hover:border-purple-400 hover:bg-purple-500/10'
                    }`}
                  >
                    {days} {days === '1' ? 'day' : 'days'}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Proof Upload */}
            <div className="group">
              <label className="block text-sm font-semibold text-white/90 mb-3 group-hover:text-purple-300 transition-colors">
                Image Proof Upload <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="imageProof"
                  name="imageProof"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 ${
                  formData.imageProof ? 'border-purple-400 bg-purple-500/10' : 'border-white/20 hover:border-purple-400'
                }`}>
                  <div className="text-center">
                    <svg className="w-8 h-8 text-white/60 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-white/70 text-sm">
                      {formData.imageProof ? formData.imageProof.name : 'Click to upload image'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit Return Request'
                )}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'validation' && (
              <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 rounded-xl backdrop-blur-sm animate-pulse">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Please fill out all required fields including image upload.
                </div>
              </div>
            )}
            
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-500/20 border border-green-500/30 text-green-300 rounded-xl backdrop-blur-sm animate-pulse">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Form submitted successfully!
                </div>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl backdrop-blur-sm animate-pulse">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Error submitting form. Please try again.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnRequestForm;