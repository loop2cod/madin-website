import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BlurIn from "@/components/ui/blur-in"

const Policies = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("terms")

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const renderContent = (tab: string) => {
    switch (tab) {
      case "terms":
        return (
          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              Terms and Conditions
            </h3>
            <p className="text-muted-foreground mb-4">
              Madin College of Engineering and Management provides online payment facilities for students and applicants to pay admission fees, tuition fees, exam fees and other approved payments.
            </p>
            <p className="text-muted-foreground mb-4">
              By proceeding with the payment, you agree to the following terms:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Payments made through this portal are for official academic or institutional purposes only.</li>
              <li>Students must ensure accuracy of details such as name, registration number, and course before payment.</li>
              <li>Successful payment confirmation will be displayed instantly or sent via email/SMS.</li>
              <li>The College reserves the right to modify fee structures or policies without prior notice.</li>
              <li>Any misuse, fraudulent transaction, or technical manipulation will result in cancellation and may attract disciplinary or legal action.</li>
            </ul>
          </div>
        )
      case "privacy":
        return (
          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
             Privacy Policy
            </h3>
            <p className="text-muted-foreground mb-4">
              Madin College of Engineering and Management respects your privacy. Personal data such as name, email, contact number, and transaction details are collected solely for processing payments and maintaining academic records.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>No personal information will be shared, sold, or rented to third parties, except as required by law or payment gateway partners (like Razorpay) for transaction processing.</li>
              <li>All payment transactions are processed securely using SSL encryption and PCI-DSS–compliant systems.</li>
              <li>The College is not responsible for any data loss due to user negligence, internet issues, or unauthorized access outside its control.</li>
            </ul>
          </div>
        )
      case "refund":
        return (
          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
               Refund Policy
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Fees once paid are non-refundable, except in cases of transaction failure (amount debited but not confirmed) or duplicate payment.</li>
              <li>Any refund request must be submitted in writing to the college office with proof of payment within 7 working days of the transaction.</li>
              <li>Approved refunds will be processed to the same bank account or payment source within 10–15 working days.</li>
              <li>The refund decision by the college administration shall be final and binding.</li>
            </ul>
          </div>
        )
      case "cancellation":
        return (
          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              Cancellation Policy
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Once a fee is paid successfully, it cannot be canceled through the online portal.</li>
              <li>In case of any accidental or duplicate transactions, a written request can be made to the Accounts Department with supporting documents.</li>
              <li>The college reserves the right to cancel a transaction if it is found invalid, incomplete, or made with incorrect details.</li>
              <li>No cancellation will be allowed after the payment has been officially recorded in the college database.</li>
            </ul>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="mx-auto">
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <img
              src="/graduation.jpg"
              alt="Campus View"
              className="object-cover brightness-[0.4] h-9/10 w-full"
            />
          </div>
          <div className="container relative z-10 py-24 md:py-36 lg:py-48 px-4 md:px-8">
            <div className="max-w-3xl space-y-4 text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-serif">
                Policies and Terms
              </h1>
              <p className="text-lg md:text-xl">
                Important information regarding our terms, privacy, refunds, and cancellations.
              </p>
            </div>
          </div>
        </section>

        <section className="md:max-w-[90vw] mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="container">
            <div className="mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                <BlurIn
                  word="College Policies"
                  className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text pr-5 font-serif"
                />
              </h2>
              <p className="text-lg text-muted-foreground">
                Please review our policies carefully before proceeding with any transactions or services.
              </p>
            </div>

            {isMobile ? (
              <div className="space-y-6">
                <Select value={activeTab} onValueChange={setActiveTab}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="terms">Terms & Conditions</SelectItem>
                    <SelectItem value="privacy">Privacy Policy</SelectItem>
                    <SelectItem value="refund">Refund Policy</SelectItem>
                    <SelectItem value="cancellation">Cancellation Policy</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-6">
                  {renderContent(activeTab)}
                </div>
              </div>
            ) : (
              <Tabs defaultValue="terms" className="mx-auto">
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-gradient-to-r from-secondary/10 to-secondary/10">
                  <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
                  <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
                  <TabsTrigger value="refund">Refund Policy</TabsTrigger>
                  <TabsTrigger value="cancellation">Cancellation Policy</TabsTrigger>
                </TabsList>

                <TabsContent value="terms" className="mt-6">
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
                      Terms and Conditions
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Madin College of Engineering and Management provides online payment facilities for students and applicants to pay admission fees, tuition fees, exam fees and other approved payments.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      By proceeding with the payment, you agree to the following terms:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Payments made through this portal are for official academic or institutional purposes only.</li>
                      <li>Students must ensure accuracy of details such as name, registration number, and course before payment.</li>
                      <li>Successful payment confirmation will be displayed instantly or sent via email/SMS.</li>
                      <li>The College reserves the right to modify fee structures or policies without prior notice.</li>
                      <li>Any misuse, fraudulent transaction, or technical manipulation will result in cancellation and may attract disciplinary or legal action.</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="privacy" className="mt-6">
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
                      Privacy Policy
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Madin College of Engineering and Management respects your privacy. Personal data such as name, email, contact number, and transaction details are collected solely for processing payments and maintaining academic records.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>No personal information will be shared, sold, or rented to third parties, except as required by law or payment gateway partners (like Razorpay) for transaction processing.</li>
                      <li>All payment transactions are processed securely using SSL encryption and PCI-DSS–compliant systems.</li>
                      <li>The College is not responsible for any data loss due to user negligence, internet issues, or unauthorized access outside its control.</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="refund" className="mt-6">
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
                      Refund Policy
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Fees once paid are non-refundable, except in cases of transaction failure (amount debited but not confirmed) or duplicate payment.</li>
                      <li>Any refund request must be submitted in writing to the college office with proof of payment within 7 working days of the transaction.</li>
                      <li>Approved refunds will be processed to the same bank account or payment source within 10–15 working days.</li>
                      <li>The refund decision by the college administration shall be final and binding.</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="cancellation" className="mt-6">
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
                      Cancellation Policy
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Once a fee is paid successfully, it cannot be canceled through the online portal.</li>
                      <li>In case of any accidental or duplicate transactions, a written request can be made to the Accounts Department with supporting documents.</li>
                      <li>The college reserves the right to cancel a transaction if it is found invalid, incomplete, or made with incorrect details.</li>
                      <li>No cancellation will be allowed after the payment has been officially recorded in the college database.</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Policies