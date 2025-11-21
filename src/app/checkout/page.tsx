'use client'

import { Button } from "@/components/ui/button"
import { CheckCircle, CreditCard, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
    return (
        <div className="min-h-screen bg-muted/30 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-card rounded-2xl shadow-xl border border-border/50 overflow-hidden">
                    <div className="p-10 text-center border-b border-border/50">
                        <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                            <CheckCircle className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-foreground mb-4 font-heading">Application Received!</h1>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                            Your application to the Akademyx Masterclass Programme has been successfully submitted. Please proceed to payment to finalize your enrollment.
                        </p>
                    </div>

                    <div className="p-10 bg-muted/20">
                        <div className="max-w-md mx-auto space-y-8">
                            <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-muted-foreground">Application Fee</span>
                                    <span className="text-xl font-bold text-foreground">₦5,000.00</span>
                                </div>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-muted-foreground">Tuition Deposit</span>
                                    <span className="text-xl font-bold text-foreground">₦20,000.00</span>
                                </div>
                                <div className="border-t border-border/50 pt-6 flex justify-between items-center">
                                    <span className="font-semibold text-foreground text-lg">Total Due</span>
                                    <span className="text-3xl font-bold text-primary">₦25,000.00</span>
                                </div>
                            </div>

                            <Button className="w-full h-14 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5">
                                <CreditCard className="w-6 h-6 mr-3" />
                                Pay Now with Paystack
                            </Button>

                            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                <p>Secure payment processing via Paystack. Your data is encrypted.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
