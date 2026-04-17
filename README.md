---
title: "Replication of Kim et al. (2024) by Lee (2026)"
author: "Oliver Lee (olee3691@stanford.edu)"
date: "`r format(Sys.time(), '%B %d, %Y')`"
format:
  html:
    toc: true
    toc_depth: 3
---

<!-- Replication reports should all use this template to standardize reporting across projects.  These reports will be public supplementary materials that accompany the summary report(s) of the aggregate results. -->

## Introduction

Kim et al. (2024) present experimental evidence that different wh-filler-gap dependencies are associated with different processing costs during comprehension. More specifically, the experimenters presented Northwestern university students (n=64) with self-paced reading tasks of various wh-filler-gap dependencies, finding that dependencies with longer filler-gap dependencies (e.g. _who~obj~_, _how_) are associated with longer reading times than those with shorter filler-gap dependencies (e.g. _that_~, _why_). They take these findings to be direct consequences of Gibson's (1998) Dependency Locality Theory, in which the length of a filler-gap dependency predicts processing costs in both storage and integration.

This study replicates Experiment 2a of Kim et al. (2024), which contained a set of stimuli with two embedded relative clauses within the wh-dependency. Both the procedure and stimuli from Experiment 3a are directly copied. In doing this replication study, we're specifically looking for whether, at the most deeply embedded N in the stimulus sentence, the _who~obj~_ and _how_ dependencies will be associated with longer reading times than the _why_ and _that_ dependencies.

## Methods

### Power Analysis

The original study reported an effect of −0.03 log-seconds (SE=0.01), when reading a _why_ and _that_ dependency as opposed to a  _who~obj~_ and _how_ dependency. A power analysis thus indicates that, to achieve 80%, 90%, or 95% power, we need approximately 56, 75, and 93 participants, respectively.

### Planned Sample

80 participants, sampled from Prolific.

### Materials

All materials - can quote directly from original article - just put the text in quotations and note that this was followed precisely.  Or, quote directly and just point out exceptions to what was described in the original article.

### Procedure	

We follow the experimental procedure directly from Kim et al. (2024), as quoted below:

``Stimuli were presented on a desktop PC using Linger software (Rohde, 2003) employing a self-paced word-by-word moving window paradigm (Just et al., 1982). Each experimental trial was initiated with dashes that masked words in the sentence. As participants pressed a button to move forward, each subsequent word appeared. Participants were instructed to read the sentences as they would normally read and to answer a comprehension question after reading each sentence. The yes/no comprehension question asked participants to press the F (yes) or J (no) keys. An example of a comprehension question is, Was the word “toys” mentioned in the story?. After receiving feedback on their responses, participants pressed the spacebar to proceed to the next experimental item. Six practice items were presented at the beginning of the experiment to allow participants to grasp the experimental format. The experiment took each participant approximately 30–45 mins to complete."

### Analysis Plan

We also follow the analysis plan of Kim et al. (2024):

"Data were analysed using linear mixed-effect regression models performed with the lme4 package in R version 3.2.3 (Baayen, 2008; Baayen et al., 2008; Bates et al., 2014). Each model included Helmert coding, where at the deeply embedded N, we compared (a) _who~obj~_, _how_, _why_ with _that_ as a baseline; (b) who~obj~ and _how_ with _why_; and (c) _who~obj~_ with _how_. At the adverb before the third verb and the third verb region, we compared (a) _who~obj~_, _how_, _why_ with that as a baseline; (b) _who~obj~_ with _how_ and _why_ and (c) _why_ with _how_. At this region, we compared _who~obj~_ with _how_ and _why_ because the adverb already signals the introduction to the VP at which _how_ should be integrated. Thus, we expected _how_ and _why_ to be read similarly unlike who~obj~ which induces storage costs. All models contained the maximal random effects structure that fit the data (Barr et al., 2013), including random intercepts for participants and items, and random slopes for fixed effects if the model successfully converged. In cases where the model did not converge, random effects containing the smallest variance were removed in a step-wise manner. Participants with an accuracy lower than 68% were excluded (Kim et al., 2019, 2020).
The reading times were log-transformed (Box & Cox, 1964). Two regions of interest were identified in this study. The first critical region was the most deeply embedded N (embedded N critical region: children in Table 8) where the processing complexity due to storage was expected to be the highest. We were also interested in one word following the most deeply embedded N critical region (embedded N spill-over region), given that effects arising in the critical region often spill over to one region following, that is, the spill-over region (Mitchell, 1984, 2018; Vasishth, 2006). The second critical region was the adverb region before the third verb, the third verb (e.g., benevolently and handed in Table 8) and the word following it (third verb spill-over region)."

**Key feature of interest**: effect size on reading time in reading a _who~obj~_ or _how_ dependency over a _that_ or _why_ dependency at the most deeply embedded N 

### Differences from Original Study

The primary difference from the original study is the sample, which we will collect from Prolific. This should not be associated with a different prediction.

### Methods Addendum (Post Data Collection)

You can comment this section out prior to final report with data collection.

#### Actual Sample
  Sample size, demographics, data exclusions based on rules spelled out in analysis plan

#### Differences from pre-data collection methods plan
  Any differences from what was described as the original plan, or “none”.

Kim, N., Wellwood, A., & Yoshida, M. (2024). Processing wh-filler-gap dependencies. Quarterly Journal of Experimental Psychology, 77(12), 2391-2417.

