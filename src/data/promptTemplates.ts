import { PromptTemplate } from '@/components/PromptCard';

export const POPULAR_SEARCHES = [
  'business plan',
  'concept map',
  'meal planner',
  'Instagram caption',
  'resume writer',
  'interview questions',
  'product description',
  'study guide',
  'marketing strategy',
  'email template'
];

export const promptTemplates: PromptTemplate[] = [
  {
    id: '1',
    title: 'Comprehensive Business Plan Generator',
    template: `I need to create a business plan for a [type of business]. Please help me create a comprehensive business plan that includes:

1. Executive Summary
2. Business Description & Vision
3. Market Analysis
4. Organization & Management Structure
5. Service or Product Description
6. Marketing & Sales Strategy
7. Financial Projections (including startup costs, operating expenses, and revenue forecasts)
8. Funding Requirements
9. Appendix for any additional materials

Please be specific about [specific area you need help with]. My target audience is [target audience].`,
    useCaseTags: ['Business', 'Entrepreneurship', 'Planning'],
    difficulty: 'Intermediate',
    upvotes: 245,
    keywords: ['business plan', 'startup', 'entrepreneurship', 'planning', 'business strategy'],
    description: 'Generate a complete business plan with all essential sections required for investors or bank loans.'
  },
  {
    id: '2',
    title: 'Visual Concept Map Creator',
    template: `I'd like you to help me create a concept map about [topic]. 

1. First, identify the main concept/central idea and key sub-concepts (approximately 5-7)
2. For each sub-concept, list 3-5 related ideas, facts, or examples
3. Explain the relationships between connected concepts using linking words or phrases
4. Show hierarchical relationships where appropriate
5. Format this as a plain text concept map with indentation and symbols to show relationships:
   - Main Concept
     → Sub-concept 1 (relationship description)
       → Related idea 1
       → Related idea 2
     → Sub-concept 2 (relationship description)
       → etc.

This will be used for [purpose] and should be suitable for [audience].`,
    useCaseTags: ['Education', 'Learning', 'Visualization'],
    difficulty: 'Beginner',
    upvotes: 189,
    keywords: ['concept map', 'visual learning', 'mind map', 'knowledge organization', 'study aid'],
    description: 'Create a structured concept map to visualize relationships between ideas and concepts.'
  },
  {
    id: '3',
    title: 'Personalized Weekly Meal Planner',
    template: `I need a 7-day meal plan with the following requirements:

Dietary preferences: [vegetarian/vegan/keto/etc.]
Allergies/restrictions: [list any]
Calories per day: [target calories]
Number of meals per day: [number]
Cooking skill level: [beginner/intermediate/advanced]
Time constraints: [how much time you have for meal prep]
Variety preference: [do you mind eating leftovers or want all unique meals]
Special goals: [weight loss/muscle gain/maintenance/etc.]

Please provide:
1. A complete 7-day plan with all meals
2. A consolidated grocery list organized by food category
3. Basic prep instructions for any meals that can be prepared ahead
4. Estimated prep time for each day`,
    useCaseTags: ['Nutrition', 'Health', 'Planning', 'Food'],
    difficulty: 'Beginner',
    upvotes: 302,
    keywords: ['meal plan', 'nutrition', 'food prep', 'diet', 'healthy eating', 'meal planner'],
    description: 'Generate a customized weekly meal plan with grocery list and prep instructions.'
  },
  {
    id: '4',
    title: 'Engaging Instagram Caption Generator',
    template: `Please help me create 5 engaging Instagram captions for a post about [topic/product/event]. 

Details:
- Post type: [photo/carousel/video/reel]
- Content showing: [brief description of what's in the image/video]
- Brand voice: [casual/professional/inspirational/quirky]
- Target audience: [demographic details]
- Key message to convey: [what's the main point]
- Call-to-action (if any): [what do you want followers to do]
- Hashtag preferences: [popular/niche/branded/none]
- Emoji usage: [heavy/moderate/minimal/none]
- Caption length: [short (<50 chars)/medium (50-125 chars)/long (>125 chars)]

Include a mix of captions with different approaches (e.g., question-based, story-based, direct, etc.)`,
    useCaseTags: ['Social Media', 'Marketing', 'Content Creation'],
    difficulty: 'Beginner',
    upvotes: 276,
    keywords: ['instagram', 'caption', 'social media', 'content creation', 'marketing', 'instagram caption'],
    description: 'Generate engaging and effective Instagram captions optimized for better engagement.'
  },
  {
    id: '5',
    title: 'Professional Resume Enhancer',
    template: `I need help improving my resume for a [job title] position. 

Here is my current resume content:
[paste your current resume text or bullet points for a specific section]

Please help me:
1. Strengthen the impact of my bullet points using the STAR method (Situation, Task, Action, Result) where appropriate
2. Incorporate relevant keywords from this job description: [paste relevant parts of job posting]
3. Quantify my achievements with metrics where possible
4. Remove any unnecessary or outdated information
5. Suggest better action verbs to begin each accomplishment statement
6. Fix any grammatical issues or awkward phrasing
7. Ensure consistent formatting and tense

Focus particularly on my [experience/skills/education] section, which needs the most improvement.`,
    useCaseTags: ['Career', 'Job Search', 'Professional Development'],
    difficulty: 'Intermediate',
    upvotes: 215,
    keywords: ['resume', 'cv', 'job application', 'career', 'professional', 'job search'],
    description: 'Transform your resume with powerful bullet points and industry-specific keywords.'
  },
  {
    id: '6',
    title: 'Comprehensive Marketing Strategy Framework',
    template: `I need to develop a marketing strategy for [product/service/company]. Please create a comprehensive marketing framework that includes:

1. Situation Analysis
   - Target market analysis (demographics, psychographics, behavior)
   - Competitor analysis (top 3-5 competitors, their strengths/weaknesses)
   - SWOT analysis for my offering

2. Marketing Objectives
   - Specific, measurable goals aligned with business objectives
   - Timeline for achievement

3. Strategy
   - Positioning strategy
   - Value proposition
   - Brand messaging
   - Pricing strategy recommendations

4. Tactical Marketing Plan
   - Digital marketing channels (social media, content, email, etc.)
   - Traditional marketing channels if applicable
   - Content strategy outline
   - Customer acquisition and retention strategies
   - Budget allocation recommendations (percentage across channels)

5. Implementation Timeline
   - 3-month action plan with specific initiatives
   - Key performance indicators for each activity

My budget is approximately [budget range] and my primary business goal is [goal]. My target audience is [target audience description].`,
    useCaseTags: ['Marketing', 'Business Strategy', 'Planning'],
    difficulty: 'Advanced',
    upvotes: 178,
    keywords: ['marketing strategy', 'marketing plan', 'business', 'strategic planning', 'market analysis'],
    description: 'Create a detailed marketing strategy with tactical implementation plan and timeline.'
  },
  {
    id: '7',
    title: 'Customized Study Guide Creator',
    template: `I need a comprehensive study guide for [subject/topic]. Please create a study guide that includes:

1. Main topics and subtopics organized in a logical structure
2. Key concepts explained in simple terms with examples
3. Important formulas, equations, or principles (if applicable)
4. Summaries of critical theories, models, or frameworks
5. Visual elements described (timelines, diagrams, charts, etc.)
6. 10-15 practice questions with answers covering different difficulty levels
7. Mnemonics or memory aids for complex information
8. Recommended study techniques specific to this subject
9. Common mistakes or misconceptions to avoid
10. Additional resources for deeper understanding

My current knowledge level is [beginner/intermediate/advanced]. I'm preparing for [exam type/purpose] in [timeframe], and I learn best through [visual/auditory/reading/hands-on] methods.`,
    useCaseTags: ['Education', 'Learning', 'Study Aid'],
    difficulty: 'Intermediate',
    upvotes: 224,
    keywords: ['study guide', 'learning', 'education', 'exam prep', 'academic'],
    description: 'Generate a comprehensive study guide with key concepts, practice questions, and study techniques.'
  },
  {
    id: '8',
    title: 'Product Description Optimizer',
    template: `I need a compelling product description for [product name]. Please help me create an optimized description with:

1. An attention-grabbing headline (5-10 words)
2. A concise opening paragraph highlighting the main value proposition (2-3 sentences)
3. 3-5 bullet points focusing on key features and their benefits
4. A paragraph addressing how the product solves customer pain points
5. A compelling closing with call-to-action

Product details:
- Target audience: [description]
- Key features: [list main features]
- Main benefits: [list main benefits]
- Price point: [price range]
- Unique selling proposition: [what makes it different]
- Tone: [professional/conversational/luxury/technical/etc.]

Please include SEO-friendly language incorporating these keywords: [list 3-5 keywords]`,
    useCaseTags: ['E-commerce', 'Marketing', 'Copywriting'],
    difficulty: 'Beginner',
    upvotes: 192,
    keywords: ['product description', 'copywriting', 'e-commerce', 'marketing', 'sales copy'],
    description: 'Create persuasive product descriptions that highlight benefits and drive conversions.'
  },
  {
    id: '9',
    title: 'Interview Question Preparation Guide',
    template: `I have an interview for a [job title] position at a [industry type] company. Please help me prepare with:

1. 10-15 likely interview questions specific to this role and industry, including:
   - Technical questions related to required skills
   - Behavioral questions
   - Situational questions
   - Questions about my experience and background
   - Questions I should ask the interviewer

2. For each question, provide:
   - The strategic purpose behind the question (what the interviewer is trying to assess)
   - A structured framework for answering (key points to cover)
   - A sample answer that demonstrates expertise, experience, and fit

3. Additional preparation advice:
   - How to research the company effectively
   - Key industry trends I should be familiar with
   - Common pitfalls to avoid
   - How to stand out from other candidates

My background includes: [brief summary of relevant experience, skills, and qualifications]`,
    useCaseTags: ['Career', 'Job Search', 'Professional Development'],
    difficulty: 'Intermediate',
    upvotes: 235,
    keywords: ['interview questions', 'job interview', 'career', 'hiring', 'job preparation'],
    description: 'Prepare for job interviews with customized questions and strategic answer frameworks.'
  },
  {
    id: '10',
    title: 'Email Communication Template',
    template: `I need to write an email about [subject/purpose]. Please help me draft a professional email with:

Context:
- Recipient(s): [who will receive the email]
- Relationship to recipient: [boss/client/colleague/vendor/etc.]
- Previous communication: [any relevant history]
- Purpose of email: [inform/request/follow-up/etc.]
- Desired outcome: [what you want to happen after they read it]
- Tone: [formal/friendly/urgent/apologetic/etc.]
- Important details to include: [key information points]

Please create:
1. A clear, specific subject line
2. Professional greeting appropriate for our relationship
3. Concise opening paragraph stating the purpose
4. Detailed body with all necessary information (using bullet points or paragraphs as appropriate)
5. Clear call-to-action or next steps
6. Professional closing
7. Signature recommendation

If relevant, also include:
- Any deadline information
- Alternative options if applicable
- Polite follow-up language`,
    useCaseTags: ['Communication', 'Professional', 'Business'],
    difficulty: 'Beginner',
    upvotes: 187,
    keywords: ['email template', 'business communication', 'professional writing', 'email format'],
    description: 'Create effective email templates for business and professional communications.'
  }
];

export default promptTemplates;
