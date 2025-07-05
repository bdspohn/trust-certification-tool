// components/forms/PowersStep.js
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const POWER_OPTIONS = [
  "Sell Real Estate",
  "Borrow Money",
  "Open/Close Accounts",
  "Other"
];

export default function PowersStep() {
  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext();

  const powers = watch("powers") || [];

  const isChecked = (power) => powers.includes(power);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Trustee Powers</h3>

      <div className="space-y-2">
        {POWER_OPTIONS.map((power) => (
          <label key={power} className="block">
            <input
              type="checkbox"
              value={power}
              {...register("powers")}
              defaultChecked={isChecked(power)}
              className="mr-2"
            />
            {power}
          </label>
        ))}

        {isChecked("Other") && (
          <div className="mt-2">
            <Label>Other Power Description</Label>
            <Input {...register("otherPower")} placeholder="Describe other power..." />
            {errors.otherPower && <p className="text-red-500 text-sm">{errors.otherPower.message}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
