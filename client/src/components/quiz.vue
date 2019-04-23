<template>
  <v-container>
    <h1>Quiz header</h1>
    <v-btn color="info" @click="startQuiz">START!</v-btn>
    <div v-if="questionStage">
      <question
        :question="questions[currentQuestion]"
        @answer="handleAnswer"
        :question-number="currentQuestion+1"
      ></question>
    </div>

    <div
      v-if="resultsStage"
    >You got {{correct}} right out of {{questions.length}} questions. Your percentage is {{perc}}%. <a @click.prevent="startQuiz">Click here</a> to go back.</div>
  </v-container>
</template>

<script>
import fs from "fs";
import question from './question.vue';
import questions from "../question.js";

let arr = questions.questions
// console.log(arr)

const quizData = "https://api.myjson.com/bins/ahn1p";

export default {
  name: "quiz",
  data() {
    return {
      introStage: false,
      questionStage: false,
      resultsStage: false,
      questions: [],
      currentQuestion: 0,
      answers: [],
      correct: 0,
      perc: null
    };
  },
  components: {
    question
  },
  created() {
    arr.forEach(item => {
      item.answers = new Array(...item.wrongAnswers);
      item.answers[3] = item.title;
      let switchIndex = Math.round(Math.random() * 3);
      // console.log({switchIndex})
      if(switchIndex < 3) {
        [item.answers[3], item.answers[switchIndex]] = [item.answers[switchIndex], item.answers[3]];
      }
    });
    this.questions = arr;
    this.introStage = true;
  },
  methods: {
    startQuiz() {
      this.reset();
      this.introStage = false;
      this.questionStage = true;
      // console.log(
      //   "test" + JSON.stringify(this.questions[this.currentQuestion])
      // );
    },
    handleAnswer(e) {
      // console.log("answer event ftw", e);
      this.answers[this.currentQuestion] = e.answer;
      // console.log({answers: this.answers})
      if (this.currentQuestion + 1 === this.questions.length) {
        this.handleResults();
        this.questionStage = false;
        this.resultsStage = true;
      } else {
        this.currentQuestion++;
      }
    },
    handleResults() {
      // console.log("handle results");
      this.questions.forEach((a, index) => {
        // console.log((arr[index].title === this.answers[index]) ? 'Betul' : 'Salah' )
        if (arr[index].title === this.answers[index]) this.correct++;
      });
      this.perc = ((this.correct / this.questions.length) * 100).toFixed(2);
      // console.log(this.correct + " " + this.perc);
    },
    reset() {
      this.perc = null;
      this.currentQuestion = 0;
      this.introStage = true;
      this.questionStage = false;
      this.resultsStage = false;
      this.correct = 0;
    }
  }
};
</script>
