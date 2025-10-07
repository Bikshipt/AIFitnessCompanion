import { useState, useEffect } from "react";
import { getDefaultUser } from "@/lib/utils";
import StatsPanel from "@/components/rpg/StatsPanel";
import type { Character } from "@shared/rpg";

export default function ProgressRPGPage() {
  const user = getDefaultUser();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const res = await fetch(`/api/rpg/users/${user.id}/characters`);
        if (res.ok) {
          const data = await res.json();
          setCharacters(data);
        }
      } finally {
        setLoading(false);
      }
    };
    loadCharacters();
  }, []);

  const addXP = async (characterId: number, amount: number) => {
    try {
      const res = await fetch(`/api/rpg/characters/${characterId}/xp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      if (res.ok) {
        // Reload characters to show updated stats
        const res = await fetch(`/api/rpg/users/${user.id}/characters`);
        if (res.ok) {
          const data = await res.json();
          setCharacters(data);
        }
      }
    } catch (error) {
      console.error("Failed to add XP:", error);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">RPG Progress</h1>
        <p className="text-muted-foreground">Track your character progression and stats</p>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading characters...</div>
      ) : characters.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No characters found. Create one in the Character page!
        </div>
      ) : (
        <div className="space-y-6">
          {characters.map((character) => (
            <div key={character.id} className="rounded-lg border bg-card text-card-foreground p-6 shadow-sm">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">{character.name}</h2>
                <p className="text-muted-foreground">{character.className}</p>
              </div>
              
              <StatsPanel
                level={character.level}
                xp={character.xp}
                stats={character.stats}
              />

              <div className="mt-4 flex gap-2">
                <Button
                  onClick={() => addXP(character.id, 100)}
                  size="sm"
                >
                  +100 XP
                </Button>
                <Button
                  onClick={() => addXP(character.id, 500)}
                  size="sm"
                  variant="secondary"
                >
                  +500 XP
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
