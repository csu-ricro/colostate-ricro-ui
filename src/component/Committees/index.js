import { blue, cyan, deepPurple, grey, lightGreen, red, yellow } from '@material-ui/core/colors';
import {
  mdiAccountMultiple,
  mdiEarth,
  mdiFlask,
  mdiPaw,
  mdiScaleBalance,
  mdiShieldCheck,
} from '@mdi/js';

export default {
  keys: ['iacuc', 'ibc', 'irb', 'qa', 'rcr', 'xc'],
  iacuc: {
    name: 'Institutional Animal Care and Use Committee',
    alias: 'IACUC',
    textColor: '#000',
    bgColor: red[500],
    iconColor: grey[50],
    iconBgColor: red[800],
    icon: mdiPaw,
  },
  ibc: {
    name: 'Institutional Biosafety Committee',
    alias: 'IBC',
    textColor: grey[900],
    bgColor: lightGreen[500],
    iconColor: grey[50],
    iconBgColor: lightGreen[800],
    icon: mdiFlask,
  },
  irb: {
    name: 'Institutional Review Board',
    alias: 'IRB',
    textColor: grey[50],
    bgColor: deepPurple[500],
    iconColor: grey[50],
    iconBgColor: deepPurple[800],
    icon: mdiAccountMultiple,
  },
  qa: {
    name: 'Quality Assurance',
    alias: 'QA',
    textColor: grey[900],
    bgColor: cyan[300],
    iconColor: grey[50],
    iconBgColor: cyan[800],
    icon: mdiShieldCheck,
  },
  rcr: {
    name: 'Responsible Conduct of Research',
    alias: 'RCR',
    textColor: grey[900],
    bgColor: yellow[500],
    iconColor: grey[900],
    iconBgColor: yellow[800],
    icon: mdiScaleBalance,
  },
  xc: {
    name: 'Export Control',
    alias: 'XC',
    textColor: '#000',
    bgColor: blue[500],
    iconColor: grey[50],
    iconBgColor: blue[800],
    icon: mdiEarth,
  },
};
