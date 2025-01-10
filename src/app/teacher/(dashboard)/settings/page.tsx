'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { User, Bell, Lock, Sliders } from 'lucide-react'

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Experienced teacher specializing in AI and Machine Learning.',
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    newSubmissionAlert: true,
    forumActivityAlert: true,
  })

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
  })

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: 'English',
  })

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated profile to your backend
    console.log('Profile updated:', profile)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <User className="mr-2" />
          Profile Settings
        </h3>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              value={profile.name} 
              onChange={(e) => setProfile({...profile, name: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={profile.email} 
              onChange={(e) => setProfile({...profile, email: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              value={profile.bio} 
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
            />
          </div>
          <Button type="submit">Update Profile</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Bell className="mr-2" />
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="emailNotifications">Email Notifications</Label>
            <Switch 
              id="emailNotifications" 
              checked={notifications.emailNotifications}
              onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="pushNotifications">Push Notifications</Label>
            <Switch 
              id="pushNotifications" 
              checked={notifications.pushNotifications}
              onCheckedChange={(checked) => setNotifications({...notifications, pushNotifications: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="newSubmissionAlert">New Submission Alerts</Label>
            <Switch 
              id="newSubmissionAlert" 
              checked={notifications.newSubmissionAlert}
              onCheckedChange={(checked) => setNotifications({...notifications, newSubmissionAlert: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="forumActivityAlert">Forum Activity Alerts</Label>
            <Switch 
              id="forumActivityAlert" 
              checked={notifications.forumActivityAlert}
              onCheckedChange={(checked) => setNotifications({...notifications, forumActivityAlert: checked})}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Lock className="mr-2" />
          Security Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
            <Switch 
              id="twoFactorAuth" 
              checked={security.twoFactorAuth}
              onCheckedChange={(checked) => setSecurity({...security, twoFactorAuth: checked})}
            />
          </div>
          <Button variant="outline">Change Password</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Sliders className="mr-2" />
          Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode">Dark Mode</Label>
            <Switch 
              id="darkMode" 
              checked={preferences.darkMode}
              onCheckedChange={(checked) => setPreferences({...preferences, darkMode: checked})}
            />
          </div>
          <div>
            <Label htmlFor="language">Language</Label>
            <select
              id="language"
              value={preferences.language}
              onChange={(e) => setPreferences({...preferences, language: e.target.value})}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  )
}

