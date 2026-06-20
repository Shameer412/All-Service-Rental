'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/common/AuthProvider';
import { nsKey } from '@/lib/storageNamespace';

// Import modular step components
import StepIndicator from '@/components/pages/vendor/profile-setup/StepIndicator';
import AccountStep from '@/components/pages/vendor/profile-setup/AccountStep';
import BusinessStep from '@/components/pages/vendor/profile-setup/BusinessStep';
import VehiclesStep from '@/components/pages/vendor/profile-setup/VehiclesStep';
import DocumentsStep from '@/components/pages/vendor/profile-setup/DocumentsStep';
import SignatureStep from '@/components/pages/vendor/profile-setup/SignatureStep';

type StepId = 1 | 2 | 3 | 4 | 5;

const STEPS = [
  { id: 1, label: 'Account', title: 'Account Information', subtitle: 'Create your vendor account credentials' },
  { id: 2, label: 'Business', title: 'Business Information', subtitle: 'Tell us about your business and insurance' },
  { id: 3, label: 'Vehicles', title: 'Vehicle Information', subtitle: 'Add the trucks you want to list on the platforms' },
  { id: 4, label: 'Documents', title: 'Document Verification', subtitle: 'Upload validation documents to activate premium listing privileges' },
  { id: 5, label: 'Signature', title: 'Agreement & Signature', subtitle: 'Review terms and sign to complete registration' },
];

export default function VendorProfileSetup() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [activeStep, setActiveStep] = useState<StepId>(1); // Let's default to Step 1 now that it's a fully completed component-driven flow!

  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== 'vendor') {
        router.push('/login');
        return;
      }
      const isCompleted =
        localStorage.getItem(nsKey('vendor_profile_completed')) === 'true' ||
        localStorage.getItem('vendor_profile_completed') === 'true';
      const isEditing = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('edit') === 'true';
      if (isCompleted && !isEditing) {
        router.push('/vendor/dashboard');
      }
    }
  }, [user, isLoading, router]);

  // Centralized Form State
  const [formData, setFormData] = useState({
    // Step 1: Account
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',

    // Step 2: Business & Insurance
    companyName: '',
    mcNumber: '',
    licenseNumber: '',
    dotNumber: '',
    insuranceProvider: '',
    policyNumber: '',
    insuranceExpiry: '',

    // Step 3: Vehicle Information
    vehicleType: '',
    vehicleId: '',
    make: '',
    model: '',
    year: '',
    mileage: '',

    // Step 4: Documents
    licenseUploaded: false,
    insuranceUploaded: false,
    taxFormUploaded: false,

    // Step 5: Signature
    signatureName: '',
    agreeToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleFileUpload = (field: 'licenseUploaded' | 'insuranceUploaded' | 'taxFormUploaded') => {
    toast.loading('Uploading document...', { id: 'upload' });
    setTimeout(() => {
      setFormData(prev => ({ ...prev, [field]: true }));
      toast.success('Document uploaded successfully!', { id: 'upload' });
    }, 1200);
  };

  const handleStepSubmit = () => {
    if (activeStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        toast.error('Please fill in all personal account fields.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match.');
        return;
      }
      setActiveStep(2);
    } else if (activeStep === 2) {
      if (!formData.companyName || !formData.insuranceProvider || !formData.policyNumber || !formData.insuranceExpiry) {
        toast.error('Please fill in all required business and insurance details.');
        return;
      }
      setActiveStep(3);
    } else if (activeStep === 3) {
      if (!formData.vehicleType || !formData.make || !formData.model || !formData.year) {
        toast.error('Please fill in all required vehicle details.');
        return;
      }
      setActiveStep(4);
    } else if (activeStep === 4) {
      if (!formData.licenseUploaded || !formData.insuranceUploaded) {
        toast.error('Please upload your Business License and Insurance Certificate.');
        return;
      }
      setActiveStep(5);
    } else if (activeStep === 5) {
      if (!formData.signatureName || !formData.agreeToTerms) {
        toast.error('Please agree to terms and sign your full legal name.');
        return;
      }
      localStorage.setItem(nsKey('vendor_profile_completed'), 'true');
      toast.success('Setup completed! Redirecting to dashboard...', { duration: 3000 });
      setTimeout(() => {
        router.push('/vendor/dashboard');
      }, 2000);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep((prev) => (prev - 1) as StepId);
    }
  };

  const activeStepConfig = STEPS[activeStep - 1];

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center bg-[#001C2F]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#22C55E] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white/60 font-medium">Verifying authorization...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center p-2 sm:p-6 font-sans">
      <div className="w-full max-w-[90%] lg:max-w-[1000px] 2xl:max-w-[1200px] my-12 rounded-[24px] p-6 sm:p-12 shadow-2xl relative" style={{ border: '1.09px solid #2A2F45', backgroundColor: '#001C2F' }}>

        {/* Step Indicator */}
        <StepIndicator
          steps={STEPS}
          activeStep={activeStep}
          onStepClick={(id) => setActiveStep(id as StepId)}
        />

        {/* Content Heading */}
        <div className="mb-10 text-left font-inter">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {activeStepConfig.title}
          </h2>
          <p className="font-semibold mt-2 text-sm sm:text-base text-[#22C55E]">
            {activeStepConfig.subtitle}
          </p>
        </div>

        {/* Modular Step Form Views */}
        <div>
          {activeStep === 1 && (
            <AccountStep
              formData={formData}
              onChange={handleInputChange}
              onNext={handleStepSubmit}
            />
          )}

          {activeStep === 2 && (
            <BusinessStep
              formData={formData}
              onChange={handleInputChange}
              onNext={handleStepSubmit}
              onBack={handleBack}
            />
          )}

          {activeStep === 3 && (
            <VehiclesStep
              formData={formData}
              onChange={handleInputChange}
              onNext={handleStepSubmit}
              onBack={handleBack}
            />
          )}

          {activeStep === 4 && (
            <DocumentsStep
              formData={formData}
              onFileUpload={handleFileUpload}
              onNext={handleStepSubmit}
              onBack={handleBack}
            />
          )}

          {activeStep === 5 && (
            <SignatureStep
              formData={formData}
              onChange={handleInputChange}
              onCheckboxChange={handleCheckboxChange}
              onNext={handleStepSubmit}
              onBack={handleBack}
            />
          )}
        </div>

      </div>
    </div>
  );
}
