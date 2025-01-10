"use client";

import { useState } from 'react'
import { Bell, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    { id: 1, message: 'New assignment submission', time: '2 hours ago' },
    { id: 2, message: 'Forum post needs moderation', time: '5 hours ago' },
    { id: 3, message: 'New student enrolled', time: '1 day ago' },
  ]

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Teacher Dashboard</h1>
          <div className="flex items-center">
            <div className="relative">
              <button
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>
              {showNotifications && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b">Notifications</div>
                    {notifications.map((notification) => (
                      <div key={notification.id} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <p>{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="ml-3 relative">
              <div>
                <button className="flex items-center max-w-xs bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu" aria-haspopup="true">
                  <span className="sr-only">Open user menu</span>
                  <User className="h-8 w-8 rounded-full" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

