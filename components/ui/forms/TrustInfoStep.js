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
      <div>
        <Label htmlFor="trustName">Trust Name</Label>
        <Input id="trustName" {...register("trustName")} />
        {errors.trustName && (
          <p className="text-sm text-red-600 mt-1">{errors.trustName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="trustDate">Trust Date</Label>
        <Input id="trustDate" type="date" {...register("trustDate")} />
        {errors.trustDate && (
          <p className="text-sm text-red-600 mt-1">{errors.trustDate.message}</p>
        )}
      </div>
    </div>
  );
}
