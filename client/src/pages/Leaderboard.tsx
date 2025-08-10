import { motion } from "framer-motion";
import { Crown, Medal, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  level: number;
  score: number;
  challengesSolved: number;
  badges: string[];
  isCurrentUser?: boolean;
}

const leaderboardData: LeaderboardUser[] = [
  {
    id: "1",
    rank: 1,
    name: "AlexCodeMaster",
    level: 12,
    score: 15847,
    challengesSolved: 342,
    badges: ["🏆 Champion", "🔥 Streak"]
  },
  {
    id: "2",
    rank: 2,
    name: "SarahDev",
    level: 11,
    score: 14923,
    challengesSolved: 318,
    badges: ["💎 Expert", "⚡ Fast"]
  },
  {
    id: "3",
    rank: 3,
    name: "MikeTheCoder",
    level: 10,
    score: 13756,
    challengesSolved: 289,
    badges: ["🧠 Genius"]
  },
  {
    id: "4",
    rank: 4,
    name: "JavaScriptNinja",
    level: 9,
    score: 12435,
    challengesSolved: 245,
    badges: ["🌟 Rising"]
  },
  {
    id: "5",
    rank: 5,
    name: "PythonPro",
    level: 8,
    score: 11892,
    challengesSolved: 223,
    badges: ["🔍 Detective"]
  },
  {
    id: "current",
    rank: 23,
    name: "John Doe",
    level: 5,
    score: 2450,
    challengesSolved: 42,
    badges: ["🚀 Beginner"],
    isCurrentUser: true
  }
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="text-accent h-6 w-6" />;
    case 2:
      return <Medal className="text-gray-400 h-6 w-6" />;
    case 3:
      return <Medal className="text-orange-500 h-6 w-6" />;
    default:
      return null;
  }
};

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "text-accent";
    case 2:
      return "text-gray-300";
    case 3:
      return "text-orange-300";
    default:
      return "text-gray-300";
  }
};

const getAvatarColor = (name: string) => {
  const colors = [
    'bg-accent', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
    'bg-pink-500', 'bg-orange-500', 'bg-red-500', 'bg-indigo-500'
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

export default function Leaderboard() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
          <p className="text-gray-300">See how you rank among other developers in the community.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-secondary/50 rounded-xl border border-secondary overflow-hidden"
        >
          <Table>
            <TableHeader className="bg-primary/50">
              <TableRow>
                <TableHead className="text-gray-300">Rank</TableHead>
                <TableHead className="text-gray-300">User</TableHead>
                <TableHead className="text-gray-300">Score</TableHead>
                <TableHead className="text-gray-300">Challenges Solved</TableHead>
                <TableHead className="text-gray-300">Badges</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`hover:bg-primary/20 transition-colors ${
                    user.isCurrentUser 
                      ? 'bg-accent/10 border border-accent/30' 
                      : user.rank <= 3 
                        ? `bg-${user.rank === 1 ? 'accent' : user.rank === 2 ? 'gray-500' : 'orange-500'}/5`
                        : ''
                  }`}
                >
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getRankIcon(user.rank)}
                      <span className={`font-bold text-lg ${
                        user.isCurrentUser ? 'text-accent' : getRankColor(user.rank)
                      }`}>
                        {user.rank}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${
                        user.isCurrentUser ? 'bg-accent' : getAvatarColor(user.name)
                      } rounded-full flex items-center justify-center`}>
                        <span className={`font-bold ${
                          user.isCurrentUser ? 'text-accent-foreground' : 'text-white'
                        }`}>
                          {user.name[0]}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white flex items-center">
                          {user.name}
                          {user.isCurrentUser && (
                            <span className="ml-2 text-accent text-xs">(You)</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-400">Level {user.level}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-sm font-bold ${
                      user.isCurrentUser ? 'text-accent' : 'text-gray-300'
                    }`}>
                      {user.score.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-white">
                    {user.challengesSolved}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.badges.map((badge) => (
                        <Badge
                          key={badge}
                          className={
                            user.isCurrentUser
                              ? 'bg-accent/20 text-accent'
                              : 'bg-blue-100 text-blue-800'
                          }
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </div>
  );
}
