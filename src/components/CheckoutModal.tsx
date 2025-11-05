import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { countries } from "@/data/countries";
import { Country, PaymentProvider, PaymentStatus } from "@/types/payment";
import { CheckCircle2, Loader2, CreditCard, Smartphone, Building2 } from "lucide-react";
import CardPaymentForm from "./ui/card-payment-form";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  total: number;
}

export const CheckoutModal = ({ open, onClose, total }: CheckoutModalProps) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState<PaymentStatus>("selecting");

  const handlePayment = () => {
    setStatus("processing");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        handleClose();
      }, 2500);
    }, 2000);
  };

  const handleClose = () => {
    setStatus("selecting");
    setSelectedCountry(null);
    setSelectedProvider(null);
    setPhoneNumber("");
    onClose();
  };

  const getProviderIcon = (type: string) => {
    switch (type) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "bank":
        return <Building2 className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Complete Payment</DialogTitle>
        </DialogHeader>

        {status === "success" ? (
          <div className="py-12 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-card-foreground mb-2">Payment Successful!</h3>
              <p className="text-muted-foreground">Your order has been confirmed</p>
            </div>
          </div>
        ) : status === "processing" ? (
          <div className="py-12 text-center space-y-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
            <div>
              <h3 className="text-xl font-bold text-card-foreground mb-2">Processing Payment</h3>
              <p className="text-muted-foreground">Please wait...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="text-2xl font-bold text-card-foreground">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="country">Select Country</Label>
                <Select 
                  value={selectedCountry?.code} 
                  onValueChange={(code) => {
                    const country = countries.find(c => c.code === code);
                    setSelectedCountry(country || null);
                    setSelectedProvider(null);
                  }}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Choose your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCountry && (
                <div className="space-y-2">
                  <Label htmlFor="provider">Payment Method</Label>
                  <Select 
                    value={selectedProvider?.name} 
                    onValueChange={(name) => {
                      const provider = selectedCountry.providers.find(p => p.name === name);
                      setSelectedProvider(provider || null);
                    }}
                  >
                    <SelectTrigger id="provider">
                      <SelectValue placeholder="Choose payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCountry.providers.map((provider) => (
                        <SelectItem key={provider.name} value={provider.name}>
                          <div className="flex items-center gap-2">
                            {getProviderIcon(provider.type)}
                            {provider.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedProvider && selectedProvider.type === "mobile" && (
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number</Label>
                  <Input 
                    id="phone"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              )}
            </div>

            {selectedProvider && (selectedProvider.name === "Visa" || selectedProvider.name === "Mastercard") ? (
              <CardPaymentForm
                onPay={() => handlePayment()}
              />
            ) : (
              <Button 
                variant="accent" 
                className="w-full" 
                size="lg"
                disabled={!selectedProvider || (selectedProvider.type === "mobile" && !phoneNumber)}
                onClick={handlePayment}
              >
                Pay ${total.toFixed(2)}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
