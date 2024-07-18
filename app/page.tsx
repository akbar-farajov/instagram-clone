import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { signOut } from "./login/actions";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Feed from "@/components/Feed";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: photos } = await supabase
    .from("photos")
    .select("*")
    .order("created_at", { ascending: false });

  console.log(photos);

  return (
    <div className="flex bg-foreground">
      <Sidebar>
        {user !== null && (
          <form action={signOut}>
            <Button formAction={signOut}>Sign Out</Button>
          </form>
        )}
      </Sidebar>
      <div className="container mx-auto p-4">
        <Feed photos={photos || []} />
      </div>
    </div>
  );
}
