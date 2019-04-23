<template>
  <div>
    <div style="display: flex; justify-content: center; width: 100%;">
      <div style="">
        <div v-if="!clicked">
          <v-card-text style="text-align: center;">
            <strong>Question {{ questionNumber }}:</strong><br>
            <strong>What song is this?</strong>
          </v-card-text>
          <div style="display:flex; justify-content: center;">
            <v-btn @click.prevent="playSound(question.audioUrl)" color="info">Play</v-btn>
          </div>
        </div>
        <br>
        <div v-if="clicked">
          <div v-for="(answers, index) in question.answers" :key="index">
            <v-btn large block
              :id="'answer'+index"
              :for="'answer'+index"
              name="currentQuestion"
              v-model="answer"
              :value="answers"
              @click="submitAnswer(answers)"
            >{{answers}}</v-btn>
            <br>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "question",
  data() {
    return {
      answer: "",
      clicked: false,
      audio: 0,
    };
  },
  props: ["question", "question-number"],
  methods: {
    submitAnswer: function(input) {
      this.$emit("answer", { answer: input });
      this.answer = null;
      this.clicked = false;
      this.audio.pause();
      this.audio.currentTime = 0;
    },
    playSound: function(sound) {
      if(sound) {
        // console.log({sound})
        this.audio = new Audio(sound);
        // console.log(this.audio)
        this.audio.play();
      }
      setTimeout(() => {
        this.clicked = true;
      }, 500);
    },
  },
  mounted() {
    console.log(this.question)
  }
};
</script>