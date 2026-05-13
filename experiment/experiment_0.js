const jsPsych = initJsPsych({
      show_progress_bar: true,
       on_finish: function(){
        window.location = "https://app.prolific.co/submissions/complete?cc=XXXXXXX"
    }
    });

// capture info from Prolific
var subject_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
var study_id = jsPsych.data.getURLVariable('STUDY_ID');
var session_id = jsPsych.data.getURLVariable('SESSION_ID');

jsPsych.data.addProperties({
subject_id: subject_id,
study_id: study_id,
session_id: session_id
});


// Unique participant ID
const participantId = jsPsych.randomization.randomID(8);
jsPsych.data.addProperties({ participant_id: participantId });

const timeline = [];


// =========================================================================
// HELPER: build a masked sentence string
// Each word is replaced with dashes of equal length; spaces preserved.
// =========================================================================
function buildMaskedSentence(words) {
    return words.map(w => '-'.repeat(w.length));
}

// Returns HTML showing the sentence with word[currentIndex] revealed
// and all others masked.
function movingWindowHTML(words, currentIndex) {
    const masked = buildMaskedSentence(words);
    for (let i = 0; i <= currentIndex && i < words.length; i++) {
    masked[i] = words[i]; // reveal current word
}
    return `<div class="spr-display">${masked.join(' ')}</div>`;
}

// =========================================================================
// CONSENT TRIAL
// =========================================================================

const consent_trial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<div class="consent-text"> <h2>Consent Agreement</h2> <p> Please read this consent agreement carefully before deciding whether to participate in this experiment. </p> <p> <strong>Description:</strong> You are invited to participate in a research study about language and language learning. The purpose of the research is to understand how people learn new words. This research will be conducted through the Prolific platform, including participants from the US, UK, and Canada. If you decide to participate in this research, you will learn and use new words. </p> <p> <strong>Time Involvement:</strong> The task will last the amount of time advertised on Prolific. You are free to withdraw from the study at any time. </p> <p> <strong>Risks and Benefits:</strong> Study data will be stored securely, in compliance with Stanford University standards, minimizing the risk of confiden-tiality breach. This study advances our scientific understanding of how people learn new languages. We cannot and do not guarantee or promise that you will receive any benefits from this study. </p> <p> <strong>Compensation:</strong> You will receive payment in the amount advertised on Prolific. If you do not complete this study, you will receive prorated payment based on the time that you have spent. Additionally, you may be eligible for bonus payments as described in the instructions. </p> <p> <strong>Participant's Rights:</strong> If you have read this form and have decided to participate in this project, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at any time without penalty or loss of benefits to which you are otherwise entitled. The alternative is not to participate. You have the right to refuse to answer particular questions. The results of this research study may be presented at scientific or professional meetings or published in scientific journals. Your individual privacy will be maintained in all published and writ-ten data resulting from the study. In accordance with scientific norms, the data from this study may be used or shared with other researchers for future research (after removing personally identifying information) without additional consent from you. </p> <p> <strong>Contact Information:</strong> If you have any questions, concerns or complaints about this research, its procedures, risks and benefits, contact the Protocol Director, Robert Hawkins (<a href="mailto:rdhawkins@stanford.edu">rdhawkins@stanford.edu</a>, 217-549-6923). </p> <p> <strong>Independant Contact:</strong> If you are not satisfied with how this study is being conducted, or if you have any concerns, com-plaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at 650-723-2480 or toll free at 1-866-680-2906, or email at irbnonmed@stanford.edu. You can also write to the Stanford IRB, Stanford University, 1705 El Camino Real, Palo Alto, CA 94306. Please save or print a copy of this page for your records. </p> <p> <strong>If you agree to participate in this research, please click "I agree"</strong> </p></br> </div>`
    choices: ['I agree', 'I do not agree'],
    button_html: function(choice, choice_index) {
        const buttonClass = choice_index === 0 ? 'consent-button agree' : 'consent-button disagree';
        return `<button class="${buttonClass}">${choice}</button>`;
    },
    data: {
        trial_type: 'consent'
    },
    on_finish: function(data) {
        // Record consent response
        // response is the index of the button clicked (0 = "I agree", 1 = "I do not agree")
        data.consent_response = data.response === 0 ? 'agree' : 'disagree';
        data.consent_timestamp = new Date().toISOString();
        
        // If participant does not agree, end experiment
        if (data.response === 1) { // "I do not agree" is the second button (index 1)
        jsPsych.endExperiment(`
    <div class="instruction-text">
        <h2>Thank you</h2>
        <p>You have chosen not to participate. Thank you for your time.</p>
    </div>
    `);
        }
    }
};
timeline.push(consent_trial);

