import { commentAction } from "@/app/actions/comment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post } from "@/utils/supabase/database";
import { formatDistanceToNow } from "date-fns";
import { Bookmark, Ellipsis, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Input } from "../ui/input";
import { LikeButton } from "./like-button";
import { PostDeleteItem } from "./post-delete-button";
import { PostUserUnfollowButton } from "./post-user-unfollow-button";

import { Comments } from "./comments";

export const PostCard = async ({
  post,
  userId,
}: {
  post: Post;
  userId?: string;
}) => {
  const isCurrentUserPost = post.user_id === userId;

  return (
    <article key={post.id} className="my-2">
      <div className="flex items-center justify-between px-3 md:px-0">
        <div className="flex items-center py-3">
          {post.profiles.avatar_url ? (
            <div className="h-8 w-8 relative rounded-full overflow-hidden">
              <Image
                src={post.profiles.avatar_url}
                alt={post.profiles.username}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <UserCircle className="object-cover" />
          )}
          <div className="ml-3">
            <Link href={`/${post.profiles.username}`}>
              <p className="font-semibold text-sm cursor-pointer">
                {post.profiles.username}
              </p>
            </Link>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis size={20} strokeWidth={1} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isCurrentUserPost ? (
              <PostDeleteItem postId={post.id} userId={userId} />
            ) : (
              <>
                <PostUserUnfollowButton followerId={post.user_id} />
                <DropdownMenuItem>Share</DropdownMenuItem>
              </>
            )}

            <DropdownMenuItem>Cancel</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Post Image */}
      <div className="border relative aspect-square bg-muted rounded-lg">
        <Image
          src={post.image_url}
          alt="Post content"
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      {/* Post Actions */}
      <div className="p-3 md:px-0">
        <div className="flex items-start gap-4">
          <LikeButton
            postId={post.id}
            userId={userId}
            initialLikes={post.likes}
          />
          {/* <MessageCircle className="w-6 h-6 cursor-pointer " /> */}
          {/* <Share className="w-6 h-6 cursor-pointer " /> */}
          <div className="ml-auto">
            <Bookmark className="w-6 h-6 cursor-pointer" />
          </div>
        </div>

        {/* Caption */}
        <div className="mt-1">
          <p className="text-sm">
            <span className="font-semibold mr-2">{post.profiles.username}</span>
            {post.caption}
          </p>
        </div>
        <p className=" text-xs mt-1 uppercase">
          {formatDistanceToNow(new Date(post.created_at))} ago
        </p>
        <Suspense fallback={null}>
          <Comments postId={post.id} />
        </Suspense>
        <form
          action={async (formData: FormData) => {
            "use server";
            await commentAction(formData, post.id);
          }}
        >
          <Input
            placeholder="Add comment"
            className="outline-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-0"
            name="comment"
            id="comment"
          />
        </form>

        {/* Timestamp */}
      </div>
    </article>
  );
};
