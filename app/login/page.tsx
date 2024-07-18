import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { login, signup } from "./actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/");
  }
  // const message = searchParams.get("message");
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center text-2xl font-bold mb-4">
          Login
        </CardHeader>
        <CardContent>
          {/* {searchParams.message && (
            <div className="mb-4 text-red-500 text-center">
              {searchParams.message}
            </div>
          )} */}
          <form>
            <div className="mb-4">
              <Label htmlFor="email">Email:</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 w-full"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password:</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="mt-2 w-full"
              />
            </div>
            <div className="flex justify-between mt-6">
              <Button formAction={login} className="bg-blue-500 text-white">
                Log in
              </Button>
              <Button formAction={signup} className="bg-green-500 text-white">
                Sign up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