// =========================================================================
// INSTRUCTIONS
// =========================================================================
const instructions = {
    type: jsPsychInstructions,
    pages: [
    `<div style="max-width:700px; margin:0 auto; text-align:left; line-height:1.7;">
        <h2 style="text-align:center;">Self-Paced Reading Study</h2>
        <p>In this experiment you will read sentences <strong>one word at a time</strong>.</p>
        <p>Each sentence will appear on screen with all words hidden as dashes, like this:</p>
        <p style="text-align:center; font-family:'Courier New',monospace; font-size:24px; letter-spacing:2px;">
        --- -- ----- --- ----
        </p>
        <p>Press the <span class="key-label">SPACE</span> bar to reveal each word.</p>
        <p>Please read at a natural pace, just as you normally would.</p>
    </div>`,

    `<div style="max-width:700px; margin:0 auto; text-align:left; line-height:1.7;">
        <h2 style="text-align:center;">Comprehension Questions</h2>
        <p>After each sentence, a yes/no question will appear.</p>
        <p>Answer using the keyboard:</p>
        <ul>
        <li>Press <span class="key-label">F</span> for <strong>Yes</strong></li>
        <li>Press <span class="key-label">J</span> for <strong>No</strong></li>
        </ul>
        <p>You will see feedback telling you whether your answer was correct.</p>
        <p>After the feedback, press <span class="key-label">SPACE</span> to move on to the next sentence.</p>
    </div>`,

    `<div style="max-width:700px; margin:0 auto; text-align:center; line-height:1.7;">
        <h2>Practice</h2>
        <p>We will start with <strong>6 practice sentences</strong> so you can get used to the format.</p>
        <p>The real experiment will begin automatically after practice.</p>
        <p>Click <strong>Next</strong> when you are ready to begin practice.</p>
    </div>`
    ],
    show_clickable_nav: true,
    data: { trial_type_label: 'instructions' }
};
timeline.push(instructions);


