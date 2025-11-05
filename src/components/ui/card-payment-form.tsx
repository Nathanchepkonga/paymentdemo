import { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";

interface CardDetails {
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
}

interface CardPaymentFormProps {
  onPay: (details: CardDetails) => void;
  disabled?: boolean;
}

export const CardPaymentForm = ({ onPay, disabled }: CardPaymentFormProps) => {
  const [number, setNumber] = useState("");
  const [holder, setHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState<string | null>(null);

  const validate = () => {
    if (!number.replace(/\s+/g, "").match(/^\d{12,19}$/)) {
      return "Enter a valid card number (12-19 digits)";
    }
    if (!holder.trim()) return "Enter card holder name";
    if (!expiry.match(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)) return "Expiry must be MM/YY";
    if (!cvv.match(/^\d{3,4}$/)) return "CVV must be 3 or 4 digits";
    return null;
  };

  const handlePay = () => {
    const err = validate();
    setErrors(err);
    if (!err) {
      onPay({ number, holder, expiry, cvv });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="card-number">Card number</Label>
        <Input
          id="card-number"
          placeholder="1234 5678 9012 3456"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="card-holder">Card holder</Label>
        <Input
          id="card-holder"
          placeholder="Full name"
          value={holder}
          onChange={(e) => setHolder(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label htmlFor="expiry">Valid thru</Label>
          <Input
            id="expiry"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            placeholder="123"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </div>
      </div>

      {errors && <div className="text-destructive text-sm">{errors}</div>}

      <Button variant="accent" className="w-full" size="lg" disabled={disabled} onClick={handlePay}>
        Pay
      </Button>
    </div>
  );
};

export default CardPaymentForm;
