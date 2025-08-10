import { motion } from "framer-motion";
import { Flame, Calendar, Trophy } from "lucide-react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Hackathon {
  id: string;
  title: string;
  description: string;
  status: 'Live' | 'Upcoming';
  timeLeft?: string;
  startsIn?: string;
  duration?: string;
  prizePool: string;
  participants?: number;
  joined?: boolean;
}

interface Submission {
  id: string;
  hackathon: string;
  project: string;
  status: 'Completed' | 'In Progress';
  rank?: string;
}

const ongoingHackathons: Hackathon[] = [
  {
    id: "1",
    title: "AI Innovation Challenge",
    description: "Build innovative AI-powered applications that solve real-world problems.",
    status: "Live",
    timeLeft: "2 days left",
    prizePool: "$10,000",
    participants: 247
  },
  {
    id: "2",
    title: "Web3 Developer Sprint",
    description: "Create decentralized applications using blockchain technology and smart contracts.",
    status: "Live",
    timeLeft: "5 days left",
    prizePool: "$15,000",
    participants: 189,
    joined: true
  }
];

const upcomingHackathons: Hackathon[] = [
  {
    id: "3",
    title: "Mobile App Challenge",
    description: "Design and develop innovative mobile applications for iOS and Android platforms.",
    status: "Upcoming",
    startsIn: "Starts in 3 days",
    duration: "7 days",
    prizePool: "$8,000"
  },
  {
    id: "4",
    title: "Green Tech Hackathon",
    description: "Build sustainable technology solutions to address climate change and environmental challenges.",
    status: "Upcoming",
    startsIn: "Starts in 1 week",
    duration: "5 days",
    prizePool: "$12,000"
  }
];

const submissions: Submission[] = [
  {
    id: "1",
    hackathon: "Summer Code Fest 2024",
    project: "TaskMaster Pro",
    status: "Completed",
    rank: "#12"
  },
  {
    id: "2",
    hackathon: "Web3 Developer Sprint",
    project: "DeFi Analytics Dashboard",
    status: "In Progress"
  }
];

export default function Hackathons() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Hackathons</h1>
          <p className="text-gray-300">Join competitive coding events and showcase your skills to the community.</p>
        </motion.div>

        <div className="space-y-8">
          {/* Ongoing Hackathons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Flame className="text-accent mr-2 h-5 w-5" />
              Ongoing Hackathons
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingHackathons.map((hackathon, index) => (
                <Card key={hackathon.id} delay={index * 0.1}>
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-red-100 text-red-800">Live</Badge>
                    <span className="text-sm text-gray-400">{hackathon.timeLeft}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{hackathon.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{hackathon.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Prize Pool:</span>
                      <span className="text-accent font-semibold">{hackathon.prizePool}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Participants:</span>
                      <span>{hackathon.participants}</span>
                    </div>
                  </div>
                  <Button 
                    variant={hackathon.joined ? "secondary" : "primary"} 
                    className="w-full"
                  >
                    {hackathon.joined ? "Joined" : "Join Now"}
                  </Button>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Hackathons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="text-accent mr-2 h-5 w-5" />
              Upcoming Events
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingHackathons.map((hackathon, index) => (
                <Card key={hackathon.id} delay={index * 0.1}>
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
                    <span className="text-sm text-gray-400">{hackathon.startsIn}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{hackathon.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{hackathon.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Duration:</span>
                      <span>{hackathon.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Prize Pool:</span>
                      <span className="text-accent font-semibold">{hackathon.prizePool}</span>
                    </div>
                  </div>
                  <Button variant="primary" className="w-full">
                    Register
                  </Button>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* My Submissions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Trophy className="text-accent mr-2 h-5 w-5" />
              My Submissions
            </h2>
            <div className="bg-secondary/50 rounded-xl border border-secondary overflow-hidden">
              <Table>
                <TableHeader className="bg-primary/50">
                  <TableRow>
                    <TableHead className="text-gray-300">Hackathon</TableHead>
                    <TableHead className="text-gray-300">Project</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Rank</TableHead>
                    <TableHead className="text-gray-300">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission.id} className="hover:bg-primary/20 transition-colors">
                      <TableCell className="text-sm text-white">{submission.hackathon}</TableCell>
                      <TableCell className="text-sm text-white">{submission.project}</TableCell>
                      <TableCell>
                        <Badge className={
                          submission.status === 'Completed' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }>
                          {submission.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {submission.rank ? (
                          <span className="text-accent font-semibold">{submission.rank}</span>
                        ) : (
                          <span className="text-gray-400">TBD</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant={submission.status === 'Completed' ? 'secondary' : 'primary'} 
                          size="sm"
                        >
                          {submission.status === 'Completed' ? 'View Project' : 'Submit'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
