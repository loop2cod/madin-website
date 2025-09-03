import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from '@/Hooks/use-toast';
import axios from 'axios';
import { Loader2 } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface ApplicationFeePaymentProps {
  handleStep: (step: number) => void;
  applicationId: string;
}

const ApplicationFeePayment = ({ handleStep, applicationId }: ApplicationFeePaymentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitiating, setIsInitiating] = useState(false);
  const [applicationData, setApplicationData] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'failed'>('pending');

  // Fetch application data
  useEffect(() => {
    const fetchApplicationData = async () => {
      if (!applicationId) return;
      
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/application/${applicationId}`
        );
        
        if (response?.data?.success && response.data.data) {
          setApplicationData(response.data.data);
          
          // Check if payment is already done
          if (response.data.data.paymentDetails && response.data.data.paymentDetails?.application_fee?.status === 'completed') {
            setPaymentStatus('success');
          }else{
            setPaymentStatus(response?.data?.data?.paymentDetails?.application_fee?.status || 'pending');
          }
        }
      } catch (error: any) {
        console.error("Error fetching application data:", error);
        toast({
          title: "Error",
          description: "Failed to load application data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApplicationData();
  }, [applicationId]);

  const initiatePayment = async () => {
    if (!applicationId) return;
    
    setIsInitiating(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/create-payment`,
        { applicationId }
      );
      
      if (response?.data?.success) {
        const { paymentId, orderId, amount, currency, key_id, prefill } = response.data.data;
        
        // Load Razorpay script if not already loaded
        if (!window.Razorpay) {
          await loadRazorpayScript();
        }
        
        // Create Razorpay instance and open payment modal
        const razorpay = new window.Razorpay({
          key: key_id,
          amount: amount * 100, // Convert to paise
          currency: currency,
          name: 'Madin College',
          description: 'Application Fee Payment',
          order_id: orderId,
          handler: function (response: any) {
            // Handle successful payment
            verifyPayment(
              applicationId, 
              paymentId, 
              response.razorpay_payment_id, 
              response.razorpay_order_id, 
              response.razorpay_signature
            );
          },
          prefill: {
            name: prefill.name,
            email: prefill.email,
            contact: prefill.contact,
          },
          notes: {
            applicationId: applicationId,
          },
          theme: {
            color: '#3399cc',
          },
          modal: {
            ondismiss: function () {
              setIsInitiating(false);
              toast({
                title: "Payment Cancelled",
                description: "You have cancelled the payment process",
                variant: "destructive",
              });
            },
          },
        });
        
        razorpay.open();
      } else {
        toast({
          title: "Error",
          description: response?.data?.message || "Failed to initiate payment",
          variant: "destructive",
        });
        setIsInitiating(false);
      }
    } catch (error: any) {
      console.error("Error initiating payment:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || error?.message || "Something went wrong",
        variant: "destructive",
      });
      setIsInitiating(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };

  const verifyPayment = async (
    applicationId: string,
    paymentId: string,
    razorpayPaymentId: string,
    razorpayOrderId: string,
    razorpaySignature: string
  ) => {
    setPaymentStatus('processing');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ADMISSION_API_URL}/api/v1/admission/verify-payment`,
        {
          applicationId,
          paymentId,
          razorpayPaymentId,
          razorpayOrderId,
          razorpaySignature,
        }
      );
      
      if (response?.data?.success) {
        setPaymentStatus('success');
        toast({
          title: "Payment Successful",
          description: "Your application fee payment has been successfully processed",
        });
        
        // Proceed to next step after a short delay
        setTimeout(() => {
          handleStep(5);
        }, 2000);
      } else {
        setPaymentStatus('failed');
        toast({
          title: "Payment Verification Failed",
          description: response?.data?.message || "Failed to verify payment",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setPaymentStatus('failed');
      console.error("Error verifying payment:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || error?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsInitiating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-secondary"></div>
        <span className="ml-3 text-gray-700">Loading application details...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Application Fee Payment</h1>
        <p className="text-gray-700 text-sm leading-relaxed">
          Complete your application by paying the application fee
        </p>
      </div>

      <Card className="border border-gray-200 rounded-none">
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>
            Please pay the application fee to proceed with your application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Application ID</p>
              <p className="text-base font-medium">{applicationId}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Applicant Name</p>
              <p className="text-base font-medium">
                {applicationData?.personalDetails?.fullName || "Not available"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Fee Amount</p>
              <p className="text-base font-medium">₹ {applicationData?.feeAmount || "500"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Payment Status</p>
              <p className={`text-base font-medium ${
                paymentStatus === 'success' ? 'text-green-600' : 
                paymentStatus === 'failed' ? 'text-red-600' : 
                paymentStatus === 'processing' ? 'text-amber-600' : 'text-gray-600'
              }`}>
                {paymentStatus === 'success' ? 'Paid' : 
                 paymentStatus === 'failed' ? 'Failed' : 
                 paymentStatus === 'processing' ? 'Processing' : 'Pending'}
              </p>
            </div>
          </div>

          {paymentStatus === 'failed' && (
            <div className="bg-red-50 p-3 rounded-md">
              <p className="text-red-700 text-sm">
                Your payment could not be processed. Please try again.
              </p>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div className="bg-green-50 p-3 rounded-md">
              <p className="text-green-700 text-sm">
                Your payment has been successfully processed. You can now proceed to the next step.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => handleStep(3)}
            disabled={isInitiating || paymentStatus === 'processing'}
            className="rounded-none border-secondary text-secondary"
          >
            Back
          </Button>
          
          {paymentStatus !== 'success' && (
            <Button
              onClick={initiatePayment}
              disabled={isInitiating || paymentStatus === 'processing'}
              className="bg-secondary hover:bg-secondary/80 text-white rounded-none"
            >
              {isInitiating || paymentStatus === 'processing' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Pay Now'
              )}
            </Button>
          )}
          
          {paymentStatus === 'success' && (
            <Button
              onClick={() => handleStep(5)}
              className="bg-secondary hover:bg-secondary/80 text-white rounded-none"
            >
              Continue
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApplicationFeePayment;