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
];

export default caseStudies;
