import { useState, useEffect } from "react";
import { getDefaultUser } from "@/lib/utils";
import CharacterCreation from "@/components/rpg/CharacterCreation";
import StatsPanel from "@/components/rpg/StatsPanel";
import type { Character } from "@shared/rpg";

export default function CharacterPage() {
  const user = getDefaultUser();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadCharacters();
  }, []);

  const handleCharacterCreated = (characterId: number) => {
    loadCharacters();
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Character Management</h1>
        <p className="text-muted-foreground">Create and manage your RPG characters</p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Create New Character</h2>
          <CharacterCreation userId={user.id} onCreated={handleCharacterCreated} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Your Characters</h2>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : characters.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No characters yet. Create your first one above!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {characters.map((character) => (
                <div key={character.id} className="rounded-lg border bg-card text-card-foreground p-4 shadow-sm">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg">{character.name}</h3>
                    <p className="text-sm text-muted-foreground">{character.className}</p>
                  </div>
                  <StatsPanel
                    level={character.level}
                    xp={character.xp}
                    stats={character.stats}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
