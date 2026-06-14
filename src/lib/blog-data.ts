export type BlogPost = {
  slug: string;
  category: "professional" | "personal";
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "understanding-coronary-artery-disease",
    category: "professional",
    tag: "Cardiology",
    title: "Understanding Coronary Artery Disease: When Surgery Is the Answer",
    excerpt:
      "A plain-language guide to how CAD develops, how it is managed medically, and the surgical options when medications and stenting are insufficient.",
    date: "15 June 2025",
    readTime: "6 min read",
    content: `
Coronary artery disease (CAD) is the leading cause of death in South Africa and worldwide. It develops when the arteries supplying the heart muscle with blood become narrowed or blocked by a build-up of fatty deposits called plaque — a process known as atherosclerosis.

## How Does It Develop?

Plaque accumulates over years, often silently. Risk factors that accelerate the process include hypertension, diabetes, dyslipidaemia, smoking, obesity, and a family history of heart disease. As the arteries narrow, the heart muscle receives less oxygen-rich blood — particularly during exertion — causing the hallmark symptom of angina (chest tightness or pain).

## Medical Management First

The first line of treatment for most patients is lifestyle modification and medication. Statins reduce plaque formation; beta-blockers and nitrates relieve angina; antiplatelet agents such as aspirin reduce clot risk. Many patients do well on this regimen for years.

When medical therapy is insufficient, a cardiologist may recommend coronary angiography — an X-ray of the heart arteries — to map the disease. If a discrete blockage is found, a percutaneous coronary intervention (PCI, or "stenting") may open it.

## When Surgery Becomes Necessary

Coronary artery bypass grafting (CABG) is recommended when:

- Three or more coronary arteries are significantly blocked (triple-vessel disease)
- The left main coronary artery is involved (a high-risk pattern)
- The heart's pumping function is reduced (low ejection fraction)
- Previous stenting has failed (restenosis)
- Diabetes is present alongside multi-vessel disease (where bypass shows superior outcomes to stenting)

During CABG, the surgeon harvests a blood vessel from elsewhere in the body — typically the internal mammary artery from the chest wall, or the saphenous vein from the leg — and creates a detour (bypass) around the blocked segment. Blood then flows through the graft, restoring circulation to the starved heart muscle.

## What to Expect

Modern CABG is safe, with complication rates that continue to improve. Most patients spend five to seven days in hospital, return to light activity within four to six weeks, and experience durable relief of angina. Many randomised trials show that bypass offers better long-term survival than stenting for complex disease patterns.

If you have been told you may need a surgical opinion regarding coronary artery disease, I encourage you to arrange a consultation. Understanding your options thoroughly — with your own surgeon — is the most important step you can take.
    `.trim(),
  },
  {
    slug: "lung-nodule-what-now",
    category: "professional",
    tag: "Thoracic",
    title: "Your CT Showed a Lung Nodule — What Happens Next?",
    excerpt:
      "Incidental lung nodules are increasingly detected. Here is how we risk-stratify them and when a surgical approach is indicated.",
    date: "2 May 2025",
    readTime: "5 min read",
    content: `
With CT scanning now performed routinely for many chest and abdominal complaints, the incidental discovery of a lung nodule has become increasingly common. A "nodule" is simply a small rounded opacity — in practical terms, a spot — seen on the scan, typically smaller than 3 centimetres.

The critical question, of course, is: what does it mean?

## Most Nodules Are Not Cancer

The majority of incidentally found lung nodules are benign — caused by old granulomatous infections (such as tuberculosis, very prevalent in South Africa), small lymph nodes, or minor scarring. However, a proportion will represent early lung cancer or metastatic disease from another site, so they cannot be dismissed without proper assessment.

## How We Risk-Stratify

A structured approach is used, incorporating:

**Size:** Nodules under 6mm carry very low risk and require only periodic surveillance. Those above 8mm warrant more active investigation.

**Morphology:** Solid, part-solid, or pure "ground-glass" nodules each carry different implications. Irregular or spiculated (spiky) edges raise suspicion.

**Growth over time:** A nodule that doubles in volume in less than 400 days is concerning. Stability over two years is reassuring.

**Patient risk factors:** Smoking history, age, family history of lung cancer, and prior malignancy all influence the pretest probability.

We typically follow established guidelines (Fleischner Society or BTS) to decide the appropriate surveillance interval or escalation pathway.

## When Surgery Is Indicated

If a nodule grows, has high-risk features, or cannot be safely characterised by biopsy, surgical resection is appropriate. This serves two purposes simultaneously: definitive diagnosis and potential cure, if the lesion proves malignant at an early stage.

Most resections for nodules are performed using video-assisted thoracoscopic surgery (VATS) — keyhole surgery through small chest-wall incisions. Recovery is generally quicker than open thoracotomy, with most patients discharged within two to three days.

The most important message: if you have been told about a lung nodule, ensure it is being actively followed up. Do not assume that the absence of symptoms means the nodule can be ignored.
    `.trim(),
  },
  {
    slug: "heart-valve-disease-signs",
    category: "professional",
    tag: "Cardiology",
    title: "Heart Valve Disease: Symptoms You Should Not Ignore",
    excerpt:
      "Valve disease often develops slowly. Understanding the warning signs can make the difference between a repair and a replacement.",
    date: "10 March 2025",
    readTime: "5 min read",
    content: `
The heart has four valves — mitral, aortic, tricuspid, and pulmonary — whose job is to ensure blood flows in one direction only through the heart's chambers. When a valve leaks (regurgitation) or fails to open fully (stenosis), the heart must work harder to compensate, often for years before symptoms appear.

## The Danger of Slow Progression

This gradual adaptation is both a feature and a hazard. Patients often feel well even as significant valve dysfunction develops. By the time breathlessness, fatigue, or ankle swelling become obvious, the heart may have already sustained irreversible changes. This is why regular echocardiographic surveillance of known valve disease is essential.

## Warning Signs

Seek assessment promptly if you experience:

- Progressive shortness of breath on exertion (doing less than you used to for the same symptoms)
- Waking at night breathless (orthopnoea or paroxysmal nocturnal dyspnoea)
- Ankle or leg swelling
- Palpitations or an irregular heartbeat (atrial fibrillation is commonly triggered by mitral valve disease)
- Dizzy spells or fainting, especially with exertion (a serious warning sign in aortic stenosis)
- A new heart murmur detected by your doctor

## Repair vs Replacement

When surgery is indicated, the aim is always to repair rather than replace a valve. A repaired native valve — particularly the mitral — lasts a lifetime without requiring blood thinning medication (anticoagulation). Replacement with a biological prosthesis avoids anticoagulation but may need revision after 10–15 years; a mechanical valve is more durable but requires lifelong anticoagulation.

The timing of surgery, and the choice of valve strategy, must be individualised. An early referral to a cardiothoracic surgeon — ideally while the valve is still repairable and before heart function has declined — gives the best long-term outcome.
    `.trim(),
  },
  {
    slug: "lessons-from-the-operating-theatre",
    category: "personal",
    tag: "Reflections",
    title: "Lessons the Operating Theatre Taught Me About Leadership",
    excerpt:
      "Reflections on how the culture of a surgical team — communication, hierarchy, and trust under pressure — shapes outcomes far beyond the OR.",
    date: "18 April 2025",
    readTime: "4 min read",
    content: `
There are very few human environments where the consequences of poor communication are as immediate and as irreversible as in an operating theatre. I have been thinking lately about how much the theatre has shaped my understanding of what it means to lead well — and how rarely those lessons make it into management books.

## The Spoken Assumption Is the Enemy

In surgery, an assumption left unspoken can kill someone. The scrub nurse assumes the surgeon has checked the implant size. The anaesthetist assumes the surgeon knows the patient is on warfarin. The registrar assumes the consultant knows the patient's CT showed an anomalous vessel.

Good surgical teams have a culture of explicit communication — not because they distrust each other, but because they understand that human memory is fallible, that attention narrows under pressure, and that a spoken check takes five seconds while an unsaid assumption can take a life.

I try to apply this outside the theatre too. In meetings, in planning sessions, with my team. Say the thing. Confirm the thing. Do not assume the other person knows what you are thinking.

## Hierarchy Serves a Purpose — but Not Every Purpose

Surgical teams have clear hierarchy for good reason. When a decision must be made in sixty seconds, you cannot run a committee. The hierarchy exists to make decisions under pressure.

But I have learned — sometimes the hard way — that hierarchy kills innovation and psychological safety when it is treated as permanent. The scrub nurse who has done ten thousand cases may well see something the consultant has not. The junior doctor's question that seems naive may identify a gap in your thinking.

The best surgical teams I have been part of had two modes: open discussion during planning, clear chain of command during execution. Knowing when to switch between them is the mark of a mature team.

## You Cannot Perform at Your Best Without Rest

This one nearly broke me early in my career. The surgical culture of my training years did not reward vulnerability, and it certainly did not reward admitting fatigue. But the science is unambiguous: after prolonged sleep deprivation, fine motor skills, decision-making, and situational awareness deteriorate to a measurable degree.

The best thing I can do for my patients is sleep, eat, exercise, and arrive at theatre with my full cognitive and technical capacity. That is not weakness. That is professionalism.

I write this not as a lecture but as a reminder to myself. The theatre teaches relentlessly, if you are paying attention.
    `.trim(),
  },
  {
    slug: "why-i-became-a-surgeon",
    category: "personal",
    tag: "Life",
    title: "Why I Became a Surgeon",
    excerpt:
      "An honest account of the path that led from curiosity to scalpel — and what keeps the calling alive after years in theatre.",
    date: "12 January 2025",
    readTime: "4 min read",
    content: `
People ask this question in different ways. Sometimes it is genuine curiosity. Sometimes it carries an undertone — implying that medicine is an unusual path for someone who looks like me, from where I come from. I choose to hear only the curiosity, and I try to answer honestly.

## It Started With a Question

I was nine years old when my uncle was admitted to hospital with a heart condition. I did not understand what was wrong. Nobody explained it to me in terms a child could follow. I remember sitting in a waiting room, watching the doctors move purposefully down corridors, and wondering what they knew that no one would tell me.

That wondering never left.

## The Long Road

Medicine in South Africa is not a short path. MBChB is six years. Internship. Community service. Specialist training in general surgery, then cardiothoracic surgery — another eight years of registrarship and fellowship. By the time I was fully qualified, I had been in formal training for the better part of two decades.

People sometimes romanticise this. The reality includes missed family events, chronic exhaustion, moments of genuine doubt, and a financial cost that most professionals in other fields would find startling.

I am not sharing this for sympathy. I am sharing it because I think it is important to be honest about what a calling actually costs, rather than presenting it as pure romance.

## What Keeps It Alive

After years in theatre, the honest answer is this: the moment a patient who came in struggling to breathe, or clutching their chest, or frightened of a shadow on their scan — the moment that patient walks out of hospital — that moment has not become routine.

I hope it never does.

And I think about my nine-year-old self in that waiting room. I try to be the doctor who explains things. Who treats the question as worthy of a real answer. Who makes the waiting less opaque.

That, more than anything, is why I became a surgeon.
    `.trim(),
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
