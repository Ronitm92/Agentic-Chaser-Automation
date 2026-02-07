
import { Client } from '../types';

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'C013',
    name: 'Alan Partridge',
    partner: 'Lynne Partridge',
    type: 'Joint',
    email: 'alan.partridge@norfolkradio.co.uk',
    phone: '07891 234567',
    address: 'Manor Lodge, Norwich Road, Cromer, NR27 9HB',
    dob: '15/11/1965',
    aum: '£350,000',
    netWorth: '£895,000',
    householdIncome: '£92,000',
    riskProfile: 'Balanced',
    riskScore: 5,
    lastInteraction: '2 hours ago',
    avatar: 'https://picsum.photos/seed/alan/200/200',
    status: 'Active',
    assets: [
      { name: 'Main Residence', value: '£485,000', type: 'Property' },
      { name: 'Alan ISA', value: '£145,000', type: 'ISA' },
      { name: 'BBC Pension', value: '£285,000', type: 'Pension' }
    ],
    goals: [
      { description: 'Retire at age 65 (Target £55k/yr)', priority: 'High' },
      { description: 'Lexus upgrade in 2026', priority: 'Medium' }
    ],
    notes: ['Alan confident and defensive; ego closely tied to career.', 'Lynne pragmatic and quietly concerned.'],
    loaStatus: 'Awaiting Signature',
    nextStep: 'Finalize pension sacrifice decision',
    goalProgress: 65
  },
  {
    id: 'C010',
    name: 'Antony Makepeace',
    partner: 'Beverley Makepeace',
    type: 'Joint',
    email: 'antony.makepeace@fashionhq.com',
    phone: '07712 567890',
    address: 'Flat 8, Riverside Heights, Kingston, KT2 5BQ',
    dob: '26/05/1991',
    aum: '£420,000',
    netWorth: '£520,000',
    householdIncome: '£160,000',
    riskProfile: 'Aggressive',
    riskScore: 8,
    lastInteraction: 'Just now',
    avatar: 'https://picsum.photos/seed/antony/200/200',
    status: 'Review',
    assets: [
      { name: 'Antony SIPP', value: '£68,000', type: 'Pension' },
      { name: 'Beverley SIPP', value: '£95,000', type: 'Pension' }
    ],
    goals: [
      { description: 'Purchase property £550k-£600k', priority: 'High' },
      { description: 'Wedding September 2026', priority: 'High' }
    ],
    notes: ['Unmarried status creates legal vulnerability.', 'Need for Life Insurance Trusts urgently.'],
    loaStatus: 'Critical: Forms Issued',
    nextStep: 'Complete Life Insurance Trusts',
    goalProgress: 40
  },
  {
    id: 'C015',
    name: 'Basil Fawlty',
    partner: 'Sybil Fawlty',
    type: 'Joint',
    email: 'basil@fawltytowers.co.uk',
    phone: '07789 234567',
    address: 'Fawlty Towers Hotel, Torquay Seafront, TQ1 2BE',
    dob: '19/05/1958',
    aum: '£1,400,000',
    netWorth: '£2,100,000',
    householdIncome: '£85,000',
    riskProfile: 'Conservative',
    riskScore: 3,
    lastInteraction: '4 hours ago',
    avatar: 'https://picsum.photos/seed/basil/200/200',
    status: 'Active',
    assets: [
      { name: 'Hotel & Accommodation', value: '£1,400,000', type: 'Property' },
      { name: 'Joint ISAs', value: '£145,000', type: 'ISA' }
    ],
    goals: [
      { description: 'Exit hotel business 2026-27', priority: 'High' },
      { description: 'Full retirement to Spain', priority: 'Medium' }
    ],
    notes: ['Basil ego-attached to hotel as life work.', 'BADR framing is key to unlocking sale decision.'],
    loaStatus: 'In Progress: Market Review',
    nextStep: 'Confirm BADR eligibility status',
    goalProgress: 30
  },
  {
    id: 'C009',
    name: 'Brian Potter',
    type: 'Individual',
    email: 'brian.potter47@gmail.com',
    phone: '07756 432198',
    address: '22 Willow Close, Guildford, GU2 9SD',
    dob: '11/04/1957',
    aum: '£650,000',
    netWorth: '£1,150,000',
    householdIncome: '£52,400',
    riskProfile: 'Conservative',
    riskScore: 2,
    lastInteraction: '1 day ago',
    avatar: 'https://picsum.photos/seed/brian/200/200',
    status: 'Active',
    assets: [
      { name: 'BAE DB Pension', value: '£38,900', type: 'Pension' },
      { name: 'Main Residence', value: '£625,000', type: 'Property' }
    ],
    goals: [
      { description: 'Simplify finances (too many accounts)', priority: 'High' },
      { description: 'Consider downsizing home', priority: 'Medium' }
    ],
    notes: ['Recent widower, still adjusting emotionally.', 'Strong relationship with daughter Sarah.'],
    loaStatus: 'Pending: ISA Consolidation',
    nextStep: 'Execute Margaret’s ISA transfer',
    goalProgress: 50
  },
  {
    id: 'C007',
    name: 'Gareth Cheeseman',
    type: 'Individual',
    email: 'gareth.cheeseman@constructionpm.com',
    phone: '07723 891234',
    address: 'Apartment 5B, Riverside Development, Weybridge, KT13 8PL',
    dob: '19/07/1979',
    aum: '£220,000',
    netWorth: '£285,000',
    householdIncome: '£86,000',
    riskProfile: 'Balanced High',
    riskScore: 6,
    lastInteraction: '3 days ago',
    avatar: 'https://picsum.photos/seed/gareth/200/200',
    status: 'Review',
    assets: [
      { name: 'BuildRight Pension', value: '£125,000', type: 'Pension' },
      { name: 'Santander Savings', value: '£45,000', type: 'Other' }
    ],
    goals: [
      { description: 'Rebuild long-term security post-divorce', priority: 'High' },
      { description: 'Purchase property in 2026', priority: 'High' }
    ],
    notes: ['Committed father; processing 2022 divorce.', 'Requires direct, practical advice without jargon.'],
    loaStatus: 'Urgent: Will Update',
    nextStep: 'Book solicitor for post-divorce will',
    goalProgress: 20
  },
  {
    id: 'C011',
    name: 'Keith Lard',
    partner: 'Maureen Lard',
    type: 'Joint',
    email: 'keith.lard@lardassoc.co.uk',
    phone: '07789 345612',
    address: 'The Old Rectory, 12 Church Lane, Dorking, RH4 2LP',
    dob: '08/08/1960',
    aum: '£1,800,000',
    netWorth: '£3,250,000',
    householdIncome: '£117,500',
    riskProfile: 'Balanced',
    riskScore: 5,
    lastInteraction: '1 week ago',
    avatar: 'https://picsum.photos/seed/keith/200/200',
    status: 'Review',
    assets: [
      { name: 'Keith SIPP', value: '£780,000', type: 'Pension' },
      { name: 'Main Residence', value: '£1,200,000', type: 'Property' }
    ],
    goals: [
      { description: 'Keith retirement confirmed for April 2026', priority: 'High' },
      { description: 'Secure income of £75k/year', priority: 'High' }
    ],
    notes: ['Excellent savers with high trust in advice.', 'Very family-centric; world cruise booked.'],
    loaStatus: 'Critical: Co. Reserve Extraction',
    nextStep: 'Execute £180k pension contribution',
    goalProgress: 75
  }
];
