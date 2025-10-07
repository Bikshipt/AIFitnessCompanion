import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GuildsPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Guilds</h1>
        <p className="text-muted-foreground">Join guilds to participate in group challenges and raids</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Shadow Warriors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Elite guild focused on strength training and powerlifting
            </p>
            <div className="text-xs text-muted-foreground mb-3">
              Members: 247 | Level: 45
            </div>
            <Button size="sm" className="w-full">
              Join Guild
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wind Runners</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Speed and agility specialists for cardio enthusiasts
            </p>
            <div className="text-xs text-muted-foreground mb-3">
              Members: 189 | Level: 38
            </div>
            <Button size="sm" className="w-full">
              Join Guild
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Iron Titans</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Endurance masters for marathon runners and cyclists
            </p>
            <div className="text-xs text-muted-foreground mb-3">
              Members: 156 | Level: 42
            </div>
            <Button size="sm" className="w-full">
              Join Guild
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Create New Guild</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">
              Guild creation will be available in a future update. For now, join existing guilds above!
            </p>
            <Button disabled>
              Create Guild (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
