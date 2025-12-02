import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Progress } from '../../../components/ui/progress'
import { Alert, AlertDescription } from '../../../components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { 
  Settings, 
  Download, 
  Upload, 
  Database, 
  HardDrive, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Calendar
} from 'lucide-react'

const SysadSystemPage = () => {
  const [backupProgress, setBackupProgress] = useState(0)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isCreatingBackup, setIsCreatingBackup] = useState(false)
  const [isUploadingBackup, setIsUploadingBackup] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  // Mock backup history
  const backupHistory = [
    {
      id: 1,
      filename: 'system_backup_2024_11_30.sql',
      size: '245 MB',
      createdDate: '2024-11-30T10:30:00',
      type: 'Full Backup',
      status: 'Completed'
    },
    {
      id: 2,
      filename: 'system_backup_2024_11_29.sql',
      size: '238 MB',
      createdDate: '2024-11-29T10:30:00',
      type: 'Full Backup',
      status: 'Completed'
    },
    {
      id: 3,
      filename: 'system_backup_2024_11_28.sql',
      size: '241 MB',
      createdDate: '2024-11-28T10:30:00',
      type: 'Full Backup',
      status: 'Completed'
    }
  ]

  const handleCreateBackup = () => {
    setIsCreatingBackup(true)
    setBackupProgress(0)

    // Simulate backup creation progress
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsCreatingBackup(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      if (file.name.endsWith('.sql') || file.name.endsWith('.zip')) {
        setSelectedFile(file)
      } else {
        alert('Please select a valid backup file (.sql or .zip)')
      }
    }
  }

  const handleUploadBackup = () => {
    if (!selectedFile) {
      alert('Please select a backup file first')
      return
    }

    setIsUploadingBackup(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploadingBackup(false)
          setSelectedFile(null)
          return 100
        }
        return prev + 8
      })
    }, 400)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatFileSize = (size) => {
    return size
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Settings className="h-6 w-6" />
        <h1 className="text-3xl font-bold">System Management</h1>
      </div>

      <Tabs defaultValue="backup" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="backup" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Create Backup</span>
          </TabsTrigger>
          <TabsTrigger value="restore" className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Upload Backup</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Create System Backup</span>
              </CardTitle>
              <CardDescription>
                Create a complete backup of the system database and files
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <HardDrive className="h-4 w-4" />
                <AlertDescription>
                  Creating a backup will include all system data, user accounts, companies, job posts, and configuration settings. 
                  This process may take several minutes depending on the database size.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Database className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <h3 className="font-semibold">Database Size</h3>
                    <p className="text-2xl font-bold text-blue-600">245 MB</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <h3 className="font-semibold">Total Records</h3>
                    <p className="text-2xl font-bold text-green-600">12,847</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <h3 className="font-semibold">Est. Time</h3>
                    <p className="text-2xl font-bold text-orange-600">~3 min</p>
                  </div>
                </div>

                {isCreatingBackup && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Creating backup...</span>
                      <span className="text-sm text-muted-foreground">{backupProgress}%</span>
                    </div>
                    <Progress value={backupProgress} className="w-full" />
                  </div>
                )}

                <Button 
                  onClick={handleCreateBackup} 
                  disabled={isCreatingBackup}
                  className="w-full flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>{isCreatingBackup ? 'Creating Backup...' : 'Create Full Backup'}</span>
                </Button>
              </div>

              {/* Backup History */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Backups</span>
                </h3>
                <div className="space-y-2">
                  {backupHistory.map((backup) => (
                    <div key={backup.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">{backup.filename}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(backup.createdDate)} • {backup.size} • {backup.type}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="restore" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload & Restore Backup</span>
              </CardTitle>
              <CardDescription>
                Upload a backup file to restore the system to a previous state
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Warning:</strong> Restoring a backup will overwrite all current data. 
                  Make sure to create a current backup before proceeding. This action cannot be undone.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="backup-file">Select Backup File</Label>
                  <Input
                    id="backup-file"
                    type="file"
                    accept=".sql,.zip"
                    onChange={handleFileSelect}
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Supported formats: .sql, .zip (Max size: 500MB)
                  </p>
                </div>

                {selectedFile && (
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span className="font-medium">Selected File:</span>
                    </div>
                    <p className="text-sm mt-1">
                      <strong>Name:</strong> {selectedFile.name}
                    </p>
                    <p className="text-sm">
                      <strong>Size:</strong> {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <p className="text-sm">
                      <strong>Type:</strong> {selectedFile.type || 'SQL Backup'}
                    </p>
                  </div>
                )}

                {isUploadingBackup && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Uploading and restoring backup...</span>
                      <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}

                <Button 
                  onClick={handleUploadBackup} 
                  disabled={!selectedFile || isUploadingBackup}
                  className="w-full flex items-center space-x-2"
                  variant={selectedFile ? "default" : "secondary"}
                >
                  <Upload className="h-4 w-4" />
                  <span>
                    {isUploadingBackup ? 'Uploading & Restoring...' : 'Upload & Restore Backup'}
                  </span>
                </Button>
              </div>

              {/* Restore Guidelines */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Restore Guidelines</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Ensure the backup file is from a compatible system version</p>
                  <p>• All users will be logged out during the restore process</p>
                  <p>• The system will be temporarily unavailable (5-10 minutes)</p>
                  <p>• Verify the backup integrity before uploading</p>
                  <p>• Contact support if you encounter any issues</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SysadSystemPage