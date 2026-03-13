const caseStudies = [
  {
    slug: 'quality-measures-platform',
    title: 'Quality Measures Platform',
    subtitle: 'Clinical Quality Measurement & Reporting for Value-Based Care',
    category: 'Value-Based Care',
    color: '#10b981',
    summary:
      'Built an enterprise-grade clinical quality measurement platform that integrates with 6+ EHR systems, automates HEDIS and MIPS measure calculation using Apache Spark, and leverages GPT-4o for intelligent gap closure recommendations.',
    stats: [
      { value: '6+', label: 'EHR Integrations' },
      { value: '100+', label: 'Quality Measures' },
      { value: 'GPT-4o', label: 'NLP Engine' },
    ],
    problem:
      'Healthcare organizations managing value-based care contracts struggled with fragmented clinical data across multiple EHR systems, manual quality measure calculation prone to errors, and inability to identify care gaps in real time. Existing solutions required months of implementation per EHR and could not scale to handle millions of patient records efficiently.',
    solution:
      'We designed and built an end-to-end quality measurement platform with a universal EHR integration layer, Apache Spark-powered batch processing for measure calculation, and a GPT-4o-driven NLP engine for automated gap closure analysis. The platform supports HEDIS, MIPS, and custom quality programs with multi-level scorecards from health plan down to individual provider.',
    architecture: {
      layers: [
        {
          name: 'Data Ingestion Layer',
          description: 'Universal connectors for Epic, Cerner, Athena, AllScripts, eClinicalWorks, NextGen',
          tech: 'Python, FHIR R4, HL7v2, CCDA, SFTP, REST APIs',
        },
        {
          name: 'Master Data Management',
          description: 'Patient matching, deduplication, and golden record creation across EHR sources',
          tech: 'Python, PostgreSQL, Fuzzy Matching Algorithms',
        },
        {
          name: 'Processing Engine',
          description: 'Distributed quality measure calculation with configurable measure definitions',
          tech: 'Apache Spark, Apache Airflow, Python',
        },
        {
          name: 'NLP & AI Layer',
          description: 'Intelligent gap closure recommendations and unstructured data extraction',
          tech: 'GPT-4o, LangChain, Clinical NLP Pipelines',
        },
        {
          name: 'Reporting & Analytics',
          description: 'Multi-level scorecards, trend analysis, and regulatory submission reports',
          tech: 'React, D3.js, PDF Generation, QRDA Export',
        },
      ],
    },
    techStack: [
      { category: 'Backend', items: ['Python', 'Apache Spark', 'Apache Airflow', 'PostgreSQL'] },
      { category: 'AI / NLP', items: ['GPT-4o', 'LangChain', 'Clinical NLP'] },
      { category: 'Integrations', items: ['FHIR R4', 'HL7v2', 'CCDA', 'QRDA'] },
      { category: 'EHR Systems', items: ['Epic', 'Cerner', 'Athena', 'AllScripts', 'eClinicalWorks', 'NextGen'] },
      { category: 'Frontend', items: ['React', 'D3.js', 'Material UI'] },
      { category: 'Infrastructure', items: ['AWS', 'Docker', 'Kubernetes', 'Terraform'] },
    ],
    features: [
      'Universal EHR integration supporting 6+ systems with a single adapter framework',
      'Automated HEDIS and MIPS measure calculation across 100+ quality measures',
      'GPT-4o-powered NLP for extracting clinical concepts from unstructured notes',
      'Master Data Management with probabilistic patient matching across sources',
      'Multi-level scorecards: health plan, provider group, practice, and individual provider',
      'Real-time care gap identification and closure recommendations',
      'Apache Spark batch processing handling millions of patient records',
      'Regulatory-compliant QRDA I/III export for CMS submission',
      'Configurable measure definitions with version control and audit trails',
      'Trend analysis and year-over-year performance benchmarking',
    ],
    outcomes: [
      {
        metric: '80%',
        description: 'Reduction in measure calculation time compared to manual processes',
      },
      {
        metric: '6+',
        description: 'EHR systems integrated through a single universal adapter framework',
      },
      {
        metric: '100+',
        description: 'Quality measures automated across HEDIS, MIPS, and custom programs',
      },
      {
        metric: '95%+',
        description: 'Accuracy in automated gap closure recommendations using GPT-4o',
      },
    ],
  },
  {
    slug: 'clinical-trial-matcher',
    title: 'Clinical Trial Matcher',
    subtitle: 'AI-Powered Patient-to-Trial Matching via SMART on FHIR',
    category: 'Clinical Trials',
    color: '#3b82f6',
    summary:
      'Developed an AI-driven platform that matches patients to eligible clinical trials in real time by analyzing 14 FHIR resource types, processing complex eligibility criteria through GPT-4 NLP, and integrating directly into EHR workflows via SMART on FHIR.',
    stats: [
      { value: '100x', label: 'Faster Recruitment' },
      { value: '99%', label: 'Cost Reduction' },
      { value: '92-97%', label: 'Match Accuracy' },
    ],
    problem:
      'Clinical trial recruitment is one of the biggest bottlenecks in drug development. Over 80% of trials fail to meet enrollment timelines, and manual screening takes an average of 2 hours per patient. Eligibility criteria are complex, spanning demographics, diagnoses, medications, lab results, and procedures, making automated matching extremely difficult.',
    solution:
      'We built a comprehensive clinical trial matching platform that launches as a SMART on FHIR app directly within the EHR. It pulls patient data across 14 FHIR resource types, uses GPT-4 to parse and normalize complex eligibility criteria from ClinicalTrials.gov, and generates ranked match scores with detailed explanations for each criterion.',
    architecture: {
      layers: [
        {
          name: 'EHR Integration Layer',
          description: 'SMART on FHIR launch from Epic, Cerner, and other EHRs with OAuth2 authentication',
          tech: 'SMART on FHIR, OAuth2, Node.js/TypeScript',
        },
        {
          name: 'FHIR Data Extraction',
          description: 'Pulls and normalizes 14 FHIR resource types mapped to 18+ medical code systems',
          tech: 'FHIR R4, SNOMED CT, ICD-10, LOINC, RxNorm, CPT',
        },
        {
          name: 'Trial Ingestion Pipeline',
          description: 'Automated import and NLP parsing of trials from ClinicalTrials.gov',
          tech: 'Python, GPT-4, ClinicalTrials.gov API',
        },
        {
          name: 'Matching Engine',
          description: 'Multi-dimensional scoring across demographics, conditions, meds, labs, and procedures',
          tech: 'Node.js/TypeScript, GPT-4, Custom Scoring Algorithms',
        },
        {
          name: 'Provider Interface',
          description: 'React-based dashboard within EHR showing ranked matches with criterion-level detail',
          tech: 'React, SMART on FHIR App Framework',
        },
      ],
    },
    techStack: [
      { category: 'Backend', items: ['Node.js', 'TypeScript', 'Express', 'PostgreSQL'] },
      { category: 'AI / NLP', items: ['GPT-4', 'Python NLP', 'Clinical NER'] },
      { category: 'FHIR & Standards', items: ['SMART on FHIR', 'FHIR R4', 'OAuth2', 'CDS Hooks'] },
      { category: 'Code Systems', items: ['SNOMED CT', 'ICD-10', 'LOINC', 'RxNorm', 'CPT', 'NDC'] },
      { category: 'Frontend', items: ['React', 'React Native', 'Material UI'] },
      { category: 'Infrastructure', items: ['AWS', 'Docker', 'CI/CD', 'HIPAA Compliant'] },
    ],
    features: [
      'SMART on FHIR launch enabling one-click access from within the EHR',
      'Extraction and normalization of 14 FHIR resource types per patient',
      'GPT-4-powered parsing of complex eligibility criteria into structured rules',
      'Multi-dimensional matching across demographics, conditions, medications, labs, and procedures',
      'Mapping across 18+ medical code systems (SNOMED CT, ICD-10, LOINC, RxNorm, CPT, NDC)',
      'Ranked match results with per-criterion explanations and confidence scores',
      'Automated trial ingestion from ClinicalTrials.gov with daily updates',
      'Provider-facing React dashboard with filtering, sorting, and patient context',
      'React Native companion app for research coordinators',
      'HIPAA-compliant architecture with full audit logging',
    ],
    outcomes: [
      {
        metric: '100x',
        description: 'Faster patient screening compared to manual chart review processes',
      },
      {
        metric: '99%',
        description: 'Reduction in per-patient screening costs from $300+ to under $3',
      },
      {
        metric: '92-97%',
        description: 'Match accuracy validated against physician-adjudicated gold standard',
      },
      {
        metric: '14',
        description: 'FHIR resource types analyzed per patient for comprehensive matching',
      },
    ],
  },
  {
    slug: 'healthcare-master-data-management',
    title: 'Healthcare Master Data Management',
    subtitle: 'AI-Powered Patient Identity Resolution & Data Unification Across EHR Systems',
    category: 'Data & Analytics',
    color: '#8b5cf6',
    summary:
      'Built an intelligent MDM platform that uses AI embeddings and probabilistic matching to resolve patient identities across multiple EHR systems, creating golden records and eliminating duplicates for healthcare organizations managing multi-source clinical data.',
    stats: [
      { value: '99.2%', label: 'Match Accuracy' },
      { value: '6+', label: 'EHR Sources' },
      { value: '<500ms', label: 'Match Speed' },
    ],
    problem:
      'Healthcare organizations with data from multiple EHR systems face massive patient identity challenges. Duplicate records, mismatched identities, and fragmented clinical data lead to care gaps, billing errors, and inaccurate quality reporting. Traditional deterministic matching misses 15-25% of true matches due to data entry variations, name changes, and incomplete demographics.',
    solution:
      'We built an AI-powered MDM platform that combines probabilistic matching algorithms with vector embeddings to achieve 99%+ patient match accuracy. The system ingests data from 6+ EHR systems, normalizes demographics, applies multi-stage matching (deterministic, probabilistic, AI-assisted), and creates unified golden records with full lineage tracking.',
    architecture: {
      layers: [
        {
          name: 'Data Ingestion Layer',
          description: 'Universal connectors for Epic, Cerner, Athena, AllScripts, eClinicalWorks, NextGen',
          tech: 'Python, FHIR R4, HL7v2, CCDA, REST APIs',
        },
        {
          name: 'Normalization Engine',
          description: 'Address standardization, name parsing, phone/email validation, demographic cleaning',
          tech: 'Python, USPS API, Custom NLP',
        },
        {
          name: 'Matching Engine',
          description: 'Multi-stage matching: deterministic, probabilistic (Fellegi-Sunter), and AI embedding similarity',
          tech: 'Python, Sentence Transformers, PostgreSQL, Redis',
        },
        {
          name: 'Golden Record Management',
          description: 'Survivorship rules, conflict resolution, master record creation with full lineage',
          tech: 'PostgreSQL, Python, Audit Trail System',
        },
        {
          name: 'API & Dashboard',
          description: 'RESTful APIs for record lookup, merge/split operations, and match review workflows',
          tech: 'React, Node.js, REST APIs, Role-Based Access',
        },
      ],
    },
    techStack: [
      { category: 'Backend', items: ['Python', 'PostgreSQL', 'Redis', 'Apache Airflow'] },
      { category: 'AI / ML', items: ['Sentence Transformers', 'Vector Embeddings', 'Probabilistic Matching'] },
      { category: 'Integrations', items: ['FHIR R4', 'HL7v2', 'CCDA', 'SFTP'] },
      { category: 'EHR Systems', items: ['Epic', 'Cerner', 'Athena', 'AllScripts', 'eClinicalWorks', 'NextGen'] },
      { category: 'Frontend', items: ['React', 'Material UI', 'D3.js'] },
      { category: 'Infrastructure', items: ['AWS', 'Docker', 'Kubernetes'] },
    ],
    features: [
      'Multi-source data ingestion from 6+ EHR systems with universal adapter framework',
      'AI embedding-based similarity matching using Sentence Transformers for fuzzy identity resolution',
      'Golden record creation with configurable survivorship rules and conflict resolution',
      'Multi-stage matching pipeline: deterministic, probabilistic (Fellegi-Sunter), AI-assisted',
      'Real-time match API with sub-500ms response time for point-of-care identity verification',
      'Manual review workflows for ambiguous matches with role-based access control',
      'Duplicate detection dashboards with drill-down analytics and merge recommendations',
      'Full audit trail with lineage tracking from source record to golden record',
      'Configurable match thresholds and scoring weights per organization',
      'Batch and real-time processing modes for initial load and ongoing synchronization',
    ],
    outcomes: [
      {
        metric: '99.2%',
        description: 'Patient match accuracy compared to 75-85% with traditional deterministic matching',
      },
      {
        metric: '6+',
        description: 'EHR systems unified into a single golden record repository',
      },
      {
        metric: '40%',
        description: 'Reduction in duplicate patient records across the organization',
      },
      {
        metric: '<500ms',
        description: 'Real-time match response time for point-of-care identity verification',
      },
    ],
  },
  {
    slug: 'clinical-nlp-pipeline',
    title: 'Clinical NLP Pipeline',
    subtitle: 'AI-Powered Extraction of Structured Insights from Unstructured Clinical Notes',
    category: 'AI in Healthcare',
    color: '#06b6d4',
    summary:
      'Developed a production-grade clinical NLP pipeline that uses GPT-4 and custom NER models to extract structured clinical concepts from unstructured physician notes, enabling automated quality measure gap detection and risk adjustment coding.',
    stats: [
      { value: '95%+', label: 'Extraction Accuracy' },
      { value: '50+', label: 'Clinical Concepts' },
      { value: '10x', label: 'Faster Than Manual' },
    ],
    problem:
      'Over 80% of clinical data exists in unstructured formats — physician notes, discharge summaries, radiology reports, and pathology reports. This data is invisible to quality reporting systems, risk adjustment engines, and population health analytics. Manual chart abstraction is expensive ($15-25 per chart), slow, and error-prone, creating a massive bottleneck in value-based care operations.',
    solution:
      'We built an end-to-end clinical NLP pipeline that combines custom Named Entity Recognition (NER) models with GPT-4 for context-aware extraction. The system processes clinical notes in real-time, identifies 50+ clinical concept types, maps them to standard terminologies (ICD-10, SNOMED CT, RxNorm, LOINC), and feeds structured data directly into quality measure and risk adjustment engines.',
    architecture: {
      layers: [
        {
          name: 'Document Ingestion',
          description: 'Intake from EHR systems via FHIR DocumentReference, HL7 MDM messages, and direct feeds',
          tech: 'Python, FHIR R4, HL7v2, Apache Kafka',
        },
        {
          name: 'Pre-Processing',
          description: 'Section detection, sentence segmentation, negation detection, temporal parsing',
          tech: 'Python, SpaCy, Custom Models',
        },
        {
          name: 'NER & Entity Extraction',
          description: 'Custom clinical NER for conditions, medications, procedures, labs, vitals, and SDOH',
          tech: 'SpaCy, Transformers, BioBERT, Custom Models',
        },
        {
          name: 'Context & Reasoning Layer',
          description: 'GPT-4 for complex reasoning: assessment vs history, confirmed vs suspected, attributed provider',
          tech: 'GPT-4, LangChain, Prompt Engineering',
        },
        {
          name: 'Terminology Mapping & Output',
          description: 'Mapping to ICD-10, SNOMED CT, RxNorm, LOINC with confidence scores and provenance',
          tech: 'Python, UMLS, Custom Mapping Engine',
        },
      ],
    },
    techStack: [
      { category: 'Backend', items: ['Python', 'FastAPI', 'Apache Kafka', 'PostgreSQL'] },
      { category: 'AI / NLP', items: ['GPT-4', 'SpaCy', 'BioBERT', 'Sentence Transformers', 'LangChain'] },
      { category: 'Standards', items: ['FHIR R4', 'ICD-10', 'SNOMED CT', 'RxNorm', 'LOINC', 'UMLS'] },
      { category: 'Processing', items: ['Apache Spark', 'Redis', 'Celery'] },
      { category: 'Frontend', items: ['React', 'D3.js Visualization'] },
      { category: 'Infrastructure', items: ['AWS', 'Docker', 'Kubernetes', 'GPU Instances'] },
    ],
    features: [
      'Extraction of 50+ clinical concept types including diagnoses, medications, procedures, labs, and SDOH',
      'Standard terminology mapping to ICD-10, SNOMED CT, RxNorm, LOINC with confidence scores',
      'Negation detection and temporal reasoning to distinguish current from historical conditions',
      'Section-aware processing that understands clinical note structure (HPI, Assessment, Plan)',
      'Real-time and batch processing modes for both point-of-care and retrospective analysis',
      'Confidence scoring with source provenance for every extracted concept',
      'Direct integration with quality measure engines for automated gap detection',
      'Risk adjustment HCC code suggestion from unstructured clinical documentation',
      'Custom model training pipeline for organization-specific clinical vocabularies',
      'HIPAA-compliant processing with full audit logging and data encryption',
    ],
    outcomes: [
      {
        metric: '95%+',
        description: 'Entity extraction accuracy across diagnoses, medications, and procedures',
      },
      {
        metric: '50+',
        description: 'Clinical concept types extracted and mapped to standard terminologies',
      },
      {
        metric: '10x',
        description: 'Faster than manual chart abstraction with higher consistency',
      },
      {
        metric: '85%',
        description: 'Reduction in chart abstraction costs compared to manual review processes',
      },
    ],
  },
  {
    slug: 'smart-on-fhir-framework',
    title: 'SMART on FHIR EHR Application Framework',
    subtitle: 'Reusable Application Framework for Building EHR-Embedded Clinical Applications',
    category: 'FHIR & Interoperability',
    color: '#f59e0b',
    summary:
      'Built a comprehensive SMART on FHIR application framework that enables rapid development of EHR-embedded clinical applications. The framework handles OAuth2 authentication, FHIR data extraction across 20+ resource types, and provides a reusable component library for building clinical workflows that launch directly within Epic, Cerner, and other EHR systems.',
    stats: [
      { value: '20+', label: 'FHIR Resources' },
      { value: '3+', label: 'EHR Systems' },
      { value: '70%', label: 'Faster Development' },
    ],
    problem:
      'Building applications that integrate directly into EHR workflows is complex and time-consuming. Each EHR vendor has different SMART on FHIR implementations, OAuth2 flows vary across systems, and extracting comprehensive patient data requires handling 20+ FHIR resource types with different data models. Healthcare organizations spend 6-12 months building basic EHR integrations from scratch.',
    solution:
      'We created a reusable SMART on FHIR application framework that abstracts away EHR-specific complexity. The framework provides a unified authentication layer, comprehensive FHIR data extraction library, pre-built clinical UI components, and deployment templates for major EHR app galleries. New clinical applications can be built and deployed in weeks instead of months.',
    architecture: {
      layers: [
        {
          name: 'SMART Launch & Auth',
          description: 'Unified OAuth2 flow handling for Epic, Cerner, Allscripts with automatic token management',
          tech: 'Node.js/TypeScript, OAuth2, SMART on FHIR',
        },
        {
          name: 'FHIR Client Library',
          description: 'Comprehensive data extraction across 20+ FHIR resource types with normalization',
          tech: 'TypeScript, FHIR R4, Custom Mappers',
        },
        {
          name: 'Clinical Data Layer',
          description: 'Patient context assembly, clinical timeline, medication reconciliation, problem list aggregation',
          tech: 'TypeScript, FHIR Bundle Processing',
        },
        {
          name: 'UI Component Library',
          description: 'Pre-built clinical components: patient banner, medication list, problem list, lab results, vitals chart',
          tech: 'React, TypeScript, Clinical Design System',
        },
        {
          name: 'Deployment & Distribution',
          description: 'EHR app gallery submission, sandbox testing, production deployment automation',
          tech: 'Docker, CI/CD, Epic App Orchard, Cerner Code',
        },
      ],
    },
    techStack: [
      { category: 'Backend', items: ['Node.js', 'TypeScript', 'Express'] },
      { category: 'FHIR & Standards', items: ['SMART on FHIR', 'FHIR R4', 'OAuth2', 'CDS Hooks', 'US Core'] },
      { category: 'Code Systems', items: ['SNOMED CT', 'ICD-10', 'LOINC', 'RxNorm', 'CPT', 'NDC'] },
      { category: 'Frontend', items: ['React', 'TypeScript', 'Clinical Component Library'] },
      { category: 'Testing', items: ['SMART Sandbox', 'Inferno FHIR Testing'] },
      { category: 'Infrastructure', items: ['AWS', 'Docker', 'CI/CD Pipelines'] },
    ],
    features: [
      'Unified SMART launch handling across Epic, Cerner, and Allscripts from a single codebase',
      'Comprehensive FHIR R4 data extraction supporting 20+ resource types with automatic normalization',
      'Pre-built clinical UI components following healthcare design standards',
      'Clinical timeline visualization aggregating encounters, diagnoses, medications, and procedures',
      'Medication reconciliation workflows with drug interaction checking',
      'Automated EHR app gallery submission templates for Epic App Orchard and Cerner Code',
      'Sandbox testing tools with synthetic patient data for development and QA',
      'HIPAA-compliant architecture with encryption, audit logging, and access controls',
      'US Core profile compliance ensuring interoperability across certified EHR systems',
      'Extensible plugin system for building custom clinical workflows on top of the framework',
    ],
    outcomes: [
      {
        metric: '70%',
        description: 'Reduction in EHR integration development time compared to building from scratch',
      },
      {
        metric: '3+',
        description: 'EHR systems supported from a single codebase with vendor-specific adapters',
      },
      {
        metric: '20+',
        description: 'FHIR resource types extracted and normalized into unified clinical data models',
      },
      {
        metric: 'Weeks',
        description: 'New clinical applications built and deployed vs 6-12 months traditionally',
      },
    ],
  },
];

export default caseStudies;
