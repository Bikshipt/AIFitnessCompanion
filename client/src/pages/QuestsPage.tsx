import { useState, useEffect } from "react";
import QuestList from "@/components/rpg/QuestList";
import type { Quest } from "@shared/rpg";

export default function QuestsPage() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuests = async () => {
      try {
        const res = await fetch("/api/rpg/quests");
        if (res.ok) {
          const data = await res.json();
          setQuests(data);
        }
      } finally {
        setLoading(false);
      }
    };
    loadQuests();
  }, []);

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Quest Board</h1>
        <p className="text-muted-foreground">Complete quests to gain XP and level up your character</p>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading quests...</div>
      ) : (
        <QuestList quests={quests} />
      )}
    </div>
  );
}
