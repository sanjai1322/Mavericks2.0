import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  status: 'Completed' | 'In Progress' | 'Not Started' | 'Locked';
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "Two Sum",
    description: "Find two numbers that add up to target",
    difficulty: "Easy",
    category: "Arrays",
    status: "Completed"
  },
  {
    id: "2",
    title: "Valid Parentheses",
    description: "Check if parentheses are properly closed",
    difficulty: "Easy",
    category: "Stack",
    status: "In Progress"
  },
  {
    id: "3",
    title: "Merge Two Sorted Lists",
    description: "Combine two sorted linked lists",
    difficulty: "Medium",
    category: "Linked List",
    status: "Not Started"
  },
  {
    id: "4",
    title: "Binary Tree Maximum Path Sum",
    description: "Find the maximum path sum in a binary tree",
    difficulty: "Hard",
    category: "Tree",
    status: "Locked"
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy': return 'bg-green-100 text-green-800';
    case 'Medium': return 'bg-yellow-100 text-yellow-800';
    case 'Hard': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed': return 'bg-accent/20 text-accent';
    case 'In Progress': return 'bg-blue-100 text-blue-800';
    case 'Not Started': return 'bg-gray-100 text-gray-800';
    case 'Locked': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function Assessments() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState(`// Write your solution here
function isValid(s) {
    // Your code here
}`);

  const openCodingModal = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
  };

  const closeCodingModal = () => {
    setSelectedChallenge(null);
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Code Challenges</h1>
          <p className="text-gray-300">Practice your skills with carefully curated coding problems.</p>
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
                <TableHead className="text-gray-300">Challenge</TableHead>
                <TableHead className="text-gray-300">Difficulty</TableHead>
                <TableHead className="text-gray-300">Category</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {challenges.map((challenge) => (
                <TableRow key={challenge.id} className="hover:bg-primary/20 transition-colors">
                  <TableCell>
                    <div>
                      <div className="text-sm font-medium text-white">{challenge.title}</div>
                      <div className="text-sm text-gray-400">{challenge.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-300">{challenge.category}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(challenge.status)}>
                      {challenge.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {challenge.status === 'Locked' ? (
                      <Button variant="secondary" size="sm" className="opacity-50 cursor-not-allowed" disabled>
                        Locked
                      </Button>
                    ) : challenge.status === 'Completed' ? (
                      <Button variant="secondary" size="sm">
                        Review
                      </Button>
                    ) : (
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => openCodingModal(challenge)}
                      >
                        {challenge.status === 'In Progress' ? 'Continue' : 'Start'}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* Coding Editor Modal */}
        <Modal
          isOpen={!!selectedChallenge}
          onClose={closeCodingModal}
          title={selectedChallenge?.title || ""}
          size="xl"
        >
          {selectedChallenge && (
            <div className="grid lg:grid-cols-2 gap-6 p-6">
              {/* Problem Description */}
              <div className="space-y-4">
                <div className="bg-primary/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Problem Statement</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {selectedChallenge.description}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
                    An input string is valid if:
                  </p>
                  <ul className="text-gray-300 text-sm mt-2 space-y-1 list-disc list-inside">
                    <li>Open brackets must be closed by the same type of brackets.</li>
                    <li>Open brackets must be closed in the correct order.</li>
                  </ul>
                </div>
                <div className="bg-primary/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Examples</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-400">Input:</span>{" "}
                      <code className="bg-accent/20 text-accent px-2 py-1 rounded">"()"</code><br />
                      <span className="text-gray-400">Output:</span>{" "}
                      <code className="bg-green-100 text-green-800 px-2 py-1 rounded">true</code>
                    </div>
                    <div>
                      <span className="text-gray-400">Input:</span>{" "}
                      <code className="bg-accent/20 text-accent px-2 py-1 rounded">"()[]{}"</code><br />
                      <span className="text-gray-400">Output:</span>{" "}
                      <code className="bg-green-100 text-green-800 px-2 py-1 rounded">true</code>
                    </div>
                    <div>
                      <span className="text-gray-400">Input:</span>{" "}
                      <code className="bg-accent/20 text-accent px-2 py-1 rounded">"(]"</code><br />
                      <span className="text-gray-400">Output:</span>{" "}
                      <code className="bg-red-100 text-red-800 px-2 py-1 rounded">false</code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Editor */}
              <div className="space-y-4">
                <div className="bg-primary/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Code Editor</h3>
                    <Select defaultValue="javascript">
                      <SelectTrigger className="w-32 bg-secondary border-primary">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-80 bg-primary rounded border border-secondary p-4 text-white font-mono text-sm resize-none focus:border-accent"
                  />
                </div>
                <div className="flex space-x-3">
                  <Button variant="primary" className="flex-1">
                    <Play className="mr-2 h-4 w-4" />
                    Run Code
                  </Button>
                  <Button variant="secondary">
                    Submit
                  </Button>
                </div>
                <div className="bg-primary/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Output</h4>
                  <div className="bg-primary rounded p-3 text-sm text-gray-300 font-mono">
                    Click "Run Code" to see output...
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
