# App Walkthrough Concept Note Guide

## Overview

This document provides a comprehensive guide on how to write a concept note for creating an app walkthrough. A concept note is a preliminary document that outlines the strategy, structure, and content for guiding users through your application's key features and functionality.

---

## Table of Contents

1. [What is an App Walkthrough?](#what-is-an-app-walkthrough)
2. [Purpose of a Concept Note](#purpose-of-a-concept-note)
3. [Components of a Walkthrough Concept Note](#components-of-a-walkthrough-concept-note)
4. [User Journey Mapping](#user-journey-mapping)
5. [HortiConnect Specific Walkthroughs](#horticonnect-specific-walkthroughs)
6. [Best Practices](#best-practices)
7. [Implementation Considerations](#implementation-considerations)
8. [Measurement and Iteration](#measurement-and-iteration)

---

## What is an App Walkthrough?

An app walkthrough is an interactive guide that helps new users:
- Understand the app's core value proposition
- Learn how to navigate the interface
- Discover key features and functionality
- Complete their first successful actions
- Build confidence in using the app

### Types of Walkthroughs

1. **First-Time User Onboarding**: Shown once when a user first opens the app
2. **Feature Tours**: Introduce new features or updates
3. **Contextual Help**: Appear when users reach specific screens or actions
4. **Progressive Onboarding**: Spread across multiple sessions as users advance

---

## Purpose of a Concept Note

A walkthrough concept note serves to:

1. **Define Objectives**
   - What should users learn or accomplish?
   - What are the success metrics?
   - How will you measure effectiveness?

2. **Align Stakeholders**
   - Ensure design, development, and product teams share the same vision
   - Get buy-in from leadership
   - Set clear expectations for resources and timeline

3. **Document Strategy**
   - Which features to highlight
   - When and how to present information
   - User segments and their specific needs

4. **Guide Implementation**
   - Provide a roadmap for designers and developers
   - Define technical requirements
   - Establish content guidelines

---

## Components of a Walkthrough Concept Note

### 1. Executive Summary

**Template:**
```
Project: [App Name] User Onboarding Walkthrough
Date: [Date]
Version: [Version Number]
Author(s): [Names and Roles]

Brief Overview:
This concept note outlines the strategy for creating an in-app walkthrough
experience for [App Name]. The walkthrough will guide new users through
[key features] to achieve [specific goals].

Key Objectives:
- [Objective 1]
- [Objective 2]
- [Objective 3]
```

### 2. Background and Context

Provide context about:
- Current user onboarding challenges
- User feedback and pain points
- Analytics data showing where users struggle
- Competitive analysis of similar apps
- Business goals and expected outcomes

**Example:**
```
Background:
User analytics show that 40% of new users abandon the app after the first
session without completing any core action. Exit surveys indicate confusion
about navigation and unclear value proposition. This walkthrough aims to
reduce first-session abandonment by 50% within 3 months.
```

### 3. Target Audience

Define user segments and their specific needs:

```
Primary Audience Segments:

1. First-Time Users
   - Demographics: [Age, location, tech-savviness]
   - Goals: [What they want to accomplish]
   - Pain Points: [What confuses or frustrates them]
   - Priority Features: [What they need to learn first]

2. Returning Users (Post-Update)
   - What's new that they need to learn
   - How to transition from old to new features

3. Power Users
   - Advanced features they should discover
   - Shortcuts and productivity tips
```

### 4. Walkthrough Structure and Flow

#### 4.1 Entry Points

Define when and how users will encounter the walkthrough:
- Launch on first app open
- Trigger after registration/login
- Manual access via settings/help menu
- Contextual triggers based on user behavior

#### 4.2 Content Outline

Create a step-by-step flow:

```
Walkthrough Flow:

Step 1: Welcome Screen
- Headline: "Welcome to [App Name]!"
- Subtext: Brief value proposition (1-2 sentences)
- Visual: App logo or hero image
- CTA: "Get Started" button
- Skip option: "Skip Tour" link

Step 2: Core Feature 1
- Headline: Brief feature description
- Visual: Screenshot or animation showing the feature
- Benefit: How this helps the user
- CTA: "Next"

Step 3: Core Feature 2
[Repeat structure]

...

Final Step: Call to Action
- Congratulations message
- Clear next step to take
- CTA: "Start [Primary Action]"
```

### 5. Content Guidelines

#### 5.1 Writing Principles

- **Be Concise**: Maximum 20-30 words per screen
- **Focus on Benefits**: Explain "why" not just "what"
- **Use Active Voice**: "Create your profile" not "A profile can be created"
- **Be Friendly**: Match your brand's tone
- **Avoid Jargon**: Use simple, clear language

#### 5.2 Visual Design Principles

- **Highlight Key UI Elements**: Use spotlights, arrows, or overlays
- **Minimize Distractions**: Dim background or use overlays
- **Show Real Content**: Use realistic examples, not placeholder text
- **Consistent Branding**: Match app's visual design
- **Accessibility**: Ensure adequate contrast, readable text sizes

### 6. Technical Requirements

```
Technical Specifications:

Platform Requirements:
- iOS 14+ and Android 8+
- Web browsers: Chrome, Safari, Firefox (latest 2 versions)

Implementation Options:
1. Custom-built solution using [framework/library]
2. Third-party onboarding library (e.g., Intro.js, Shepherd.js, react-joyride)
3. Native implementation with tooltips and modals

Data Collection:
- Track completion rates for each step
- Record skip points
- Measure time spent on each screen
- A/B testing capability for different versions

Accessibility Requirements:
- Screen reader compatibility
- Keyboard navigation support
- Skip/close functionality
- Pauseable animations
```

### 7. User Journey Scenarios

Create specific scenarios for different user types:

```
Scenario 1: New Buyer
- User registers as a buyer
- Walkthrough shows: browse products → filter options → contact seller → checkout
- Key metrics: Time to first purchase, filter usage rate

Scenario 2: New Seller
- User registers as a seller
- Walkthrough shows: create listing → add photos → set pricing → manage orders
- Key metrics: Time to first listing, listing completion rate

Scenario 3: Admin User
- Admin logs in for first time
- Walkthrough shows: dashboard overview → user management → analytics → settings
- Key metrics: Feature adoption rate, time to complete admin tasks
```

### 8. Success Metrics and KPIs

Define how you'll measure success:

```
Primary Metrics:
- Walkthrough completion rate: Target [X%]
- First-session feature adoption: Increase by [X%]
- User activation rate: Increase by [X%]
- Time to first core action: Reduce by [X%]

Secondary Metrics:
- User retention (Day 1, Day 7, Day 30)
- Customer satisfaction scores
- Support ticket reduction
- App store ratings improvement

A/B Testing Plan:
- Control group: No walkthrough
- Variant A: Full walkthrough (5 steps)
- Variant B: Short walkthrough (3 steps)
- Variant C: Progressive walkthrough (spread over time)
```

### 9. Timeline and Resources

```
Project Timeline:

Phase 1: Planning and Design (2 weeks)
- Finalize concept note
- Create wireframes
- Design mockups
- Get stakeholder approval

Phase 2: Content Creation (1 week)
- Write copy
- Create visual assets
- Record animations/videos

Phase 3: Development (3 weeks)
- Implement walkthrough framework
- Integrate content
- Add analytics tracking
- QA testing

Phase 4: Launch and Monitor (Ongoing)
- Soft launch to 10% of users
- Monitor metrics
- Gather feedback
- Iterate based on data

Required Resources:
- Product Manager: [X hours]
- UX Designer: [X hours]
- Copywriter: [X hours]
- Developer(s): [X hours]
- QA Tester: [X hours]
```

### 10. Risk Assessment and Mitigation

```
Potential Risks:

Risk 1: Users skip the walkthrough
- Mitigation: Make it brief, valuable, and skippable
- Alternative: Offer contextual help throughout the app

Risk 2: Walkthrough becomes outdated
- Mitigation: Build modular system for easy updates
- Plan: Review and update quarterly

Risk 3: Poor performance on older devices
- Mitigation: Test on minimum supported hardware
- Fallback: Simplified version for low-end devices

Risk 4: Low completion rates
- Mitigation: A/B test different lengths and formats
- Plan: Iterate based on user behavior data
```

---

## User Journey Mapping

### Creating Effective User Journeys

1. **Identify User Goals**
   - What does the user want to accomplish?
   - What's their primary motivation for using the app?

2. **Map Touchpoints**
   - List every interaction point in the user's journey
   - Identify moments of friction or confusion
   - Highlight opportunities for guidance

3. **Prioritize Information**
   - What MUST users know immediately?
   - What can wait until later?
   - What can be discovered organically?

### Journey Mapping Template

```
User Journey: [User Type] - [Primary Goal]

Stage 1: Awareness
- User's state: [What they know/don't know]
- Actions: [What they do]
- Pain points: [What frustrates them]
- Walkthrough intervention: [How to help]

Stage 2: Exploration
- User's state: [Learning the interface]
- Actions: [Browsing, testing features]
- Pain points: [Getting lost, unsure of next steps]
- Walkthrough intervention: [Guided tour of key areas]

Stage 3: First Action
- User's state: [Ready to do something]
- Actions: [Attempting core feature]
- Pain points: [Unclear process, fear of mistakes]
- Walkthrough intervention: [Step-by-step guidance]

Stage 4: Success
- User's state: [Accomplished goal]
- Actions: [Completed first task]
- Reinforcement: [Celebration, what's next]
- Walkthrough intervention: [Positive feedback, suggest next steps]
```

---

## HortiConnect Specific Walkthroughs

### Recommended Walkthroughs for HortiConnect

Based on the HortiConnect app structure, here are recommended walkthrough scenarios:

#### 1. General User Onboarding

```
Walkthrough: "Welcome to HortiConnect"

Step 1: Welcome
- "Connect with horticulture communities across Nigeria"
- Show app benefits: marketplace, clusters, knowledge sharing

Step 2: Navigation Overview
- Highlight the 4 main tabs: Home, Marketplace, Clusters, Profile
- Brief explanation of each section

Step 3: Home Feed
- "Discover featured products and knowledge articles"
- Show how to browse and interact with content

Step 4: Getting Started
- "Complete your profile to start connecting"
- CTA: "Set Up Profile"
```

#### 2. Marketplace Seller Journey

```
Walkthrough: "Start Selling on HortiConnect"

Step 1: Create First Listing
- Navigate to Marketplace tab
- Tap "Add Listing" button
- Fill in product details (name, description, price, quantity)

Step 2: Add Product Photos
- "Add quality photos to attract buyers"
- Show how to upload/take photos
- Tips: Use good lighting, show product clearly

Step 3: Set Pricing and Availability
- Set competitive prices
- Indicate quantity available
- Choose delivery/pickup options

Step 4: Manage Your Listings
- View your active listings
- Edit or remove products
- Track inquiries and orders
```

#### 3. Marketplace Buyer Journey

```
Walkthrough: "Find and Purchase Products"

Step 1: Browse Marketplace
- Scroll through available products
- Use filters (category, location, price range)
- Search for specific items

Step 2: View Product Details
- Tap any product to see full details
- Check seller information and ratings
- View photos and description

Step 3: Contact Seller
- Tap "Contact Seller" button
- Send message with your inquiry
- Negotiate price and delivery

Step 4: Communication
- Access messages in Communication tab
- View conversation history
- Complete your purchase
```

#### 4. Cluster Discovery and Joining

```
Walkthrough: "Join a Farming Cluster"

Step 1: Explore Clusters
- Navigate to Clusters tab
- Browse available clusters in your area
- Filter by location, crop type, or size

Step 2: View Cluster Details
- See cluster information: members, location, activities
- View cluster posts and updates
- Check member profiles

Step 3: Join a Cluster
- Tap "Request to Join" button
- Wait for admin approval
- Get notified when accepted

Step 4: Engage with Your Cluster
- Post updates and questions
- Connect with other members
- Access shared knowledge and resources
```

#### 5. Knowledge Hub Exploration

```
Walkthrough: "Learn from Expert Knowledge"

Step 1: Browse Knowledge Articles
- Access Knowledge Hub from Home
- Explore categories: crop management, pest control, market trends
- Use search to find specific topics

Step 2: Read and Save Articles
- Tap article to read full content
- Bookmark useful articles for later
- Share knowledge with your network

Step 3: Apply Knowledge
- Implement tips in your farming practice
- Ask questions in cluster discussions
- Contribute your own experiences
```

#### 6. Admin Dashboard Tour

```
Walkthrough: "Managing HortiConnect as an Admin"

Step 1: Dashboard Overview
- View key metrics: new users, active clusters, marketplace activity
- Quick actions: approve users, moderate content
- Access admin tools

Step 2: User Management
- Navigate to Users section
- Review pending registrations
- Approve, suspend, or change user roles

Step 3: Cluster Management
- Access Clusters section
- Approve new cluster requests
- Monitor cluster activity
- Remove inappropriate content

Step 4: Knowledge Management
- Create and edit knowledge articles
- Organize content by categories
- Feature important articles on home page

Step 5: Communication Monitoring
- Overview of platform messages
- Handle reported issues
- Ensure healthy community interactions
```

### Progressive Onboarding Approach for HortiConnect

Rather than showing everything at once, consider progressive onboarding:

```
First Session: Basic Navigation
- Welcome screen
- Show 4 main tabs
- Encourage profile completion

After Profile Completion: Role-Based Path
- If Seller → Show marketplace listing creation
- If Buyer → Show browsing and filtering
- If both → Offer choice of which tour to take first

After First Transaction: Advanced Features
- Show communication tools
- Introduce clusters
- Highlight knowledge hub

After Joining a Cluster: Community Features
- How to engage in cluster discussions
- Accessing cluster-specific resources
- Connecting with members

Ongoing: Contextual Tips
- Show tooltips when user first accesses new sections
- Offer help when user seems stuck (e.g., empty state messages)
- Announce new features with mini-tours
```

---

## Best Practices

### Do's ✅

1. **Keep It Short**
   - Maximum 5-7 steps for main walkthrough
   - Each step: 1 headline, 1 image, 1-2 sentences max

2. **Show, Don't Just Tell**
   - Use animations or GIFs to demonstrate actions
   - Highlight actual UI elements users will interact with
   - Use real content examples, not Lorem Ipsum

3. **Make It Skippable**
   - Always provide a "Skip" or "Maybe Later" option
   - Never force users to complete the walkthrough
   - Allow users to restart tour from settings

4. **Focus on Value**
   - Lead with benefits, not features
   - Answer "What's in it for me?"
   - Show how the app solves user problems

5. **Test with Real Users**
   - Conduct usability testing with your target audience
   - Watch where users get confused or drop off
   - Iterate based on feedback

6. **Make It Accessible**
   - Support screen readers
   - Ensure adequate color contrast
   - Provide keyboard navigation
   - Offer text alternatives for images

7. **Personalize When Possible**
   - Adapt content based on user role or goals
   - Skip steps for features users won't use
   - Remember progress if user exits

### Don'ts ❌

1. **Don't Overwhelm**
   - Avoid showing every feature at once
   - Don't use technical jargon
   - Don't create walls of text

2. **Don't Block Functionality**
   - Let users explore on their own if they want
   - Don't force completion before allowing app use
   - Avoid modal dialogs that prevent interaction

3. **Don't Be Repetitive**
   - Don't explain obvious things
   - Avoid showing the same pattern multiple times
   - Trust users to learn by doing

4. **Don't Assume**
   - Don't assume users read everything
   - Don't assume they understand your domain
   - Don't assume prior experience with similar apps

5. **Don't Neglect Updates**
   - Update walkthrough when features change
   - Remove references to discontinued features
   - Refresh content regularly

---

## Implementation Considerations

### Technical Implementation Options

#### 1. Third-Party Libraries (Recommended for Speed)

For React/Ionic apps like HortiConnect:

**react-joyride**
```typescript
import Joyride from 'react-joyride';

const steps = [
  {
    target: '.marketplace-tab',
    content: 'Browse and list products in the marketplace',
  },
  {
    target: '.clusters-tab',
    content: 'Connect with farming clusters in your area',
  },
  // ... more steps
];

<Joyride steps={steps} continuous showSkipButton />
```

**Pros:**
- Quick implementation
- Maintained by community
- Lots of customization options
- Good documentation

**Cons:**
- Bundle size increase
- Less control over exact behavior
- Dependency on third-party

#### 2. Custom Implementation

Build your own using Ionic components:

```typescript
// WalkthroughModal.tsx
import { IonModal, IonButton, IonContent } from '@ionic/react';

const WalkthroughModal = ({ isOpen, steps, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <h2>{steps[currentStep].title}</h2>
        <p>{steps[currentStep].description}</p>
        <img src={steps[currentStep].image} alt="" />
        <IonButton onClick={() => setCurrentStep(prev => prev + 1)}>
          Next
        </IonButton>
      </IonContent>
    </IonModal>
  );
};
```

**Pros:**
- Full control over behavior
- No external dependencies
- Optimized for your use case

**Cons:**
- More development time
- Need to handle edge cases yourself
- Maintenance burden

#### 3. Hybrid Approach (Recommended)

- Use third-party library for feature tours
- Build custom modals for critical onboarding steps
- Implement contextual tooltips manually

### State Management

Track walkthrough progress:

```typescript
// contexts/OnboardingContext.tsx
interface OnboardingState {
  hasCompletedWalkthrough: boolean;
  completedSteps: string[];
  shouldShowFeatureTour: (feature: string) => boolean;
  markStepComplete: (step: string) => void;
}

// Store in localStorage or backend
localStorage.setItem('onboarding_state', JSON.stringify(state));
```

### Conditional Display Logic

```typescript
// hooks/useOnboarding.ts
export const useOnboarding = () => {
  const { user } = useAuth();
  const [onboardingState, setOnboardingState] = useState(null);
  
  useEffect(() => {
    // Check if user has completed onboarding
    const completed = localStorage.getItem(`onboarding_${user.id}`);
    if (!completed) {
      setOnboardingState({ shouldShow: true, userRole: user.role });
    }
  }, [user]);
  
  return onboardingState;
};

// In your component
const Home = () => {
  const onboarding = useOnboarding();
  
  return (
    <>
      {onboarding?.shouldShow && (
        <WalkthroughModal role={onboarding.userRole} />
      )}
      <HomeContent />
    </>
  );
};
```

### Analytics Integration

Track walkthrough effectiveness:

```typescript
// utils/analytics.ts
export const trackWalkthroughEvent = (event: string, step?: number) => {
  // Google Analytics
  gtag('event', event, {
    event_category: 'Onboarding',
    event_label: `Step ${step}`,
  });
  
  // Custom analytics
  analytics.track('Walkthrough Event', {
    event_name: event,
    step_number: step,
    timestamp: new Date().toISOString(),
  });
};

// Usage
trackWalkthroughEvent('walkthrough_started');
trackWalkthroughEvent('step_viewed', 1);
trackWalkthroughEvent('step_skipped', 3);
trackWalkthroughEvent('walkthrough_completed');
```

---

## Measurement and Iteration

### Key Metrics to Track

1. **Completion Metrics**
   - Overall completion rate
   - Step-by-step completion rates
   - Average time to complete
   - Skip rate at each step

2. **Engagement Metrics**
   - Percentage of users who start walkthrough
   - Percentage who complete vs. skip
   - Return rate (do users re-access it?)

3. **Impact Metrics**
   - Feature adoption rates (before vs. after)
   - Time to first core action
   - User activation rate
   - Retention improvements (D1, D7, D30)

4. **Qualitative Metrics**
   - User feedback and ratings
   - Support ticket volume reduction
   - App store review sentiment
   - User interview insights

### Analysis Framework

```
Monthly Walkthrough Analysis Report

Period: [Month, Year]

1. Summary Metrics
   - New users: [X]
   - Walkthrough starts: [X] ([X]%)
   - Walkthrough completions: [X] ([X]%)
   - Average completion time: [X] minutes

2. Step-by-Step Analysis
   Step 1: [X]% viewed, [X]% completed, [X]% skipped
   Step 2: [X]% viewed, [X]% completed, [X]% skipped
   [etc.]
   
   Drop-off points: Steps [X, Y, Z] show highest skip rates

3. Segmented Analysis
   - By user role: Sellers ([X]% completion), Buyers ([X]% completion)
   - By platform: iOS ([X]%), Android ([X]%), Web ([X]%)
   - By geography: [Region-based insights]

4. Impact Assessment
   - Feature adoption: [Feature] usage increased by [X]%
   - Time to first action: Reduced by [X] minutes
   - User retention: Day 1 ([X]%), Day 7 ([X]%), Day 30 ([X]%)

5. User Feedback Highlights
   - Positive: "[Quote from user feedback]"
   - Negative: "[Quote from user feedback]"
   - Suggestions: "[Common user suggestions]"

6. Recommendations
   - Action 1: [Specific change based on data]
   - Action 2: [Specific change based on data]
   - A/B test proposal: [Test different variant]
```

### Continuous Improvement Process

```
Quarter 1:
- Launch initial walkthrough
- Gather baseline metrics
- Collect qualitative feedback

Quarter 2:
- Analyze Q1 data
- Identify problem areas
- Design and test improvements
- Implement changes

Quarter 3:
- Measure impact of changes
- Continue iteration
- Consider personalization options
- Test progressive onboarding

Quarter 4:
- Year-end analysis
- Plan major updates
- Align with product roadmap
- Set goals for next year
```

### A/B Testing Plan

```
Test: Walkthrough Length

Hypothesis: Shorter walkthroughs will have higher completion rates
but may result in lower feature adoption.

Variants:
- Control (A): 5-step walkthrough (current)
- Variant B: 3-step walkthrough (essentials only)
- Variant C: 7-step walkthrough (comprehensive)

Sample Size: 1,000 users per variant (3,000 total)
Duration: 2 weeks
Primary Metric: Walkthrough completion rate
Secondary Metrics: Feature adoption, time to first action

Success Criteria:
- Completion rate > 60%
- Feature adoption rate maintained or improved
- No negative impact on retention
```

---

## Conclusion

A well-designed app walkthrough can significantly improve user onboarding, feature adoption, and long-term retention. By following this concept note guide, you can create a structured plan that:

1. **Aligns stakeholders** around a shared vision
2. **Guides implementation** with clear specifications
3. **Sets measurable goals** for success
4. **Enables iteration** based on data and feedback

### Next Steps

After completing your concept note:

1. **Get Stakeholder Review**
   - Present to product, design, and engineering teams
   - Gather feedback and refine

2. **Create Detailed Designs**
   - Wireframes for each walkthrough step
   - High-fidelity mockups
   - Interactive prototypes for testing

3. **Develop Content**
   - Write final copy
   - Create or source images/animations
   - Record videos if needed

4. **Build and Test**
   - Implement using chosen approach
   - QA across devices and platforms
   - Conduct user testing

5. **Launch and Monitor**
   - Start with small user percentage
   - Monitor metrics closely
   - Be ready to iterate quickly

6. **Iterate Continuously**
   - Review data monthly
   - Make incremental improvements
   - Stay aligned with product evolution

---

## Additional Resources

### Recommended Reading

- "Don't Make Me Think" by Steve Krug
- "The Design of Everyday Things" by Don Norman
- "Hooked: How to Build Habit-Forming Products" by Nir Eyal

### Tools and Libraries

**For HortiConnect (React/Ionic):**
- react-joyride: https://docs.react-joyride.com/
- driver.js: https://driverjs.com/
- intro.js: https://introjs.com/

**For Design:**
- Figma: For creating mockups and prototypes
- Lottie: For animations
- Principle: For interactive prototypes

**For Analytics:**
- Google Analytics
- Mixpanel
- Amplitude
- Hotjar (for session recordings)

### Templates

This guide includes templates for:
- ✅ Executive Summary
- ✅ User Journey Mapping
- ✅ Content Outline
- ✅ Technical Requirements
- ✅ Success Metrics
- ✅ Analysis Reports

All templates can be customized for your specific app and goals.

---

## Appendix: HortiConnect Walkthrough Content Examples

### Example Walkthrough Copy

**Welcome Screen:**
```
Headline: Welcome to HortiConnect! 🌱
Body: Your gateway to Nigeria's vibrant horticulture community. Connect with farmers, discover quality produce, and grow together.
CTA: Get Started
Skip: Skip Tour
```

**Marketplace Screen:**
```
Headline: Buy and Sell with Ease
Body: Browse fresh produce from local farmers. List your products to reach thousands of buyers.
Visual: Highlight Marketplace tab + product grid
CTA: Next
```

**Clusters Screen:**
```
Headline: Join Your Farming Community
Body: Connect with cluster groups, share knowledge, and collaborate with farmers in your area.
Visual: Highlight Clusters tab + cluster cards
CTA: Next
```

**Final Screen:**
```
Headline: You're All Set! 🎉
Body: Ready to start your journey? Complete your profile to unlock all features.
CTA: Complete Profile
Skip: Explore Later
```

### Visual Design Suggestions

- **Color Scheme**: Use HortiConnect's green theme (#15803d)
- **Animations**: Subtle fade-ins, no distracting movements
- **Overlays**: Semi-transparent dark overlay (0.7 opacity) to dim background
- **Spotlights**: White circle with shadow highlighting UI elements
- **Progress Indicators**: Dots at bottom showing step progress (e.g., ●○○○)

---

**Document Version**: 1.0  
**Last Updated**: October 2025  
**Maintained By**: HortiConnect Product Team  
**Questions?** Refer to README.md or contact the product team.
