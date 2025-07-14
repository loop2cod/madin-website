import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp'
import { useEffect } from 'react'

const MAX_ATTEMPTS = 3

const MobileAdmissionForm = ({
  setStep,
  mobile,
  setMobile,
  otp,
  setOtp,
  step,
  attempts,
  isSubmitting,
  handleMobileSubmit,
  handleResendOtp,
  handleOtpSubmit,
  isOtpVerified,
  handleContinueToNextStep,
  clearLocalStorage
}: any) => {

  const handleOtpChange = (value: string) => {
    setOtp(value)
  }

  // Clear localStorage when moving to next step
  useEffect(() => {
    if (isOtpVerified && step === 'otp' && !isSubmitting) {
      // Auto-proceed to next step if OTP is verified and not currently checking for existing applications
      const timer = setTimeout(() => {
        handleContinueToNextStep()
        clearLocalStorage()
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [isOtpVerified, step, isSubmitting])

  if (step === 'mobile') {
    return (
      <div className="p-2">
        <div className="space-y-6">
          {/* Header */}
          <h1 className="text-2xl font-semibold text-gray-900">Welcome</h1>

          {/* Description */}
          <p className="text-primary/80 text-sm leading-relaxed">
            Please enter your mobile number to start the admission process. We'll send you an OTP for verification.
          </p>

          {/* Mobile Number Form */}
          <div className="space-y-3">
            <Label htmlFor="mobile" className="text-sm font-medium text-primary/80">
              Mobile Number
            </Label>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-primary/80 font-medium">+91</span>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter 10 digit mobile"
                  className="flex-1 text-sm rounded-none"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              * By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
            <Button
              className="w-fit bg-secondary hover:bg-gray-800 text-white rounded-none"
              onClick={handleMobileSubmit}
              disabled={mobile.length !== 10 || isSubmitting}
            >
              {isSubmitting ? 'Sending OTP...' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-2 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">OTP Verification</h1>
        <p className="text-gray-700 text-sm leading-relaxed">
          Enter the 6-digit code sent to your mobile number
        </p>
      </div>

      {/* Mobile Number Display */}
      <div className="space-y-2">
        <p className="text-sm text-gray-700">We've sent a verification code to</p>
        <div className='flex items-center'>
          <p className="text-sm font-medium text-gray-900">+91 {mobile}</p>
          <div
            onClick={() => setStep('mobile')}
            className='text-sm font-medium text-secondary underline cursor-pointer ml-3'>Edit</div>
        </div>
      </div>

      {/* OTP Input */}
      <div className="space-y-4">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={handleOtpChange}
          disabled={attempts >= MAX_ATTEMPTS || isSubmitting || isOtpVerified}
        >
          <InputOTPGroup>
            <InputOTPSlot className="!rounded-none" index={0} />
            <InputOTPSlot className="!rounded-none" index={1} />
            <InputOTPSlot className="!rounded-none" index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot className="!rounded-none" index={3} />
            <InputOTPSlot className="!rounded-none" index={4} />
            <InputOTPSlot className="!rounded-none" index={5} />
          </InputOTPGroup>
        </InputOTP>

        {attempts >= MAX_ATTEMPTS && (
          <p className="text-sm text-red-500">
            Maximum attempts reached. Please try again later.
          </p>
        )}

        {isOtpVerified && (
          <p className="text-sm text-green-500">
            OTP verified successfully! Proceeding to next step...
          </p>
        )}
      </div>

      {/* Resend and Verify Buttons - Only show if OTP is not verified */}
      {!isOtpVerified && (
        <div className="space-y-3">
          <p className="text-sm text-gray-700">Didn't receive the code?</p>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="text-sm rounded-none border border-secondary"
              onClick={handleResendOtp}
              disabled={isSubmitting}
            >
              Resend OTP
            </Button>
            <Button
              className="bg-secondary hover:bg-secondary/80 text-white text-sm rounded-none"
              onClick={handleOtpSubmit}
              disabled={otp?.length !== 6 || isSubmitting || attempts >= MAX_ATTEMPTS}
            >
              Verify OTP
            </Button>
          </div>
        </div>
      )}

      {/* Continue Button - Only enabled after OTP verification */}
      <div className="pt-6 space-y-4">
        <div className="flex flex-col space-y-3">
          <Button
            className="w-fit bg-secondary hover:bg-secondary/80 text-white text-sm rounded-none"
            disabled={!isOtpVerified || isSubmitting}
            onClick={handleContinueToNextStep}
          >
            {isSubmitting ? 'Checking...' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MobileAdmissionForm