import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TrustInfoStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      {/* Step explainer */}
      <div className="mb-4 p-4 bg-blue-50 rounded">
        <h2 className="text-lg font-semibold mb-2">About Your Trust</h2>
        <p className="text-sm text-gray-700">
          Let&apos;s start with the basics about your trust. Don&apos;t worry if you&apos;re not sure—most people aren&apos;t experts! We&apos;ll guide you every step of the way.
        </p>
      </div>

      <div>
        <Label htmlFor="trustName">Trust Name</Label>
        <Input id="trustName" {...register("trustName")} />
        <p className="text-xs text-gray-500 mt-1">
          This is usually the full name written at the top of your trust document (e.g., &quot;The Smith Family Trust&quot;).
        </p>
        {errors.trustName && (
          <p className="text-sm text-red-600 mt-1">{errors.trustName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="trustDate">Trust Date</Label>
        <Input id="trustDate" type="date" {...register("trustDate")} />
        <p className="text-xs text-gray-500 mt-1">
          This is the date your trust was created. You can usually find it on the first page of your trust document.
        </p>
        {errors.trustDate && (
          <p className="text-sm text-red-600 mt-1">{errors.trustDate.message}</p>
        )}
      </div>
    </div>
  );
}