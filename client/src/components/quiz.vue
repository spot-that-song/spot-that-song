<template>
  <v-container>
    <!-- <h1>Quiz header</h1> -->
    <v-card>
      <v-responsive :aspect-ratio="16/9">
        <div class="responsive-content"
        v-if="!questionStage && !resultsStage">
          <v-btn color="info" @click="startQuiz">START!</v-btn>
        </div>
        <div v-if="questionStage" class="responsive-content">
          <question
            :question="questions[currentQuestion]"
            @answer="handleAnswer"
            :question-number="currentQuestion+1"
          ></question>
        </div>
        <div v-if="resultsStage" class="responsive-content responsive2">
          <h1>Your score is {{perc}}%.</h1>
          <p>You got {{correct}} right out of {{questions.length}} questions.</p>
          <p><a @click.prevent="startQuiz">Click here</a> to go back.</p>
        </div>
      </v-responsive>
    </v-card>
  </v-container>
</template>

<style>
.responsive-content {
  padding: 20px;
  display:flex;
  justify-content:center;
  height: 100%;
  align-items:center;
}
.responsive2 {
  flex-direction: column;
}
</style>

<script>
import fs from "fs";
import question from "./question.vue";
import questions from "../question.js";
import db from '../main.js';

let arr = questions.questions;
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
      if (switchIndex < 3) {
        [item.answers[3], item.answers[switchIndex]] = [
          item.answers[switchIndex],
          item.answers[3]
        ];
      }
    });
    arr.forEach((item, index) => {
      let switchIdx = Math.round(Math.random() * (arr.length-1))
      if(switchIdx !== index) {
        [arr[index], arr[switchIdx]] = [arr[switchIdx],arr[index]];
        // console.log(index, switchIdx)
        // console.log(arr)
      }
    })
    this.questions = [...arr];
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
      this.questions.forEach((a, index) => {
        if (arr[index].title === this.answers[index]) this.correct++;
      });
      this.perc = ((this.correct / this.questions.length) * 100).toFixed(0);
      db.collection('rooms')
        .doc(this.$route.params.RoomID)
        .get()
        .then(docref => {
          let {players} = docref.data()
          // console.log({data})
          let newData = players.find(item => {
            return item.playerId === this.$store.state['UserId']
          })
          console.log(newData)
          newData.score = Number(this.perc)
          console.log(newData)
          return db.collection('rooms')
            .doc(this.$route.params.RoomID)
            .set({players:newData}, {merge: true})
        })
        .then(success => {
          console.log('sukses')
          return db.collection('rooms').doc(this.$route.params.RoomID).get()
        })
        .then(room => {
          let {players} = room.data()
          let scores = []
          players.forEach(item => {
            // item.score
          })
        })
        .catch(err => {
          console.log('error', err)
        })
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
