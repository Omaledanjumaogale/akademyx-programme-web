'use client'

import { useSearchParams } from 'next/navigation'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { PaymentMethods } from '@/components/payment/PaymentMethods'
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Id } from '@/convex/_generated/dataModel'

export default function CheckoutPage() {
    const searchParams = useSearchParams()
    const applicationId = searchParams.get('applicationId')

    const application = useQuery(api.crud.getPublicApplicationInfo,
        applicationId ? { applicationId: applicationId as Id<"applications"> } : "skip"
    )

    if (!applicationId) {
        return (
            <div className="min-h-screen bg-muted/30 pt-24 pb-12 px-4 flex items-center justify-center">
                <Card className="max-w-md w-full">
                    <CardHeader>
                        <CardTitle className="text-center text-destructive flex flex-col items-center gap-2">
                            <AlertCircle className="w-10 h-10" />
                            Invalid Request
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="mb-6 text-muted-foreground">No application ID provided. Please submit an application first.</p>
                        <Button asChild className="w-full">
                            <Link href="/#apply">Go to Application</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (application === undefined) {
        return (
            <div className="min-h-screen bg-muted/30 pt-24 pb-12 px-4 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        )
    }

    if (application === null) {
        return (
            <div className="min-h-screen bg-muted/30 pt-24 pb-12 px-4 flex items-center justify-center">
                <Card className="max-w-md w-full">
                    <CardHeader>
                        <CardTitle className="text-center text-destructive">Application Not Found</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="mb-6 text-muted-foreground">The application you are looking for does not exist.</p>
                        <Button asChild className="w-full">
                            <Link href="/#apply">Submit New Application</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (application.status === 'paid' || application.status === 'approved') {
        return (
            <div className="min-h-screen bg-muted/30 pt-24 pb-12 px-4 flex items-center justify-center">
                <Card className="max-w-md w-full border-emerald-500/20 bg-emerald-50/50">
                    <CardContent className="pt-6 text-center">
                        <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-emerald-700 mb-2">Payment Completed!</h1>
                        <p className="text-muted-foreground mb-6">
                            Your application fee has already been paid. We will review your application shortly.
                        </p>
                        <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                            <Link href="/">Return Home</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-muted/30 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="space-y-6">
                    <div className="bg-card rounded-2xl shadow-lg border border-border/50 p-8">
                        <h2 className="text-2xl font-bold mb-6 font-heading">Order Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-border/50">
                                <span className="text-muted-foreground">Applicant</span>
                                <span className="font-medium">{application.firstName} {application.lastName}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-border/50">
                                <span className="text-muted-foreground">Email</span>
                                <span className="font-medium">{application.email}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-border/50">
                                <span className="text-muted-foreground">Phone</span>
                                <span className="font-medium">{application.phone}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-border/50">
                                <span className="text-muted-foreground">Item</span>
                                <span className="font-medium">Masterclass Application Fee</span>
                            </div>
                            <div className="flex justify-between items-center pt-4">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-2xl font-bold text-primary">₦{application.amount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-blue-800 text-sm">
                        <h3 className="font-bold mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Note
                        </h3>
                        <p>
                            This payment is for the application fee only. Tuition fees will be discussed upon acceptance into the programme.
                        </p>
                    </div>
                </div>

                {/* Payment Methods */}
                <div>
                    <PaymentMethods
                        applicationId={application._id}
                        amount={application.amount}
                        email={application.email}
                        firstName={application.firstName}
                        lastName={application.lastName}
                        phone={application.phone}
                    />
                </div>
            </div>
        </div>
    )
}
