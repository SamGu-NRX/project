"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, GripVertical, Trash2 } from "lucide-react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

interface Session {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  isPublished: boolean;
  sequenceOrder: number;
}

export function SessionsManager() {
  const [sessions, setSessions] = React.useState<Session[]>([]);
  const [editingSession, setEditingSession] = React.useState<Session | null>(null);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sessions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update sequence orders
    const updatedItems = items.map((item, index) => ({
      ...item,
      sequenceOrder: index + 1,
    }));

    setSessions(updatedItems);
  };

  const handleAddSession = () => {
    const newSession: Session = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      videoUrl: "",
      isPublished: false,
      sequenceOrder: sessions.length + 1,
    };
    setEditingSession(newSession);
  };

  const handleSaveSession = async () => {
    if (!editingSession) return;

    // If it's a new session, add it to the list
    if (!sessions.find(s => s.id === editingSession.id)) {
      setSessions([...sessions, editingSession]);
    } else {
      // Update existing session
      setSessions(sessions.map(s => 
        s.id === editingSession.id ? editingSession : s
      ));
    }

    setEditingSession(null);
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(sessions.filter(s => s.id !== sessionId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Sessions</h2>
        <Button onClick={handleAddSession}>
          <Plus className="mr-2 h-4 w-4" />
          Add Session
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sessions">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {sessions.map((session, index) => (
                <Draggable
                  key={session.id}
                  draggableId={session.id}
                  index={index}
                >
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-move"
                        >
                          <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{session.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {session.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={session.isPublished}
                              onCheckedChange={(checked) => {
                                setSessions(sessions.map(s =>
                                  s.id === session.id
                                    ? { ...s, isPublished: checked }
                                    : s
                                ));
                              }}
                            />
                            <span className="text-sm">
                              {session.isPublished ? "Published" : "Draft"}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingSession(session)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteSession(session.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {editingSession && (
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-medium">
            {sessions.find(s => s.id === editingSession.id)
              ? "Edit Session"
              : "New Session"
            }
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editingSession.title}
                onChange={(e) =>
                  setEditingSession({
                    ...editingSession,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editingSession.description}
                onChange={(e) =>
                  setEditingSession({
                    ...editingSession,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                value={editingSession.videoUrl}
                onChange={(e) =>
                  setEditingSession({
                    ...editingSession,
                    videoUrl: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="published"
                checked={editingSession.isPublished}
                onCheckedChange={(checked) =>
                  setEditingSession({
                    ...editingSession,
                    isPublished: checked,
                  })
                }
              />
              <Label htmlFor="published">Published</Label>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setEditingSession(null)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveSession}>Save</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}