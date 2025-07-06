import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trustFormSchema } from "@/components/ui/forms/formSchema";
import TrustInfoStep from "@/components/ui/forms/TrustInfoStep";
import TrusteeStep from "@/components/ui/forms/TrusteeStep";
import PowersStep from "@/components/ui/forms/PowersStep";
import ReviewStep from "@/components/ui/forms/ReviewStep";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Home() {
  const methods = useForm({
    resolver: zodResolver(trustFormSchema),
    defaultValues: {
      trustName: "",
      trustDate: "",
      trustees: [{ name: "", title: "" }],
      powers: [],
    },
  });

  const [step, setStep] = useState(0);

  const steps = [
    <TrustInfoStep key="info" />, 
    <TrusteeStep key="trustees" />, 
    <PowersStep key="powers" />, 
    <ReviewStep key="review" />
  ];

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (data) => {
    const doc = new jsPDF();
    doc.text("Trust Certification", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Field", "Value"]],
      body: [
        ["Trust Name", data.trustName],
        ["Trust Date", data.trustDate],
        ...data.trustees.map((t, i) => [
          `Trustee ${i + 1}`,
          `${t.name}, ${t.title}`,
        ]),
        ["Powers", data.powers.length > 0 ? data.powers.join(", ") : "None"],
      ],
    });

    doc.save("trust-certification.pdf");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {steps[step]}
            <div className="flex justify-between mt-8">
              {step > 0 && (
                <Button type="button" onClick={prevStep}>
                  Back
                </Button>
              )}
              {step < steps.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit">Generate PDF</Button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