// =========================================================================
// CORE FUNCTION: createReadingTrials
// Implements the moving-window paradigm with:
//   - fixation cross (500 ms)
//   - fully masked sentence + spacebar prompt
//   - word-by-word moving window (SPACE advances)
//   - F/J comprehension question
//   - correctness feedback + SPACE to continue
// =========================================================================
function createReadingTrials(stimulus, isPractice) {
    const trials = [];

    const words = stimulus.stimulus.split(/\s+/);

    const stimulusMetadata = {
    no:         stimulus.no,
    exp_id:     stimulus.exp_id,
    condition:  stimulus.condition,
    item_type:  stimulus.item_type,
    item_id:    stimulus.item_id,
    is_practice: isPractice ? 1 : 0
    };

    // --- Fixation cross ---
    trials.push({
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<span class="fixation">+</span>',
    choices: "NO_KEYS",
    trial_duration: 500,
    data: Object.assign({ trial_type_label: 'fixation' }, stimulusMetadata)
    });

    // --- Fully masked sentence + prompt to begin ---
    trials.push({
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `${movingWindowHTML(words.map(w => '-'.repeat(w.length)), -1).replace(/<\/div>/, '')}`,
    choices: [' '],
    data: Object.assign({ trial_type_label: 'prompt' }, stimulusMetadata)
    });

    // --- Word-by-word moving window ---
    for (let i = 0; i < words.length; i++) {

    // Current word revealed; all others masked
    trials.push({
        type: jsPsychHtmlKeyboardResponse,
        stimulus: movingWindowHTML(words, i),
        choices: [' '],
        data: Object.assign({
        trial_type_label: 'spr_word',
        word:        words[i],
        word_index:  i,
        word_count:  words.length
        }, stimulusMetadata),
        on_finish: function(data) {
        data.too_fast = data.rt < 100;
        }
    });
    }

    // --- Comprehension question (F = Yes, J = No) ---
    trials.push({
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div class="comprehension-box">
                    <p>${stimulus.question}</p>
                    <p>Press <span class="key-label">F</span> for <strong>Yes</strong> &nbsp;|&nbsp;
                    Press <span class="key-label">J</span> for <strong>No</strong></p>
                </div>`,
    choices: ['f', 'j'],
    data: Object.assign({
        trial_type_label:  'comprehension',
        correct_answer:    stimulus.correct_answer   // expected: 'f' or 'j'
    }, stimulusMetadata),
    on_finish: function(data) {
        // Score: 'f' = Yes, 'j' = No
        data.response_label = data.response === 'f' ? 'Yes' : 'No';
        data.correct = (data.response === data.correct_answer);
    }
    });

    // --- Feedback ---
    trials.push({
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        const last = jsPsych.data.get().last(1).values()[0];
        if (last.correct) {
        return `<div class="comprehension-box">
                    <p class="feedback-correct">Correct!</p>
                    <p style="margin-top:20px; font-size:16px; color:#555;">
                    Press <span class="key-label">SPACE</span> to continue.
                    </p>
                </div>`;
        } else {
        const correctLabel = last.correct_answer === 'f' ? 'Yes' : 'No';
        return `<div class="comprehension-box">
                    <p class="feedback-incorrect">Incorrect</p>
                    <p style="font-size:18px;">The correct answer was <strong>${correctLabel}</strong>.</p>
                    <p style="margin-top:20px; font-size:16px; color:#555;">
                    Press <span class="key-label">SPACE</span> to continue.
                    </p>
                </div>`;
        }
    },
    choices: [' '],
    data: Object.assign({ trial_type_label: 'feedback' }, stimulusMetadata)
    });

    return trials;
}


// =========================================================================
// PRACTICE ITEMS
// Six hard-coded practice stimuli so participants learn the format.
// These mirror the structure of experimentStimuli but are never analysed.
// =========================================================================
const practiceStimuli = [
    {
    no: 'P1', exp_id: 'practice', condition: 'practice',
    item_type: 'practice', item_id: 'p1',
    stimulus: 'The cat sat on the mat.',
    question: 'Was there an animal mentioned in the sentence?',
    correct_answer: 'f'
    },
    {
    no: 'P2', exp_id: 'practice', condition: 'practice',
    item_type: 'practice', item_id: 'p2',
    stimulus: 'She bought a red dress at the market.',
    question: 'Did she buy something blue?',
    correct_answer: 'j'
    },
    {
    no: 'P3', exp_id: 'practice', condition: 'practice',
    item_type: 'practice', item_id: 'p3',
    stimulus: 'The children played football in the park after school.',
    question: 'Were the children outdoors?',
    correct_answer: 'f'
    },
    {
    no: 'P4', exp_id: 'practice', condition: 'practice',
    item_type: 'practice', item_id: 'p4',
    stimulus: 'He put his keys on the kitchen table before leaving.',
    question: 'Did he lose his keys?',
    correct_answer: 'j'
    },
    {
    no: 'P5', exp_id: 'practice', condition: 'practice',
    item_type: 'practice', item_id: 'p5',
    stimulus: 'The old library smelled of dust and leather.',
    question: 'Was the setting a library?',
    correct_answer: 'f'
    },
    {
    no: 'P6', exp_id: 'practice', condition: 'practice',
    item_type: 'practice', item_id: 'p6',
    stimulus: 'Maria called her sister every Sunday morning.',
    question: 'Did Maria call her brother?',
    correct_answer: 'j'
    }
];

// Push practice trials
for (const ps of practiceStimuli) {
    timeline.push(...createReadingTrials(ps, true));
}

// Transition screen between practice and main experiment
timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div style="max-width:600px; margin:0 auto; text-align:center; line-height:1.8;">
                <h2>Practice complete!</h2>
                <p>You are now ready to begin the main experiment.</p>
                <p>Remember:<br>
                    <span class="key-label">SPACE</span> - advance words<br>
                    <span class="key-label">F</span> - Yes &nbsp;|&nbsp;
                    <span class="key-label">J</span> - No
                </p>
                <p>Press <span class="key-label">SPACE</span> to start.</p>
                </div>`,
    choices: [' '],
    data: { trial_type_label: 'practice_end' }
});


// =========================================================================
// MAIN EXPERIMENT: shuffle and push all experimental stimuli
// =========================================================================

// Set seed for psuedorandomization to ensure reproducibility
const shuffledStimuli = jsPsych.randomization.shuffle(experimentStimuli);

for (const stim of shuffledStimuli) {
    timeline.push(...createReadingTrials(stim, false));
}

const filename = `${participantId}.csv`;

const save_data = {
    type: jsPsychPipe,
    action: "save",
    experiment_id: "3Yny30avaMqX",
    filename: filename,
    data_string: ()=>jsPsych.data.get().csv()
};
timeline.push(save_data);



// =========================================================================
// COMPLETION SCREEN
// =========================================================================
const completion = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
    const sprTrials  = jsPsych.data.get().filter({ trial_type_label: 'spr_word', is_practice: 0 });
    const compTrials = jsPsych.data.get().filter({ trial_type_label: 'comprehension', is_practice: 0 });
    const nCorrect   = compTrials.filter({ correct: true }).count();
    const nTotal     = compTrials.count();
    const pct        = nTotal > 0 ? Math.round(100 * nCorrect / nTotal) : '—';
    return `<div style="max-width:600px; margin:0 auto; text-align:center; line-height:1.8;">
                <h2>Thank you!</h2>
                <p>You read <strong>${sprTrials.count()}</strong> words across all sentences.</p>
                <p>Comprehension accuracy: <strong>${nCorrect} / ${nTotal} (${pct}%)</strong></p>
                <p>Press <span class="key-label">SPACE</span> to view the raw data.</p>
            </div>`;
    },
    choices: [' '],
    data: { trial_type_label: 'completion' }
};
timeline.push(completion);


// =========================================================================
// Run the experiment!
// =========================================================================
jsPsych.run(timeline);