// Sample questions data
const questionsData = {
  maths: [
    { text: 'What is 2 + 2?', marks: 2 },
    { text: 'Define a prime number.', marks: 2 },
    { text: 'Solve x^2 = 4.', marks: 2 },
    { text: 'What is the derivative of x^2?', marks: 2 },
    { text: 'Integrate x dx.', marks: 2 },
    { text: 'What is the value of pi?', marks: 2 },
    { text: 'State Pythagoras theorem.', marks: 2 },
    { text: 'What is a matrix?', marks: 2 },
    { text: 'Define a vector.', marks: 2 },
    { text: 'What is the area of a circle?', marks: 2 },
    // 10-mark questions
    { text: 'Explain the Fundamental Theorem of Calculus with examples.', marks: 10 },
    { text: 'Discuss the applications of matrices in solving linear equations.', marks: 10 },
    { text: 'Describe the process of integration and its significance in mathematics.', marks: 10 },
    { text: 'Explain the concept of vectors and their use in physics and engineering.', marks: 10 },
    { text: 'Discuss the properties and applications of prime numbers.', marks: 10 }
  ],
  physics: [
    { text: 'State Newton’s first law.', marks: 2 },
    { text: 'What is velocity?', marks: 2 },
    { text: 'Define acceleration.', marks: 2 },
    { text: 'What is force?', marks: 2 },
    { text: 'State Ohm’s law.', marks: 2 },
    { text: 'What is power?', marks: 2 },
    { text: 'Define energy.', marks: 2 },
    { text: 'What is momentum?', marks: 2 },
    { text: 'State the law of conservation of energy.', marks: 2 },
    { text: 'What is frequency?', marks: 2 },
    // 10-mark questions
    { text: 'Explain Newton’s laws of motion with suitable examples.', marks: 10 },
    { text: 'Describe the principle and working of a transformer.', marks: 10 },
    { text: 'Discuss the law of conservation of energy and its applications.', marks: 10 },
    { text: 'Explain the concept of electromagnetic induction.', marks: 10 },
    { text: 'Describe the structure and functioning of an atom.', marks: 10 }
  ],
  chemistry: [
    { text: 'Define an atom.', marks: 2 },
    { text: 'What is a molecule?', marks: 2 },
    { text: 'State Avogadro’s law.', marks: 2 },
    { text: 'What is pH?', marks: 2 },
    { text: 'Define acid and base.', marks: 2 },
    { text: 'What is a chemical reaction?', marks: 2 },
    { text: 'State the law of conservation of mass.', marks: 2 },
    { text: 'What is an isotope?', marks: 2 },
    { text: 'Define valency.', marks: 2 },
    { text: 'What is a catalyst?', marks: 2 },
    // 10-mark questions
    { text: 'Explain the structure of an atom and its subatomic particles.', marks: 10 },
    { text: 'Discuss the chemical properties and uses of acids and bases.', marks: 10 },
    { text: 'Describe the process of chemical reactions with examples.', marks: 10 },
    { text: 'Explain the law of conservation of mass with experiments.', marks: 10 },
    { text: 'Discuss the importance and applications of isotopes.', marks: 10 }
  ]
};

module.exports = questionsData;
