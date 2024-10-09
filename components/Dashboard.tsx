'use client';

import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar';
import AddContactDialog from './AddContactDialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface DashboardProps {
  initialContacts: any[];
  initialRelationships: any[];
}

export default function Dashboard({ initialContacts, initialRelationships }: DashboardProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedElement, setSelectedElement] = useState<Node | Edge | null>(null);
  const [isAddingContact, setIsAddingContact] = useState(false);

  useEffect(() => {
    const initialNodes = initialContacts.map((contact) => ({
      id: contact.id.toString(),
      type: 'default',
      data: { label: contact.name, ...contact },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
    }));

    const initialEdges = initialRelationships.map((rel) => ({
      id: `e${rel.sourceId}-${rel.targetId}`,
      source: rel.sourceId.toString(),
      target: rel.targetId.toString(),
      label: rel.type,
    }));

    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialContacts, initialRelationships]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedElement(node);
  }, []);

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    setSelectedElement(edge);
  }, []);

  const onUpdateElement = useCallback(
    async (updatedElement: Node | Edge) => {
      if ('position' in updatedElement) {
        setNodes((nds) =>
          nds.map((node) => (node.id === updatedElement.id ? updatedElement : node))
        );
        // Update contact in the database
        await fetch('/api/contacts', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedElement.data),
        });
      } else {
        setEdges((eds) =>
          eds.map((edge) => (edge.id === updatedElement.id ? updatedElement : edge))
        );
        // Update relationship in the database
        await fetch('/api/relationships', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedElement),
        });
      }
      setSelectedElement(updatedElement);
    },
    [setNodes, setEdges]
  );

  const addNewContact = useCallback(async (newContact: Node, newEdge: Edge | null) => {
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact.data),
      });
      const savedContact = await response.json();

      const newNode: Node = {
        ...newContact,
        id: savedContact.id.toString(),
        position: { x: Math.random() * 500, y: Math.random() * 500 },
      };

      setNodes((nds) => [...nds, newNode]);

      if (newEdge) {
        const savedEdge = await fetch('/api/relationships', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sourceId: newEdge.source,
            targetId: savedContact.id,
            type: newEdge.label,
          }),
        });
        const savedRelationship = await savedEdge.json();

        const updatedEdge: Edge = {
          ...newEdge,
          id: `e${savedRelationship.sourceId}-${savedRelationship.targetId}`,
          target: savedContact.id.toString(),
        };
        setEdges((eds) => [...eds, updatedEdge]);
      }

      setIsAddingContact(false);
    } catch (error) {
      console.error('Error adding new contact:', error);
      // Handle error (e.g., show error message to user)
    }
  }, [setNodes, setEdges]);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="flex-grow relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          fitView
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
        <Button
          className="absolute top-4 left-4"
          onClick={() => setIsAddingContact(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Contact
        </Button>
      </div>
      <Sidebar selectedElement={selectedElement} onUpdateElement={onUpdateElement} />
      <AddContactDialog
        isOpen={isAddingContact}
        onClose={() => setIsAddingContact(false)}
        onAddContact={addNewContact}
        existingNodes={nodes}
      />
    </div>
  );
}