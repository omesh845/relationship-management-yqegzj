'use client';

import React, { useState } from 'react';
import { Node, Edge } from 'reactflow';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { relationshipTypes } from '@/lib/relationshipTypes';

interface AddContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContact: (newContact: Node, newEdge: Edge | null) => void;
  existingNodes: Node[];
}

export default function AddContactDialog({ isOpen, onClose, onAddContact, existingNodes }: AddContactDialogProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [relatedTo, setRelatedTo] = useState('');
  const [relationshipType, setRelationshipType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNode: Node = {
      id: `${existingNodes.length + 1}`,
      data: { label: name, email, phone, company, notes },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
    };

    let newEdge: Edge | null = null;
    if (relatedTo) {
      newEdge = {
        id: `e${relatedTo}-${newNode.id}`,
        source: relatedTo,
        target: newNode.id,
        label: relationshipType,
      };
    }

    onAddContact(newNode, newEdge);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="relatedTo">Related to</Label>
            <Select onValueChange={setRelatedTo} value={relatedTo}>
              <SelectTrigger>
                <SelectValue placeholder="Select a contact" />
              </SelectTrigger>
              <SelectContent>
                {existingNodes.map((node) => (
                  <SelectItem key={node.id} value={node.id}>
                    {node.data.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {relatedTo && (
            <div>
              <Label htmlFor="relationshipType">Relationship Type</Label>
              <Select onValueChange={setRelationshipType} value={relationshipType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship type" />
                </SelectTrigger>
                <SelectContent>
                  {relationshipTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {relationshipType && (
                <p className="text-sm text-gray-500 mt-1">
                  {relationshipTypes.find((type) => type.value === relationshipType)?.description}
                </p>
              )}
            </div>
          )}
          <Button type="submit">Add Contact</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}