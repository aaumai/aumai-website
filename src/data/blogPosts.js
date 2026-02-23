export const BLOG_CATEGORIES = [
  'All',
  'AI in Healthcare',
  'FHIR & Interoperability',
  'Value-Based Care',
  'Risk Adjustment',
  'Clinical Trials',
  'Engineering',
];

const blogPosts = [
  {
    slug: 'why-smart-on-fhir-is-the-future-of-ehr-integration',
    title: 'Why SMART on FHIR Is the Future of EHR Integration',
    date: '2026-02-17',
    author: 'Jayesh Chaudhari',
    authorRole: 'Founder & CTO',
    category: 'FHIR & Interoperability',
    tags: ['FHIR', 'SMART on FHIR', 'EHR', 'Interoperability', 'OAuth2'],
    excerpt:
      'Traditional EHR integrations are expensive, brittle, and vendor-locked. SMART on FHIR is changing that by providing a universal app platform that works across Epic, Cerner, and every major EHR.',
    readingTime: '8 min read',
    content: [
      {
        type: 'paragraph',
        text: 'If you have ever built an EHR integration, you know the pain. Each vendor has its own API, its own authentication model, its own data format quirks. A single integration with Epic can take 6-12 months and cost hundreds of thousands of dollars. Multiply that across Cerner, Athena, AllScripts, and the dozens of other EHRs in the market, and you are looking at years of development just to achieve broad coverage.',
      },
      {
        type: 'heading',
        text: 'The Problem with Traditional EHR Integrations',
      },
      {
        type: 'paragraph',
        text: 'Traditional EHR integrations typically rely on HL7v2 messages, proprietary APIs, or custom point-to-point connections. Each approach comes with significant drawbacks:',
      },
      {
        type: 'list',
        items: [
          'HL7v2 messages require interface engines, custom parsing, and extensive testing per site',
          'Proprietary APIs lock you into a single vendor ecosystem with no portability',
          'Point-to-point connections do not scale and become unmaintainable as you add more EHR partners',
          'Each integration requires a separate security review and compliance process',
        ],
      },
      {
        type: 'heading',
        text: 'Enter SMART on FHIR',
      },
      {
        type: 'paragraph',
        text: 'SMART on FHIR (Substitutable Medical Applications, Reusable Technologies) is an open standard that combines the FHIR data model with OAuth2-based authentication to create a universal app platform for healthcare. Think of it as the "App Store" for EHRs.',
      },
      {
        type: 'paragraph',
        text: 'Here is what makes it transformative: you build your application once against the SMART on FHIR specification, and it can launch inside any EHR that supports the standard. Epic, Cerner, Allscripts, and most major EHRs now support SMART on FHIR apps.',
      },
      {
        type: 'subheading',
        text: 'How It Works',
      },
      {
        type: 'paragraph',
        text: 'The SMART launch sequence is elegant in its simplicity. When a provider clicks your app within the EHR, the following happens:',
      },
      {
        type: 'code',
        text: '1. EHR redirects to your app with a launch context\n2. Your app requests authorization via OAuth2\n3. Provider approves access scopes\n4. Your app receives an access token + patient context\n5. You can now read/write FHIR resources for that patient\n\n// Example: Fetching patient data after SMART launch\nconst client = await FHIR.oauth2.ready();\nconst patient = await client.patient.read();\nconst conditions = await client.request(\n  `Condition?patient=${patient.id}&clinical-status=active`\n);',
      },
      {
        type: 'heading',
        text: 'Real-World Impact',
      },
      {
        type: 'paragraph',
        text: 'At AUM AI, we built our Clinical Trial Matcher as a SMART on FHIR app. The result: a single codebase that launches inside Epic, Cerner, and other major EHRs. What would have taken 12+ months per EHR integration took us weeks to deploy across multiple health systems.',
      },
      {
        type: 'quote',
        text: 'SMART on FHIR reduced our EHR integration timeline from months to weeks and our maintenance burden from dedicated teams to a single shared codebase.',
      },
      {
        type: 'heading',
        text: 'Getting Started',
      },
      {
        type: 'paragraph',
        text: 'If you are building healthcare applications in 2026, SMART on FHIR should be your default integration strategy. The standard is mature, the EHR support is broad, and the developer tooling has improved dramatically. Start with the SMART App Launch specification, build against a sandbox like SMART Health IT or Logica Health, and you will be surprised how quickly you can get a production-ready app running inside an EHR.',
      },
    ],
  },
  {
    slug: 'how-gpt-4-is-transforming-clinical-documentation',
    title: 'How GPT-4 Is Transforming Clinical Documentation & Coding',
    date: '2026-02-10',
    author: 'Jayesh Chaudhari',
    authorRole: 'Founder & CTO',
    category: 'AI in Healthcare',
    tags: ['GPT-4', 'AI', 'Clinical Documentation', 'NLP', 'Medical Coding', 'HCC'],
    excerpt:
      'Large language models like GPT-4 are revolutionizing how clinical documentation is created, reviewed, and coded. Here is how we are using it in production for quality measures and risk adjustment.',
    readingTime: '10 min read',
    content: [
      {
        type: 'paragraph',
        text: 'Clinical documentation is the backbone of healthcare operations. Every diagnosis, procedure, and clinical decision flows through documentation, and downstream processes like billing, quality reporting, and risk adjustment depend entirely on its accuracy. Yet the documentation process itself has been largely unchanged for decades: physicians dictate or type notes, coders review them, and errors propagate through the system.',
      },
      {
        type: 'heading',
        text: 'The Documentation Burden',
      },
      {
        type: 'paragraph',
        text: 'Physicians spend an average of 2 hours on documentation for every 1 hour of patient care. This is not just an efficiency problem; it is a patient safety problem. Burned-out physicians make more errors, and incomplete documentation leads to missed diagnoses, incorrect coding, and revenue leakage.',
      },
      {
        type: 'list',
        items: [
          'Average physician spends 15.5 hours per week on documentation and administrative tasks',
          '70% of physicians report burnout related to documentation burden',
          'Up to 30% of clinical encounters have coding errors due to incomplete documentation',
          'Risk adjustment revenue leakage from documentation gaps can exceed 10-15% per patient',
        ],
      },
      {
        type: 'heading',
        text: 'GPT-4 in Production: Our Approach',
      },
      {
        type: 'paragraph',
        text: 'At AUM AI, we have integrated GPT-4o into our Quality Measures Platform for two critical workflows: clinical concept extraction from unstructured notes, and intelligent gap closure recommendations.',
      },
      {
        type: 'subheading',
        text: 'Clinical Concept Extraction',
      },
      {
        type: 'paragraph',
        text: 'When processing clinical notes, GPT-4o extracts structured clinical concepts including diagnoses, medications, procedures, and lab results and maps them to standard code systems like ICD-10, SNOMED CT, and LOINC. This powers our gap closure engine by identifying conditions documented in notes but missing from the problem list.',
      },
      {
        type: 'code',
        text: '// Simplified example of our GPT-4o clinical extraction pipeline\nconst extractClinicalConcepts = async (clinicalNote) => {\n  const response = await openai.chat.completions.create({\n    model: "gpt-4o",\n    messages: [\n      {\n        role: "system",\n        content: `Extract clinical concepts from this note.\n          Return structured JSON with:\n          - conditions: [{name, icd10, snomed, status}]\n          - medications: [{name, rxnorm, dosage, frequency}]\n          - procedures: [{name, cpt, date}]\n          - labResults: [{name, loinc, value, unit, date}]`\n      },\n      { role: "user", content: clinicalNote }\n    ],\n    response_format: { type: "json_object" }\n  });\n  return JSON.parse(response.choices[0].message.content);\n};',
      },
      {
        type: 'subheading',
        text: 'Intelligent Gap Closure',
      },
      {
        type: 'paragraph',
        text: 'The real power comes when we combine extraction with quality measure logic. For every patient, we compare extracted clinical concepts against open quality measure gaps. GPT-4o then generates specific, actionable recommendations for closing each gap, complete with suggested documentation language and applicable codes.',
      },
      {
        type: 'heading',
        text: 'Safety and Accuracy',
      },
      {
        type: 'paragraph',
        text: 'Using AI in clinical workflows requires rigorous validation. We run every GPT-4o output through a validation pipeline that checks extracted codes against reference terminologies, flags low-confidence extractions for human review, and maintains a complete audit trail. Our accuracy rates exceed 95% on structured extraction tasks, validated against physician-reviewed gold standards.',
      },
      {
        type: 'quote',
        text: 'AI does not replace clinical judgment. It amplifies it by surfacing the right information at the right time, so physicians can focus on patient care instead of documentation.',
      },
      {
        type: 'heading',
        text: 'What Is Next',
      },
      {
        type: 'paragraph',
        text: 'We are actively expanding our AI capabilities into ambient documentation, automated coding review, and predictive risk adjustment. The convergence of large language models with healthcare standards like FHIR is creating opportunities that were not possible even two years ago. If you are working on clinical AI, now is the time to build.',
      },
    ],
  },
  {
    slug: 'automating-hedis-mips-technical-deep-dive',
    title: 'Automating HEDIS & MIPS: A Technical Deep Dive',
    date: '2026-02-03',
    author: 'Jayesh Chaudhari',
    authorRole: 'Founder & CTO',
    category: 'Value-Based Care',
    tags: ['HEDIS', 'MIPS', 'Quality Measures', 'Apache Spark', 'Value-Based Care', 'CMS'],
    excerpt:
      'Quality measure reporting consumes thousands of hours annually for healthcare organizations. Here is how we automated HEDIS and MIPS calculation using Apache Spark, configurable measure definitions, and intelligent data pipelines.',
    readingTime: '12 min read',
    content: [
      {
        type: 'paragraph',
        text: 'Every year, healthcare organizations spend thousands of person-hours calculating quality measures for HEDIS (Healthcare Effectiveness Data and Information Set) and MIPS (Merit-based Incentive Payment System). The process typically involves pulling data from multiple sources, applying complex clinical logic, handling edge cases, and generating submission files. Most organizations still rely heavily on manual chart review and spreadsheet-based calculations.',
      },
      {
        type: 'heading',
        text: 'Why Automation Is Hard',
      },
      {
        type: 'paragraph',
        text: 'Quality measure automation is not a simple ETL problem. Measures have complex clinical logic with numerous edge cases, exclusions, and exceptions. Consider a seemingly simple measure like Controlling High Blood Pressure (CBP):',
      },
      {
        type: 'list',
        items: [
          'Initial population: patients 18-85 with a hypertension diagnosis and an outpatient visit during the measurement year',
          'Denominator exclusions: patients with ESRD, kidney transplant, pregnancy, or hospice',
          'Numerator criteria: most recent blood pressure reading must be < 140/90 mmHg',
          'But which BP reading counts? There are specific rules about timing, setting, and measurement method',
          'And what about patients with data across multiple EHR systems?',
        ],
      },
      {
        type: 'heading',
        text: 'Our Architecture',
      },
      {
        type: 'paragraph',
        text: 'We designed our quality measures engine around three core principles: configurability, scalability, and auditability.',
      },
      {
        type: 'subheading',
        text: 'Configurable Measure Definitions',
      },
      {
        type: 'paragraph',
        text: 'Each quality measure is defined as a structured configuration that describes the clinical logic in a declarative format. This means adding a new measure or updating one for a new measurement year does not require code changes; you update the configuration.',
      },
      {
        type: 'code',
        text: '// Example: Measure definition structure (simplified)\n{\n  "measureId": "CBP",\n  "measureName": "Controlling High Blood Pressure",\n  "measureYear": 2026,\n  "initialPopulation": {\n    "ageRange": [18, 85],\n    "requiredDiagnoses": ["I10", "I11.*", "I12.*", "I13.*"],\n    "requiredEncounters": {\n      "types": ["outpatient", "telehealth"],\n      "minCount": 1,\n      "period": "measurement_year"\n    }\n  },\n  "exclusions": [\n    { "type": "diagnosis", "codes": ["N18.6"], "label": "ESRD" },\n    { "type": "procedure", "codes": ["Z94.0"], "label": "Kidney Transplant" },\n    { "type": "condition", "rule": "pregnancy_during_measurement_year" }\n  ],\n  "numerator": {\n    "type": "vital_signs",\n    "measure": "blood_pressure",\n    "criteria": { "systolic": "<140", "diastolic": "<90" },\n    "selection": "most_recent_in_period"\n  }\n}',
      },
      {
        type: 'subheading',
        text: 'Apache Spark Processing',
      },
      {
        type: 'paragraph',
        text: 'When you are processing quality measures for millions of patients across hundreds of measures, you need distributed computing. We use Apache Spark to parallelize measure calculation across the patient population. Each measure runs as a Spark job that reads from our consolidated clinical data store, applies the measure logic, and writes results to the scorecards database.',
      },
      {
        type: 'subheading',
        text: 'Multi-Level Scorecards',
      },
      {
        type: 'paragraph',
        text: 'Quality measure results need to be aggregated at multiple levels: health plan, provider group, practice site, and individual provider. Our scoring engine calculates performance rates at each level, applies statistical significance testing, generates star ratings, and identifies providers who need improvement support.',
      },
      {
        type: 'heading',
        text: 'Results in Production',
      },
      {
        type: 'paragraph',
        text: 'Since deploying our automated quality measures platform, our clients have seen dramatic improvements in their quality reporting workflows:',
      },
      {
        type: 'list',
        items: [
          '80% reduction in measure calculation time',
          'Elimination of manual chart review for the majority of measures',
          'Real-time gap identification enabling proactive care outreach',
          'Automated QRDA I/III generation for CMS submission',
          'Year-over-year performance trending with drill-down capabilities',
        ],
      },
      {
        type: 'quote',
        text: 'The shift from annual retrospective reporting to real-time quality measurement changes everything. Organizations can act on gaps while there is still time to close them, rather than discovering missed opportunities months after the measurement year ends.',
      },
      {
        type: 'heading',
        text: 'Lessons Learned',
      },
      {
        type: 'paragraph',
        text: 'Building a quality measures platform taught us that the hardest part is not the technology but rather the clinical logic. Measure specifications from NCQA and CMS are written in clinical language that requires deep domain expertise to translate into code. Invest in clinical informatics expertise early, build strong relationships with quality teams at your client organizations, and always validate your results against manual calculations before going live.',
      },
    ],
  },
];

export default blogPosts;
