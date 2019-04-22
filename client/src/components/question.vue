<template>
  <div>
    <strong>Question {{ questionNumber }}:</strong>
    <br>
    <strong>What song is this?</strong><br>

    <audio :src="question.audioUrl" controls></audio>

    <div>
      <div v-for="(answers, index) in question.answers" :key="index">
        <input
          type="radio"
          :id="'answer'+index"
          name="currentQuestion"
          v-model="answer"
          :value="answers"
        >
        <label :for="'answer'+index">{{answers}}</label>
        <br>
      </div>
    </div>

    <v-btn color="info" @click="submitAnswer">Answer</v-btn>
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
    submitAnswer: function() {
      this.$emit("answer", { answer: this.answer });
      this.answer = null;
    }
  }
};
</script>