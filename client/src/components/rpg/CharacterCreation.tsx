import { useState } from "react";
import { characterClasses } from "@shared/rpg";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Props {
  userId: number;
  onCreated?: (characterId: number) => void;
}

export default function CharacterCreation({ userId, onCreated }: Props) {
  const [name, setName] = useState("");
  const [cls, setCls] = useState<string>(characterClasses[0]);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/rpg/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, name, className: cls }),
      });
      const data = await res.json();
      if (res.ok && data?.id) onCreated?.(data.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Input 
          placeholder="Character name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />
        <Select value={cls} onValueChange={setCls}>
          <SelectTrigger>
            <SelectValue placeholder="Choose class" />
          </SelectTrigger>
          <SelectContent>
            {characterClasses.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          onClick={handleCreate} 
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Character"}
        </Button>
      </div>
    </div>
  );
}


