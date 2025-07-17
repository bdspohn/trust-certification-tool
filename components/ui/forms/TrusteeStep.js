// components/ui/forms/TrusteeStep.js
import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function TrusteeStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "trustees",
  });

  return (
    <div className="space-y-6">
      {/* Step explainer */}
      <div className="mb-4 p-4 bg-blue-50 rounded">
        <h2 className="text-lg font-semibold mb-2">Trustees</h2>
        <p className="text-sm text-gray-700">
          Enter the name of each trustee for your trust. A trustee is the person or institution responsible for managing the trust according to its terms. Most trusts have one or more trustees. If you have co-trustees, add each one separately.
        </p>
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded-xl space-y-4 bg-gray-50">
          <div>
            <Label htmlFor={`trustees.${index}.name`}>Trustee Name</Label>
            <Input
              id={`trustees.${index}.name`}
              {...register(`trustees.${index}.name`)}
            />
            {errors.trustees?.[index]?.name && (
              <p className="text-sm text-red-600 mt-1">
                {errors.trustees[index].name.message}
              </p>
            )}
          </div>

          {fields.length > 1 && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
              className="mt-2"
            >
              Remove Trustee
            </Button>
          )}
        </div>
      ))}

      <Button
        type="button"
        onClick={() => append({ name: "" })}
        className="mt-4"
      >
        + Add Trustee
      </Button>
    </div>
  );
}
