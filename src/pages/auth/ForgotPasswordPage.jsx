import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { apiPath } from "../../app/utils/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(apiPath("/auth/forgot-password"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.detail);
        setEmailSent(true);
      } else {
        throw new Error(data.detail ?? "Failed to request a reset.");
      }
    } catch (e) {
      console.error(e);
      alert(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? "Sending..."
              : emailSent
              ? "Resend Reset Link"
              : "Send Reset Link"}
          </Button>

          <div className="text-center">
            <Link
              to="/auth/login"
              className="text-sm text-primary hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
