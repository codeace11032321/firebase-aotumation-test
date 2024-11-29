'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Available workflow modules
const moduleTypes = [
  { id: 'auth', title: 'Authentication', description: 'Handle user authentication' },
  { id: 'firestore', title: 'Firestore', description: 'Database operations' },
  { id: 'storage', title: 'Storage', description: 'File storage operations' },
  { id: 'functions', title: 'Cloud Functions', description: 'Serverless functions' },
];

interface WorkflowModule {
  id: string;
  type: string;
  title: string;
  description: string;
}

export default function BuilderPage() {
  const [modules, setModules] = useState<WorkflowModule[]>([]);
  const { toast } = useToast();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(modules);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setModules(items);
  };

  const addModule = (type: string) => {
    const moduleType = moduleTypes.find(m => m.id === type);
    if (!moduleType) return;

    const newModule: WorkflowModule = {
      id: `${type}-${Date.now()}`,
      type,
      title: moduleType.title,
      description: moduleType.description,
    };

    setModules([...modules, newModule]);
    toast({
      title: 'Module Added',
      description: `Added ${moduleType.title} module to workflow`,
    });
  };

  const removeModule = (id: string) => {
    setModules(modules.filter(m => m.id !== id));
    toast({
      title: 'Module Removed',
      description: 'Module removed from workflow',
      variant: 'destructive',
    });
  };

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Modules Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Modules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {moduleTypes.map((module) => (
                <Button
                  key={module.id}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addModule(module.id)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {module.title}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Workflow Canvas */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Canvas</CardTitle>
            </CardHeader>
            <CardContent>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="workflow">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="min-h-[500px] space-y-2"
                    >
                      {modules.map((module, index) => (
                        <Draggable
                          key={module.id}
                          draggableId={module.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="relative"
                            >
                              <Card>
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h3 className="font-semibold">{module.title}</h3>
                                      <p className="text-sm text-muted-foreground">
                                        {module.description}
                                      </p>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-destructive"
                                      onClick={() => removeModule(module.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {modules.length === 0 && (
                        <div className="flex items-center justify-center h-[500px] border-2 border-dashed rounded-lg">
                          <p className="text-muted-foreground">
                            Drag and drop modules here to build your workflow
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}