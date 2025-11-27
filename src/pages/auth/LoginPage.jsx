import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Checkbox } from "../../components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { useAuth } from "../../context/auth/useAuthContext"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { signinUser, getUser } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    await signinUser(email, password, rememberMe, setError, setIsLoading, navigate)
  }

  useEffect(() => {
    // getUser(navigate)
  }, [])

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 text-sm text-red-700 border border-red-200 rounded bg-red-50">{error}</div>}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              <Label htmlFor="remember" className="font-normal cursor-pointer">
                Remember me
              </Label>
            </div>
            <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="p-4 mt-6 text-sm border border-blue-200 rounded bg-blue-50">
            <p className="mb-2 font-semibold text-blue-900">Test Accounts:</p>
            <div className="space-y-1 text-blue-800">
              <p>• zaymonnekent17@gmail.com / adminpass</p>
              <p>• zaymonnekent@gmail.com / wjydEM</p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
