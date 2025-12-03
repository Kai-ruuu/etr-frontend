import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Separator } from '../../../components/ui/separator'
import { Switch } from '../../../components/ui/switch'
import { Alert, AlertDescription } from '../../../components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { User, Shield, Bell, Key, Save, Eye, EyeOff } from 'lucide-react'

const SysadAccountPage = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    systemAlerts: true,
    securityAlerts: true,
    maintenanceUpdates: false
  })

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNotificationChange = (field, value) => {
    setNotifications(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New password and confirm password do not match')
      return
    }
  }

  const handleNotificationSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <User className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Account Settings</h1>
      </div>

      <Tabs defaultValue="security" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Security Settings</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription>
                Manage your account security and password settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert>
                  <Key className="h-4 w-4" />
                  <AlertDescription>
                    For your security, we recommend using a strong password with at least 8 characters, including uppercase, lowercase, numbers, and special characters.
                  </AlertDescription>
                </Alert>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Key className="h-5 w-5" />
                    <span>Change Password</span>
                  </h3>
                  
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                          placeholder="Enter your current password"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                          placeholder="Enter your new password"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                          placeholder="Confirm your new password"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="flex items-center space-x-2">
                      <Save className="h-4 w-4" />
                      <span>Update Password</span>
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
              <CardDescription>
                Configure how you want to receive notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNotificationSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive general notifications via email
                      </p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notifications.emailNotifications}
                      onCheckedChange={(value) => handleNotificationChange('emailNotifications', value)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="systemAlerts">System Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about system updates and changes
                      </p>
                    </div>
                    <Switch
                      id="systemAlerts"
                      checked={notifications.systemAlerts}
                      onCheckedChange={(value) => handleNotificationChange('systemAlerts', value)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="securityAlerts">Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Important security notifications and login alerts
                      </p>
                    </div>
                    <Switch
                      id="securityAlerts"
                      checked={notifications.securityAlerts}
                      onCheckedChange={(value) => handleNotificationChange('securityAlerts', value)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenanceUpdates">Maintenance Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications about scheduled maintenance and downtime
                      </p>
                    </div>
                    <Switch
                      id="maintenanceUpdates"
                      checked={notifications.maintenanceUpdates}
                      onCheckedChange={(value) => handleNotificationChange('maintenanceUpdates', value)}
                    />
                  </div>
                </div>

                <Button type="submit" className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Notification Settings</span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SysadAccountPage