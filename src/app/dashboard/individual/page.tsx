'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
    BookOpen,
    Award,
    Clock,
    CheckCircle,
    LogOut,
    Loader2,
    ArrowLeft,
    TrendingUp
} from 'lucide-react'

export default function IndividualDashboardPage() {
    const { user, isLoading, logout } = useAuth()
    const router = useRouter()

    const handleLogout = async () => {
        await logout()
        router.push('/')
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Authentication Required</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 mb-4">Please log in to access your dashboard.</p>
                        <Button onClick={() => router.push('/auth/login')} className="w-full">
                            Log In
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Mock data - replace with actual Convex queries
    const courses = [
        {
            title: 'Virtual Polyworking & Multipreneurship',
            progress: 45,
            status: 'in-progress',
            totalLessons: 21,
            completedLessons: 9
        },
        {
            title: 'Prompting for Prompters',
            progress: 20,
            status: 'in-progress',
            totalLessons: 21,
            completedLessons: 4
        },
        {
            title: 'Vibe-Coding & Context Engineering',
            progress: 0,
            status: 'not-started',
            totalLessons: 21,
            completedLessons: 0
        },
        {
            title: 'WOW Systems & Socialized Marketing',
            progress: 0,
            status: 'not-started',
            totalLessons: 21,
            completedLessons: 0
        }
    ]

    const achievements = [
        { name: 'First Login', earned: true },
        { name: 'Complete First Lesson', earned: true },
        { name: 'Week 1 Complete', earned: false },
        { name: 'Perfect Attendance', earned: false }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard')}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">My Learning</h1>
                                <p className="text-sm text-gray-600">Track your progress</p>
                            </div>
                        </div>
                        <Button onClick={handleLogout} variant="outline" size="sm">
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Overall Progress
                            </CardTitle>
                            <TrendingUp className="w-4 h-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">16%</div>
                            <Progress value={16} className="mt-2" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Completed Lessons
                            </CardTitle>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">13/84</div>
                            <p className="text-xs text-gray-500 mt-1">Across all courses</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Study Time
                            </CardTitle>
                            <Clock className="w-4 h-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8.5h</div>
                            <p className="text-xs text-gray-500 mt-1">This week</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Achievements
                            </CardTitle>
                            <Award className="w-4 h-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2/4</div>
                            <p className="text-xs text-gray-500 mt-1">Badges earned</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Course Progress */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Your Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {courses.map((course, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                                            <p className="text-sm text-gray-600">
                                                {course.completedLessons} of {course.totalLessons} lessons completed
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${course.status === 'in-progress'
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {course.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                                        </span>
                                    </div>
                                    <Progress value={course.progress} className="mb-2" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">{course.progress}% complete</span>
                                        <Button size="sm" variant={course.status === 'in-progress' ? 'default' : 'outline'}>
                                            {course.status === 'in-progress' ? 'Continue' : 'Start Course'}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Achievements */}
                <Card>
                    <CardHeader>
                        <CardTitle>Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {achievements.map((achievement, index) => (
                                <div
                                    key={index}
                                    className={`text-center p-4 rounded-lg border ${achievement.earned
                                            ? 'border-yellow-200 bg-yellow-50'
                                            : 'border-gray-200 bg-gray-50'
                                        }`}
                                >
                                    <Award className={`w-12 h-12 mx-auto mb-2 ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                                        }`} />
                                    <p className={`text-sm font-medium ${achievement.earned ? 'text-gray-900' : 'text-gray-500'
                                        }`}>
                                        {achievement.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
