import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trustFormSchema } from "@/components/ui/forms/formSchema";
import { Button } from "@/components/ui/button";
import { StepNavigation } from "@/components/ui/StepNavigation";
import TrustInfoStep from "@/components/ui/forms/TrustInfoStep";
import TrusteeStep from "@/components/ui/forms/TrusteeStep";
import PowersStep from "@/components/ui/forms/PowersStep";
import ReviewStep from "@/components/ui/forms/ReviewStep";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function TrustTool() {
  const methods = useForm({
    resolver: zodResolver(trustFormSchema),
    defaultValues: {
      trustName: "",
      trustDate: "",
      trustees: [{ name: "", title: "" }],
      investmentPowers: "",
      distributionPowers: "",
      administrativePowers: "",
      restrictions: "",
    },
  });

  const [step, setStep] = useState(0);

  const steps = [
    <TrustInfoStep key="info" />,
    <TrusteeStep key="trustees" />,
    <PowersStep key="powers" />,
    <ReviewStep key="review" />,
  ];

  const nextStep = () => {
    const isValid = methods.trigger();
    if (isValid) {
      setStep((s) => Math.min(s + 1, steps.length - 1));
    }
  };
  
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (data) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text("Trust Certification Report", 14, 20);
    
    // Trust Information
    doc.setFontSize(12);
    doc.text("Trust Information", 14, 40);
    doc.setFontSize(10);
    doc.text(`Trust Name: ${data.trustName}`, 14, 50);
    doc.text(`Trust Date: ${data.trustDate}`, 14, 60);
    
    // Trustees
    doc.setFontSize(12);
    doc.text("Trustees", 14, 80);
    doc.setFontSize(10);
    data.trustees.forEach((trustee, index) => {
      const yPos = 90 + (index * 10);
      doc.text(`${trustee.name}, ${trustee.title}`, 14, yPos);
    });
    
    // Powers
    const powersY = 90 + (data.trustees.length * 10) + 20;
    doc.setFontSize(12);
    doc.text("Trust Powers", 14, powersY);
    doc.setFontSize(10);
    
    let currentY = powersY + 10;
    if (data.investmentPowers) {
      doc.text(`Investment Powers: ${data.investmentPowers}`, 14, currentY);
      currentY += 10;
    }
    if (data.distributionPowers) {
      doc.text(`Distribution Powers: ${data.distributionPowers}`, 14, currentY);
      currentY += 10;
    }
    if (data.administrativePowers) {
      doc.text(`Administrative Powers: ${data.administrativePowers}`, 14, currentY);
      currentY += 10;
    }
    if (data.restrictions) {
      doc.text(`Restrictions: ${data.restrictions}`, 14, currentY);
    }
    
    doc.save("trust-certification.pdf");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Trust Certification Tool
          </h1>
          <p className="text-lg text-gray-600">
            Generate professional trust certification reports in minutes
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {/* Step Navigation */}
              <StepNavigation currentStep={step} totalSteps={steps.length} />
              
              {/* Current Step */}
              <div className="min-h-[400px]">
                {steps[step]}
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                {step > 0 && (
                  <Button 
                    type="button" 
                    onClick={prevStep}
                    variant="outline"
                    className="px-6"
                  >
                    ← Back
                  </Button>
                )}
                <div className="flex-1" />
                {step < steps.length - 1 ? (
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    className="px-6"
                  >
                    Next →
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    className="px-8 bg-green-600 hover:bg-green-700"
                  >
                    Generate PDF Report
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
} 