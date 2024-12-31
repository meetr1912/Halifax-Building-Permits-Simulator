import { Question } from '../types/permit-finder';

export const questions: { [key: string]: Question } = {
  start: {
    id: 'start',
    text: 'What is your project type?',
    options: ['New Construction', 'Renovation', 'Home Improvement', 'Demolition', 'Landscaping and Grading'],
    nextQuestion: {
      'New Construction': 'newConstruction',
      'Renovation': 'renovation',
      'Home Improvement': 'homeImprovement',
      'Demolition': 'demolition',
      'Landscaping and Grading': 'landscaping',
    },
  },
  newConstruction: {
    id: 'newConstruction',
    text: 'What type of new construction?',
    options: ['Single-unit dwelling, triplex, or townhouse', 'Multi-unit building', 'Commercial or industrial building'],
    nextQuestion: {
      'Single-unit dwelling, triplex, or townhouse': null,
      'Multi-unit building': null,
      'Commercial or industrial building': null,
    },
  },
  renovation: {
    id: 'renovation',
    text: 'What type of renovation?',
    options: [
      'Structural changes',
      'Changes to plumbing, electrical, or mechanical systems',
      'Adding a secondary suite or backyard suite',
      'Converting a basement into a livable space',
      'Replacing windows or doors without altering the structure',
    ],
    nextQuestion: {
      'Structural changes': null,
      'Changes to plumbing, electrical, or mechanical systems': null,
      'Adding a secondary suite or backyard suite': null,
      'Converting a basement into a livable space': null,
      'Replacing windows or doors without altering the structure': null,
    },
  },
  homeImprovement: {
    id: 'homeImprovement',
    text: 'What type of home improvement?',
    options: ['Deck Construction', 'Fence Installation', 'Swimming Pool Installation', 'Accessory Structure (Garage/Shed)', 'Driveway Expansion', 'Solar Panel Installation'],
    nextQuestion: {
      'Deck Construction': 'deckConstruction',
      'Fence Installation': 'fenceInstallation',
      'Swimming Pool Installation': 'swimmingPool',
      'Accessory Structure (Garage/Shed)': 'accessoryStructure',
      'Driveway Expansion': null,
      'Solar Panel Installation': null,
    },
  },
  deckConstruction: {
    id: 'deckConstruction',
    text: 'Is the deck attached to the house, elevated above 600 mm, or larger than 20 m²?',
    options: ['Yes', 'No'],
    nextQuestion: {
      'Yes': null,
      'No': null,
    },
  },
  fenceInstallation: {
    id: 'fenceInstallation',
    text: 'Is the fence taller than 1.98 metres?',
    options: ['Yes', 'No'],
    nextQuestion: {
      'Yes': null,
      'No': null,
    },
  },
  swimmingPool: {
    id: 'swimmingPool',
    text: 'Is the pool over 1 metre deep?',
    options: ['Yes', 'No'],
    nextQuestion: {
      'Yes': null,
      'No': null,
    },
  },
  accessoryStructure: {
    id: 'accessoryStructure',
    text: 'Is the structure larger than 20 m² or more than one story?',
    options: ['Yes', 'No'],
    nextQuestion: {
      'Yes': null,
      'No': null,
    },
  },
  demolition: {
    id: 'demolition',
    text: 'Are you removing a structure (e.g., house, garage, shed)?',
    options: ['Yes', 'No'],
    nextQuestion: {
      'Yes': null,
      'No': null,
    },
  },
  landscaping: {
    id: 'landscaping',
    text: 'Are you altering the lot grading or drainage?',
    options: ['Yes', 'No'],
    nextQuestion: {
      'Yes': null,
      'No': null,
    },
  },
};

