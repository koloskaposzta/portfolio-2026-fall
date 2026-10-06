export const i4pRdssStudy = {
  title: 'I4P RDSS',
  category: 'Enterprise signing · Interface design and frontend development',
  summary: 'I designed and built a browser interface that connects document workflows with credential activation and authenticated signing.',
  context: 'I4P company project · 2025 thesis prototype · part of a larger RDSS, RSSP and HSM system.',
  contribution: 'User-journey and screen design, Vue frontend development, browser-based signing integration and Cypress test scripting. Backend and RSSP frontend work belonged to other teams.',
  cover: {
    src: '/api/i4p-rdss/images/signing',
    alt: 'RDSS signing screen with a document preview, credential selector and sign action',
    caption: 'The implemented signing screen, shown with a test document in the 2025 thesis.'
  },
  sections: [
    {
      id: 'challenge',
      title: 'A signature crossed several systems, but needed one clear journey',
      paragraphs: [
        'I4P’s RDSS managed PDF documents and multi-person signing chains. Its companion RSSP managed signing credentials, while the security module performed cryptographic operations. The browser had to connect these parts without asking a signer to understand their boundaries.',
        'The brief called for a white-label interface for tablet, laptop and office-monitor use, with clear navigation, status feedback and role-based access. Mobile support was outside the stated scope. My thesis focused on the web frontend and its Signature Interaction Component (SIC), working alongside the backend and RSSP frontend teams.'
      ]
    },
    {
      id: 'finding-a-route',
      title: 'I brought the next signing task to the surface',
      paragraphs: [
        'I reviewed other signing products and mapped the paths for creating a signing chain, signing or declining, and handling completed documents. The dashboard concept put pending and completed work, guidance and document upload close to the starting point.',
        'The document flow treated an upload as the start of a signing chain: the creator could add participants, assign roles and choose whether people signed in order. This made the workflow visible in the interface instead of leaving it as a hidden backend rule.'
      ],
      figures: [
        {
          src: '/api/i4p-rdss/images/dashboard-concept',
          alt: 'Dashboard design concept with task counts, guidance, an upload area and document previews',
          caption: 'Early dashboard design from the thesis. Its sample counts and document names are illustrative, not usage data.',
          label: 'Interface plan'
        },
        {
          src: '/api/i4p-rdss/images/upload-flow',
          alt: 'Implemented upload dialog with document selection, participant entry and signing-order control',
          caption: 'The implemented upload dialog connects a PDF to its participants and signing order.',
          label: 'Implemented workflow'
        }
      ]
    },
    {
      id: 'signer-control',
      title: 'The browser handled authorization while the signer stayed oriented',
      paragraphs: [
        'A signer first needed an activated credential. I integrated browser registration and credential activation into the Vue application, then connected the signing screen to the authorization request from RSSP. The signer could choose a credential, review the document and authorize the action through a focused prompt.',
        'I placed the SIC logic in a reusable Vue mixin so the UI components could call the same device, credential and signing operations. The browser prepared the signing authorization data; the RSSP and security module carried out the remaining cryptographic work. This was a technical integration decision, not a claim that I built the entire signing infrastructure.'
      ],
      figures: [
        {
          src: '/api/i4p-rdss/images/authorization',
          alt: 'Signing authorization dialog over the document preview, asking for the credential password',
          caption: 'The authorization prompt appears in the signing context rather than as a separate unexplained step.',
          label: 'Signer authorization'
        }
      ]
    },
    {
      id: 'evidence',
      title: 'A test document was signed; usability impact was not measured',
      paragraphs: [
        'The thesis documents a working prototype and a signed test PDF checked in Adobe Reader. It also includes a Cypress script that goes through credential creation, activation, upload and signing. The script stops short of asserting the final signed result, so I treat the manual PDF check as the evidence for that outcome.',
        'The work shows that the frontend could complete the intended technical flow in the thesis environment. I do not have measured task success, completion time, customer adoption or production impact. Formal user-test findings were not documented in the thesis.'
      ],
      figures: [
        {
          src: '/api/i4p-rdss/images/signing-result',
          alt: 'RDSS document list with a successful signing confirmation dialog',
          caption: 'Prototype confirmation after a test signing flow. The separate PDF check is described in the thesis.',
          label: 'Prototype result'
        }
      ]
    }
  ]
} as const
