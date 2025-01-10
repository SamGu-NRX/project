"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
  replies: Reply[];
}

interface Reply {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
}

interface DiscussionProps {
  posts: Post[];
  onPost: (content: string, parentId?: string) => void;
  isLocked?: boolean;
}

export function Discussion({
  posts,
  onPost,
  isLocked = false,
}: DiscussionProps) {
  const [newPost, setNewPost] = React.useState("");
  const [replyingTo, setReplyingTo] = React.useState<string | null>(null);
  const [replyContent, setReplyContent] = React.useState("");

  const handlePost = () => {
    if (newPost.trim()) {
      onPost(newPost);
      setNewPost("");
    }
  };

  const handleReply = (postId: string) => {
    if (replyContent.trim()) {
      onPost(replyContent, postId);
      setReplyContent("");
      setReplyingTo(null);
    }
  };

  if (isLocked) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Discussion Locked</h3>
          <p className="text-sm text-muted-foreground">
            Complete the video and exit ticket to unlock discussions
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="mb-6 text-xl font-semibold">Discussion</h3>

      <div className="mb-6">
        <Textarea
          placeholder="Start a discussion..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handlePost} disabled={!newPost.trim()}>
          Post
        </Button>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="space-y-4">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src={post.userAvatar} />
                <AvatarFallback>
                  {post.userName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{post.userName}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                  </span>
                </div>
                <p className="mt-1">{post.content}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={() => setReplyingTo(post.id)}
                >
                  Reply
                </Button>
              </div>
            </div>

            {replyingTo === post.id && (
              <div className="ml-12">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="mb-2"
                />
                <div className="space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleReply(post.id)}
                    disabled={!replyContent.trim()}
                  >
                    Reply
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyContent("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {post.replies.length > 0 && (
              <div className="ml-12 space-y-4">
                {post.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={reply.userAvatar} />
                      <AvatarFallback>
                        {reply.userName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{reply.userName}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(reply.createdAt, {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <p className="mt-1">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
