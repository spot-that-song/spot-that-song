<template>
  <div>
    <strong>Question {{ questionNumber }}:</strong>
    <br>
    <strong>What song is this?</strong><br>

    <audio :src="question.audioUrl" controls></audio>

    <div>
      <div v-for="(answers, index) in question.answers" :key="index">
        <!-- <input
          type="radio"
          :id="'answer'+index"
          name="currentQuestion"
          v-model="answer"
          :value="answers"
        >
        <label :for="'answer'+index">{{answers}}</label> -->
        <v-btn :id="'answer'+index" :for="'answer'+index" name="currentQuestion" v-model="answer"
        :value="answers" @click="submitAnswer(answers)">{{answers}}</v-btn>
        <!-- <v-radio-group v-model="answer" row>
          <v-radio :label="answers" :value="answers"></v-radio>
        </v-radio-group> -->
        <br>
      </div>
    </div>

    <!-- <v-btn color="info" @click="submitAnswer('answer')">Answer</v-btn> -->
  </div>
</template>

<script>
export default {
  name: "question",
  data() {
    return {
      answer: ""
    };
  },
  props: ["question", "question-number"],
  methods: {
    submitAnswer: function(input) {
      // console.log({input, answer: this.answer})
      this.$emit("answer", { answer: input });
      this.answer = null;
    }
  }
};
</script>