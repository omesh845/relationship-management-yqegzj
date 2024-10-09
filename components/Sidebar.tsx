'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { relationshipTypes } from '@/lib/relationshipTypes';

interface SidebarProps {
  selectedElement: any;
  onUpdateElement: (updatedElement: any) => void;
}

export default function Sidebar({ selectedElement, onUpdateElement }: SidebarProps) {
  if (!selectedElement) {
    return (
      <div className="w-64 bg-white p-4 border-l border-gray-200 h-full">
        <p className="text-gray-500">Select a node or edge to view details</p>
      </div>
    );
  }

  const isNode = 'position' in selectedElement;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string, field?: string) => {
    if (typeof e === 'string') {
      // Handle Select onChange
      onUpdateElement({ ...selectedElement, label: e });
    } else {
      const { name, value } = e.target;
      const updatedField = field || name;
      onUpdateElement({ 
        ...selectedElement, 
        data: { ...selectedElement.data, [updatedField]: value }
      });
    }
  };

  return (
    <div className="w-64 bg-white p-4 border-l border-gray-200 h-full overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">
        {isNode ? 'Contact Details' : 'Relationship Details'}
      </h2>
      {isNode ? (
        <>
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="label"
              value={selectedElement.data.label}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={selectedElement.data.email || ''}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={selectedElement.data.phone || ''}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={selectedElement.data.company || ''}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={selectedElement.data.notes || ''}
              onChange={handleChange}
            />
          </div>
        </>
      ) : (
        <>
          <div className="mb-4">
            <Label htmlFor="relationshipType">Relationship Type</Label>
            <Select onValueChange={(value) => handleChange(value, 'label')} value={selectedElement.label || ''}>
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
            {selectedElement.label && (
              <p className="text-sm text-gray-500 mt-1">
                {relationshipTypes.find((type) => type.value === selectedElement.label)?.description}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={selectedElement.data?.notes || ''}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      <Button className="w-full">Save Changes</Button>
    </div>
  );
}