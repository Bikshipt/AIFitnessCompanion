import type { Quest } from "@shared/rpg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  quests: Quest[];
}

const tierColors: Record<string, string> = {
  F: "bg-gray-500",
  E: "bg-green-500", 
  D: "bg-blue-500",
  C: "bg-purple-500",
  B: "bg-orange-500",
  A: "bg-red-500",
  S: "bg-pink-500",
  SS: "bg-yellow-500",
  SSS: "bg-cyan-500",
};

export default function QuestList({ quests }: Props) {
  return (
    <div className="space-y-3">
      {quests.map((quest) => (
        <Card key={quest.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{quest.title}</CardTitle>
              <Badge className={`${tierColors[quest.tier] || "bg-gray-500"} text-white`}>
                {quest.tier}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{quest.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}