import { motion } from "framer-motion";

const codeSnippets = [
  {
    code: `const solve = (n) => {\n  return n * 2;\n}`,
    position: { top: '20%', left: '10%' },
    delay: 0.1
  },
  {
    code: `for (let i = 0; i < n; i++) {\n  console.log(i);\n}`,
    position: { top: '40%', right: '20%' },
    delay: 0.2
  },
  {
    code: `function fibonacci(n) {\n  if (n <= 1) return n;\n  return fib(n-1) + fib(n-2);\n}`,
    position: { bottom: '40%', left: '20%' },
    delay: 0.3
  },
  {
    code: `<div className="hero">\n  <h1>Hello World</h1>\n</div>`,
    position: { bottom: '20%', right: '10%' },
    delay: 0.1
  }
];

export default function FloatingCodeSnippets() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {codeSnippets.map((snippet, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 0.2, 
            y: 0,
          }}
          transition={{ 
            delay: snippet.delay,
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 3
          }}
          style={snippet.position}
          className="absolute text-accent/20 text-sm font-mono whitespace-pre floating-code"
        >
          {snippet.code}
        </motion.div>
      ))}
    </div>
  );
}
