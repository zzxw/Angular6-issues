export class Options {
  options: any;
  constructor() {
    this.options = {
      issue_status: {
        'P': 'Pending',
        'K': 'Package',
        'C': 'Close',
        'N': 'Canceled'
      },
      mail_status: {
        'P': 'Pending',
        'L': 'Locked',
        'F': 'Parsed',
        'E': 'Error',
        'I': 'Invalid'
      },
      priority: {
        '10': 'Low',
        '20': 'Medium',
        '30': 'High',
        '40': 'Very High'
      }
    };
  }
  getOptions(opType): any {
    return this.options[opType];
  }

 getOptionLabel(opType, opValue): any {
  const obj = this.options[opType];
  if (!obj) {
    return opValue;
  } else {
    const label = obj[opValue];
    if (label) {
      return label;
    } else {
      return opValue;
    }
  }
}
}

