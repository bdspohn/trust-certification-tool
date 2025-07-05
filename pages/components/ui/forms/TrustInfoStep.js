// components/forms/TrustInfoStep.js
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function TrustInfoStep() {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <Label>Trust Name</Label>
        <Input {...register("trustName")} placeholder="Enter trust name" />
        {errors.trustName && <p className="text-red-500 text-sm">{errors.trustName.message}</p>}
      </div>

      <div>
        <Label>Date of Trust</Label>
        <Input type="date" {...register("dateOfTrust")} />
        {errors.dateOfTrust && <p className="text-red-500 text-sm">{errors.dateOfTrust.message}</p>}
      </div>

      <div>
        <Label>Date of Last Amendment (Optional)</Label>
        <Input type="date" {...register("amendmentDate")} />
      </div>

      <div>
        <Label>Beneficiary (Optional)</Label>
        <Input {...register("beneficiaryName")} placeholder="Name of beneficiary" />
      </div>

      <div>
        <Label>Trust Type</Label>
        <div className="space-x-4 mt-2">
          <label>
            <input type="radio" value="Revocable" {...register("trustType")} />
            Revocable
          </label>
          <label>
            <input type="radio" value="Irrevocable" {...register("trustType")} />
            Irrevocable
          </label>
        </div>
        {errors.trustType && <p className="text-red-500 text-sm">{errors.trustType.message}</p>}
      </div>
    </div>
  );
}
