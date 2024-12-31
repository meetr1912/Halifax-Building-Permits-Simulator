import { PermitType, PermitResult, Answers } from '../types/permit-finder';

export function determinePermits(answers: Answers): PermitResult {
  const permits: PermitType[] = [];
  const additionalInfo: string[] = [];

  switch (answers.start) {
    case 'New Construction':
      switch (answers.newConstruction) {
        case 'Single-unit dwelling, triplex, or townhouse':
          permits.push('Building Permit');
          break;
        case 'Multi-unit building':
          permits.push('Building Permit', 'Development Permit');
          break;
        case 'Commercial or industrial building':
          permits.push('Building Permit', 'Zoning Approval');
          break;
      }
      break;
    case 'Renovation':
      if (answers.renovation !== 'Replacing windows or doors without altering the structure') {
        permits.push('Building Permit');
      }
      break;
    case 'Home Improvement':
      switch (answers.homeImprovement) {
        case 'Deck Construction':
          if (answers.deckConstruction === 'Yes') {
            permits.push('Deck Permit');
          }
          break;
        case 'Fence Installation':
          if (answers.fenceInstallation === 'Yes') {
            permits.push('Fence Permit');
          }
          break;
        case 'Swimming Pool Installation':
          if (answers.swimmingPool === 'Yes') {
            permits.push('Swimming Pool Permit');
          }
          break;
        case 'Accessory Structure (Garage/Shed)':
          if (answers.accessoryStructure === 'Yes') {
            permits.push('Building Permit');
          } else {
            permits.push('Development Permit');
          }
          break;
        case 'Driveway Expansion':
          permits.push('Driveway Permit');
          break;
        case 'Solar Panel Installation':
          permits.push('Building Permit');
          break;
      }
      break;
    case 'Demolition':
      if (answers.demolition === 'Yes') {
        permits.push('Demolition Permit');
      }
      break;
    case 'Landscaping and Grading':
      if (answers.landscaping === 'Yes') {
        permits.push('Lot Grading Permit');
      }
      break;
  }

  additionalInfo.push('Documents Required: Construction plans, site plans, elevation details, and property survey.');
  additionalInfo.push('Inspections: Required at various stages (e.g., footing, framing, final) for most permits.');
  additionalInfo.push('Fees: Based on construction value and must be paid at the time of application.');
  additionalInfo.push('Application Process: Submit online through the Halifax customer portal or in-person at the Planning & Development Counter.');

  return { permits, additionalInfo };
}

